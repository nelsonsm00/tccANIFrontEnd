/* IMPORT REACT */
import React from "react";

/* IMPORT COMPONENTE */
import Rodape from "../../Componente/UI/Rodape";
import PlanoAlimentarForm from "../../Componente/Plano Alimentar/PlanoAlimentarForm";

export default () => {
    return (
        <>
            <div align="right">
                <div className="containerComponent">
                    <PlanoAlimentarForm />
                </div>
                <Rodape />
            </div>
        </>
    );
};

