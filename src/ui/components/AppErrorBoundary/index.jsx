import "./index.scss"

import { ErrorBoundary, getErrorMessage } from "react-error-boundary";

function ErrorFallback({ error, resetErrorBoundary }) {
    return (
        <div className="alert">
            <div className="alertContent">
                <h1>Something went wrong.</h1>
                <pre className="ErrorWarning">ERROR message:</pre>
                <pre>{getErrorMessage(error)}</pre>
                <button onClick={resetErrorBoundary}>Retry</button>
            </div>
        </div>
    );
}

export default function AppErrorBoundary({ children }) {
    return (
        <ErrorBoundary
            fallbackRender={(props) => <ErrorFallback {...props} />}
            onReset={() => {
                // reset app state
                // keeping it simple for now
                // reload current window
                window.location.reload();
            }}
        >
            {children}
        </ErrorBoundary>
    );
}