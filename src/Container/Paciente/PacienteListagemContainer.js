/* IMPORT REACT */
import React from "react";

/* IMPORT COMPONENTE */
import PacienteFormListagem from "../../Componente/Paciente/PacienteFormListagem";
import Rodape from "../../Componente/UI/Rodape";

export default () => {
    return (
        <>
            <div align="right">
                <div className="containerComponent">
                    <PacienteFormListagem />
                </div>
                <Rodape />
            </div>
        </>
    );
};
