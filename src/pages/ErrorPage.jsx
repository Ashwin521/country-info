import React from "react";
import { useRouteError } from "react-router-dom";
import { NavLink } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);

  return (
    <div>
      Oopos an error occurred
      {error && <p>{error.data}</p>}
      <NavLink to="/">
        <button>Go to Home</button>
      </NavLink>
    </div>
  );
};

export default ErrorPage;
