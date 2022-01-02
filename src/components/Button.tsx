import React from "react";

const Button = ({ value, onClick }) => {
    return (
        <div className="Button">
            <input type={"submit"} onClick={onClick} value={value}/>
        </div>
    );
};

export default Button;