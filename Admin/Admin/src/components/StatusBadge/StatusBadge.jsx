import React from "react";
import "./StatusBadge.css";

export default function StatusBadge({ status }) {
  const label = status || "pending";
  return (
    <span className={`badge-pill ${label}`}>
      {label.toUpperCase()}
    </span>
  );
}