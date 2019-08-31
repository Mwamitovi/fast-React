/**
 * Color Organizer Advanced (summary)
 * See branch: feature/react-router (detailed)
 * 
 */


// Router Parameters


// Another useful feature of the React Router is the ability to set up routing parameters.
// Routing parameters are variables that obtain their values from the URL. 
// They are extremely useful in data-driven web applications for 
// filtering content or managing display preferences.


/**
 * Adding Color Details Page
 * 
 * Let’s improve the color organizer by adding the ability to 
 * select and display one color at a time using the React Router. 
 * When a user selects a color by clicking on it, 
 * the app should render that color and display its title and hex value.
 * Every color has a unique ID. 
 * This ID can be used to find specific colors that are saved in state. 
 * For example, we can create a findById function that will 
 * find an object in an array by the id field.
 */

import { compose } from 'redux';


export const getFirstArrayItem = array => array[0];


export const filterArrayById = (array, id) =>
    array.filter(item => item.id === id)


export const findById = compose(
    getFirstArrayItem, 
    filterArrayById
)


/**
 * This findById function follows the functional programming techniques discussed earlier. 
 * We can see that the findById method first filters the array by the ID and
 * then returns the first item found in that filtered array. 
 * 
 * We can use the findById function to locate colors in state by their unique IDs.
 * Using the router, we can obtain the color ID via the URL. 
 * For example, this is the URL that we will use to 
 * display the color “Lawn” because the ID for 
 * the color lawn is being passed within the URL:
 * http://localhost:3000/#/58d9caee-6ea6-4d7b-9984-65b145031979
 */


// Router parameters allow us to capture this value. 
// They can be defined in routes using a semicolon. 
// For example, we could capture the unique id and 
// save it in a parameter named id with the Route.

// <Route exact path="/:id" component={UniqueIDHeader} />

// The UniqueIDHeader component can obtain the id from the match.params object.

const UniqueIDHeader = ({ match }) => <h1>{match.params.id}</h1>

// We can create parameters any time we want to collect data from the URL. 


// Lets create a ColorDetails component that 
// will be rendered when the user selects a single color.

const ColorDetails = ({ title, color }) => (
    /**
     * The ColorDetails component is a presentation component.
     * It expects properties for the color’s details. 
     * Since we are using Redux, 
     * we will need to add a new container that can find the
     * selected color in state using a routing parameter.
     */
    <div className="color-details" style={{backgroundColor: color}}>
        <h1>{title}</h1>
        <h1>{color}</h1>
    </div>
);


export const Color = connect(
    /**
     * The Color container is created using the connect HOC.
     * The first argument is a function that is used to set the 
     * properties of the ColorDetails based on a single color from state.
     * 
     * Using the findById function that we defined earlier in this section,
     * we will locate an individual color object in state with an id parameter that 
     * is obtained from the URL.
     * 
     * The connect HOC will map the data from the 
     * located color object to the properties of the ColorDetails component.
     * The connect HOC also maps any properties sent to the Color container to 
     * the ColorDetails component.
     * 
     * This means that all of the router properties will be 
     * passed to ColorDetails as well. 
     */  
    (state, props) => findById(state.colors, props.match.params.id)
)(ColorDetails)


// Let’s add some navigation to the ColorDetails component using 
// the router’s history property.


const ColorDetails = ({ title, color, history }) => (
    // When users click the div.color-details element, 
    // the history.goBack() method will be invoked. 
    // The user will be navigated back to the previous location.
    // Now that we have a Color container, we need to add it to our app.    
    <div className="color-details" style={{backgroundColor: color}}
        onClick={() => history.goBack()}>
        <h1>{title}</h1>
        <h1>{color}</h1>
    </div>
);

 
// First, we will need to wrap the App component with a HashRouter when it is initially rendered.

import { HashRouter } from 'react-router-dom';

// Other...
render(
    <Provider store={store}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>, document.getElementById('react-container')
);


// Now we are ready to configure routes anywhere within our application. 
// Let’s add some routes to the App component.

import { Route, Switch } from 'react-router-dom';
import Menu from './ui/Menu';
import { Colors, Color, NewColor } from './containers';
import '../stylesheets/APP.scss';


const App = () => (
    // The Switch component is used to render one of two routes: 
    // an individual color, or the main app components. 
    // The first Route renders the Color component when an id is passed in a URL. 
    // For instance, this route will match when the location is:
    // http://localhost:3000/#/58d9caee-6ea6-4d7b-9984-65b145031979
    // Any other location will match / and display the main application components. 
    // The second Route groups several components under 
    // a new anonymous stateless functional component. 
    // As a result, users will either see an individual color or 
    // a list of colors, depending upon the URL.    

    <Switch>
        <Route exact path="/:id" component={Color} />
        <Route path="/" component={() => (
            <div className="app">
                <Menu />
                <NewColor />
                <Colors />
            </div>
        )} />
    </Switch>
);

export default App;


// For now, we can test our app by adding the id parameter directly to the browser’s location bar.
// However, users will need a way to navigate to the details view as well.
// This time, the NavLink component will not be used to handle the 
// navigation from the list of colors to a color’s details. 

// Instead, we will navigate by directly using the router’s history object.
// Let’s add navigation to the Color component found in the ./ui folder. 

// This component is rendered by the ColorList. 
// It does not receive routing properties from the Route.
// You could explicitly pass those properties all the way down the tree to the Color component,
// but it’s easier to use the withRouter() function. 
// This ships with react-router-dom.

// withRouter can be used to add routing properties to 
// any component that is rendered somewhere under a Route.
// Using withRouter(), we can obtain the router’s history object as a property. 
// We can use it to navigate from within the Color component.

import { withRouter } from 'react-router';

// Other
class Color extends Component {
    // Navigation is obtained by using the history object directly. 
    // When a user clicks the color title or the color itself, 
    // a new route is pushed into the history object. 
    // This new route is a string that contains the color’s id. 
    // Pushing this route into history will cause the navigation to occur.
    render() {
        const { id, title, color, rating, timestamp, onRemove, onRate, history } = this.props
        return (
            <section className="color" style={this.style}>
                <h1 ref="title" onClick={() => history.push(`/${id}`)}>
                    {title}
                </h1>
                <button onClick={onRemove}>
                    <FaTrash />
                </button>
                <div className="color" onClick={() => history.push(`/${id}`)} 
                    style={{ backgroundColor: color }}>
                </div>
                <TimeAgo timestamp={timestamp} />
                <div>
                    <StarRating starsSelected={rating} onRate={onRate}/>
                </div>
            </section>
        )
    }
};

// withRouter() is an HOC.
// When we export the Color component, 
// we send it to withRouter() which wraps it with a component that 
// passes the router properties: match, history, and location.
export default withRouter(Color);


// Moving Color Sort State to Router


/**
 * You do not have to limit the use of Router parameters.
 * 
 * They can be more than filters for looking up specific data in state.
 * They can also be used to obtain information necessary for rendering the UI.
 * The Redux store presently contains the information about 
 * how the colors should be sorted in state via the sort property.
 * 
 * Would it make sense to move this variable from the Redux store to a route parameter?
 * The variable itself is not data; 
 * it provides info about how the data should be presented.
 * The sort variable is a string, which also makes it an ideal candidate for a route parameter.
 * 
 * Finally, we want our users to be able to send the sort state to other users in a link.
 * If they prefer to have the colors sorted by rating,
 * they can send that info to other users in a link,
 * or bookmark that content as is in the browser.
 * Let’s move the sort state of the color wall to a route parameter.
 * These are the routes that we will use to sort our colors.
 * 
 *      /#/ default
 *          Sort by date
 *      /#/sort/title
 *          Sort by title
 *      /#/sort/rating
 *          Sort by rating
 * 
 * First, we need to remove the sort reducer from 
 * the ./store/index.js file; we no longer need it.
 *  
 * As a result: 
 *      combineReducers({colors, sort})
 * becomes:
 *      combineReducers({colors})
 * 
 * Removing the reducer means that the 
 * state variable will no longer be managed by Redux.
 * 
 * Next, we can also remove the container for 
 * the Menu component from ./src/components/containers.js. 
 * The container is used to link the state of the 
 * Redux store to the Menu presentation component. 
 * Sort is no longer stored in state, so we no longer need a container.
 * 
 * Additionally, in the containers.js file, we need to change the Colors container. 
 * It will no longer receive the sort value from state. 
 * Instead, it will receive sorting instructions as a 
 * route parameter that is passed to the Color component inside of the match property.
 */

export const Colors = connect(
    ({colors}, {match}) => ({ 
        colors: sortColors(colors, match.params.sort) 
    }),
    dispatch => ({
        onRemove(id) { dispatch(removeColor(id)) },
        onRate(id, rating) { dispatch(rateColor(id, rating)) }
    })
    // Now the colors are being sorted via a routing parameter before 
    // they are passed to the ColorList as a property.
)(ColorList)


// Next, we need to replace the Menu component with one that 
// contains links to our new routes. 
// Much like the About menu that we created earlier in this chapter, 
// the visual state of the menu will be controlled by 
// setting the activeStyle property of the NavLink.

import { NavLink } from 'react-router-dom';


const selectedStyle = { color: 'red' };

const Menu = ({ match }) => (
    <nav className="menu">
        <NavLink to="/" style={match.isExact && selectedStyle}>
            date
        </NavLink>
        <NavLink to="/sort/title" activeStyle={selectedStyle}>
            title
        </NavLink>
        <NavLink to="/sort/rating" activeStyle={selectedStyle}>
            rating
        </NavLink>
    </nav>
);

export default Menu;


// Now users can sort the colors via the URL. 
// When there is not a sort parameter available, the colors will be sorted by date. 
// This menu will change the color of the link to indicate to the user how the data has been sorted.
// We need to modify the App component. 
// We need to handle sorting the colors via routes.


const App = () => (
    /**
     * First, the Menu needs the match property, so we render the Menu with a Route. 
     * The Menu will always render alongside the NewColor form and 
     * the list of colors because the Route does not have a path.
     * 
     * After the NewColor component, we want to display either the default list of colors,
     * sorted by default, or the list of colors sorted by a parameter. 
     * These routes are wrapped in the Switch component to ensure that 
     * we only render one Colors container.
     * 
     * When users navigate to the home route, http://localhost:3000, 
     * the App component is rendered. 
     * By default, the Colors container is rendered within the App. 
     * The value of the sort parameter is undefined, so the colors are sorted by default.
     * 
     * If the user navigates to http://localhost:3000/sort/rating, 
     * the Colors container will also be rendered, 
     * but this time the sort parameter should have a value, 
     * and the colors should be sorted by that value. 
     */
    
    <Switch>
        <Route exact path="/:id" component={Color} />
        <Route path="/"component={() => (
            <div className="app">
                <Route component={Menu} />
                <NewColor />
                <Switch>
                    <Route exact path="/" component={Colors} />
                    <Route path="/sort/:sort" component={Colors} />
                </Switch>
            </div>
        )} />
    </Switch>
);


// Routing parameters are an ideal tool to obtain data that 
// affects the presentation of your user interface. 
// However, they should only be used when you want users to 
// capture these details in a URL. 

// For example, in the case of the color organizer, 
// users can send other users links to specific colors or 
// all the colors sorted by a specific field.
// Users can also bookmark those links to return specific data. 

// If you want your users to save information about the presentation in a URL, 
// then a routing parameter is your solution.

// In this chapter, we reviewed the basic usage of the React Router. 
// All of the examples in this chapter incorporated the HashRouter. 
// In the next chapter, we will continue to use the router both on 
// the client and the server with the BrowserRouter, and 
// we’ll use the StaticRouter to render the current routing context on the server.
