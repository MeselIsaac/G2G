// In the following example, markers appear when the user clicks on the map.
// The markers are stored in an array.
// The user can then click an option to hide, show or delete the markers.
var map;
var markers = [];
var temp_marker = {};
var pointsStorage = []

console.log(lng);
// console.log(typeof latitude);
// console.log(typeof longitude);
// console.log(longitude);
// console.log(latitude);

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

    // This event listener will call addMarker() when the map is clicked.
    // map.addListener('click', function(event) {
    //   addMarker(event.latLng);
    // });

    map.addListener('click', function (event) {
      pointsStorage.push({lat: event.latLng.lat(), long: event.latLng.lng()})
        console.log("Latitude: " + event.latLng.lat() + " " + ", longitude: " + event.latLng.lng());
        let marker = new google.maps.Marker({
            position: { lat: event.latLng.lat(), lng: event.latLng.lng() },
            map: map,
            title: 'Click to zoom'
        });
        temp_marker = marker;
        markers.push(marker);
        console.log(markers);
        console.log("MARKER TEXZT", marker.position)

    });


//-------------------------------------COPIED AND INSERTED THE ABOVE---------------------------
// In the following example, markers appear when the user clicks on the map.
// The markers are stored in an array.
// The user can then click an option to hide, show or delete the markers.
// $(document).ready(function () {
// var map;
// var markers = [];
// var temp_marker = {};
// var pointsStorage = []

// // console.log(lng);
// // console.log(typeof latitude);
// // console.log(typeof longitude);
// // console.log(longitude);
// // console.log(latitude);

// function initMap() {
//     var originPoint = { lat: lat, lng: lng };

//     map = new google.maps.Map(document.getElementById('map'), {
//         zoom: 13,
//         center: originPoint,
//         mapTypeId: 'roadmap',
//         zoomControl: true,
//         mapTypeControl: false,
//         scaleControl: true,
//         streetViewControl: false,
//         rotateControl: false,
//         fullscreenControl: false




//     // This event listener will call addMarker() when the map is clicked.
//     // map.addListener('click', function(event) {
//     //   addMarker(event.latLng);
//     });

//     map.addListener('click', function (event) {

//       pointsStorage.push({lat: event.latLng.lat(), long: event.latLng.lng()})
//       // localStorage.setItem("lat", event.latLng.lat())
//       // localStorage.setItem("long", event.latLng.lng())

//       // sessionStorage.setItem(position : )

//         console.log("Latitude: " + event.latLng.lat() + " " + ", longitude: " + event.latLng.lng());
//         let marker = new google.maps.Marker({
//             position: { lat: event.latLng.lat(), lng: event.latLng.lng() },
//             map: map,
//             title: 'Click to zoom'
//         });
//         temp_marker = marker;

//         // pointsStorage.push(event.latLng.lat(), event.latLng.lng() )
//         markers.push(marker);
//         console.log(markers);

//         // console.log("TEMP_MARKER =======", temp_marker)
//         // console.log("POINTSTATORA", pointsStorage)
//         // console.log("POINTS[0]====", pointsStorage[0])
//         // console.log("POINTS[0]LAT===", pointsStorage[0].lat)
//         //  console.log("POINTS[0]LONG====", pointsStorage[0].long)
//         //  console.log("POINTS[1]====", pointsStorage[1])
//         // console.log("POINTS[1]LAT===", pointsStorage[1].lat)
//         //  console.log("POINTS[1]LONG====", pointsStorage[1].long)



//     });


    // var contentString = '<div id="content">' +
    //     '<div id="siteNotice">' +
    //     '</div>' +
    //     '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
    //     '<div id="bodyContent">' +
    //     '<p><b>Haight Ashbury</b>, also referred to as <b>the coolest area in San Francisco</b>, ' +
    //     'cool and hip area in San Francisco, California. Lots of people come to SF ' +
    //     'in order to experience the amazing climate. San Francisco is a very expensive ' +
    //     'city, in fact the Bay Area in general is the most expensive in USA. ' +
    //     '</p>' +
    //     '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
    //     'https://en.wikipedia.org/w/index.php?title=Uluru</a> ' +
    //     '(last visited June 22, 2009).</p>' +
    //     '</div>' +
    //     '</div>';

    // var infowindow = new google.maps.InfoWindow({
    //     content: contentString
    // });

    // var marker = new google.maps.Marker({
    //     position: originPoint,
    //     map: map,
    //     title: 'Haight Ashbury'
    // });
    // marker.addListener('click', function () {
    //     infowindow.open(map, marker);
    // });
// }


// Sets the map on all markers in the array.
function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
    setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
    setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
    clearMarkers();
    markers = [];
}




$(function() {





// $('#submitPointForm').on('submit', (event) => {
//   event.preventDefault()

// var curated_id = window.location.pathname.slice(12);
// // var data_to_send = JSON.stringify(pointsStorage);

// // console.log("data_to_string", data_to_send)

//   $.ajax({
//     // dataType: 'json',
//     // contentType: 'application/json; charset=utf-8',
//     type: "POST",
//     url: "/newPoint",
//     data: {"myArray": JSON.stringify(pointsStorage), id: curated_id, title: $("#title").val(), description: $("#description").val()},
//     success: function() {
//       pointsStorage = []
//       $("#title").val('')
//       $("#description").val('')
//       console.log("SUCCESS")

//     },
//     error: function() {
//       alert('error')
//     }
//   });

// })




  // console.log('fsfs');
  // $('#submitPointForm').on('submit', () => {
  //   $('#Longitude').val(temp_marker.position.lng())
  //   $('#Latitude').val(temp_marker.position.lat())
  // });



 // //slideToggle
    // $("#mapName").submit(function () {
    //     $("#showmap").slideToggle();
    //     $("#showmap title").focus();
    //     return false
    // });



    // console.log('fsfs');
    // $('#submitForm').on('submit', () => {
    //     console.log("");
    //     const data = {
    //         "Latitude": temp_marker.position.lat(),
    //         "Longitude": temp_marker.position.lng(),
    //         "Title": $('#title').val(),
    //         "Description": $('#description').val(),
    //         "Rating": $('#rating').val()
    //     };
    //     // declared an empoty object
    //     console.log("THE MARKERS ARE HERE");
    //     console.log(data);

    //     // use data object to store values (lat/lng title ,etc)
    //     // use ajax to send out this data object to the server
    //     return false;
    // })
})
}
