import { Component } from 'react'
import { v4 } from 'uuid'
/**
 * Color Organizer App (summary)
 * See branch: feature/color-organizer-app (detailed)
 * 
 * How to manage state within an app,
 * that allows users to add, name, rate, and remove colors in their customized lists.
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


/** 
 *Passing Properties down the Component Tree
 * 
 * All of the state data for every color is passed down the tree 
 * to child components as properties. 
 * When there is a change to the data in the root component, 
 * React will change the UI as efficiently as possible to reflect the new state.
 */


/**
 * App component 
 * We introduce State within the app, as initiated within this component.
 * In our color organizer, 
 * state consists of an array of colors that is declared in the App component. 
 * Those colors are passed down to the ColorList component as a property.
 */
// define App class
// class App extends Component {

//     constructor(props) {
//         super(props)
//         this.state = {
//             colors: []
//         }
//     }

//     render() {
//         const { colors } = this.state
//         return (
//             <div className="app">
//                 <AddColorForm />
//                 <ColorList colors={colors} />
//             </div>
//         )
//     }
// }

/**
 * ColorList component
 * Renders the color array, if there are any colors added.
 * Utilizes the Color component (below) to achieve this.
 */
// define the ColorList function
// const ColorList = ({ colors=[] }) => {
//     <div className="color-list">
//         {(colors.length === 0) ?
//             <p>No Colors listed yet. (Add a Color)</p> :
//             colors.map(
//                 color =>
//                     <Color key={color.id} {...color} />
//             )
//         }
//     </div>
// }


/**
 * Color component
 * Renders the color's title and HEX values.
 * Then passes the color's rating down to the StarRating component as a property.
 * The number of starsSelected in the star rating comes from each color’s rating.
 */
// define the Color function
// const Color = ({ title, color, rating=0 }) => {
//     <section className="color">
//         <h1>{title}</h1>
//         <div className="color" style={{ backgroundColor: color }}></div>
//         <div>
//             <StarRating starsSelected={rating} />
//         </div>
//     </section>
// }


/**
 * StarRating component
 * This is a presentational component - only concerned with how things look in the app.
 * All data is sent to this (presentational) component via properties, and
 * passed out of the component a via callback function.
 * Since this is a stateless functional component, when a user changes the rating, 
 * that data will be passed ouf of this component via a callback function.
 */
// For displaying the "stars"
const StarRating = ({ starsSelected=0, totalStars=5, onRate=f=>f }) => {
    <div className="star-rating">
        {[...Array(totalStars)].map(
            (n, i) => 
                <Star key={i} selected={i<starsSelected} onClick={()=>onRate(i+1)} />
        )}
        <p>{starsSelected} of {totalStars} stars</p>
    </div>
}


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
const Star = ({ selected=false, onClick=f=>f }) => {
    <div className={(selected) ? "star selected" : "star"} onClick={onClick}>
    </div>
}

Star.propTypes = {
    selected: PropTypes.bool,
    onClick: PropTypes.func
}


// REFACTORING...


/**
 * Passing Data Back Up the Component Tree
 * 
 * State in the color organizer can only be updated by 
 * calling setState() from the App component. 
 * If users initiate any changes from the UI, 
 * their input will need to be passed back up the component tree to 
 * the App component in order to update the state
 */


 /**
  * AddColorForm component
  * All new colors will be added to the color organizer using this component. 
  * The component has an optional callback function property called onNewColor(). 
  * When the user adds a new color and submits the form, 
  * the onNewColor() callback function is invoked with the 
  * new title and color hex value obtained from the user.
  * 
  * In this stateless functional component, 
  * refs are set with a callback function instead of a string. 
  * The callback function passes the element’s instance as an argument. 
  * This instance can be captured and saved into a local variable like _title or _color. 
  * Once we’ve saved the refs to local variables, they are easily accessed when the form is submitted.
  */
// Define AddColorForm
const AddColorForm = ({onNewColor=f=>f}) => {
    let _title, _color
    const submit = e => {
        e.preventDefault()
        onNewColor(_title.value, _color.value)
        _title.value = ''
        _color.value = '#000000'
        _title.focus()
    }
    return (
        <form onSubmit={submit}>
            <input ref={input => _title = input} 
                type="text" placeholder="color title..." required/>
            <input ref={input => _color = input} 
                type="color" required/>
            <button>ADD</button>
        </form>
    )
}


/**
 * App Component - refactored to receive data back
 * All new colors can be added from the addColor() method in the App component. 
 * This function is bound to the component in the constructor, 
 * which means that it has access to this.state and this.setState.
 * 
 * New colors are added by concatenating the current colors array with a new color object. 
 * The ID for the new color object is set using uuid’s v4 function,
 * which creates a unique identifier for each color. 
 * The title and color are passed to the addColor method from the AddColorForm component. 
 * Finally, the initial value for each color’s rating will be 0.
 * 
 * When the user adds a color with the AddColorForm component, 
 * the addColor method updates the state with a new list of colors. 
 * Once the state has been updated, 
 * the App component rerenders the component tree with the new list of colors. 
 * The render method is invoked after every setState call. 
 * The new data is passed down the tree as properties and is used to construct the UI.
 * 
 */
// Refactor the App Component
export class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            colors: []
        }
        this.addColor = this.addColor.bind(this)
    }

    addColor(title, color) {
        const colors = [
            ...this.state.colors,
            {
                id: v4(),
                title,
                color,
                rating = 0
            }
        ]
        this.setState({colors})
    }

    render() {
        const { addColor } = this
        const { colors } = this.state
        return (
            <div className="app">
                <AddColorForm onNewColor={addColor} />
                <ColorList colors={colors} />            
            </div>
        )
    }
}


/**
 * Color component - refactored to include more methods
 * If the user wishes to rate or remove a color, 
 * we need to collect information about that color. 
 * Each color will have a remove button: 
 * if the user clicks the remove button, we’ll know they wish to remove that color. 
 * Also, if the user changes the color’s rating with the StarRating component, 
 * we want to change the rating of that color.
 */
// Refactor the Color component
const Color = ({ title, color, rating=0, onRemove=f=>f, onRate=f=>f }) => {
    <section className="color">
        <h1>{title}</h1>
        <button onClick={onRemove}>X</button>
        <div className="color" style={{ backgroundColor: color }}></div>
        <div>
            <StarRating starsSelected={rating} onRate={onRate} />
        </div>
    </section>
}

/**
 * ColorList component - refactored to include more methods
 * The information that will change in this app is stored in the list of colors. 
 * Thus, onRemove() and onRate() callback properties will have to be added 
 * to each color to pass those events back up the tree. 
 * The Color component will also have onRate and onRemove callback function properties. 
 * When colors are rated or removed, the ColorList component will need to notify its parent, 
 * the App component, that the color should be rated or removed.
 */
// Refactor the ColorList component
const ColorList = ({ colors=[], onRate=f=>f, onRemove=f=>f}) => {
    <div className="color-list">
        {(colors.length === 0) ?
            <p>No Colors listed. (Add a color)</p> :
            colors.map(
                color => <Color key={color.id}
                            {...color}
                            onRate={(rating) => onRate(color.id, rating)}
                            oRemove={() => onRemove(color.id)}
                          />

            )
        }
    </div>
}