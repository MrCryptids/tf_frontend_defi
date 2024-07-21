document.addEventListener('DOMContentLoaded', function () {
    const navItems = document.querySelectorAll('.sidebar nav ul li');
    const body = document.body;

    const backgrounds = {
        'nav-lockFreezer': '/images/gradientbgblue.png',
        'nav-viewFreezers': '/images/gradientbggreen.png',
        'nav-stakeBurn': '/images/gradientbgred.png',
        'nav-crvFactory': '/images/gradientbg.png',
        'nav-wrapUnwrapETH': '/images/gradientbg.png',
        'nav-documentation': '/images/gradientbg.png',
        'nav-landing': '/images/gradientbg.png'
    };

    const showSection = (sectionId) => {
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => {
            if (section.id === sectionId) {
                section.style.display = 'block'; // Ensure the section is displayed
                setTimeout(() => section.classList.add('show'), 10); // Add transition effect
                console.log(`Showing section: ${sectionId}`); // Debug
            } else {
                section.style.display = 'none'; // Ensure the section is hidden
                section.classList.remove('show');
                console.log(`Hiding section: ${section.id}`); // Debug
            }
        });

        const background = backgrounds[`nav-${sectionId}`] || '/images/gradientbg.png';
        body.style.backgroundImage = `url(${background})`;

        // Handle lander image transition
        const landerImage = document.getElementById('lander');
        if (landerImage) {
            if (sectionId === 'landing') {
                landerImage.style.opacity = '1';
            } else {
                landerImage.style.opacity = '0';
            }
        }
    };

    navItems.forEach(item => {
        item.addEventListener('click', function () {
            const sectionId = this.id.replace('nav-', '');
            showSection(sectionId);
            console.log(`Navigated to: ${sectionId}`); // Debug: Log the navigation
        });
    });

    // Show the default section (landing)
    showSection('landing');
});

function lazyLoadIframe(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const iframe = entry.target;
            iframe.src = iframe.getAttribute('data-src');
            iframe.onload = () => {
                iframe.classList.add('loaded');
            };
            observer.unobserve(iframe);
        }
    });
}

// Create an IntersectionObserver instance
const observer = new IntersectionObserver(lazyLoadIframe, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
});

// Observe the iframe element
const iframe = document.getElementById('lazy-iframe');
observer.observe(iframe);