
/**
 * tick-tock
 * 
 * Our challenge is to build a ticking clock. 
 * The clock should display hours, minutes, seconds and time of day in civilian (normal) time.
 * Each field must always have double digits,
 * meaning leading zeros need to be applied to single digit values like 1 or 2. 
 * The clock must also tick and change the display every second.
 */

/**
 * -- Imperative approach --
 * 
 * Here, the comments help one understand what's happening. 
 * However, these functions are large and complicated. Each function does a lot. 
 * They are hard to comprehend, tough to maintain and require comments.
 */

// Log clock time every second
setInterval(logClockTime, 1000);

function logClockTime(){
    // get time string as civilian time
    var time = getClockTime();
    // clear the console and log the current time
    console.clear();
    console.log(time);
}

function getClockTime(){
    // get the current time
    var date = new Date();
    var time = "";
    // serialize clock time
    var time = {
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds(),
        ampm: "AM"
    }
    // convert to civilian time
    if(time.hours ==12){ 
        time.ampm = "PM"; 
    } else if(time.hours > 12){ 
        time.ampm = "PM"; 
        time.hours -= 12; 
    }
    // prepend a '0' on the hours to make double digits
    if(time.hours < 10){
        time.hours = "0" + time.hours;
    }
    // prepend a '0' on the minutes to make double digits
    if(time.minutes < 10){
        time.minutes = "0" + time.minutes;
    }
    // prepend a '0' on the seconds to make double digits
    if(time.seconds < 10){
        time.seconds = "0" + time.seconds;
    }
    // format the clock time as a string "hh:mm:ss tt"
    return time.hours + ":" + time.minutes + ":" + time.seconds + " " + time.ampm;
}
 

/**
 * -- Functional approach-- 
 * 
 * Following these three simple rules will help you stay functional:
 * // 1. Keep data immutable.
 * // 2. Keep functions pure — accept at least one argument, return data or another function.
 * // 3. Use recursion over looping (wherever possible).
 * 
 * So our goal is to break the application logic up into smaller parts, functions.
 * Each function will be focused on a single task, 
 * and we will compose them into larger functions so as to create the clock.
 */

/**
 * In functional programs, we should use functions over values wherever possible.
 * So first create some functions that return values and manage the console
 * We shall call these functions to obtain the values when needed.
 */

// function that returns one second
const oneSecond = () => 1000
// function that returns the current time
const getCurrentTime = () => new Date()
// function to clear the console
const clear = () => console.clear()
// function to log messages on the console
const log = message => console.log(message)

/**
 * Next, let's define some functions to transform our data.
 * These functions shall be utilized to mutate the Date() object
 * into an object that can be used for our clock.
 * Note that these functions transform data without changing the original.
 * They treat their arguments as immutable objects.
 */

// accepts argument, date object, and returns 
// an object for clock time having hours, minutes and seconds
const serializeClockTime = date => (
    {
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds()
    }
)

// accepts, clock time object, and returns
// an object where hours are converted into civilian time.
// for example: 1300 becomes 1 o'clock
const civilianHours = clockTime => (
    {
        ...clockTime,
        hours: (clockTime.hours > 12) ? clockTime.hours - 12 : clockTime.hours
    }
)

// accepts clock time object, 
// and appends time of the day, AM or Pm, to that object
const appendAMPM = clockTime => (
    {
        ...clockTime,
        ampm: (clockTime.hours >= 12) ? "PM" : "AM"
    }
)

/**
 * Next, we need some higher order functions.
 * These higher-order functions will be used to create other functions which shall
 * be reused to format the clock time for every tick. 
 * Both formatClock() and prependZero() will be called once, initially to set up a required template/key. 
 * The inner functions that they return will be invoked once every second to format the time for display.
 */

// accepts a target function, and returns a function which will
// send a time to the target. (Our target will be console.log)
const display = target => (
    time => target(time)
)

// accepts a template string, and uses it to return clock time formatted based upon
// the criteria from the string. (Our template is "hh:mm:ss tt")
// We replace those placeholders with actual values
const formatClock = format => (
    time => (
        format.replace('hh', time.hours)
              .replace('mm', time.minutes)
              .replace('ss', time.seconds)
              .replace('tt', time.ampm)
    )
)

// accepts an object's key, and prepends a zero to the value stored in that object's key.
// it takes in a key to a specific field and prepends values with a zero,
// if the value is less than 10
const prependZero = key => (
    clockTime => (
        {
            ...clockTime,
            [key]: (clockTime[key] < 10) ? "0" + clockTime[key] : clockTime[key]
        }
    )
)

