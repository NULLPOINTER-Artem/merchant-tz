import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="not-found">
      <h1>
        The page not found, <Link to="/">go to home</Link>
      </h1>

      <div className="background">&nbsp;</div>
    </div>
  );
}

export default NotFound;
