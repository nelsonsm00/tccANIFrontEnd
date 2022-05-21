/* IMPORT UI */
import IconAdd from "../UI/Icon/IconAdd";
import ButtonAux from "../UI/Button/ButtonAux";

/* IMPORT GERAL */
import OrdenacaoEnum from "../../Geral/OrdenacaoEnum";

function executaFuncao(order, index, chave, type, funcao) {
    if (order) {
        funcao(index, chave, type);
    }
}

export default (p) => {  
    var value = p.hasOwnProperty("value") ? p.value : null;
    var funcao = p.hasOwnProperty("funcao") ? p.funcao : null;

    if (value != null) {
        var index = p.hasOwnProperty("index") ? p.index : 0;
        var className = "";

        if (value.order) {
            className = "order";
            if (value.click) {
                if (value.sentido == OrdenacaoEnum.sentido.asc) {
                    className += " orderAscClick";
                }
                else {
                    className += " orderDescClick";
                }            
            }
            else {
                className += " orderDesc";
            }
            
        }

        if (value.incluir) {
            if (value.vincular) {
                return (<th className="btnSpace" width={"10%"}>
                            <ButtonAux valido={true} texto={value.importar ? "Importar" : "Vincular"} funcao={value.funcao}/>
                        </th>
                    );
            }
            return (<th className="btnSpace" width={"10%"}>
                            <IconAdd
                                funcao={value.funcao}
                                parametrosFuncao={value.parametros}
                            />
                        </th>
                    );
        }
        else {
            if (value.largura == 0) {
                return (
                    <th onClick={() => executaFuncao(value.order, index, value.chave, value.type, funcao)}>
                    <div className={className}>
                        {value.texto}                                
                        </div>
                    </th>
                );
            }
            else {
                return (
                    <th width={value.largura + "%"} onClick={() => executaFuncao(value.order, index, value.chave, value.type, funcao)}>
                    <div className={className}>
                        {value.texto}                                
                        </div>                               
                    </th>
                );
            }
        }
    }
    else {
        return <th></th>;
    }
};
