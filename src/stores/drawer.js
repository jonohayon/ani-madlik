import { createStore } from 'redux';

function drawer (state = false, action) {
  switch (action.type) {
    case 'OPEN': return true;
    case 'CLOSE': return false;
    case 'TOGGLE': return !state;
    default: return state;
  }
}

const store = createStore(drawer);
export default store;
