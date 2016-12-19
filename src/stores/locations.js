import { createStore } from 'redux';
import Parse from 'parse';

const { app, js } = keys.parse;

Parse.initialize(app, js);
const Places = Parse.Object.extend('Places');

function getLocation (res) {
  const name = res.get('Name');
  const loc = res.get('Location');
  const { latitude, longitude } = loc;
  return Promise.resolve({ latitude, longitude, name });
}

function getLocations () {
  const query = new Parse.Query(Places);
  query.find({
    success: (res) => {
      Promise.all(res.map(o => getLocation(o))).then(payload => store.dispatch({ type: 'RETURN', payload }));
    }
  });
}

function addLocation (obj) {
  console.log(obj);
  const { lat, lng, name } = obj;
  const place = new Places();
  place.set('Location', new Parse.GeoPoint({ latitude: lat, longitude: lng }));
  place.set('Name', name);
  place.save(null, {
    success: () => getLocations()
  });
}

function locations (state = {}, action) {
  switch (action.type) {
    case 'ADD': {
      addLocation(action.payload);
      return {};
    }
    case 'GET': {
      getLocations();
      return {};
    }
    case 'RETURN': return { locations: action.payload };
    default: return state;
  }
}

const store = createStore(locations);
export default store;
