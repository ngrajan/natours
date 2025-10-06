/* eslint-disable */
const locations = JSON.parse(document.getElementById('map').dataset.locations);

mapboxgl.accessToken =
  'pk.eyJ1Ijoia2stNDUiLCJhIjoiY21nZXVvbTY4MDFoazJrcDk3dmlnZ3NteiJ9.z0xbYPq4O1sKnPyAqYvlBw';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/kk-45/cmgexo5uh000601sd8e6gcs9l',
  center: [-74.5, 40], // starting position [lng, lat]
  zoom: 10,
});
