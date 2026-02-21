// FAQ Accordion
document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isOpen = faqItem.classList.contains('open');
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('open');
            });
            if (!isOpen) {
                faqItem.classList.add('open');
            }
        });
    });

    // Carousel
    const tracks = [
        { title: "Tech for good",  desc: "Build technology that creates positive social impact and helps communities around the world." },
        { title: "Art design",     desc: "Combine creativity and code to build visually stunning and innovative digital experiences." },
        { title: "Hello world",    desc: "Perfect for beginners — build your first project and take your first steps into hacking." },
        { title: "Hardware",       desc: "Get hands-on with physical computing, circuits, and embedded systems to build real devices." },
    ];

    const carousel = document.getElementById('carousel');
    const titleEl  = document.getElementById('carousel-title');
    const descEl   = document.getElementById('carousel-desc');
    const items    = document.querySelectorAll('.carousel-item');

    let currentAngle = 0;
    let autoRotate = setInterval(() => {
        currentAngle -= 1;
        carousel.style.transform = `rotateY(${currentAngle}deg)`;
    }, 30);

    // Set first item as active by default
    items[0].classList.add('active');

    items.forEach((item, i) => {
        item.addEventListener('click', () => {
            // Clear auto rotation
            clearInterval(autoRotate);

            // Snap to clicked item
            const targetAngle = -(i * 90);
            // Find shortest path to target
            const current = currentAngle % 360;
            currentAngle = targetAngle;
            carousel.style.transition = 'transform 0.6s ease';
            carousel.style.transform = `rotateY(${targetAngle}deg)`;

            // Update info
            titleEl.style.opacity = '0';
            descEl.style.opacity = '0';
            setTimeout(() => {
                titleEl.textContent = tracks[i].title;
                descEl.textContent  = tracks[i].desc;
                titleEl.style.opacity = '1';
                descEl.style.opacity = '1';
            }, 300);

            // Highlight active
            items.forEach(el => el.classList.remove('active'));
            item.classList.add('active');

            // Resume auto rotation after 3 seconds
            setTimeout(() => {
                carousel.style.transition = '';
                autoRotate = setInterval(() => {
                    currentAngle -= 1;
                    carousel.style.transform = `rotateY(${currentAngle}deg)`;
                }, 30);
            }, 3000);
        });
    });
});
