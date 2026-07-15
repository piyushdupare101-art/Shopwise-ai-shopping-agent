/* =========================================================
   ShopWise AI — Script
   All interactivity: theme toggle, nav, typing animation,
   scroll reveal, counters, chatbot demo, FAQ accordion,
   form validation, scroll-to-top, sticky navbar.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* ---------- Dark / Light Theme Toggle ---------- */
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const body = document.body;

    function applyTheme(theme) {
        if (theme === 'dark') {
            body.setAttribute('data-theme', 'dark');
            themeIcon.textContent = '☀️';
        } else {
            body.removeAttribute('data-theme');
            themeIcon.textContent = '🌙';
        }
    }

    // Default to system preference; no persistence needed across sessions for a demo site.
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');

    themeToggle.addEventListener('click', () => {
        const isDark = body.getAttribute('data-theme') === 'dark';
        applyTheme(isDark ? 'light' : 'dark');
    });

    /* ---------- Sticky Navbar ---------- */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
        handleScrollTopButton();
        handleActiveNav();
    });

    /* ---------- Responsive Mobile Menu ---------- */
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    /* ---------- Smooth Scroll + Active Nav Highlight ---------- */
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link');

    function handleActiveNav() {
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 140;
            if (window.scrollY >= top) current = section.getAttribute('id');
        });
        navItems.forEach(item => {
            item.classList.toggle('active', item.getAttribute('href') === `#${current}`);
        });
    }

    /* ---------- Typing Animation (Hero) ---------- */
    const typingEl = document.getElementById('typingText');
    const fullText = 'ShopWise AI';
    let charIndex = 0;

    function typeWriter() {
        if (charIndex <= fullText.length) {
            typingEl.textContent = fullText.slice(0, charIndex);
            charIndex++;
            setTimeout(typeWriter, 110);
        } else {
            typingEl.style.borderRight = 'none';
        }
    }
    typingEl.textContent = '';
    setTimeout(typeWriter, 400);

    /* ---------- Scroll Reveal Animations ---------- */
    const revealEls = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    revealEls.forEach(el => revealObserver.observe(el));

    /* ---------- Animated Counters ---------- */
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });
    counters.forEach(c => counterObserver.observe(c));

    function animateCounter(el) {
        const target = parseFloat(el.dataset.target);
        const decimalDivisor = el.dataset.decimal ? parseFloat(el.dataset.decimal) : null;
        const duration = 1400;
        const start = performance.now();

        function step(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            let value = target * eased;
            if (decimalDivisor) {
                el.textContent = (value / decimalDivisor).toFixed(1);
            } else {
                el.textContent = Math.round(value).toLocaleString('en-IN');
            }
            if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    /* ---------- Scroll-to-Top Button ---------- */
    const scrollTopBtn = document.getElementById('scrollTop');

    function handleScrollTopButton() {
        scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
    }

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* ---------- FAQ Accordion ---------- */
    document.querySelectorAll('.faq-item').forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });

    /* ---------- Chatbot Demo ---------- */
    const chatForm = document.getElementById('chatForm');
    const chatInput = document.getElementById('chatInput');
    const chatBody = document.getElementById('chatBody');

    const demoResponses = {
        smartphone: "I've compared 12 listings — the best value smartphone right now is priced 14% below the market average, with a 4.5★ verified rating.",
        laptop: "For laptops, I found 3 options with genuine reviews above 4.3★. The top pick balances battery life and price, and it's currently trending down 8%.",
        headphones: "Headphones matching your query: an ANC pair with a 92% authenticity score on reviews and free next-day delivery from the lowest-price seller.",
        shoes: "I scanned 6 stores for that shoe — sizes are in stock at the retailer offering the best price, and reviews check out as genuine.",
        "compare iphone": "Comparing iPhone models: the previous-gen model offers 80% of the performance at 35% lower price — often the smarter buy unless you need the newest camera.",
        "best budget phone": "Best budget pick right now: a phone under ₹15,000 with a 4.4★ verified rating and a fake-review score of just 4%."
    };

    function addMessage(text, sender) {
        const msg = document.createElement('div');
        msg.className = `chat-msg ${sender}`;
        msg.innerHTML = `
      <span class="avatar">${sender === 'ai' ? '🤖' : '🙂'}</span>
      <div class="bubble"></div>
    `;
        msg.querySelector('.bubble').textContent = text;
        chatBody.appendChild(msg);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function getDemoResponse(query) {
        const q = query.toLowerCase().trim();
        for (const key in demoResponses) {
            if (q.includes(key)) return demoResponses[key];
        }
        return "I can help with products like smartphones, laptops, headphones, or shoes — try asking me to compare or recommend one!";
    }

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = chatInput.value.trim();
        if (!query) return;

        addMessage(query, 'user');
        chatInput.value = '';

        const typing = document.createElement('div');
        typing.className = 'chat-msg ai';
        typing.innerHTML = `<span class="avatar">🤖</span><div class="bubble">…</div>`;
        chatBody.appendChild(typing);
        chatBody.scrollTop = chatBody.scrollHeight;

        setTimeout(() => {
            typing.remove();
            addMessage(getDemoResponse(query), 'ai');
        }, 700);
    });

    /* ---------- Contact Form Validation ---------- */
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    function setError(fieldId, errorId, message) {
        const field = document.getElementById(fieldId);
        const errorEl = document.getElementById(errorId);
        field.closest('.form-group').classList.toggle('error', !!message);
        errorEl.textContent = message || '';
    }

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        formSuccess.classList.remove('show');

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        let valid = true;

        if (!name) { setError('name', 'nameError', 'Please enter your name.'); valid = false; }
        else setError('name', 'nameError', '');

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) { setError('email', 'emailError', 'Please enter your email.'); valid = false; }
        else if (!emailPattern.test(email)) { setError('email', 'emailError', 'Enter a valid email address.'); valid = false; }
        else setError('email', 'emailError', '');

        if (!message) { setError('message', 'messageError', 'Please enter a message.'); valid = false; }
        else setError('message', 'messageError', '');

        if (valid) {
            formSuccess.classList.add('show');
            contactForm.reset();
            setTimeout(() => formSuccess.classList.remove('show'), 4000);
        }
    });

    /* ---------- Loading Animation (initial page fade-in) ---------- */
    document.body.style.opacity = '0';
    window.addEventListener('load', () => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    });

    // Initial calls
    handleActiveNav();
    handleScrollTopButton();
});