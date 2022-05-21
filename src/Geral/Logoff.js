/* IMPORT REACT */
import React, { Component } from "react";

/* IMPORT GERAL */
import Cache from "./Cache";
import ServiceRequest from "./ServiceRequest";

class Logoff extends Component {
    constructor(props) {
        super(props);

        this.efetuaLogoff();
    }

    /* REQUISICOES */
    async efetuaLogoff() {
        var response = await ServiceRequest.doRequest(
            ServiceRequest.efetuaLogoff.value
        );
        Cache.token.set(null);
        Cache.token.value = null;
        Cache.inicializaCache();
        document.location.href = "/Login";
    }

    render() {
        return <></>;
    }
}
export default Logoff;
