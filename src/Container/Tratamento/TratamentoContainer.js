/* IMPORT REACT */
import React from "react";

/* IMPORT COMPONENTE */
import Rodape from "../../Componente/UI/Rodape";
import TratamentoForm from "../../Componente/Tratamento/TratamentoForm";

export default () => {
    return (
        <>
            <div align="right">
                <div className="containerComponent">
                    <TratamentoForm />
                </div>
                <Rodape />
            </div>
        </>
    );
};

