import { Component } from 'react';
import PropTypes from 'prop-types';
import '../../../stylesheets/AddColorForm.scss';
import { addColor } from '../../actions'


// Render and handles form functionality
const AddColorForm = (props, { store }) => {
    let _title, _color;

    const submit = e => {
        e.preventDefault()
        store.dispatch( addColor(_title.value, _color.value) )
        _title.value = ''
        _color.value = '#000000'
        _title.focus()
    };

    return (
        <form className="add-color" onSubmit={submit}>
            <input ref={input => _title = input} 
                   type="text"
                   placeholder="Color title..." required />
            <input ref={input => _color = input} 
                   type="color" required />
            <button>ADD</button>
        </form>
    )
};

AddColorForm.contextTypes = {
    store: PropTypes.object
};

export default AddColorForm;
