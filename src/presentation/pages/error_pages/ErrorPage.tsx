import React from 'react'
import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

type Props = {}

const ErrorPage = (props: Props) => {
  const error = useRouteError()
  return (
    <div className='white'>Something went wrong</div>
  )
}

export default ErrorPage