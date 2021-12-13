import {StreetType} from "./Autocomplete";
import React from "react";

const Button = ({ name, onClick, labelColor, disabled, type, style, ...props }) => {
    return (
        <button className="Button" onClick={onClick}>
            {name || 'label'}
        </button>
    );
};

export default Button;