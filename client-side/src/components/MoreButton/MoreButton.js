import React from "react";
import './MoreButton.css';
export default function MoreButton({ onClick }) {
  return (
      <button className="learn-more" onClick={onClick}>
          <span className="circle" aria-hidden="true">
              <span className="icon2 arrow2"></span>
          </span>
          <span className="button-text">Scopri</span>
      </button>
  );
}