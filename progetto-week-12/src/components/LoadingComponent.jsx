import React from "react";
import { Spinner } from "react-bootstrap";

export default function LoadingComponent({msg}) {
  return (
    <div className="d-flex align-items-center justify-content-center ">
      <Spinner className="me-4"/>
      <h5>{msg}</h5>
    </div>
  );
}
