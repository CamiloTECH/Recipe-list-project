import "./NotFound.css";

import { NavLink } from "react-router-dom";

function NotFound() {
  return (
    <div className="not-found-container">
      <h1 className="text-dark">404 - Not Found</h1>
      <NavLink to={"/home"}>
        <h1 className="fs-1">Redirect</h1>
      </NavLink>
    </div>
  );
}

export default NotFound;
