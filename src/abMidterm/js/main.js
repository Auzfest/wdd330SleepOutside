const baseURl = {"api_token":"eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjo4MjMxMzY0LCJleHAiOjE3MTc1OTc2NDF9.U11-wOQxk0UNGaRcyFn8TPv6hMS7xr6BEPmtzaf0GuISnKsrqotsneZKyF9YuU8s1CMRTv7ntqX5QKkQitSmoA"}

document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const place = document.getElementById('place').value;
    console.log(place);
    searchPlaces(place);
});

async function searchPlaces(place) {
    try {
        const response = await fetch(`https://api.inaturalist.org/v1/places/autocomplete?q=${place}`);
        const data = await response.json();
        if (data.results.length > 0) {
            const placeId = data.results[0].id;
            console.log(placeId);
            fetchIdentifications(placeId);
        } else {
            document.getElementById('results').innerHTML = '<p>No places found</p>';
        }
    } catch (error) {
        console.error('Error fetching places:', error);
    }
}

async function fetchIdentifications(placeId) {
    try {
        const response = await fetch(`https://api.inaturalist.org/v1/observations?place_id=${placeId}`);
        const data = await response.json();
        displayIdentifications(data.results);
    } catch (error) {
        console.error('Error fetching identifications:', error);
    }
}

function displayIdentifications(identifications) {
    console.log(identifications);
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    identifications.forEach(identification => {
        const div = document.createElement('div');
        div.className = 'identification';
        const img = document.createElement('img');
        img.src = identification.photos[0]?.url || 'https://via.placeholder.com/100';
        console.log(img);
        const nameDiv = document.createElement('div');
        nameDiv.className = 'name';
        if(identification.taxon != null){
            nameDiv.innerText = identification.taxon.name;
        }
        else {
            nameDiv.innerText = 'Unknown';
        }
        div.appendChild(img);
        div.appendChild(nameDiv);
        resultsDiv.appendChild(div);
    });
}