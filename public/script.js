document.addEventListener('DOMContentLoaded', function () {
    const navItems = document.querySelectorAll('.sidebar nav ul li');
    const sections = document.querySelectorAll('.content-section');
    const body = document.body;

    const backgrounds = {
        'Lock Freezer': '/images/gradientbgblue.png',
        'View Freezers': '/images/gradientbggreen.png',
        'Stake & Burn': '/images/gradientbgred.png',
        'CRV FACTORY LP': '/images/gradientbg.png',
        'Wrap/Unwrap ETH': '/images/gradientbg.png',
        'Documentation': '/images/gradientbg.png'
    };

    navItems.forEach(item => {
        item.addEventListener('click', function () {
            const selectedText = this.textContent.trim().replace(/ /g, '');

            sections.forEach(section => {
                if (section.id.toLowerCase() === selectedText.toLowerCase()) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });

            const background = backgrounds[this.textContent.trim()] || '/images/gradientbg.png';
            body.style.backgroundImage = `url(${background})`;
        });
    });
});
