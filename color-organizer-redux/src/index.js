import storeFactory from './store'
import { addColor, removeColor, rateColor, sortColors } from './actions'


const store = storeFactory();


/**
 * Dispatch()
 * 
 * The only way to change the state of an application is
 * by dispatching actions through the store.
 * The store has a dispatch method that is ready to take actions as an argument.
 * When you dispatch an action through the store, 
 * the action is sent through the reducers and the state is updated.
 * 
 * Below, we use the action creator and 
 * send the necessary data as function arguments.
 */


store.dispatch(addColor('Uganda Blue', '#1122FF'));
store.dispatch(rateColor('8658c1d0-9eda-4a90-95e1-8001e8eb6036', 5));
store.dispatch(sortColor('title'));

console.log('current state', store.getState());
console.log('Go ahead, dispatch some actions...');

window.store = store;
window.addColor = addColor;
window.removeColor = removeColor;
window.rateColor = rateColor;
window.sortColors = sortColors;
