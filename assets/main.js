// Function to load and convert Markdown file
function loadMarkdownContent(divId, file) {
    fetch(file)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch ${file}: ${response.statusText}`);
            }
            return response.text();
        })
        .then(text => {
            // Convert Markdown to HTML and load it into the specified div
            document.getElementById(divId).innerHTML = marked.marked(text);
        })
        .catch(error => {
            document.getElementById(divId).innerHTML = `Error loading ${file}: ${error}`;
            console.error(error);
        });
}

// Extract the Markdown filename from the current URL path
function getMarkdownFilenameFromURL() {
    const path = window.location.pathname; // Get the current path
    const filename = path.substring(path.lastIndexOf('/') + 1); // Extract the filename
    return filename || 'default.md'; // Return the filename or default if empty
}

// Load the specific blog post based on the URL path
const postFile = 'posts/' + getMarkdownFilenameFromURL(); // Combine 'posts/' with the filename
loadMarkdownContent('post-content', postFile);