/* IMPORT REACT */
import React from "react";

/* IMPORT COMPONENTE */
import OrientacaoFormListagem from "../../Componente/Orientacao/OrientacaoFormListagem";
import Rodape from "../../Componente/UI/Rodape";

export default () => {
    return (
        <>
            <div align="right">
                <div className="containerComponent">
                    <OrientacaoFormListagem />
                </div>
                <Rodape />
            </div>
        </>
    );
};
