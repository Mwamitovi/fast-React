
/**
 * Recipe application
 * 
 * Using ES6 and JSX to develop an app,
 * which simply displays ingredients and some cooking instructions.
 * We can create a UI for these recipes with two components: 
 * // - a Menu component for listing the recipes, and
 * // - a Recipe component that describes the UI for each recipe. 
 * 
 * It’s the Menu component that we will render to the DOM. 
 * We shall pass our data to the Menu component as a property called `recipes`.
 */

/**
 * Representational state of our app * 
 * Our data is expressed in an array of two JavaScript objects.
 * Each object contains the name of the recipe,
 * a list of the ingredients required,
 * and a list of steps necessary to cook the recipe.
 */
// The data, an array of objects
const data = [
    {
        "name": "Baked Salmon",
        "ingredients": [
            { "name": "Salmon", "amount": 1, "measurement": "l lb" },
            { "name": "Pine Nuts", "amount": 1, "measurement": "cup" },
            { "name": "Butter Lettuce", "amount": 2, "measurement": "cups" },
            { "name": "Yellow Squash", "amount": 1, "measurement": "med" },
            { "name": "Olive Oil", "amount": 0.5, "measurement": "cup" },
            { "name": "Garlic", "amount": 3, "measurement": "cloves" }
        ],
        "steps": [
            "Preheat the oven to 350 degrees.",
            "Spread the olive oil around a glass baking dish.",
            "Add the salmon, garlic, and pine nuts to the dish.",
            "Bake for 15 minutes.",
            "Add the yellow squash and put back in the oven for 30 mins.",
            "Remove from oven and let cool for 15 minutes. Add the lettuce and serve."
        ]
    },
    {
        "name": "Fish Tacos",
        "ingredients": [
            { "name": "Whitefish", "amount": 1, "measurement": "l lb" },
            { "name": "Cheese", "amount": 1, "measurement": "cup" },
            { "name": "Iceberg Lettuce", "amount": 2, "measurement": "cups" },
            { "name": "Tomatoes", "amount": 2, "measurement": "large"},
            { "name": "Tortillas", "amount": 3, "measurement": "med" }
        ],
        "steps": [
            "Cook the fish on the grill until hot.",
            "Place the fish on the 3 tortillas.",
            "Top them with lettuce, tomatoes, and cheese."
        ]
    }
]

/**
 * Recipe component
 * This is a stateless functional component, expressed as JSX.
 * Each recipe has a string for the name, an array of objects for ingredients, 
 * and an array of strings for the steps.
 * 
 * Using ES6 object destructuring, 
 * we set this component to locally scope those fields by name so we can 
 * access them directly without having to use props.name, or props.ingredients, props.steps.
 * We set "id" the root <section> element, 
 * by converting the recipe’s name to a lowercase string and globally replace spaces with dashes.
 * Thus “Baked Salmon” becomes “baked-salmon”, then used as the id attribute in our UI.
 * Then use javascript expressions to map each ingredient/step to be displayed.
 * Remember map() is returning an array of child elements.
 */
// For an individual Recipe
const Recipe = ({ name, ingredients, steps }) => (
    <section id={name.toLowerCase().replace(/ /g, "-")}>
      <h1>{name}</h1>
      <ul className="ingredients">
        {ingredients.map(
            (ingredient, i) => <li key={i}>{ingredient.name}</li>
        )}
      </ul>
      <section className="instructions">
      <h2>Cooking Instructions</h2>
        {steps.map(
            (step, i) => <p key={i}>{step}</p>
        )}
      </section>
    </section>
)

/**
 * Menu Component
 * This is also a stateless function component, expressed as JSX.
 * Everything is contained within an article element. 
 * A header, <h1>, and `div.recipes` elements are used to describe the DOM for our menu.
 * 
 * We use the JSX spread operator (...) and object destructuring too here.
 * (...) adds each field of the recipe object, as a property of the Recipe component,
 * so it helps us avoid calling name, ingredients and stesps directly.
 * While object destructuring helps us call title and recipes directly, without `props`
 */
// For the Menu of Recipes
const Menu = ({ title, recipes }) => (
    <article>
      <header>
        <h1>{title}</h1>
      </header>
      <div className="recipes">
        {recipes.map(
            (recipe, i) => <Recipe key={i} {...recipe} />
        )}
      </div>
    </article>
)

/**
 * 
 */
// A call to ReactDOM to render our Menu into the current DOM
ReactDOM.render(
    <Menu recipes={data} title="Delicious Recipes" />,
    document.getElementById("react-container")
)
