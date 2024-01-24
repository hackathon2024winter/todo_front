import { FC } from "react";
import { useRouteError } from "react-router-dom";

interface RouteError extends Error {
  statusText?: string;
}

const ErrorPage: FC = () => {
  const error = useRouteError() as RouteError;
  console.error(error);

  return (
    <div id="error-page">
      <h1 className='text-3xl font-bold mb-4'>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}

export default ErrorPage