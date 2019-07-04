
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
 * App component 
 * We introduce State within the app, as initiated within this component.
 * In our color organizer, 
 * state consists of an array of colors that is declared in the App component. 
 * Those colors are passed down to the ColorList component as a property.
 */
// define App class
class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            colors: []
        }
    }

    render() {
        const { colors } = this.state
        return (
            <div className="app">
                <AddColorForm />
                <ColorList colors={colors} />
            </div>
        )
    }
}

/**
 * ColorList component
 * Renders the color array, if there are any colors added.
 * Utilizes the Color component (below) to achieve this.
 */
// define the ColorList function
const ColorList = ({ colors=[] }) => (
    <div className="color-list">
        {(colors.length === 0) ?
            <p>No Colors listed yet. (Add a Color)</p> :
            colors.map(
                color =>
                    <Color key={color.id} {...color} />
            )
        }
    </div>
)


/**
 * Color component
 * Renders the color's title and HEX values.
 * Then passes the color's rating down to the StarRating component as a property.
 * The number of starsSelected in the star rating comes from each color’s rating.
 */
// define the Color function
const Color = ({ title, color, rating=0 }) => (
    <section className="color">
        <h1>{title}</h1>
        <div className="color" style={{ backgroundColor: color }}></div>
        <div>
            <StarRating starsSelected={rating} />
        </div>
    </section>
)


/**
 * StarRating component
 * This is a presentational component - only concerned with how things look in the app.
 * All data is sent to this (presentational) component via properties, and
 * passed out of the component a via callback function.
 * Since this is a stateless functional component, when a user changes the rating, 
 * that data will be passed ouf of this component via a callback function.
 */
// For displaying the "stars"
const StarRating = ({ starsSelected=0, totalStars=5, onRate=f=>f }) => (
    <div className="star-rating">
        {[...Array(totalStars)].map(
            (n, i) => 
                <Star key={i} selected={i<starsSelected} onClick={()=>onRate(i+1)} />
        )}
        <p>{starsSelected} of {totalStars} stars</p>
    </div>
)


/**
 * Star Component
 * A stateless functional component that represents each star.
 * Stateless functional components are meant to be the children of more complex, stateful components.
 * This needs to be a clickable Star component that has a selected property.
 * When a user clicks on any star <div, the onClick() property will be invoked. 
 * This will tell the parent component, the StarRating, that a Star has been clicked.
 * If the star is selected, it will additionally add the class 'selected'.
 */

// Define the Star
const Star = ({ selected=false, onClick=f=>f }) => (
    <div className={(selected) ? "star selected" : "star"} onClick={onClick}>
    </div>
)

Star.propTypes = {
    selected: PropTypes.bool,
    onClick: PropTypes.func
}


// Passing Data Back Up the Component Tree

