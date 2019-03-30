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


    // get addmarker to work with an array: and then loop through array and call add marker once:
    let markers = [
        {
            coords: { lat: 43.65, lng: -79.39 },
            content: '<h1>templatevars</h2>'
        },
        {
            coords: { lat: 43.64, lng: -79.40 },
            content: '<h1>templatevars</h2>'
        }
    ];

    // loop through markers
    for (let i = 0; i < markers.length; i++) {
        addMarker(markers[i]);
    }

    // addMarker(stuff from template vars)
    // //test with yellowknife
    // addMarker({
    //     coords: { lat: 62.4540, long: 114.3718 },
    //     content: '<h1>templatevars</h2>'
    // });

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