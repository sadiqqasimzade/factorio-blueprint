import React from 'react';

/**
 * Centralized error handling utilities for the application
 */

export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public originalError?: Error
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class ConversionError extends AppError {
  constructor(message: string, originalError?: Error) {
    super(message, 'CONVERSION_ERROR', originalError);
    this.name = 'ConversionError';
  }
}

export class ValidationError extends AppError {
  constructor(message: string, field?: string) {
    super(message, 'VALIDATION_ERROR');
    this.name = 'ValidationError';
    if (field) {
      (this as any).field = field;
    }
  }
}

export class FileProcessingError extends AppError {
  constructor(message: string, originalError?: Error) {
    super(message, 'FILE_PROCESSING_ERROR', originalError);
    this.name = 'FileProcessingError';
  }
}

export class NetworkError extends AppError {
  constructor(message: string, originalError?: Error) {
    super(message, 'NETWORK_ERROR', originalError);
    this.name = 'NetworkError';
  }
}

/**
 * Error handler utility class
 */
export class ErrorHandler {
  /**
   * Handle errors gracefully and provide user feedback
   */
  static handleError(error: unknown, context?: string): AppError {
    let appError: AppError;

    if (error instanceof AppError) {
      appError = error;
    } else if (error instanceof Error) {
      appError = new AppError(error.message, 'UNKNOWN_ERROR', error);
    } else {
      appError = new AppError(String(error), 'UNKNOWN_ERROR');
    }

    // Log error for debugging
    console.error('Application Error:', {
      error: appError,
      context,
      timestamp: new Date().toISOString()
    });

    // In production, you might want to send to error tracking service
    if (process.env.NODE_ENV === 'production') {
      // Example: Sentry.captureException(appError);
    }

    return appError;
  }

  /**
   * Create user-friendly error messages
   */
  static getUserFriendlyMessage(error: AppError): string {
    switch (error.code) {
      case 'VALIDATION_ERROR':
        return `Invalid input: ${error.message}`;
      
      case 'CONVERSION_ERROR':
        return `Conversion failed: ${error.message}`;
      
      case 'FILE_PROCESSING_ERROR':
        return `File processing error: ${error.message}`;
      
      case 'NETWORK_ERROR':
        return `Network error: ${error.message}. Please check your connection.`;
      
      default:
        return `An unexpected error occurred: ${error.message}`;
    }
  }

  /**
   * Wrap async operations with error handling
   */
  static async withErrorHandling<T>(
    operation: () => Promise<T>,
    context?: string
  ): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      const appError = this.handleError(error, context);
      throw appError;
    }
  }

  /**
   * Wrap synchronous operations with error handling
   */
  static withErrorHandlingSync<T>(
    operation: () => T,
    context?: string
  ): T {
    try {
      return operation();
    } catch (error) {
      const appError = this.handleError(error, context);
      throw appError;
    }
  }

  /**
   * Retry operation with exponential backoff
   */
  static async retryWithBackoff<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    baseDelay: number = 1000,
    context?: string
  ): Promise<T> {
    let lastError: Error | undefined;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        
        if (attempt === maxRetries) {
          break;
        }

        // Exponential backoff: 1s, 2s, 4s, etc.
        const delay = baseDelay * Math.pow(2, attempt - 1);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    const finalError = new AppError(
      `Operation failed after ${maxRetries} attempts: ${lastError?.message}`,
      'RETRY_FAILED',
      lastError
    );
    
    this.handleError(finalError, context);
    throw finalError;
  }
}

/**
 * React hook for error handling
 */
export function useErrorHandler() {
  const handleError = React.useCallback((error: unknown, context?: string) => {
    const appError = ErrorHandler.handleError(error, context);
    const userMessage = ErrorHandler.getUserFriendlyMessage(appError);
    
    // Show toast notification
    if (typeof window !== 'undefined' && (window as any).toast) {
      (window as any).toast.error(userMessage);
    }
    
    return appError;
  }, []);

  return { handleError };
}

/**
 * Error boundary error handler
 */
export function logErrorToService(error: Error, errorInfo: React.ErrorInfo) {
  // In production, send to error tracking service
  console.error('Error caught by boundary:', error, errorInfo);
  
  // Example integration with Sentry:
  // if (process.env.NODE_ENV === 'production') {
  //   Sentry.withScope((scope) => {
  //     scope.setExtras(errorInfo);
  //     Sentry.captureException(error);
  //   });
  // }
}

export default ErrorHandler;