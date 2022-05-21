/* IMPORT REACT */
import React from "react";

/* IMPORT COMPONENTE */
import TratamentoFormListagem from "../../Componente/Tratamento/TratamentoFormListagem";
import Rodape from "../../Componente/UI/Rodape";

export default () => {
    return (
        <>
            <div align="right">
                <div className="containerComponent">
                    <TratamentoFormListagem />
                </div>
                <Rodape />
            </div>
        </>
    );
};
