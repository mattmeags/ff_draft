import React, { useState, useRef, useEffect } from 'react';

function ToggleButton({ label, active, toggleListener }) {
    const [isChecked, toggleChecked] = useState(),
        handleChange = () => {
            toggleChecked(!isChecked);

            if (toggleListener && typeof toggleListener === 'function') {
                toggleListener(checkbox.current.checked);
            }
        },
        checkbox = useRef(null);
    useEffect(() => {
        console.log(active);
        toggleChecked(active);
    }, []);

    return (
        <React.Fragment>
            <label htmlFor="">{label}</label>
            <input id="" type="checkbox" onChange={handleChange} ref={checkbox} checked={isChecked}/>
        </React.Fragment>
    )
}

ToggleButton.defaultProps = {
    active: false
}

export default ToggleButton;