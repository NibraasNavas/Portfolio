/* ==========================================================================
   NIBRAAS NAVAS PORTFOLIO - SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Theme Palette Switcher ---
    const themeBtns = document.querySelectorAll('.theme-btn');
    const body = document.body;

    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.getAttribute('data-theme');
            
            // Remove previous theme classes
            body.classList.remove('pastel-theme-lavender', 'pastel-theme-mint', 'pastel-theme-peach');
            body.classList.add(`pastel-theme-${theme}`);

            // Active state
            themeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            showToast(`Theme switched to Soft ${capitalize(theme)} mode!`);
        });
    });

    // --- 2. Skills Category Filter ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-category-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');

            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            skillCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.4s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- 3. Copy Email Button ---
    const copyBtns = document.querySelectorAll('.copy-btn');
    copyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const textToCopy = btn.getAttribute('data-copy');
            navigator.clipboard.writeText(textToCopy).then(() => {
                showToast(`Copied ${textToCopy} to clipboard!`);
            });
        });
    });

    // --- 4. Toast Notification Utility ---
    function showToast(message) {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<i class="fa-solid fa-circle-info"></i> <span>${message}</span>`;

        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(10px)';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // --- 5. Form Submission Simulation ---
    window.handleFormSubmit = function(e) {
        e.preventDefault();
        const submitBtn = e.target.querySelector('button[type="submit"]');
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
            showToast("Thank you! Your message has been sent to Nibraas Navas.");
            e.target.reset();
            
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
            }, 3000);
        }, 800);
    };

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
});
