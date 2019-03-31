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

    console.log(markers)

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