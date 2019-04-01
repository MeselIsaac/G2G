$(document).ready(function () {

maps = JSON.parse(maps)
// console.log(maps);
// console.log(maps[0].map.description);
// console.log(typeof maps[0].map.lat);
// console.log(maps[0].map.long);
// console.log(maps[0].map.user_id);
// console.log(maps[0].map.title);

if (maps) {
    // loop through maps
    for (let i = 0; i < maps.length; i++) {
      // console.log(maps.length);
        maps[i].lat = parseFloat(maps[i].map.lat)
        maps[i].long = parseFloat(maps[i].map.long)
        // addMap(maps[i]);
        console.log(maps[i].lat);
        console.log(maps[i].long);
        console.log("the whole map ",maps[i]);
        createMapElement(maps[i]);
    }
}
//
//create new map
function createMapElement (mapObject) {
  console.log(mapObject);
  console.log(mapObject.map.title)
  console.log(mapObject.map.user_id)
  console.log(mapObject.map.description)
  var newMap = '<section id="UserMaps">' +
  '<img src="http://placekitten.com/200/139" alt="">'
  '<header>' +
  '<h3>' + mapObject.map.title + '</h3>' +
  '</header>' +
  '<span>' + mapObject.map.user_id + '</span>' +
  '<article>' + mapObject.map.description + '</article>' +
  '</section>'
  return newMap
};

console.log("create map function--->",createMapElement(maps));

  function renderMaps () {
      maps.forEach(function (map) {
        let map = createMapElement(mapObject)
        $('#UserMaps').append(map)
      })
    }
    // function renderMaps(maps) {
    // $('#UserMaps').empty();
    // for (var map of maps) {
    //   var mapHtml = createMapElement(mapObject);
    //     $("#UserMaps").prepend(mapHtml);
  renderMaps();

    //AJAX GET request
   // function loadMaps() {
   //   $.ajax({
   //     url: "//",
   //     type: "GET",
   //     success: function (maps) {
   //       renderMaps(mapObject)
   //     }
   //   })
   // }
   // loadMaps()
//
//   ////
//   maps: '[{"map":{"id":1,"user_id":1,"description":"Toronto empty map",
//   "date_created":"2018-03-11T00:00:00.000Z",
//   "date_updated":"2019-04-12T00:00:00.000Z",
//   "long":"-79.39","lat":"43.65","title":"My new Toronto map"}}]' }
//
// /////code for maplet:
// <div class="UserMaplet">
//     <img src="http://placekitten.com/200/139" alt="">
//     <header>
//         <h3>maps.title</h3>
//     </header>
//     <span>
//         created by: John
//     </span>
//     <article>
//         Lorem ipsum dolor sit amet.
//     </article>
// </div>
// /////code for maplet above
});
