
/**
 * Color Organizer App (summary)
 * See branch: feature/color-organizer-app (detailed)
 * 
 * How to manage state within an app,
 * that allows users to add, name, rate, and remove colors in their customized lists.
 * .
 */

/**
 * Representational state of our app * 
 * The entire state of the color organizer can be represented with a single array.
 * This array describes three colors: ocean at dusk, lawn, and bright red. 
 * It gives us the colors’ hex values and the current rating for each color. 
 * It also provides a way to uniquely identify each color.
 * 
 * This state data will drive our application. It's our "single source of truth".
 * It will be used to construct the UI every time this object changes. 
 * When users add or remove colors, they will be added to or removed from this array.
 * When users rate colors, their ratings will change in the array.
 */
// The colors, an array of objects
{
    colors: [
        {
            "id": "0175d1f0-a8c6-41bf-8d02-df5734d829a4",
            "title": "ocean at dusk",
            "color": "#00c4e2",
            "rating": 5
        },
        {
            "id": "83c7ba2f-7392-4d7d-9e23-35adbe186046",
            "title": "lawn",
            "color": "#26ac56",
            "rating": 3
        },
        {
            "id": "a11e3995-b0bd-4d58-8c48-5e49ae7f7f23",
            "title": "bright red",
            "color": "#ff0000",
            "rating": 0
        }
    ]
}


// Passing Properties down the Component Tree


/**
 * StarRating component
 * This is a presentational component - only concerned with how things look in the app.
 * All data is sent to this (presentational) component via properties, and
 * passed out of the component a via callback function.
 * Since this is a stateless functional component, when a user changes the rating, 
 * that data will be passed ouf of this component via a callback function.
 */
// For displaying the "stars"
const StarRating = ({ starSelected=0, totalStars=5, onRate=f=>f }) => (
    <div className="star-rating">
        {[...Array(totalStars)].map(
            (n, i) => 
                <Star key={i} selected={i<starSelected} onClick={()=>onRate(i+1)} />
        )}
        <p>{starSelected} of {totalStars} stars</p>
    </div>
)
