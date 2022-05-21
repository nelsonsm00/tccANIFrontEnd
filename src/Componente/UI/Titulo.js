/* IMPORT REACT */
import React, { Component } from "react";

class Titulo extends Component {
    constructor(props) {
        super(props);
    }

    /* RENDERIZACAO */
    render() {
        return <div className="titleBox">{this.props.titulo}</div>;
    }
}

export default Titulo;
