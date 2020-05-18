// Button to start trail generation
const btnFetchLocation = document.getElementById('btn-fetch-location').addEventListener('click', startTrailing);

window.map = undefined;
window.bounds = undefined;

// Start Trail generation function
function startTrailing() {

    if (navigator.geolocation) {
        navigator.geolocation.watchPosition((position) => {
            const div = document.createElement('div');
            div.className = 'alert alert-light';
            div.innerHTML = `Latitude: ${position.coords.latitude} <strong> | </strong> Longitude: ${position.coords.longitude} <br/><i>${Date(position.timestamp)}</i>`;
            document.querySelector('.trail-container').insertBefore(div, document.querySelector('.alert'));
            addMarkerForNewLocation(position.coords.latitude, position.coords.longitude)
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

// Initialize and add the map
function initMap() {
    // The location of delhi
    var delhi = {lat: 28.6796032, lng: 77.2060128};
    // The map, centered at delhi
    window.map = new google.maps.Map(
        document.getElementById('map'), {zoom: 16, center: delhi});
    window.bounds = new google.maps.LatLngBounds();
    // The marker, positioned at delhi
    var marker = new google.maps.Marker({position: delhi, map: window.map});
  }

// Add marker
function addMarkerForNewLocation(lat, long) {
    if (window.map != undefined) {
        var newLocation = {lat: lat, lng: long};
        // The marker, positioned at new location
        var marker = new google.maps.Marker({position: newLocation, map: window.map});
        // center map
        const center = new google.maps.LatLng(lat, long);
        window.map.panTo(center);
    }
}
