/**
 * Color Organizer - Redux (summary)
 * See branch: feature/redux (detailed)
 * 
 * How to manage state within an app, using the redux library.
 * The key concept is around having one store - to handle state changes in the app,
 * and to utilize reducers to achieve modularity.
 */


/**
 * Application state should be stored in a single immutable object.
 * When building Redux apps, the first thing you need to think about is state. 
 * Try to define it in a single object. 
 * It is often a good idea to draft a JSON sample of your
 * state tree with some placeholder data.
 * 
 * Let’s go back to our color organizer application. 
 * In this application, 
 * we’ll have information about each color stored in an array, 
 * and information about how the colors should be sorted. 
 */ 


// A sample of our state data would look like...

// This state data has two main branches: colors and sort. 
// The sort branch is a leaf. It doesn’t contain any child nodes. 
// The colors branch stores multiple colors. Each color object represents a leaf.
// (see- fast-React/color-organizer-redux/img/color-organizer-state-tree.png)

{
    colors: [
        {
            id: "8658c1d0-9eda-4a90-95e1-8001e8eb6036",
            title: "Ocean Blue",
            color: "#0070ff",
            rating: 3,
            timestamp: "Thur August 15 2019 16:12:09 GMT+0300 (EAT)"
        },
        {
            id: "f9005b4e-975e-433d-a646-79df172e1dbb",
            title: "Tomato",
            color: "#d10012",
            rating: 2,
            timestamp: "Wed August 14 2019 12:00:00 GMT+0300 (EAT)"
        },
        {
            id: "58d9caee-6ea6-4d7b-9984-65b145031979",
            title: "Lawn",
            color: "#67bf4f",
            rating: 1,
            timestamp: "Tue August 13 2019 01:11:12 GMT+0300 (EAT)"
        },
        {
            id: "a5685c39-6bdc-4727-9188-6c9a00bf7f95",
            title: "Party Pink",
            color: "#ff00f7",
            rating: 5,
            timestamp: "Mon August 12 2019 03:26:00 GMT+0300 (EAT)"
        }
    ]
    sort: "SORTED_BY_DATE"
}

// Now that we have identified the basic structure of our application’s state, 
// let’s see how we update and change this state via actions.


// ACTIONS - src/constants.js

/**
 * Actions are the only way to update the state of a Redux application.
 * Actions provide us with instructions about what should change,
 * but we can also look at them like receipts about
 * the history of what has changed over time.
 */

const constants = {
    SORT_COLORS: "SORT_COLORS",
    ADD_COLOR: "ADD_COLOR",
    RATE_COLOR: "RATE_COLOR",
    REMOVE_COLOR: "REMOVE_COLOR"
};

export default constants;

// Then preferably imported as a constant
import C from './constants'

{ type: C.ADD_COLOR }


// REDUCERS - src/store/reducers.js


/**
 * No Side Effects in Reducers
 * 
 * Reducers should be predictable. 
 * They are used to simply manage the state data. 
 * In the above example, 
 * notice that the timestamp and IDs are generated prior to 
 * sending the action to the reducer.
 * 
 * Generating random data, calling APIs, and 
 * other asynchronous processes should be handled outside of reducers. 
 * Avoiding state mutations and side effects is always recommended.
 */


/**
 * The Color Reducer
 * 
 * Reducers can be coded in a number of different ways. 
 * Switch statements are a popular choice because they can 
 * process the different types of actions that reducers must handle.
 * The color reducer tests the action.type in a switch statement and 
 * then handles each action type with a switch case.
 * 
 * Reducers should always return something. 
 * If for some reason this reducer is invoked with an unrecognized action, 
 * we will return the current state: the default case.
 */
 
export const color = (state={}, action) => {
    // The color reducer is a function that creates a new object or rates an existing one.
    // Notice that the RATE_COLOR action passes an ID that’s not used by the color reducer. 
    // That’s because the ID of this action is used to
    // locate the color in an entirely different reducer. 
    // One action object can impact several reducers.
    switch (action.type) {
        case C.ADD_COLOR:
            // ADD_COLOR
            // Returns a new color object constructed from the action’s payload data.
            return {
                id: action.id,
                title: action.title,
                color: action.color,
                timestamp: action.timestamp,
                rating: 0
            }
        case C.RATE_COLOR:
            // RATE_COLOR
            // Returns a new color object with the desired rating. 
            // The ES7 object spread operator allows us to 
            // assign the value of the current state to a new object.
            return (state.id !== action.id) ?
                state :
                {
                    ...state,
                    rating: action.rating
                }
        default:
            return state
    }
};

// Now that we have a color reducer,
// we can use it to return new colors or rate existing colors. 

// For example: Adding a new color
const action = {
    type: "ADD_COLOR",
    id: "4243e1p0-9abl-4e90-95p4-8001l8yf3036",
    color: "#0000FF",
    title: "Big Blue",
    timestamp: "Thu Mar 15 2019 01:11:12 GMT+0300 (EAT)"
};

console.log( color({}, action) )
// Console Output
// {
//      id: "4243e1p0-9abl-4e90-95p4-8001l8yf3036",
//      color: "#0000FF",
//      title: "Big Blue",
//      timestamp: "Thu Mar 10 2016 01:11:12 GMT-0800 (PST)",
//      rating: "0"
// }

// The new color object is returned with all fields represented, 
// including the default rating of 0. 


// To change an existing color, 
// we can send the RATE_COLOR action with the ID and new rating:

const existingColor = {
    id: "128e1p5-3abl-0e52-33p0-8401l8yf3036",
    title: "Big Blue",
    color: "#0000FF",
    timestamp: "Thu Mar 10 2016 01:11:12 GMT-0800 (PST)",
    rating: 0
};

const action = {
    type: "RATE_COLOR",
    id: "4243e1p0-9abl-4e90-95p4-8001l8yf3036",
    rating: 4
};

console.log( color(existingColor, action) )
// Console Output
// {
//      id: "4243e1p0-9abl-4e90-95p4-8001l8yf3036",
//      title: "Big Blue",
//      color: "#0000FF",
//      timestamp: "Thu August 10 2019 01:11:12 GMT+0300 (EAT)",
//      rating: 4
// }


/**
 * The Colors Reducer
 * 
 * The color reducer is designed to manage leaves on the colors branch of 
 * our state tree. The colors reducer will be used to manage the entire colors branch:
 * The colors reducer is concerned with the array of colors. 
 * It uses the color reducer to focus on the individual color objects.
 * We can also remove a color from state or rate an individual color in
 * state by sending the appropriate action to the colors reducer.
 */

export const colors = (state=[], action) => {
    // The colors reducer will handle any actions for 
    // adding, rating, and removing colors. 
    switch (action.type) {
        case C.ADD_COLOR :
            // ADD_COLOR
            // Creates a new array by concatenating all of the values of 
            // the existing state array with a new color object. 
            // The new color is created by passing a blank state object
            // and the action to the ``color`` reducer.
            return [
                ...state,
                color({}, action)
            ]
        
        case C.RATE_COLOR :
            // RATE_COLOR
            // Returns a new array of colors with the desired color rated. 
            // The colors reducer locates the color to be rated within 
            // the current state array. It then uses the color reducer to 
            // obtain the newly rated color object and replaces it in the array.
            return state.map(
                c => color(c, action)
            )

        case C.REMOVE_COLOR :
            // REMOVE_COLOR
            // Creates a new array by filtering out the desired color to remove.
            return state.filter(
                c => c.id !== action.id
            )
        
        default:
            return state
    }
};

/**
 * Treat State as an Immutable Object
 * 
 * In all of these reducers, 
 * we need to treat state as an immutable object. 
 * Although it may be tempting to use state.push({}) or state[index].rating, 
 * we should resist the urge to do so. 
 */

// Now colors can be added, rated, or removed from 
// the colors array with this pure function:

const currentColors = [
    {
        id: "9813e2p4-3abl-2e44-95p4-8001l8yf3036",
        title: "Berry Blue",
        color: "#000066",
        rating: 0,
        timestamp: "Thu August 10 2019 01:11:12 GMT+0300 (EAT)"
    }
];

const action = {
    type: "ADD_COLOR",
    id: "5523e7p8-3ab2-1e35-95p4-8001l8yf3036",
    title: "Party Pink",
    color: "#F142FF",
    timestamp: "Thu August 10 2019 01:11:12 GMT+0300 (EAT)"
};

console.log( colors(currentColors, action) )
// Console Output
// [{
//      id: "9813e2p4-3abl-2e44-95p4-8001l8yf3036",
//      title: "Berry Blue",
//      color: "#000066",
//      timestamp: "Thu Mar 10 2016 01:11:12 GMT-0800 (PST)",
//      rating: 0
// },
// {
//      id: "5523e7p8-3ab2-1e35-95p4-8001l8yf3036",
//      title: "Party Pink",
//      color: "#F142FF",
//      timestamp: "Thu Mar 10 2016 01:11:12 GMT-0800 (PST)",
//      rating: 0
// }]


/**
 * The Sort Reducer
 * 
 * The sort reducer is an entire function designed to 
 * manage one string variable in our state. 
 */ 

export const sort = (state="SORTED_BY_DATE", action) => {
    
    switch (action.type) {
        case C.SORT_COLORS:
            return action.sortBy
        
        default:
            return state
    }
}


// The sort reducer is used to change the sort state variable. 
// It sets the sort state to the value of the action’s sortBy field 
// (if this is not a state provided, it will return SORTED_BY_DATE):
    
const state = "SORTED_BY_DATE"
    
const action = {
    type: C.SORT_COLORS,
    sortBy: "SORTED_BY_TITLE"
}
    
console.log( sort(state, action) ) 
// "SORTED_BY_TITLE"
    

// To recap, state updates are handled by reducers. 
// Reducers are pure functions that take in state as the first argument and 
// an action as the second argument. 
// Reducers do not cause side effects and 
// should treat their arguments as immutable data. 

// In Redux, modularity is achieved through reducers.
// Eventually, reducers are combined into a single reducer, 
// a function that can update the entire state tree.

// In this section, we saw how reducers can be composed. 
// We saw how the colors reducer uses the color reducer to 
// assist in color management. 

// In the next section, we will look at how the colors reducer can be 
// combined with the sort reducer to update state.


// STORE - src/store/index.js

/**
 * In Redux, the store is 
 * what holds the application’s state data and handles all state updates.
 * While the Flux design pattern allows for many stores that 
 * each focus on a specific set of data, Redux only has one store.
 * 
 * The store handles state updates by passing the current state and 
 * action through a single reducer. We will create this single reducer by 
 * combining and composing all of our reducers.
 */


// If we create a store using the colors reducer, 
// then our state object will be an array — the array of colors. 
// The getState() method of the store will return the present application state.

import { createStore } from 'redux'
import { color } from './reducers'

// We create a store with the color reducer, 
// proving that you can use any reducer to create a store.
const store = createStore(color)

console.log( store.getState() ) 
// {}


// In order to create a single reducer tree,
// as seen in Figure 8-6 (see- fast-react/color-organizer-redux)
// we must combine the colors and sort reducers.

// Redux has a function for doing just that, 
// combineReducers, which combines all of the reducers into a single reducer. 
// These reducers are used to build your state tree. 
// The names of the fields match the names of the reducers that are passed in.

import { createStore, combineReducers } from 'redux'
import { colors, sort } from './reducers'


// A store can also be created with initial data. 
// Invoking the colors reducer without state returns an empty array:
const store = createStore(
    combineReducers({ colors, sort })
)
    
console.log( store.getState() )
// Console Output
//{
//   colors: [],
//   sort: "SORTED_BY_DATE"
//}


// InitialState (store) - data/initialState.json


// Below, we create a store with three colors and a sort value of SORTED_BY_TITLE.
const initialState = {
    colors: [
        {
            id: "3315e1p5-3abl-0p523-30e4-8001l8yf3036",
            title: "Rad Red",
            color: "#FF0000",
            rating: 3,
            timestamp: "Thur August 15 2019 16:12:09 GMT+0300 (EAT)"
        },
        {
            id: "3315e1p5-3abl-0p523-30e4-8001l8yf4457",
            title: "Crazy Green",
            color: "#00FF00",
            rating: 0,
            timestamp: "Wed August 14 2019 12:00:00 GMT+0300 (EAT)"
        },
        {
            id: "3315e1p5-3abl-0p523-30e4-8001l8yf2412",
            title: "Big Blue",
            color: "#0000FF",
            rating: 5,
            timestamp: "Tue August 13 2019 01:11:12 GMT+0300 (EAT)"
        }
    ],
    sort: "SORTED_BY_TITLE"
}


const store = createStore(
    combineReducers({ colors, sort }),
    initialState
)

console.log( store.getState().colors.length ) 
// 3
console.log( store.getState().sort ) 
// "SORTED_BY_TITLE"


// The only way to change the state of your application is 
// by dispatching actions through the store. 
// The store has a dispatch method that is ready to take actions as an argument. 
// When you dispatch an action through the store, 
// the action is sent through the reducers and the state is updated:

// Check length
console.log(
    "Length of colors array before ADD_COLOR", store.getState().colors.length
)
// Length of colors array before ADD_COLOR 3


// Updating state
store.dispatch({
    type: "ADD_COLOR",
    id: "2222e1p5-3abl-0p523-30e4-8001l8yf2222",
    title: "Party Pink",
    color: "#F142FF",
    timestamp: "Thur August 15 2019 01:11:12 GMT+0300 (EAT)"
})

// Check length again: confirm that color is added
console.log(
    "Length of colors array after ADD_COLOR", store.getState().colors.length
)
// Length of colors array after ADD_COLOR 4


// Check rating
console.log(
    "Color rating before RATE_COLOR", store.getState().colors[3].rating
)
// Color rating before RATE_COLOR 0


// Updating state
store.dispatch({
    type: "RATE_COLOR",
    id: "2222e1p5-3abl-0p523-30e4-8001l8yf2222",
    rating: 5
})

// Check rating: confimr that rating has changed
console.log(
    "Color rating after RATE_COLOR", store.getState().colors[3].rating
)
// Color rating after RATE_COLOR 5


/**
 * Subscribing to Stores - store.subscribe()
 * 
 * Stores allow you to subscribe handler functions that 
 * are invoked every time the store completes dispatching an action. 
 */

// Below, we log the count of colors in the state:

store.subscribe(
    () => console.log('color count:', store.getState().colors.length)
)

store.dispatch({
    type: "ADD_COLOR",
    id: "2222e1p5-3abl-0p523-30e4-8001l8yf2222",
    title: "Party Pink",
    color: "#F142FF",
    timestamp: "Thur August 15 2019 01:11:12 GMT+0300 (EAT)"
})

store.dispatch({
    type: "ADD_COLOR",
    id: "3315e1p5-3abl-0p523-30e4-8001l8yf2412",
    title: "Big Blue",
    color: "#0000FF",
    timestamp: "Thur August 15 2019 03:20:00 GMT+0300 (EAT)"
})

store.dispatch({
    type: "RATE_COLOR",
    id: "2222e1p5-3abl-0p523-30e4-8001l8yf2222",
    rating: 5
})

store.dispatch({
    type: "REMOVE_COLOR",
    id: "3315e1p5-3abl-0p523-30e4-8001l8yf2412"
})

// Console Output
// color count: 1
// color count: 2
// color count: 2
// color count: 1


// The store’s subscribe method returns a function that 
// you can use later to unsubscribe the listener:

const logState = () => console.log('next state', store.getState())
const unsubscribeLogger = store.subscribe(logState)

// Invoke when ready to unsubscribe the listener
unsubscribeLogger()


// Remember the compose functionality?


/**
 * Compose
 * 
 * Redux also comes with a compose function that 
 * you can use to compose several functions into a single function. 
 * It is similar to the compose function that we created in Chapter 3, 
 * but is more robust. It also composes functions from right to left as
 * opposed to from left to right.
 */

// If we just wanted to get a comma-delimited list of color titles, 
// we could use this one crazy line of code:
console.log(store.getState().colors.map(c=>c.title).join(", "))


// A more functional approach would be to break this down into 
// smaller functions and compose them into a single function:
import { compose } from 'redux'


const print = compose(
    // The compose function takes in functions as arguments and invokes the rightmost first.
    // First it obtains the colors from state, then it returns a bound map function, 
    // followed by an array of color titles, which are joined as a comma-delimited list and 
    // finally logged to the console.    
    list => console.log(list),
    titles => titles.join(", "),
    map => map(c=>c.title),
    colors => colors.map.bind(colors),
    state => state.colors
)

print(store.getState())


/**
 * Saving to localStorage
 * 
 * Using the store’s subscribe function, we can listen for state changes and  
 * save those changes to localStorage under any key e.g 'redux-store'. 
 * When we create the store we can check to see if any data has 
 * been saved under this key and, if so, load that data as our initial state. 
 * With just a few lines of code, we can have persistent state data in the browser:
 */

// Every time we refresh this code, our colors list gets larger by one color. 

// First, within the createStore() function call, 
// we see if the redux-store key exists. 
// If it exists, we’ll parse the JSON. 
// If it doesn’t exist, we’ll return an empty object.  
const store = createStore(
    combineReducers({ colors, sort }),
    (localStorage['redux-store']) ?
        JSON.parse(localStorage['redux-store']) : {}
)

// Next, we subscribe a listener to the store that saves 
// the store’s state every time an action is dispatched.
// Refreshing the page would continue to add the same color.
store.subscribe(
    () => { localStorage['redux-store'] = JSON.stringify(store.getState()) }
)

console.log('current color count', store.getState().colors.length)
console.log('current state', store.getState())

store.dispatch({
    type: "ADD_COLOR",
    id: uuid.v4(),
    title: "Party Pink",
    color: "#F142FF",
    timestamp: new Date().toString()
})


// ACTION CREATORS - src/actions.js


/**
 * Action objects are simply JavaScript literals.
 * Action creators are functions that create and return these literals.
 * 
 * We can simplify the logic involved with generating an action by 
 * adding an action creators for each of these action types.
 * 
 * Action creators can have logic.
 * Moving logic into an action creator would
 * abstract the details away from the process of dispatching actions.
 * 
 * Action creators are where we should put any logic for communicating with backend APIs.
 * With an action creator,
 * we can perform asynchronous logic like requesting data or making an API call.
 * We will cover this later when we deal with the server.
 * 
 */

import C from './constants'
import { v4 } from 'uuid'


export const addColor = (title, color) => ({
    // The addColor action creator will generate a unique ID and will provide a timestamp.
    // With all the logic in one place, it is now easier to debug.
    type: C.ADD_COLOR,
    id: v4(),
    title,
    color,
    timestamp: new Date().toString()
})


// Now it’s much easier to create new colors — 
// we provide a unique ID by creating a variable that we can increment,
// and the timestamp is automatically set using the client’s present time:
store.dispatch( addColor("#F142FF", "Party Pink") )


export const removeColor = id => ({
    type: C.REMOVE_COLOR,
    id
})

export const rateColor = (id, rating) => ({
    type: C.RATE_COLOR,
    id,
    rating
})

// Now whenever we need to dispatch a RATE_COLOR or a REMOVE_COLOR, 
// we can use the action creator and send the necessary data as function arguments:
store.dispatch( removeColor("3315e1p5-3abl-0p523-30e4-8001l8yf2412") )
store.dispatch( rateColor("441e0p2-9ab4-0p523-30e4-8001l8yf2412", 5) )


// Action creators can abstract away details of how an action is created, 
// which can greatly simplify the process of creating an action. 
// For example, if we create an action called sortBy, 
// it can decide the appropriate action to take:

export const sortColors = sortedBy => {
    // The sortColors action creator checks sortedBy for "rating", "title", and the default.
    (sortedBy === 'rating') ?
        ({
            type: C.SORT_COLORS,
            sortBy: 'SORTED_BY_RATING'
        }) :
        (sortedBy === 'title') ?
            ({
                type: C.SORT_COLORS,
                sortBy: 'SORTED_BY_TITLE'
            }) :
            ({
                type: C.SORT_COLORS,
                sortBy: 'SORTED_BY_DATE'
            })
};

// Now there is considerably less typing involved whenever you want to dispatch a sortColors action:
store.dispatch( sortColors("title") )


// MiDDLEWARE - src/store/index.js


/**
 * Redux also has middleware. 
 * 
 * It acts on the store’s dispatch pipeline. 
 * In Redux, middleware consists of a series of functions that 
 * are executed in a row in the process of dispatching an action.
 * 
 * Each piece of middleware is a function that has access to the action, 
 * a dispatch function, and a function that will call next. 
 * next causes the update to occur. 
 * Before next is called, you can modify the action. 
 * After next, the state will have changed.
 */


// Applying Middleware to the Store

/**
 * In this section, we are going to create a storeFactory. 
 * A factory is a function that manages the process of creating stores. 
 * In this case, 
 * the factory will create a store that has middleware for logging and saving data. 
 * The storeFactory will be one file that contains one function that
 * groups everything needed to create the store. 
 */

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { colors, sort } from './reducers'
import stateData from './initialState'


// Whenever we need a store, we can invoke this function.
const store = storeFactory(initialData)


// Both the logger and the saver (below) are middleware functions.
// In Redux, middleware is defined as a higher-order function: 
// it’s a function that returns a function that returns a function. 

// The last function returned is invoked every time an action is dispatched.
// When this function is invoked, you have access to the action, the store, and 
// the function for sending the action to the next middleware.

const logger = store => next => action => {
    // In the logger, before the action is dispatched, 
    // we open a new console group and log the current state and the current action. 
    // Invoking next pipes the action on to the next piece of middleware and eventually the reducers. 
    // The state at this point has been updated, so we log the changed state and end the console group.
    let result
    console.groupCollapsed("dispatching", action.type)
    console.log('prev state', store.getState())
    console.log('action', action)

    result = next(action)
    console.log('next state', store.getState())
    console.groupEnd()
}

const saver = store => next => action => {
    // In the saver, we invoke next with the action, which will cause the state to change.
    // Then we save the new state in localStorage and return the result.
    let result = next(action)
    localStorage['redux-store'] = JSON.stringify(store.getState())
    return result
}

const storeFactory = (initialState=stateData) =>
    applyMiddleware(logger, saver)(createStore)(
        combineReducers({colors, sort}),
        (localStorage['redux-store']) ?
            JSON.parse(localStorage['redux-store']) : stateData
    )

// Instead of exporting the store directly, 
// we export a function, a factory that can be used to create stores. 
// If this factory is invoked, then it will create and 
// return a store that incorporates logging and saving.
export default storeFactory


// UPDATE APP - src/index.js


// Below, we create a store instance using the storeFactory. 
// Since we do not send any arguments to this store, 
// the initial state will come from state data.
import storeFactory from './store'

const store = storeFactory(true)

store.dispatch( addColor("#FFFFFF","Bright White") )
store.dispatch( addColor("#00FF00","Lawn") )
store.dispatch( addColor("#0000FF","Big Blue") )

// Every action dispatched from this store will add a new group of logs to the console,
// and the new state will be saved in localStorage.

// In this chapter, we looked at all of the key features of Redux: 
// state, actions, reducers, stores, action creators, and middleware. 
// We handled all of the state for our application with Redux, 
// and now we can wire it up to the user interface.


// In the next feature, we shall take a look at the react-redux framework, 
// a tool used to efficiently connect our Redux store to the React UI.
