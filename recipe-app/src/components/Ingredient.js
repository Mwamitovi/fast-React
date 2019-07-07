// Ingredient component, 
// defines ingredient's property and how to render
const Ingredient = ({ amount, measurement, name }) => (
    <li>
        <span className="amount">{amount}</span><br/>
        <span className="measurement">{measurement}</span><br/>
        <span className="name">{name}</span>
    </li>
)

Ingredient.displayName = 'Ingredient'

export default Ingredient