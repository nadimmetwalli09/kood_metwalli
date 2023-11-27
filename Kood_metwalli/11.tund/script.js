document.getElementById('getCatBtn').addEventListener('click', getCat);

function getCat() {
    // Make a request to The Cat API
    fetch('https://api.thecatapi.com/v1/images/search')
        .then(response => response.json())
        .then(data => {
            // Extract the cat image URL
            const imageUrl = data[0].url;

            // Display the cat image
            const catImageContainer = document.getElementById('catImageContainer');
            catImageContainer.innerHTML = `<img src="${imageUrl}" alt="Random Cat">`;
        })
        .catch(error => console.error('Error fetching cat:', error));
}