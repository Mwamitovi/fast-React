import PropTypes from 'prop-types'
import Color from './Color'
import '../../stylesheets/ColorList.scss'


// we map over the array of colors, and display a list of colors
const ColorList = ({ colors=[], onRate=f=>f, onRemove=f=>f }) => (
    <div className="color-list">
        {(colors.length === 0) ?
            <p>No Colors Listed yet. (Please add a Color)</p> :
            colors.map(color =>
                <Color key={color.id}
                       {...color}
                       onRate={(rating) => onRate(color.id, rating)}
                       onRemove={() => onRemove(color.id)} />
            )
        }
    </div>
)

ColorList.propTypes = {
    colors: PropTypes.array,
    onRate: PropTypes.func,
    onRemove: PropTypes.func
}

export default ColorList
