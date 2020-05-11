const btnFetchLocation = document.getElementById('btn-fetch-location').addEventListener('click', startTrailing);

function startTrailing() {

    if (navigator.geolocation) {
        navigator.geolocation.watchPosition((position) => {
            const coords = [position.coords.latitude, position.coords.longitude];
            const div = document.createElement('div');
            div.className = 'alert alert-light';
            div.innerHTML = `Latitude: ${position.coords.latitude} <strong> | </strong> Longitude: ${position.coords.longitude} <br/><i>${Date(position.timestamp)}</i>`;
            document.querySelector('.trail-container').insertBefore(div, document.querySelector('.alert'));
             
            const fs = require('fs') 
  
            // Data which will write in a file. 
            let data = div.innerHTML

            // Write data in 'Output.txt' . 
            fs.writeFile('Output.txt', data, (err) => { 

                // In case of a error throw err. 
                if (err) throw err; 
            }) 


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
