/* IMPORT REACT */
import React, { useState, useRef } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Button from "react";
import { BsQuestionSquareFill } from "react-icons/bs";

/* IMPORT DEFAULT */


function getTexto(option) {
    return "";
}


export default (props) => {
  return(
    <OverlayTrigger
      placement="right"
      delay={{ show: 250, hide: 400 }}
      overlay={<Tooltip id="button-tooltip">
      Simple tooltip
    </Tooltip>}
    >
      <Button variant="success">Hover me to see</Button>
    </OverlayTrigger>
  );
}