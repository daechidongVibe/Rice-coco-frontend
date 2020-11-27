import getEnvVars from '../../environment';
const { REACT_NATIVE_GOOGLE_PLACES_API_KEY } = getEnvVars();

export default API_URL = {
  googlePlace:
    'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=37.5059549,127.0590855&radius=5000&type=restaurant',
  randomNickname: 'https://nickname.hwanmoo.kr/?format=json&count=1',
  restaurantList: searchWord =>
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=37.5059549,127.0590855&radius=5000&type=restaurant&keyword=${searchWord}&key=${REACT_NATIVE_GOOGLE_PLACES_API_KEY}`,
  restaurantDetails: restaurantId =>
    `https://maps.googleapis.com/maps/api/place/details/json?key=${REACT_NATIVE_GOOGLE_PLACES_API_KEY}&place_id=${restaurantId}&language=ko&fields=name,rating,adr_address,photo,geometry,reviews`,
  restaurantPhoto: photoReference =>
    `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${REACT_NATIVE_GOOGLE_PLACES_API_KEY}`,
};
