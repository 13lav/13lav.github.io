const btnFetchLocation = document.getElementById('btn-fetch-location').addEventListener('click', startTrailing);

function startTrailing() {

    if (navigator.geolocation) {
        navigator.geolocation.watchPosition((position) => {
            const coords = [position.coords.latitude, position.coords.longitude];
            const div = document.createElement('div');
            div.className = 'alert alert-light';
            div.innerHTML = `Latitude: ${position.coords.latitude} <strong> | </strong> Longitude: ${position.coords.longitude} <br/><i>${Date(position.timestamp)}</i>`;
            document.querySelector('.trail-container').insertBefore(div, document.querySelector('.alert'));
            
        }, (error) => {
            alert('Error while fetching your location. Try again.');
        }, {
            enableHighAccuracy: true,
            maximumAge: 800
        });
    } else {
        alert('Cannot access your location, please check browser settings.');
    }
}
