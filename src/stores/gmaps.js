import { createStore } from 'redux';

function getPlaceInfo (p, ok, placeId) {
  return new Promise((resolve, reject) => {
    p.getDetails({ placeId }, (place, status) => {
      if (status !== ok) return reject(`Status of request is not OK: ${status}`)
      return resolve(place)
    })
  })
}

function getPlaces (state, input) {
  const { AutocompleteService, PlacesService, PlacesServiceStatus } = state.places
  const s = new AutocompleteService()
  const ps = new PlacesService(state.map)
  s.getQueryPredictions({ input }, (preds, status) => {
    if (status !== PlacesServiceStatus.OK) return reject(`Status of request is not OK: ${status}`)
    preds = preds.filter(p => p.place_id).map(p => getPlaceInfo(ps, PlacesServiceStatus.OK, p.place_id))
    Promise.all(preds).then(res => store.dispatch({ type: 'PREDICTIONS', payload: res }))
  })
}

function gmaps (state = {}, action) {
  switch (action.type) {
    case 'SEARCH': {
      getPlaces(state, action.payload.input);
      return { places: state.places, map: state.map };
    }
    case 'PREDICTIONS': return { places: state.places, map: state.map, preds: action.payload };
    case 'READY': {
      const { maps, map } = action.payload
      return { places: maps.places, map }
    }
    default: return state;
  }
}

const store = createStore(gmaps);
export default store;
