import { createStore, combineReducers, applyMiddleware } from 'redux';
import { colors, sort } from './reducers';
import stateData from '../../data/initialState';


/**
 * Middleware
 * 
 * In Redux, middleware is defined as a higher-order function: 
 * it’s a function that returns a function that returns a function.
 * 
 * Middleware is composable using function composition. 
 * It is useful for logging actions, performing side effects like routing, 
 * or turning an asynchronous API call into a series of synchronous actions.
 * 
 * The logger and the saver (below) are middleware functions.
 * The last function returned is invoked every time an action is dispatched.
 * When this function is invoked, you have access to the action, 
 * the store, and the function for sending the action to the next middleware.
 */


const logger = store => next => action => {
    // In the logger, before an action is dispatched, 
    // we open a new console group and 
    // log the current state and the current action. 
    // Invoking next pipes the action on to 
    // the next piece of middleware and eventually the reducers. 
    // The state at this point has been updated, 
    // so we log the changed state and end the console group.
    let result;
    console.groupCollapsed('dispatching', action.type);
    console.log('previous state', store.getState());
    console.log('action', action);
    result = next(action);
    console.log('next state', store.getState());
    console.groupEnd();
    return result
};


const saver = store => next => action => {
    // In the saver, we invoke next with the action, 
    // which will cause the state to change.
    // Then we save the new state in localStorage and 
    // return the result.
    let result = next(action);
    localStorage['redux-store'] = JSON.stringify(store.getState());
    return result
};


/**
 * Factory
 * 
 * A factory is a function that manages the process of creating stores.
 * Below, we create a storeFactory which we shall use to 
 * create a store with middleware for logging and saving data. 
 * This storeFactory will be one file that contains one function that 
 * groups everything needed to create the store.
 */


const storeFactory = (initialState=stateData) => (
    // applyMiddleware: creates a store enhancer that 
    // applies middleware to the dispatch method of the Redux store. 
    // This is handy for a variety of tasks, 
    // such as expressing asynchronous actions in a concise manner, 
    // or logging every action payload.

    // createStore: is a store enhancer which is a higher-order function that 
    // composes a store creator to return a new, enhanced store creator. 
    // This is similar to middleware in that it allows you to alter the
    // store interface in a composable way.

    // combineReducers: combines all of the reducers into a single reducer. 
    // These reducers are used to build your state tree. 
    // The names of the fields match the names of the reducers that are passed in.
    // So as to create a single reducer tree, we combine the colors & sort reducers,
    // using the combineReducers() redux function.
    
    applyMiddleware(logger, saver)(createStore)(
        combineReducers({ colors, sort }),
        // Within the createStore function call, 
        // we see if a key exists e.g. ours is named: redux-store. 
        // If it exists, we’ll parse the JSON. 
        // If it doesn’t exist, we’ll return an initialState. 
        (localStorage['redux-store']) ?
            JSON.parse(localStorage['redux-store']) :
            initialState
    )
);

// Instead of exporting the store directly, 
// we export a function, a factory that can be used to create stores. 
// If invoked, this factory will create and return a 
// store that incorporates logging and saving.
export default storeFactory;
