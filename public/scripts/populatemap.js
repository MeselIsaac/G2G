var markersArray = [];
var map;
// var markers = [];
var temp_marker = {};


function initMap() {
    var originPoint = { lat: lat, lng: lng };

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: originPoint,
        mapTypeId: 'roadmap',
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false


    });

       map.addListener('click', function (event) {
        console.log("Latitude: " + event.latLng.lat() + " " + ", longitude: " + event.latLng.lng());
        deleteMarkers();
        let marker = new google.maps.Marker({
            position: { lat: event.latLng.lat(), lng: event.latLng.lng() },
            map: map,
            title: 'Click to zoom'
        });
        temp_marker = marker;

        markersArray.push(marker);



    });


    //remove "" from json array obj
    markers = JSON.parse(markers)
    if (markers) {
        // loop through markers
        for (let i = 0; i < markers.length; i++) {
            markers[i].coords.lat = parseFloat(markers[i].coords.lat)
            markers[i].coords.lng = parseFloat(markers[i].coords.lng)
            placeMarker(markers[i]);
        }
    }

    //add marker function
    function placeMarker(pointObject) {
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

    function setMapOnAll(map) {
        for (var i = 0; i < markersArray.length; i++) {
            markersArray[i].setMap(map);
        }
    }

    function clearMarkers() {
        setMapOnAll(null);
    }

    function deleteMarkers() {
        clearMarkers();
        markersArray = [];
    }


$(document).ready(function () {

  console.log('fsfs');
  $('#submitForm').on('submit', () => {
    $('#Longitude').val(temp_marker.position.lng())
    $('#Latitude').val(temp_marker.position.lat())
  });





})

 //---------------SAVE BELOW MAY COME IN HANDY ----------------------------------------------------

// $(document).ready(function () {


//     $('#submitPointForm').on('submit', (event) => {
//        event.preventDefault();

//         var num = window.location.pathname.slice(12);
//         var curated_id = num
//     var longitude = $('#Longitude').val(temp_marker.position.lng())
//     var latitude = $('#Latitude').val(temp_marker.position.lat())
//     var title = $('#title').val();
//     var description = $('#description').val();

//         // //
//         // var curated_id = window.location.pathname.slice(12);
//         // var longitude = $('#Longitude').val(temp_marker.position.lng())
//         // var latitude = $('#Latitude').val(temp_marker.position.lat())
//         // var title = $('#title').val();
//         // var description = $('#description').val();
//         $.ajax({
//             type: "POST",
//             url: "PointsRoutes",
//             data: {id: curated_id, long: longitude, lat: latitude, title: title, description: description},
//             success: function () {
//                 console.log("SUCCESS", curated_id)

//             },
//             error: function () {
//                 alert('error')
//             }
//         });
//     })

// })



