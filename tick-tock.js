
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
 * Imperative approach
 */

// Log clock time every second
setInterval(logClockTime, 1000);

function logClockTIme(){
    // get time string as civilian time
    var time = getClockTime();
    // clear the console and log the current time
    console.clear();
    console.log(time);
}


 