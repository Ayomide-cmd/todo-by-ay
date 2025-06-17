// src/components/ErrorBoundary.tsx
import React from 'react';

type Props = { children: React.ReactNode };
type State = { hasError: boolean; error: unknown };

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: unknown) {
    return { hasError: true, error };
  }

  componentDidCatch(error: unknown, errorInfo: unknown) {
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="min-h-screen flex flex-col justify-center items-center text-center p-6">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Something went wrong.</h1>
          <p className="text-gray-700 mb-4">Please try again later or go back home.</p>
          <a
            href="/"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Go Home
          </a>
        </main>
      );
    }

    return this.props.children;
  }
}
