import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import storeFactory from './store';


const store = storeFactory();

window.React = React;
window.store = store;

/**
 * Notice: Because the App component itself triggers the UI update,
 * there is no longer a need to subscribe to the store at this point.
 * We are listening to store changes from the same component that 
 * adds the store to the context, App.
 */

render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('react-container')
)
