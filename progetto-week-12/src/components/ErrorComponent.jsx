import React from "react";
import { Alert } from "react-bootstrap";

export default function ErrorComponent({ errorMsg }) {
  return (
    <div className="error-component my-5 text-center">
      <Alert variant="danger">{errorMsg}</Alert>
    </div>
  );
}
