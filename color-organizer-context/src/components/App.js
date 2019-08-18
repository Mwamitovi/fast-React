import { Component } from 'react';
import PropTypes from 'prop-types';
import AddColorForm from './AddColorForm';
import SortMenu from './SortMenu';
import ColorList from './ColorList';
import { sortFunction } from '../lib/array-helpers';
import '../../stylesheets/App.scss';


class App extends Component {

    getChildContext() {
        return {
            store: this.props.store
        }
    };

    componentWillMount() {
        this.unsubscribe = store.subscribe( () => this.forceUpdate() )
    };

    componentWillUnmount() {
        this.unsubscribe()
    };

    render() {
        const { colors, sort } = store.getState();
        const sortedColors = [...colors].sort(sortFunction(sort));

        return (
            <div className='app'>
                <SortMenu />
                <AddColorForm />
                <ColorList colors={sortedColors} />
            </div>
        )
    }
};

App.propTypes = {
    store: PropTypes.object.isRequired
};

App.childContextTypes = {
    store: PropTypes.object.isRequired
};

export default App;
