/* IMPORT REACT */
import React, { Component } from "react";

/* IMPORT COMPONENTE */
import Titulo from "../UI/Titulo";

/* IMPORT UI */
import Spinner from "../UI/Spinner";
import ModalANI from "../UI/Modal/ModalANI";

/* IMPORT GERAL */
import Utils from "../../Geral/Utils";
import ModalEnum from "../../Geral/ModalEnum";


class Componente extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titulo: "",
            requisicaoEmAndamento: false,
            dados: [],
            dadosBackup: [],
            modal: Utils.getModal(),
            registro: {}
        };
        this.service = null;
        this.setDados = this.setDados.bind(this);
    }

    /* FUNÇÕES SET */
    setRequisicaoEmAndamento(value = false) {
        this.setState({ requisicaoEmAndamento: value });
    }

    setDados(value) {
        this.setState({ dados: value });
    }

    setModalResponse(mensagem, tipo = ModalEnum.tipo.erro) {
        this.resetaModal();
        this.setState({ modal: Utils.getModal(true, mensagem, tipo, tipo != ModalEnum.tipo.erro, false, this.resetaModal) });
    }

    resetaModal() {
        this.setState({
            modal: Utils.getModal(),
            requisicaoEmAndamento: false,
        });
    }

    renderTitulo() {
        return <><Titulo titulo={this.state.titulo} /></>
    }

    renderModal(modal) {
        if (modal.show) {
            return(<>
                    <ModalANI 
                        show={modal.show}
                        mensagem={modal.mensagem}
                        tipoModal={modal.tipo}
                        funcao={modal.funcao}
                        funcaoSecundaria={modal.funcaoSecundaria}
                    />
            </>);
        }
    }

    renderSpinner() {
        if (this.state.requisicaoEmAndamento) {
            return <Spinner />;
        }
    }

    renderComponente() {
        return (<>
                    {this.renderModal(this.state.modal)}
                    {this.renderSpinner()}
        </>);
    }

    render() {
        return(<></>);
    }
}

export default Componente;