function initMap() {
    var originPoint = { lat: lat, lng: lng };

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: originPoint,
        mapTypeId: 'roadmap',
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false


    });

    markers = JSON.parse(markers)

    if (markers) {
        // loop through markers
        for (let i = 0; i < markers.length; i++) {
            markers[i].coords.lat = parseFloat(markers[i].coords.lat)
            markers[i].coords.lng = parseFloat(markers[i].coords.lng)
            addMarker(markers[i]);
        }
    }

    //add marker function
    function addMarker(pointObject) {
        let marker = new google.maps.Marker({
            position: pointObject.coords,
            map: map
        });

        if (pointObject.content) {
            var infoWindow = new google.maps.InfoWindow({
                content: pointObject.content
            });
            marker.addListener('click', function () {
                infoWindow.open(map, marker);
            });

        }
    }

}

// $('#submitPointForm').submit((event) => {
//     var latitude = $('#Latitude').val(temp_marker.position.lat());
//     var longitude = $('#Longitude').val(temp_marker.position.lng());
//     var title = $('#title').val();
//     var description = $('#description').val();
//     event.preventDefault();
//     $.ajax({
//         type: 'POST',
//         url: '/newPoint',
//         data: {
//             long: longitude,
//             lat: latitude,
//             title: title,
//             description: description,
//             id: path
//         }
//     })
//         .success(() =>
//             renderMarkers()
//         )

// })