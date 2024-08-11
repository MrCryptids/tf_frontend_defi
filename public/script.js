const backgrounds = {
    'STAKE': '/images/gradientbgblue.png',
    'BURN': '/images/gradientbgred.png',
    'CLAIM': '/images/gradientbggreen.png',
    'WRAP': '/images/gradientbg.png',
    'UNWRAP': '/images/gradientbggreen.png'
};

document.addEventListener('DOMContentLoaded', function() {
    window.selectActionWrap = function(action) {
        const wrapSection = document.getElementById('wrapSection');
        const unwrapSection = document.getElementById('unwrapSection');
        const actionSpanWRAP = document.getElementById('actionSpanWRAP');
        const wrapETHTitleLabel = document.getElementById('wrapETH-title-label');

        if (wrapSection && unwrapSection) {
            wrapSection.style.display = action === 'WRAP' ? 'block' : 'none';
            unwrapSection.style.display = action === 'UNWRAP' ? 'block' : 'none';
        }

        if (actionSpanWRAP) {
            actionSpanWRAP.innerText = action;
        }

        if (wrapETHTitleLabel) {
            wrapETHTitleLabel.innerText = action === 'WRAP' ? 'ETH' : 'WETH';
        }

        document.body.style.backgroundImage = `url(${backgrounds[action]})`;
    };

    const actionSpanWRAP = document.getElementById('actionSpanWRAP');
    if (actionSpanWRAP) {
        actionSpanWRAP.addEventListener('click', function() {
            const dropdownMenuWRAP = document.getElementById('dropdownMenuWRAP');
            const overlayWRAP = document.getElementById('overlayWRAP');
            if (dropdownMenuWRAP && overlayWRAP) {
                const isVisible = dropdownMenuWRAP.style.display === 'block';
                dropdownMenuWRAP.style.display = isVisible ? 'none' : 'block';
                overlayWRAP.style.display = isVisible ? 'none' : 'block';
            }
        });
    }

    document.addEventListener('click', function(event) {
        const dropdownMenuWRAP = document.getElementById('dropdownMenuWRAP');
        const actionSpanWRAP = document.getElementById('actionSpanWRAP');
        const overlayWRAP = document.getElementById('overlayWRAP');
        if (dropdownMenuWRAP && actionSpanWRAP && overlayWRAP) {
            if (!actionSpanWRAP.contains(event.target) && !dropdownMenuWRAP.contains(event.target)) {
                dropdownMenuWRAP.style.display = 'none';
                overlayWRAP.style.display = 'none';
            }
        }
    });
});

function selectAction(action) {
    // Hide all sections
    document.getElementById('stakeSection').style.display = 'none';
    document.getElementById('burnSection').style.display = 'none';
    document.getElementById('claimSection').style.display = 'none';

    // Show the relevant section based on the selected action
    if (action === 'STAKE') {
        document.getElementById('stakeSection').style.display = 'block';
    } else if (action === 'BURN') {
        document.getElementById('burnSection').style.display = 'block';
    } else if (action === 'CLAIM') {
        document.getElementById('claimSection').style.display = 'block';
    }

    // Update the dropdown text
    document.getElementById('actionSpan').innerText = action;

    // Change the background image
    document.body.style.backgroundImage = `url(${backgrounds[action]})`;
}

document.getElementById('actionSpan').addEventListener('click', function() {
    const dropdownMenu = document.getElementById('dropdownMenu');
    const overlay = document.getElementById('overlay');
    const isVisible = dropdownMenu.style.display === 'block';
    dropdownMenu.style.display = isVisible ? 'none' : 'block';
    overlay.style.display = isVisible ? 'none' : 'block';
});

document.addEventListener('click', function(event) {
    const dropdownMenu = document.getElementById('dropdownMenu');
    const actionSpan = document.getElementById('actionSpan');
    const overlay = document.getElementById('overlay');
    if (!actionSpan.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.style.display = 'none';
        overlay.style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const navItems = document.querySelectorAll('.sidebar nav ul li');
    const body = document.body;

    const backgrounds = {
        'nav-lockFreezer': '/images/gradientbg.png',
        'nav-viewFreezers': '/images/gradientbg.png',
        'nav-stakeBurn': '/images/gradientbgblue.png',
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