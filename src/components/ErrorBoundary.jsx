import React from 'react'
import { Button } from './ui/button'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  resetError = () => {
    this.setState({ hasError: false, error: null })
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white p-4'>
          <div className='text-center max-w-md'>
            <div className='text-6xl mb-4'>⚠️</div>
            <h1 className='text-3xl font-bold text-[#040D5A] mb-2'>Oops! Something Went Wrong</h1>
            <p className='text-gray-600 mb-6'>
              We encountered an unexpected error. Don't worry, our team has been notified.
            </p>
            
            <div className='bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left'>
              <p className='text-sm text-gray-500 font-mono break-words'>
                {this.state.error?.message || 'Unknown error'}
              </p>
            </div>

            <div className='flex gap-3 justify-center'>
              <Button 
                onClick={this.resetError}
                className='bg-[#040D5A] hover:bg-[#030850]'
              >
                Go to Home
              </Button>
              <Button 
                onClick={() => window.location.reload()}
                variant='outline'
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
