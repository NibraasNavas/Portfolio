/* ==========================================================================
   NIBRAAS NAVAS PORTFOLIO — INTERACTIVE SCRIPTS
   Theme: Smokey Blue (#2D394A) & Morlet Red (#562025)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Theme Management (Smokey Dark / Warm Editorial) ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleText = document.getElementById('theme-toggle-text');
    const body = document.body;

    const savedTheme = localStorage.getItem('nibraas-portfolio-theme') || 'dark';

    if (savedTheme === 'warm') {
        body.classList.add('theme-warm');
        if (themeToggleText) themeToggleText.textContent = 'Smokey Dark';
    } else {
        body.classList.remove('theme-warm');
        if (themeToggleText) themeToggleText.textContent = 'Warm Mode';
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isWarm = body.classList.toggle('theme-warm');
            const currentTheme = isWarm ? 'warm' : 'dark';
            localStorage.setItem('nibraas-portfolio-theme', currentTheme);

            if (themeToggleText) {
                themeToggleText.textContent = isWarm ? 'Smokey Dark' : 'Warm Mode';
            }

            showToast(isWarm ? "Switched to Warm Editorial Mode" : "Switched to Smokey Dark Mode");
        });
    }

    // --- 2. Mobile Menu Navigation ---
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-item-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars-staggered');
                icon.classList.toggle('fa-xmark');
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars-staggered');
                    icon.classList.remove('fa-xmark');
                }
            });
        });
    }

    // --- 3. Navbar Scrollspy & Shadow State ---
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        if (navbar) {
            if (scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Active link tracking
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 120;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // --- 4. Skills Filtering Matrix ---
    const filterChips = document.querySelectorAll('.filter-chip');
    const skillCards = document.querySelectorAll('.skill-matrix-card');

    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const filter = chip.getAttribute('data-filter');

            filterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');

            skillCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'flex';
                    card.style.animation = 'toast-in 0.35s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- 5. Quick Message Starter Presets ---
    const presetChips = document.querySelectorAll('.preset-chip');
    const subjectInput = document.getElementById('subject');
    const messageTextarea = document.getElementById('message');

    const presets = {
        hiring: {
            subject: "Data Science / ML Engineering Role Discussion",
            message: "Hello Nibraas, we came across your portfolio and are impressed by your hands-on work in ML pipelines and computer vision. We'd love to explore discussing an open role with you."
        },
        collab: {
            subject: "AI Project Collaboration Inquiry",
            message: "Hi Nibraas, I'm working on an AI-driven initiative and would love to explore collaborating with you based on your background in Data Science and model deployment."
        },
        cv: {
            subject: "Inquiry on AwareDrive & Edge Computer Vision",
            message: "Hi Nibraas, I was reviewing your AwareDrive Driver Drowsiness project and would love to ask a few questions regarding your edge facial landmark tracking setup."
        },
        hello: {
            subject: "Connecting / Hello from an Engineer",
            message: "Hi Nibraas, just wanted to reach out and say hello! Great portfolio and impressive projects. Let's stay connected on LinkedIn/GitHub."
        }
    };

    presetChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const presetKey = chip.getAttribute('data-preset');
            if (presets[presetKey]) {
                if (subjectInput) subjectInput.value = presets[presetKey].subject;
                if (messageTextarea) {
                    messageTextarea.value = presets[presetKey].message;
                    messageTextarea.focus();
                }
                presetChips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                showToast("Message starter applied!");
            }
        });
    });

    // --- 6. Instant Copy-to-Clipboard ---
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const textToCopy = btn.getAttribute('data-copy');
            if (textToCopy) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    showToast(`Copied ${textToCopy} to clipboard!`);
                    const icon = btn.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-copy');
                        icon.classList.add('fa-check');
                        setTimeout(() => {
                            icon.classList.remove('fa-check');
                            icon.classList.add('fa-copy');
                        }, 2000);
                    }
                });
            }
        });
    });

    // --- 7. Toast Notification Utility ---
    window.showToast = function(message) {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${message}</span>`;

        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(10px)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3200);
    };

    // --- 8. Simulated Contact Form Handler ---
    window.handleFormSubmit = function(e) {
        e.preventDefault();
        const submitBtn = document.getElementById('submit-btn');
        const originalHtml = submitBtn ? submitBtn.innerHTML : '';

        if (submitBtn) {
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending message...';
            submitBtn.disabled = true;
        }

        setTimeout(() => {
            if (submitBtn) {
                submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
            }
            showToast("Thank you! Your message has been sent to Nibraas.");
            e.target.reset();

            presetChips.forEach(c => c.classList.remove('active'));

            setTimeout(() => {
                if (submitBtn) {
                    submitBtn.innerHTML = originalHtml;
                    submitBtn.disabled = false;
                }
            }, 3000);
        }, 900);
    };

});
