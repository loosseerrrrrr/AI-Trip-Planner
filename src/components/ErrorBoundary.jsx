import React from 'react'
import { Button } from './ui/button'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo)
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 px-4'>
          <div className='max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center'>
            <div className='text-6xl mb-4'>😕</div>
            <h1 className='text-2xl font-bold text-gray-800 mb-2'>Oops! Something went wrong</h1>
            <p className='text-gray-600 mb-6'>
              We encountered an unexpected error. Don't worry, our team has been notified.
            </p>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className='mt-4 mb-6 text-left'>
                <summary className='cursor-pointer text-sm text-gray-600 hover:text-gray-800 font-medium'>
                  Error Details (Development Only)
                </summary>
                <pre className='mt-2 text-xs bg-gray-100 p-3 rounded overflow-auto max-h-40'>
                  {this.state.error.toString()}
                  {'\n\n'}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}

            <div className='flex gap-3'>
              <Button 
                onClick={this.handleReset}
                className='flex-1'
              >
                Go Home
              </Button>
              <Button 
                onClick={() => window.location.reload()}
                variant='outline'
                className='flex-1'
              >
                Reload Page
              </Button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
