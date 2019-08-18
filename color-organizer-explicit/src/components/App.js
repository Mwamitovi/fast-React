import AddColorForm from './AddColorForm';
import SortMenu from './SortMenu';
import ColorList from './ColorList';
import '../../stylesheets/App.scss';


const App = ({ store }) => (
    <div className="app">
        <SortMenu store={store} />
        <AddColorForm store={store} />
        <ColorList store={store} />
    </div>
);


export default App;