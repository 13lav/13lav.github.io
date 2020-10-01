// Button to start trail generation
const btnFetchLocation = document.getElementById('btn-fetch-location').addEventListener('click', startTrailing);

// map window initialized
window.map = undefined;
// bounds initialized
window.bounds = undefined;

// Initialize and add the map
function initMap() {
    // The location of delhi
    var delhi = {lat: 28.6796032, lng: 77.2060128};
    
    // set default map zoom to 13
    window.map = new google.maps.Map(document.getElementById('map'), {zoom: 13, center: delhi});
    window.bounds = new google.maps.LatLngBounds();
  }

// Start Trail generation function
function startTrailing() {

    // check if we can access the location
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition((position) => {
            const div = document.createElement('div');
            div.className = 'alert alert-light';
            div.innerHTML = `Latitude: ${position.coords.latitude} <strong> | </strong> Longitude: ${position.coords.longitude} <br/><i>${Date(position.timestamp)}</i>`;
            document.querySelector('.trail-container').insertBefore(div, document.querySelector('.alert'));
            addMarkerForNewLocation(position.coords.latitude, position.coords.longitude)
        }, (error) => {
            // no location found throw error
            alert('Error while fetching your location. Try again.');
        }, {
            enableHighAccuracy: true,
            maximumAge: 800
        });
    } else {
            // no location found throw error
        alert('Cannot access your location, please check browser settings.');
    }
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
