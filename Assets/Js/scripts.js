// Load external content (e.g., navbar, footer)
function loadContent(containerId, fileName, callback) {
    fetch(`/components/${fileName}`)  // Corrected path to the component folder
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch ${fileName}: ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById(containerId).innerHTML = data;
            if (callback) callback(); // Optional callback after content loads
        })
        .catch(error => console.error(error));
}

// Update footer date with format 01.01.25
function updateFooterDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = String(today.getFullYear()).slice(2); // Last two digits of the year
    const dateElement = document.querySelector("#footer-container #current-date");
    if (dateElement) {
        dateElement.textContent = `${day}.${month}.${year}`;
    }
}

// Initialize the page (Load navbar and footer, update date)
function initializePage() {
    loadContent("navbar-container", "navbar.html");
    loadContent("footer-container", "footer.html", updateFooterDate);
}

// Run initialization when DOM is loaded
document.addEventListener("DOMContentLoaded", initializePage);
