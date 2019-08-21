import { Component } from 'react';
import PropTypes from 'prop-types';
import StarRating from './StarRating';
import TimeAgo from './TimeAgo';
import FaTrash from 'react-icons/lib/fa/trash-o';
import { rateColor, removeColor } from '../../actions';
import '../../../stylesheets/Color.scss';


class Color extends Component {
    // The Color component can retrieve the store and 
    // dispatch RATE_COLOR and REMOVE_COLOR actions directly.
    render() {
        const { id, title, color, rating, timestamp } = this.props;
        const { store } = this.context;
        return (
            <section className="color" style={this.style}>
                <h1 ref="title">{title}</h1>
                <button onClick={() => store.dispatch(removeColor(id) )}>
                    <FaTrash />
                </button>
                <div className="color" style={{ backgroundColor: color }}></div>
                <TimeAgo timestamp={timestamp} />
                <div>
                    <StarRating starsSelected={rating} 
                        onRate={rating => store.dispatch(rateColor(id, rating) )} 
                    />
                </div>
            </section>
        )
    }
};

Color.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    rating: PropTypes.number
};

Color.defaultProps = {
    rating: 0
};

Color.contextTypes = {
    store: PropTypes.object
};

export default Color;
