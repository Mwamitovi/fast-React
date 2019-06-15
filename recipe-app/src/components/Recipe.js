import IngredientsList from './IngredientsList'
import Instructions from './Instructions'

// Recipe component,
// accepts arguments, and renders an individual Recipe
const Recipe = ({ name, ingredients, steps }) => (
    <section id={name.toLowerCase().replace(/ /g, '-')}>
        <h1>{name}</h1>
        <IngredientsList list={ingredients} />
        <Instructions title="Cooking Instructions" steps={steps} />
    </section>
)

Recipe.displayName = 'Recipe'

export default Recipe