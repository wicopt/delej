import React from "react";
import "./Card.css";

const CardEvent = ({children, onClick, className="", ...props}) => {
  return (
    <div onClick={onClick} className={`card-container ${className}`} {...props}>
      {children}
    </div>
  );
};
export default CardEvent;
