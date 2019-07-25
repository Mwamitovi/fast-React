import { Component } from 'react'
import PropTypes from 'prop-types'
import StarRating from './StarRating'
import '../../stylesheets/Color.scss'


class Color extends Component {

    componentWillMount() {
        this.style = { backgroundColor: '#CCC' }
    }

    componentWillUpdate() {
        this.style = null
    }

    render() {
        const { title, color, rating, onRate } = this.props
        return (
            <section className="color" style={this.style}>
                <h1 ref="title">{title}</h1>
                <div className="color" style={{ backgroundColor: color }}></div>
                <div>
                    <StarRating starsSelected={rating} onRate={onRate} />
                </div>
            </section>
        )
    }
}

Color.propTypes = {
    title: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    rating: PropTypes.number,
    onRate: PropTypes.func
}

Color.defaultProps = {
    title: undefined,
    rating: 0,
    color: "#000000",
    onRate: f=>f
}

export default Color
