import React from 'react'
import { isRouteErrorResponse, useRouteError } from 'react-router-dom'


const ErrorPage = () => {
  const error = useRouteError()
  return (
    <div className='white text-center'>Something went wrong</div>
  )
}

export default ErrorPage