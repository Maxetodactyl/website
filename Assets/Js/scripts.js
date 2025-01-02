// Load external content (e.g., navbar, footer)
function loadContent(containerId, fileNames, callback) {
    // Create an array of fetch promises for each file
    const fetchPromises = fileNames.map(fileName =>
        fetch(`/Components/${fileName}`).then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch ${fileName}: ${response.statusText}`);
            }
            return response.text();
        })
    );

    // Use Promise.all to wait for both fetch requests to complete
    Promise.all(fetchPromises)
        .then(responses => {
            // Assign the content to the respective containers
            responses.forEach((data, index) => {
                const containerIdForFile = containerId[index];
                document.getElementById(containerIdForFile).innerHTML = data;
            });
            if (callback) callback(); // Optional callback after content loads
        })
        .catch(error => console.error(error));
}

// Call the function to load both navbar and footer
loadContent(
    ['navbar-container', 'footer-container'], // IDs of the containers to populate
    ['navbar.html', 'footer.html']            // Files to load
);


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


