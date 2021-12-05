const Button = ({ name, onClick, labelColor, disabled, type, style, ...props }) => {
    return (
        <button className="Button">
            {name || 'label'}
        </button>
    );
};

export default Button;