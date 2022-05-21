/* IMPORT REACT */
import parse from "html-react-parser";

/* IMPORT GERAL */
import Utils from "../../../Geral/Utils";

export default (props) => {
    var classe = props.hasOwnProperty("classe")
        ? props.classe
        : "";
    var linha = props.hasOwnProperty("linha")
        ? props.linha
        : 10;
    var texto = props.hasOwnProperty("texto")
        ? props.texto
        : "";
    var funcao = props.hasOwnProperty("funcao")
        ? props.funcao
        : () => {}
    var ativo = props.hasOwnProperty("ativo")
        ? props.ativo
        : true;
    var parametrosFuncao = props.hasOwnProperty("parametrosFuncao")
        ? props.parametrosFuncao
        : {};

    return (
        <>
            <textarea
                onInput={(e) => {
                    Utils.isEmptyObject(parametrosFuncao) 
                        ? funcao(e.target.value)
                        : funcao(Utils.converteQuebraLinhaUTF(e.target.value), parametrosFuncao);
                }}
                class={"form-control textareaObservacao " + classe}
                rows={linha}
                value={parse(Utils.converteQuebraLinhaHtml(texto))}
                disabled={!ativo}
            />
        </>
    );
};
