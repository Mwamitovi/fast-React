import C from '../constants'


/** 
 * Reducers 
 * 
 * These often use switch loops to process different types of actions.
 * Reducers should be predictable. They are used to simply manage the state data. 
 * Generating random data, calling APIs, and other asynchronous processes
 * should be handled outside of reducers. 
 * Avoiding state mutations and 
 * side effects is always recommended.
 */


export const color = (state = {}, action) => {
  // The color reducer is a function that 
  // creates a new object or rates an existing one.
  // Note that one action object can impact several reducers.
  switch (action.type) {
    case C.ADD_COLOR:
      // ADD_COLOR returns a new color object constructed 
      // from the action’s payload data.    
      return {
        id: action.id,
        title: action.title,
        color: action.color,
        timestamp: action.timestamp,
        rating: 0
      }
    case C.RATE_COLOR:
      // RATE_COLOR returns a new color object with the desired rating. 
      // We use the ES7 object spread operator to assign the 
      // value of the current state to a new object.
      // Note that RATE_COLOR action passes an ID that’s not used by the color reducer,
      // because the ID of this action is used to locate the
      // color in an entirely different reducer (colors).
      return {
        ...state,
        rating: action.rating
      }
    default:
      // If for some reason the color reducer is invoked with an unrecognized action, 
      // we will return the current state: the default case.
      return state
  }
}


export const colors = (state = [], action) => {
  // The colors reducer handles any actions for 
  // adding, rating, and removing colors.   
  switch (action.type) {
    case C.ADD_COLOR:
      // ADD_COLOR, here, 
      // creates a new array by concatenating all of 
      // the values of the existing state array with a new color object. 
      // The new color is created by passing a blank state object
      // and the action to the ``color`` reducer.
      return [
        ...state,
        color({}, action)
      ]
    case C.RATE_COLOR:
      // RATE_COLOR, here, 
      // returns a new array of colors with the desired color rated. 
      // The colors reducer locates the color to be rated within 
      // the current state array, using the map().
      // It then uses the color reducer to obtain the 
      // newly rated color object and replaces it in the array.
      return state.map(
        c => color(c, action)
      )
    case C.REMOVE_COLOR:
      // REMOVE_COLOR, here,
      // creates a new array by filtering out the desired color to remove.
      return state.filter(
        c => c.id !== action.id
      )
    default:
      return state
  }
}


export const sort = (state = 'SORTED_BY_DATE', action) => {
  // The sort reducer is used to change the sort state variable.
  // It sets the sort state to the value of the action’s sortBy field 
  // (if this is not a state provided, it will return SORTED_BY_DATE).
  switch (action.type) {
    case C.SORT_COLORS:
      return action.sortBy
    default:
      return state
  }
}
