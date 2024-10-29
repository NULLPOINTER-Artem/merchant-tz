import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div>
      <h1>
        The page not found, <Link to="/">go to home</Link>
      </h1>
    </div>
  );
}

export default NotFound;