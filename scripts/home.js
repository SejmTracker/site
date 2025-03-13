// Select the elements to observe
const elements = document.querySelectorAll('.slide-in');

// Create an intersection observer to detect when the element is in the viewport
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Element is in the viewport, apply the slide-in animation
            entry.target.classList.add('slide-in');
            entry.target.classList.remove('slide-out');
        } else {
            // Element is out of the viewport, apply the slide-out animation
            entry.target.classList.add('slide-out');
            entry.target.classList.remove('slide-in');
        }
    });
}, {
    threshold: 0.5 // Trigger when 50% of the element is visible
});

// Observe each element with the slide-in class
elements.forEach(element => {
    observer.observe(element);
});