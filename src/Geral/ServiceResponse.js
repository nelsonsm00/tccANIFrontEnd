/* IMPORT PROJETO */
import ModalInvoice from "../Componente/UI/Modal/Modal.js";

/* IMPORT GERAL */
import Default from "./Default.js";

/* CLASSE RESPONSAVEL POR TRATAR O RETORNO DAS REQUISICOES DENTRO DOS COMPONENTES
 */

class ServiceResponse {
    constructor() {
        Object.freeze(Default);

        this.show = false;
        this.mensagem = "";
        this.tipoModal = Default.modalAviso;
        this.funcaoPadrao = () => {};
        this.funcaoSecundaria = () => {};
    }

    setShow(s) {
        this.show = s;
    }

    setMensagem(m) {
        this.mensagem = m;
    }

    setFuncao(f) {
        this.funcaoPadrao = f;
    }

    setFuncaoSecundaria(f) {
        this.funcaoSecundaria = f;
    }

    setTipoModal(t) {
        this.tipoModal = t;
    }

    reseta() {
        this.setShow(false);
        this.setMensagem("");
    }

    trataRetornoRequisicao(
        response,
        prefixoMensagem = "",
        funcao = () => {},
        agrupaMensagens = false,
        retornoSomenteErro = false
    ) {
        var mAux = "<u>" + prefixoMensagem + ":</u> ";

        var result = false;
        if (response.hasOwnProperty("mensagem")) {
            this.setShow(true);
            this.setTipoModal(Default.modalErro);
            mAux += response.mensagem;

            result = true;
        } else if (Default.isEmptyObject(response) && !retornoSomenteErro) {
            mAux += "não foi encontrado nenhum dado na requisição.";
            result = true;
        }

        if (result) {
            this.setShow(true);
            this.setMensagem(
                agrupaMensagens
                    ? "<p>" + this.mensagem + "</p><p>" + mAux + "</p>"
                    : mAux
            );
            this.setFuncao(funcao);
        }
        return result;
    }

    render() {
        if (this.show) {
            return (
                <ModalInvoice
                    show={this.show}
                    mensagem={this.mensagem}
                    funcao={this.funcaoPadrao}
                    funcaoSecundaria={this.funcaoSecundaria}
                    tipoModal={this.tipoModal}
                />
            );
        } else {
            return <></>;
        }
    }
}

export default ServiceResponse;
