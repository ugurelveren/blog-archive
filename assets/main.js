// Function to load and convert Markdown file
function loadMarkdownContent(file) {

    var text = readFileSync(file);
    if(text != null)
    {   
        text = readMetadata(text);
    }
    return text;
}

function readMetadata(text)
{
    if(text != null)
    {
        //regex for metadata
        const frontMatterRegex = /^---\s*\n([\s\S]+?)\n---/;

        var match = text.match(frontMatterRegex);
        if(match)
        {
            const yamlContent = match[1]; 
            //ToDo Create metedata
            processMetaData(yamlContent);
            text = text.replace(frontMatterRegex, ''); //
        }
    }
    return text;
}

function processMetaData(metadata){

    const lines = metadata.split('\n');
    const metaTags = {};
    lines.forEach(line => {
        if (line.trim()) {
          const [key, value] = line.split(':').map(str => str.trim());
          metaTags[key] = value.replace(/["']/g, ''); // Remove quotes around the values
        }
      });

      for (const key in metaTags) {
        if (metaTags.hasOwnProperty(key)) {
            if (key === 'canonical') {
                // Add canonical link tag
                const link = document.createElement('link');
                link.rel = 'canonical';
                link.href = metaTags[key];
                document.head.appendChild(link);
              } else {
                // Add regular meta tags
                const meta = document.createElement('meta');
                meta.name = key;
                meta.content = metaTags[key];
                document.head.appendChild(meta);
      
                // Set the title tag if it exists
                if (key === 'title') {
                  document.title = metaTags[key];
                }
              }   
        }
      }
}

//it is depreceted but
function readFileSync(filePath) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", filePath, false); // false for synchronous request
    xhr.send();

    if (xhr.status === 200) {
        return xhr.responseText;
    } else {
        console.log("Failed to load file:", xhr.status);
        return null;
    }
}

// Extract the Markdown filename from the current URL path
function getMarkdownFilenameFromURL() {
    const path = window.location.pathname; // Get the current path
    const fragment = window.location.hash.substring(1); // Get the fragment (removes the # symbol)
    
    // Check if the fragment is present and return it as the filename, otherwise use path
    if (fragment) {
        return fragment + '.md'; // Append .md extension to fragment
    }

    // If no fragment, use the last part of the path or default to 'default.md'
    const filename = path.substring(path.lastIndexOf('/') + 1); // Extract the filename from path
    return filename ? filename + '.md' : 'default.md'; // Append .md or return 'default.md'
}

function loadPostPage(){
    // Load the specific blog post based on the URL path
    const postFile = 'posts/' + getMarkdownFilenameFromURL(); // Combine 'posts/' with the filename
    var content = loadMarkdownContent('../'+postFile);


    function pageLoaded() {
        document.getElementById('post-content').innerHTML = marked.marked(content);
        insertDateAfterH1();
    }

    window.onload = pageLoaded;
}

function loadIndexPage()
{
    document.getElementById('full-width-content').innerHTML = marked.marked(loadMarkdownContent('full-width.md'));
    document.getElementById('column1-content').innerHTML = marked.marked(loadMarkdownContent('posts/posts.md'));
    document.getElementById('column2-content').innerHTML = marked.marked(loadMarkdownContent('posts/personal.md'));
    document.getElementById('column3-content').innerHTML = marked.marked(loadMarkdownContent('posts/books.md'));
    // Load content from Markdown files into the columns
}

function insertDateAfterH1() {
    // Read the date from the meta tag
    const metaDate = document.querySelector('meta[name="date"]').getAttribute('content');
    const dateObj = new Date(metaDate);

    // Convert date to "Month Day, Year" format
    const options = { year: 'numeric', month: 'long', day: 'numeric',timeZone: 'UTC'};
    const formattedDate = dateObj.toLocaleDateString('en-US',options);

    // Create the <p><em> tag and insert the date
    const p = document.createElement('p');
    const em = document.createElement('em');
    em.textContent = formattedDate;
    p.appendChild(em);

    // Insert after the first <h1> tag
    const h1 = document.querySelector('h1');
    h1.insertAdjacentElement('afterend', p);
}
