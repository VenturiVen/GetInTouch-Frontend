import './index.scss';

const Button = ({ label = "Click me", onClick, className = "" }) => {
    return (
        <div className="button">
            <button
                type="button"
                onClick={onClick}
                className={`button-link ${className}`}
            >
                {label}
            </button>
        </div>
    );
};

export default Button;