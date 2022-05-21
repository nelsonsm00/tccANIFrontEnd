/* IMPORT REACT */
import React from "react";

/* IMPORT COMPONENTE */
import FormularioForm from "../../Componente/Formulario/FormularioForm";
import Rodape from "../../Componente/UI/Rodape";

export default () => {
    return (
        <>
            <div align="right">
                <div className="containerComponent">
                    <FormularioForm />
                </div>
                <Rodape />
            </div>
        </>
    );
};
