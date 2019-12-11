import fetch from 'isomorphic-fetch'

const parseResponse = response => response.json()

const logError = error => console.error(error)

const fetchThenDispatch = (dispatch, url, method, body) =>
  // Will be used to construct `thunks`
  // params: dispatch function, URL, HTTP request method and body
  fetch(
    url,
    {
      method,
      body,
      headers: { 'Content-Type': 'application/json' }
    }
  ).then(parseResponse)
    .then(dispatch)
    .catch(logError)

export const addColor = (title, color) => dispatch =>
  // params: title and hex color value are sent via POST
  // returns: ADD_COLOR action object, which is then parsed & dispatched
  fetchThenDispatch(
    dispatch,
    '/api/colors',
    'POST',
    JSON.stringify({ title, color })
  )

export const removeColor = id => dispatch =>
  // params: color id to be deleted via DELETE request
  // returns: REMOVE_COLOR action object, which is then parsed & dispatched
  fetchThenDispatch(
    dispatch,
    `/api/color/${id}`,
    'DELETE'
  )

export const rateColor = (id, rating) => dispatch =>
  // params: color id to be rated, and new rating via a PUT
  // returns: RATE_COLOR action object, which is then parsed as JSON & dispatched
  fetchThenDispatch(
    dispatch,
    `/api/color/${id}`,
    'PUT',
    JSON.stringify({ rating })
  )
