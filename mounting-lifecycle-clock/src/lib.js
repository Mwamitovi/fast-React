
// Every second equals a thousand milliseconds
const oneSecond = () => 1000
// return an instance of Date function
const getCurrentTime = () => new Date()


export const abstractClockTime = date => ({
    // accepts date object
    // returns an object for clock time, 
    // with hours, minutes and seconds
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds()
})


export const civilianHours = clockTime => ({
    // accepts clock time object
    // returns an object where hours are converted to civilian time
    // e.g 1300 becomes 1 o'clock
    ...clockTime,
    hours: (clockTime.hours > 12) ?
             clockTime.hours - 12 :
             clockTime.hours
})


export const appendAMPM = clockTime => ({
    // accepts the clock time object
    // returns a time of the day object appended with, AM or PM
    ...clockTime,
    ampm: (clockTime.hours >= 12) ? 'pm' : 'am'
})


export const prependZero = key => clockTime => ({
    // accepts an object's key 
    // returns the value stored under that object's key with a prepended zero.
    // It takes in a key specific field and prepends values with 
    // a zero if the value is less than 10.
    ...clockTime,
    [key]: (clockTime[key] < 10) ?
            '0' + clockTime[key] :
            clockTime[key]
})


/**
 * Compose()
 * 
 * A higher-order function - takes functions as params, returns a single value
 * @param  {...any} fns 
 * 
 * In this case '...' is used to turn our function params into an array called fns.
 * A function is the returned that expects one argument, arg.
 * 
 * When this function is invoked, the fns array is piped starting with
 * the argument we want to send through the function.
 * 
 * The argument becomes the initial value for composed and
 * then each iteration of the reduced callback returns. 
 * Notice that the callback takes two arguments: composed and a function f. 
 * Each function is invoked with compose which is the result of 
 * the previous functions output. 
 * 
 * Eventually, the last function will be invoked and the last result returned.
 * This function becomes more complex when it is time to 
 * handle more than one argument or deal with arguments that are not functions.
 */
export const compose = (...fns) => (
    (arg) =>
        fns.reduce(
            (composed, f) => f(composed),
            arg
        )
)

export const convertToCivilianTime = clockTime =>
    // aceepts clocktime object and transforms it
    // into civilian time by using both civilian hours.
    compose(
        appendAMPM,
        civilianHours
    )(clockTime)


export const doubleDigits = civilianTime =>
    // accepts clocktime object and 
    // make sure the hours, minutes, and seconds
    // display double digits by prepending zeros where necessary
    compose(
        prependZero("hours"),
        prependZero("minutes"),
        prependZero("seconds")
    )(civilianTime)


export const getClockTime = compose(
    // composes function to return a single value
    getCurrentTime,
    abstractClockTime,
    convertToCivilianTime,
    appendAMPM,
    doubleDigits
)
