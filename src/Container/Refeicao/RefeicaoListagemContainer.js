/* IMPORT REACT */
import React from "react";

/* IMPORT COMPONENTE */
import RefeicaoFormListagem from "../../Componente/Refeicao/RefeicaoFormListagem";
import Rodape from "../../Componente/UI/Rodape";

export default () => {
    return (
        <>
            <div align="right">
                <div className="containerComponent">
                    <RefeicaoFormListagem />
                </div>
                <Rodape />
            </div>
        </>
    );
};
