/* eslint-disable */
const locations = JSON.parse(document.getElementById('map').dataset.locations);

mapboxgl.accessToken =
  'pk.eyJ1Ijoia2stNDUiLCJhIjoiY21nZXVvbTY4MDFoazJrcDk3dmlnZ3NteiJ9.z0xbYPq4O1sKnPyAqYvlBw';
const map = new mapboxgl.Map({
  container: 'map', // container : document.getElementById('map') --> this also works.
  style: 'mapbox://styles/kk-45/cmgexo5uh000601sd8e6gcs9l',
  // center: [-80.128473, 25.781842], // starting position [lng, lat]
  // zoom: 10,
  scrollZoom: false,
  // interactive: false,
});

// creating boundaries(dynamic markings)
const bounds = new mapboxgl.LngLatBounds();

locations.forEach((loc) => {
  // creating marker
  const el = document.createElement('div');
  el.className = 'marker';

  // marker properties
  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom',
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  // popup properties
  new mapboxgl.Popup({ offset: 30 })
    .setLngLat(loc.coordinates)
    .setHTML(
      `<p>
        Day ${loc.day}: ${loc.description}
      </p>`,
    )
    .addTo(map);

  bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 150,
    left: 100,
    right: 100,
  },
});
