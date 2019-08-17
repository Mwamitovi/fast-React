/**
 * Color Organizer Advanced (summary)
 * See branch: feature/react-redux (detailed)
 * 
 * The process of passing data all the way down and back up 
 * the component tree introduces complexity that libraries like 
 * Redux are designed to alleviate.
 * Instead of passing data up the tree through two-way function binding,
 * we can dispatch actions directly from child components to update application state.
 * 
 * In this here, we’ll take a look at various ways to incorporate the Redux store.
 * We will first look at how the store can be used without any additional frameworks.
 * After that, we will explore react-redux, 
 * a framework that can be used to integrate a Redux store with React components.
 */


// Explicitly Passing the Store


/**
 * The first, and most logical, way to incorporate the store into your UI is 
 * to pass it down the component tree explicitly as a property. 
 * This approach is simple and works very well for smaller apps that 
 * only have a few nested components.
 */


// ./index.js - we render an App component and pass it the store.


// Let’s take a look at how we can incorporate the store into the color organizer.
// In this file, we create the store with the storeFactory and
// render the App component into the document. 
// When the App is rendered, the store is passed to it as a property. 
// Every time the store changes, the render function will be invoked, 
// which efficiently updates the UI with new state data.

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import storeFactory from './store';


const store = storeFactory();

const render = () => {
    ReactDOM.render(
        <App store={store}/>, document.getElementById('react-container')
    )
};

store.subscribe(render);
render();


// Now that we have passed the store to the App, 
// we have to continue to pass it down to the child components that need it.


// components/App.js


/**
 * The App component is our root component. 
 * It captures the store from props and explicitly passes it 
 * down to its child components. 
 * 
 * The store is passed to the SortMenu, AddColorForm, 
 * and ColorList components as a property.
 * Now that we have passed the store from the App, 
 * we can use it inside the child components.
 * 
 * Remember we can read state from the store with store.getState, 
 * and we can dispatch actions to the store with store.dispatch.
 */


import AddColorForm from './AddColorForm';
import SortMenu from './SortMenu';
import ColorList from './ColorList';


const App = ({ store }) => (
    <div className="app">
        <SortMenu store={store} />
        <AddColorForm store={store} />
        <ColorList store={store} />
    </div>
);

export default App


// components/AddColorForm.js


/**
 * From the AddColorForm component, 
 * we can use the store to dispatch ADD_COLOR actions. 
 * When the user submits the form, 
 * we collect the color and the title from refs,
 * and use that data to create and dispatch a new ADD_COLOR action.
 * 
 * For this component, we import the necessary action creator, addColor. 
 * When the user submits the form, 
 * we’ll dispatch a new ADD_COLOR action directly 
 * to the store using this action creator.
 */

import { PropTypes, Component } from 'react';
import { addColor } from '../actions';


const AddColorForm = ({store}) => {
    let _title, _color;
    const submit = e => {
        e.preventDefault()
        store.dispatch( addColor(_title.value, _color.value) )
        _title.value = ''
        _color.value = '#000000'
        _title.focus()
    };
    return (
        <form className="add-color" onSubmit={submit}>
            <input ref={input => _title = input}
                type="text"
                placeholder="color title..." required/>
            <input ref={input => _color = input}
                type="color" required/>
            <button>ADD</button>
        </form>
    );
};

AddColorForm.propTypes = {
    store: PropTypes.object
};


export default AddColorForm;


// components/ColorList.js


/**
 * The ColorList component can use the store’s getState() method to 
 * obtain the original colors and sort them appropriately. 
 * It can also dispatch RATE_COLOR and REMOVE_COLOR actions directly as they occur.
 * 
 * The store is passed all the way 
 * down the component tree to the ColorList component. 
 * This component interacts with the store directly. 
 * When colors are rated or removed, those actions are dispatched to the store.
 * The store is also used to obtain the original colors.
 * 
 * Those colors are duplicated and sorted according to 
 * the store’s sort property and saved as sortedColors.
 * sortedColors is then used to create the UI.
 */

import { PropTypes } from 'react';
import Color from './Color';
import { rateColor, removeColor } from '../actions';
import { sortFunction } from '../lib/array-helpers';


const ColorList = ({ store }) => {
    const { colors, sort } = store.getState();
    const sortedColors = [...colors].sort(sortFunction(sort));

    return (
        <div className="color-list">
            {(colors.length === 0) ?
                <p>No Colors Listed. (Add a Color)</p> :
                sortedColors.map(color => (
                    <Color key={color.id}
                        {...color}
                        onRate={(rating) => (
                            store.dispatch(rateColor(color.id, rating))
                        )}
                        onRemove={() => (
                            store.dispatch(removeColor(color.id))
                        )} 
                    />
                ))
            }
        </div>
    );
};

ColorList.propTypes = {
    store: PropTypes.object
};

export default ColorList;


/**
 * Explicitly Passing the Store - conclusion. 
 * 
 * This approach is great if 
 * your component tree is rather small, like this color organizer.
 * 
 * The drawback of using this approach is that 
 * we have to explicitly pass the store to child components, 
 * which means slightly more code and 
 * slightly more headaches than with other approaches. 
 * 
 * Additionally, the SortMenu, AddColorForm, and 
 * ColorList components require this specific store. 
 * It would be hard to reuse them in another application.
 */


