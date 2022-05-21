/* IMPORT REACT */
import React from "react";

/* IMPORT COMPONENTE */
import Rodape from "../../Componente/UI/Rodape";
import PrincipalForm from "../../Componente/Principal/PrincipalForm";

export default () => {
    return (
        <>
            <div align="right">
                <div className="containerComponent">
                    <PrincipalForm />
                </div>
                <Rodape />
            </div>
        </>
    );
};

