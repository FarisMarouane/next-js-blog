import React from 'react';
import style from '../styles/components/ErrorBoundary.module.css';

interface IErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<
  IErrorBoundaryProps,
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: unknown, errorInfo: unknown) {
    console.error({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={style.container}>
          <h2>Oops, there was an error!</h2>
          <button
            className={style.button}
            type="button"
            onClick={() => this.setState({ hasError: false })}
          >
            Try again?
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
