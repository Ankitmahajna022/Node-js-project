

//data fatch to AIP

// Select the main div
const mainDiv = document.querySelector('.main');

// Fetch data from a public API
fetch('http://localhost:2000')
    .then(response => response.json()) // Convert response to JSON
    .then(data => {
        // Show first 5 posts on the page
        data.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.innerHTML = `
                <h3>${post.title}</h3>
                <hr>
            `;
            mainDiv.appendChild(postDiv);
        });
    })
   
