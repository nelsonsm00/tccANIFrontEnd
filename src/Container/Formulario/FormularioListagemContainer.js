/* IMPORT REACT */
import React from "react";

/* IMPORT COMPONENTE */
import FormularioFormListagem from "../../Componente/Formulario/FormularioFormListagem";
import Rodape from "../../Componente/UI/Rodape";

export default () => {
    return (
        <>
            <div align="right">
                <div className="containerComponent">
                    <FormularioFormListagem />
                </div>
                <Rodape />
            </div>
        </>
    );
};
