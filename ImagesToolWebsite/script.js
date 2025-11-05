
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const formData = new FormData(contactForm);
            const submission = {
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message'),
            };

            console.log('Form Submission:', submission);

            alert('Thank you for your message! We have received it.');
            contactForm.reset();
        });
    }
});
