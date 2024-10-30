// © 2024 vimedia

// Function to check scroll position and toggle button visibility
window.onscroll = function() {
    toggleScrollToTopButton();
};
  
function toggleScrollToTopButton() {
    var scrollToTopButton = document.getElementById("scrollToTopButton");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      scrollToTopButton.style.display = "block";
    } else {
      scrollToTopButton.style.display = "none";
    }
}
  
// Function to scroll to the top of the page
function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}