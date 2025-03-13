document.addEventListener("DOMContentLoaded", () => {
    // Create modal overlay
    const modalOverlay = document.createElement("div");
    modalOverlay.id = "modalOverlay";

    // Create iframe container
    const iframeContainer = document.createElement("div");
    iframeContainer.id = "iframeContainer";

    // Create close button
    const closeBtn = document.createElement("button");
    closeBtn.id = "closeBtn";
    closeBtn.innerHTML = "&times;";

    // Create iframe element
    const iframe = document.createElement("iframe");
    iframe.id = "iframe";

    // Append close button and iframe to the iframe container
    iframeContainer.appendChild(closeBtn);
    iframeContainer.appendChild(iframe);

    // Append iframe container to modal overlay
    modalOverlay.appendChild(iframeContainer);

    // Append modal overlay to the body
    document.body.appendChild(modalOverlay);

    // Loop through each image with the window-url attribute
    document.querySelectorAll("img[window-url]").forEach(img => {
        img.addEventListener("click", () => {
            // Get the image dimensions
            const imgWidth = img.naturalWidth;
            const imgHeight = img.naturalHeight;

            // Define scaling factor for smaller images
            const scaleFactor = imgHeight < 200 ? 2 : 1; // If height is less than 200px, double the size

            // Set the iframe size according to the image size, with scaling applied
            let modalWidth = imgWidth * scaleFactor;
            let modalHeight = imgHeight * scaleFactor;

            // Apply maximum size constraints (80% of viewport)
            const maxWidth = window.innerWidth * 0.8; // 80% of viewport width
            const maxHeight = window.innerHeight * 0.8; // 80% of viewport height

            // Ensure the modal size doesn't exceed the max values
            if (modalWidth > maxWidth) {
                modalWidth = maxWidth;
                modalHeight = (modalWidth / imgWidth) * imgHeight;
            }

            if (modalHeight > maxHeight) {
                modalHeight = maxHeight;
                modalWidth = (modalHeight / imgHeight) * imgWidth;
            }

            // Set the iframe container's width and height
            iframeContainer.style.width = `${modalWidth}px`;
            iframeContainer.style.height = `${modalHeight}px`;

            // Set iframe src to the URL specified
            const url = img.getAttribute("window-url");
            iframe.src = url;

            // Show modal overlay with fade-in effect
            modalOverlay.style.display = "flex";
            modalOverlay.style.animation = "fadeIn 0.5s forwards";
        });
    });

    // Hide the modal with fade-out effect
    closeBtn.addEventListener("click", () => {
        modalOverlay.style.animation = "fadeOut 0.5s forwards";
        setTimeout(() => {
            modalOverlay.style.display = "none";
            iframe.src = ""; // Clear iframe source
        }, 500); // Matches fade-out duration
    });
});
