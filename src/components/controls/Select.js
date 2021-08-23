import React, { useRef, useEffect } from 'react';

function Select({ optionsProps, label,  changeListener, setCallables, defaultValue }) {
    const selectEl = useRef(null);
    let value, 
        display,
        valueAttr = `value=${value}`,
        options = [];

    //const [optionsPropsArray, updateOptionsPropsArray] = useState(typeof optionsProps === 'object' ? Object.keys(optionsProps) : optionsProps);

    if (Array.isArray(optionsProps)) {
        optionsProps.forEach(option => {
            value = option;
            display = option;

            options.push(
                <option value={value} key={value}>
                    {display}
                </option>
            );
        });
    } else if (typeof optionsProps === 'object') {
        Object.keys(optionsProps).forEach(option => {
            value = optionsProps[option];
            display = optionsProps[option];

            options.push(
                <option value={value} key={value}>
                    {display}
                </option>
            );
        });
    }
    const resetSelect = () => {
        // Get the event from parent
        selectEl.current.selectedIndex = 0;
    }
    useEffect(() => {
        console.log(selectEl);
        if (defaultValue) {
            selectEl.current.value = defaultValue;
        }
    }, []);

    useEffect(() => {
        //This allows us to pass a method here to the parent component via the method passed into setCallables
        if (setCallables && typeof setCallables === 'function') {
            setCallables({
                resetSelect: resetSelect
            })
        }
    });

    function handleChange(event) {
        if (changeListener && typeof changeListener === 'function') {
            changeListener(event.target.value);
        }
    }

    return (
        <React.Fragment>
            { label && <label>{label}</label>}
            <select onChange={handleChange} ref={selectEl}>
                {options}
            </select>
        </React.Fragment>
        
    )
}

export default Select;