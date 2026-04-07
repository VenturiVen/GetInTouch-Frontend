import './index.scss';

const Button = ({ label = "Click me", onClick, className = "" }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`button ${className}`}
        >
            {label}
        </button>
    );
};

export default Button;