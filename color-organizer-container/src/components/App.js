import { Component } from 'react';
import PropTypes from 'prop-types';
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
        return (
            <div className='app'>
                <Menu />
                <NewColor />
                <Colors />
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
