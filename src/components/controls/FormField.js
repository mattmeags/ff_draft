import React from 'react';

function FormField({ inputName, label, changeListener }) {

    function handleChange(event) {
        if (changeListener && typeof changeListener === 'function') {
            console.log(event)
            changeListener(event.target);
        }
    }

    return (
        <React.Fragment>
            <label htmlFor={inputName}>{label}</label>
            <input id={inputName} name={inputName} type="text" onChange={(e) => handleChange(e)}/>
        </React.Fragment>
    )
}

export default FormField;