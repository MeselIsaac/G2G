// In the following example, markers appear when the user clicks on the map.
// The markers are stored in an array.
// The user can then click an option to hide, show or delete the markers.
var map;
var markers = [];
var temp_marker = {};

function initMap() {
  var haightAshbury = {lat: 37.769, lng: -122.446};

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 2,
    center: haightAshbury,
    mapTypeId: 'terrain'
  });

  // This event listener will call addMarker() when the map is clicked.
  // map.addListener('click', function(event) {
  //   addMarker(event.latLng);
  // });

  map.addListener('click', function(event) {
    console.log("Latitude: "+event.latLng.lat()+" "+", longitude: "+event.latLng.lng());
    let marker = new google.maps.Marker({
      position: {lat: event.latLng.lat(), lng: event.latLng.lng()},
      map: map,
      title: 'Click to zoom'
    });
    temp_marker = marker;
    markers.push(marker);
    console.log(markers);

  });


  var contentString = '<div id="content">'+
  '<div id="siteNotice">'+
  '</div>'+
  '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
  '<div id="bodyContent">'+
  '<p><b>Haight Ashbury</b>, also referred to as <b>the coolest area in San Francisco</b>, ' +
  'cool and hip area in San Francisco, California. Lots of people come to SF '+
  'in order to experience the amazing climate. San Francisco is a very expensive '+
  'city, in fact the Bay Area in general is the most expensive in USA. '+
  '</p>'+
  '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
  'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
  '(last visited June 22, 2009).</p>'+
  '</div>'+
  '</div>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  var marker = new google.maps.Marker({
    position: haightAshbury,
    map: map,
    title: 'Haight Ashbury'
  });
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
}


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


$(document).ready(function () {

  //slideToggle
  // $ ("#mapName").submit(function (){
  //   $ ("#showmap").slideToggle ();
  //   $ ( "#showmap title" ).focus ();
  //   return false
  // });



  console.log('fsfs');
  $('#submitForm').on('submit', () => {
    console.log("");
    const data = {
      "Latitude": temp_marker.position.lat(),
      "Longitude": temp_marker.position.lng(),
      "Title": $('#title').val(),
      "Description": $('#description').val(),
      "Rating": $('#rating').val()
    };
    // declared an empoty object
    console.log("THE MARKERS ARE HERE");
    console.log(data);

    // use data object to store values (lat/lng title ,etc)
    // use ajax to send out this data object to the server
    return false;
  })

})












// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });;
// });
