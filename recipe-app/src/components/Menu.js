import Recipe from './Recipe'
import '../../stylesheets/Menu.css'

// Menu component,
// accepts an array, returns a new array within <div>
const Menu = ({ recipes }) => (
    <article>
        <header>
            <h1>Delicious Recipes</h1>
        </header>
        <div className="recipes">
            {recipes.map((recipe, i) =>
                <Recipe key={i} {...recipe} />
            )}
        </div>
    </article>
)

Menu.displayName = 'Menu'

export default Menu