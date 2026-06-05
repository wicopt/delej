import React from "react";
import "./Container.css";

const Container = ({ title, children,action,className,titleUnderAction = false }) => {
  return (
<div className="custom-container">
      {titleUnderAction ? (
        <>
          <div className="header-of-container">
            {action}
          </div>

          <h2 className="mt-3">{title}</h2>
        </>
      ) : (
        <div className="header-of-container">
          <h2>{title}</h2>
          {action}
        </div>
      )}

      <div>{children}</div>
    </div>
  );
};
export default Container;
