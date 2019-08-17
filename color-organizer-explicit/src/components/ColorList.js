import PropTypes from 'prop-types';
import Color from './Color';
import { rateColor, removeColor } from '../actions';
import { sortFunction } from '../lib/array-helpers'
import '../../stylesheets/ColorList.scss';


// we map over the array of colors, and display a list of colors
const ColorList = ({ store }) => {
    const { colors, sort } = store.getState();
    const sortedColors = [...colors].sort(sortFunction(sort));

    return (
        <div className="color-list">
        {(colors.length === 0) ?
            <p>No Colors Listed yet. (Please add a Color)</p> :
            sortedColors.map(color =>
                <Color key={color.id}
                    {...color}
                    onRate={(rating) => store.dispatch( rateColor(color.id, rating) )}
                    onRemove={() => store.dispatch( removeColor(color.id) )} 
                />
            )
        }
        </div>
    )
};

ColorList.propTypes = {
    store: PropTypes.object
};

export default ColorList;
