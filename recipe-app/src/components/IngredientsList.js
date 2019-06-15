import Ingredient from './Ingredient'

// IngredientsList component,
// accepts an array, and returns a new array with <li>
export const IngredientsList = ({ list }) => (
    <ul className="ingredients">
        {list.map((ingredient, i) => 
            <Ingredient key={i} {...ingredient} />
        )}
    </ul>
)

IngredientsList.displayName = 'IngredientsList'

export default IngredientsList