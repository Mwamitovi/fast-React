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


// 1 - EXPLICITLY PASSING THE STORE


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


// 2 - PASSING THE STORE VIA CONTEXT


/**
 * Understanding Context
 * 
 * Imagine that we have some goods to move within Uganda (Country) from Kampala, to Arua.
 * We could use a train, but that would require that we lay tracks through 
 * at least nine districts so that our cargo can travel to Arua. 
 * This is like “explicitly passing the store” down the component tree from the root to the leaves. 
 * You have to “lay tracks” through every component that comes between the origin and the destination.
 * 
 * If using a train is like explicitly passing the store through props, 
 * then implicitly passing the store via context is like using a jet airliner. 
 * When a jet flies from Kampala to Arua, it flies over at least nine districts — no tracks required.
 * 
 * Similarly, we can take advantage of a React feature called ``context`` that 
 * allows us to pass variables to components without having to explicitly pass them down through 
 * the tree as properties. Any child component can access these context variables.
 */


// If we were to pass the store using context in our color organizer app,
// the first step would be to refactor the App component to hold context.
// The App component will also need to listen to the store so that 
// it can trigger a UI update every time the state changes.

import { PropTypes, Component } from 'react';
import SortMenu from './SortMenu';
import ColorList from './ColorList';
import AddColorForm from './AddColorForm';
import { sortFunction } from '../lib/array-helpers';


class App extends Component {
    /**
     * First, adding context to a component requires that 
     * we use the getChildContext() lifecycle function. 
     * It will return the object that defines the context. 
     * In this case, we add the store to the context, which we can access through props.
     * 
     * Next, we need to specify childContextTypes on the component instance and
     * define your context object. This is similar to adding propTypes or 
     * defaultProps to a component instance. 
     * However, for context to work, we must take this step.
     * At this point, any children of the App component will 
     * have access to the store via the context. 
     * They can invoke store.getState() and store.dispatch() directly. 
     * 
     * The final step is to subscribe to the store and 
     * update the component tree every time the store updates state. 
     * This can be achieved with the mounting lifecycle functions,
     * see branch - feature/update-lifecycle).
     * 
     * In componentWillMount, we can subscribe to the store and 
     * use this.forceUpdate to trigger the updating lifecycle, 
     * which will rerender our UI. 
     * 
     * In componentWillUnmount, we can invoke the unsubscribe function and 
     * stop listening to the store. 
     * Because the App component itself triggers the UI update, 
     * there is no longer a need to subscribe to the store from 
     * the entry ./index.js file; 
     * we are listening to store changes from the same component that 
     * adds the store to the context, App.
     */
    getChildContext() {
        return {
            store: this.props.store
        }
    };

    componentWillMount() {
        this.unsubscribe = store.subscribe( () => this.forceUpdate() )
    };

    componentWillUnmount() {
        this.unsubscribe()
    };

    render() {
        const { colors, sort } = store.getState()
        const sortedColors = [...colors].sort(sortFunction(sort))
        
        return (
            <div className="app">
                <SortMenu />
                <AddColorForm />
                <ColorList colors={sortedColors} />
            </div>
        )
    };
};

App.propTypes = {
    store: PropTypes.object.isRequired
};

App.childContextTypes = {
    store: PropTypes.object.isRequired
};

export default App;


// Now, let’s refactor the AddColorForm component to retrieve the store and 
// dispatch the ADD_COLOR action directly.


const AddColorForm = (props, { store }) => {
    /**
     * The context object is passed to stateless functional components as 
     * the second argument, after props. 
     * We can use object destructuring to obtain the store 
     * from this object directly in the arguments. 
     * 
     * In order to use the store, we must define contextTypes on the AddColorForm instance. 
     * This is where we tell React which context variables this component will use. 
     * This is a required step. Without it, the store cannot be retrieved from the context.
     */

    let _title, _color;

    const submit = e => {
        e.preventDefault()
        store.dispatch(addColor(_title.value, _color.value))
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
    )
};
    
AddColorForm.contextTypes = {
    store: PropTypes.object
};


// OK, let’s now take a look at how to use context in a component class. 
// The Color component can retrieve the store and 
// dispatch RATE_COLOR and REMOVE_COLOR actions directly.

import { PropTypes, Component } from 'react';
import StarRating from './StarRating';
import TimeAgo from './TimeAgo';
import FaTrash from 'react-icons/lib/fa/trash-o';
import { rateColor, removeColor } from '../actions';


class Color extends Component {
    
    render() {
        const { id, title, color, rating, timestamp } = this.props;
        const { store } = this.context;

        return (
            <section className="color" style={this.style}>
                <h1 ref="title">{title}</h1>
                <button onClick={() => store.dispatch( removeColor(id) )}>
                    <FaTrash />
                </button>
                <div className="color" style={{ backgroundColor: color }}></div>
                <TimeAgo timestamp={timestamp} />
                <div>
                    <StarRating starsSelected={rating}
                        onRate={rating => store.dispatch( rateColor(id, rating) )} />
                </div>
            </section>
        )
    }
};

Color.contextTypes = {
    store: PropTypes.object
};

Color.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    rating: PropTypes.number
};

Color.defaultProps = {
    rating: 0
};

export default Color;


// Color is now a component class, and can access context via this.context. 
// Colors are now read directly from the store via store.getState(). 
// The same rules apply that do for stateless functional components. 
// contextTypes must be defined on the instance.

// Retrieving the store from the context is a nice way to reduce your boilerplate,
// but this is not something that is required for every application. 
// ** Dan Abramov, the creator of Redux, 
//    even suggests that these patterns do not need to be religiously followed:
//    Separating the container and presentational components is often a good idea, 
//    but you shouldn’t take it as dogma. Only do this when it truly reduces the of your codebase.


// 3 - PRESENTATIONAL VS CONTAINER COMPONENTS


/**
 * In the above approach (passing the store via context),
 * the Color component retrieved the store via context and 
 * used it to dispatch RATE_COLOR and REMOVE_COLOR actions directly. 
 * Before that, the ColorList component retrieved the 
 * store via context to read the current list of colors from state.
 * In both examples, 
 * these components rendered UI elements by interacting directly with the Redux store.
 * We can improve the architecture of our application by 
 * decoupling the store from components that render the UI.
 */


/**
 * Presentational components are components that only render UI elements.
 * They are reusable. 
 * They are easy to swap out and easy to test. 
 * They can be composed to create the UI.
 * They can be reused across browser applications that may use different data libraries.
 * 
 * Container components - are components that connect presentational components to the data.
 * They are not concerned with the UI at all.
 * Their main focus is connecting the presentation components to the data architecture.
 * They can be reused across device platforms to connect the
 * native presentational components to the data.
 */


// The AddColorForm, ColorList, Color, StarRating, and Star components that 
// we created earlier are examples of presentational components. 
// They receive data via props, and when events occur, they invoke callback function properties. 
// We are already pretty familiar with presentation components, 
// so let’s see how we can use them to create container components.


// The App component will mostly remain the same. 
// It still defines the store in the context so that it can be retrieved by child components. 
// Instead of rendering the SortMenu, AddColorForm, and ColorList components, 
// however, it will render containers for those items. 
// The Menu container will connect the SortMenu, NewColor will 
// connect the AddColorForm, and Colors will connect the ColorList.


class App extends Component {
    // So in this case, 
    // we only update the render() method within the App component (version in #2)
    // And include all the other attributes the same way.
    render() {
        return (
            <div className="app">
                <Menu />
                <NewColor />
                <Colors />
            </div>
        )
    }
};


// Any time you want to connect a presentational component to some data, you can wrap that 
// component in a container that controls the properties and connects them to data. 
// The NewColor, Menu, and Colors containers can all be defined in the same file.

import { PropTypes } from 'react';
import AddColorForm from './ui/AddColorForm';
import SortMenu from './ui/SortMenu';
import ColorList from './ui/ColorList';
import { addColor, removeColor, rateColor, sortColors } from '../actions';
import { sortFunction } from '../lib/array-helpers';


export const Menu = (props, { store }) => (
    /**
     * The Menu container renders the SortMenu component. 
     * It passes the current sort property from the store’s state and 
     * dispatches sort actions when the user selects a different menu item.
     */
    <SortMenu sort={ store.getState().sort } 
        onSelect={sortBy => store.dispatch(sortColors(sortBy))} 
    />
);

Menu.contextTypes = {
    store: PropTypes.object
};


export const NewColor = (props, { store }) => (
    /**
     * The NewColor container does not render UI. 
     * Instead, it renders the AddColorForm component and 
     * handles onNewColor events from this component. 
     * This container component retrieves the store from the context and 
     * uses it to dispatch ADD_COLOR actions. 
     * It contains the AddColorForm component and connects it to the Redux store.
     */
    <AddColorForm onNewColor={
        (title, color) => store.dispatch(addColor(title,color))} 
    />
);

NewColor.contextTypes = { 
    store: PropTypes.object 
};


export const Colors = (props, { store }) => {
    /**
     * The Colors container retrieves the store via context and 
     * renders a ColorList component with colors from the store’s current state. 
     * It also handles onRate and onRemove events invoked from the ColorList component. 
     * When these events occur, the Colors container dispatches the appropriate actions.
     */
    const { colors, sort } = store.getState();
    const sortedColors = [...colors].sort(sortFunction(sort));

    return (
        <ColorList colors={sortedColors}
            onRemove={id => store.dispatch( removeColor(id) )}
            onRate={(id, rating) => store.dispatch( rateColor(id, rating) )}
        />
    )
};

Colors.contextTypes = {
    store: PropTypes.object
};


// All of the Redux functionality is connected within the 
// Menu, NewColor and Colors components.
// Notice that all of the action creators are imported and used in this one place. 
// This is the only file that invokes store.getState or store.dispatch.

// This approach of separating UI components from containers that 
// connect them to data is generally a good approach. 
// However, this could be overkill for a small project,
// proof of concept, or prototype.

// In the next section, we introduce a new library, React Redux. 
// This library can be used to quickly add the Redux store to context and 
// create container components.

