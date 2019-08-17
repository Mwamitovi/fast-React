import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import storeFactory from './store';


const store = storeFactory();

window.React = React;
window.store = store;

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

const _render = () => {
    ReactDOM.render (
        <App store={store} />,
        document.getElementById('react-container')
    )
};

store.subscribe(_render)
_render()
