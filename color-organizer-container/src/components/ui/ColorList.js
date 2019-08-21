import PropTypes from 'prop-types';
import Color from './Color';
import '../../../stylesheets/ColorList.scss';


// we map over the array of colors, and display a list of colors
const ColorList = ({ colors=[] }) => (
    // We just render the Color component
    // All state updates are handled within the Color component directly. 
    <div className="color-list">
        {(colors.length === 0) ?
            <p>No Colors Listed yet. (Please add a Color)</p> :
            colors.map(color =>
                <Color key={color.id} {...color} />
            )
        }
    </div>
);

ColorList.propTypes = {
    colors: PropTypes.array
};

export default ColorList;
