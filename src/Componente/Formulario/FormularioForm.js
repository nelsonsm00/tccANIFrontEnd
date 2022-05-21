/* IMPORT REACT */
import React from "react";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";

/* IMPORT COMPONENTE */
import FormCustom from "../Arquitetura/FormCustom";
import FormularioCategoriaSortable from "./FormularioCategoriaSortable";
import FormularioCategoriaModal from "./FormularioCategoriaModal";

/* IMPORT UI */
import ButtonSuccess from "../UI/Button/ButtonSuccess";
import ButtonCancel from "../UI/Button/ButtonCancel";
import ButtonAux from "../UI/Button/ButtonAux";

/* IMPORT DTO */
import FormularioItemPostDTO from "../../DTO/Formulario/FormularioItemPostDTO";
import FormularioCategoriaDTO from "../../DTO/Formulario/FormularioCategoriaDTO";

/* IMPORT GERAL */
import Cache from "../../Geral/Cache/Cache";
import ModalEnum from "../../Geral/ModalEnum";
import Utils from "../../Geral/Utils";

/* IMPORT SERVICE */
import FormularioService from "../../Service/Formulario/FormularioService";
import FormularioCategoriaService from "../../Service/Formulario/FormularioCategoriaService";
import FormularioItemService from "../../Service/Formulario/FormularioItemService";

class FormularioForm extends FormCustom {
    constructor(props) {
        super(props);

        if (Cache.formulario.get == null)
            document.location.href = "/";

        /* BIND */
        this.resetaModal = this.resetaModal.bind(this);
        this.renderModal = this.renderModal.bind(this);
        this.setDados = this.setDados.bind(this);
        this.incluir = this.incluir.bind(this);
        this.excluirCategoria = this.excluirCategoria.bind(this);
        this.salvar = this.salvar.bind(this);
        this.cancelar = this.cancelar.bind(this);
        this.incluirItem = this.incluirItem.bind(this);
        this.excluirItem = this.excluirItem.bind(this);
        this.exibeModalIncluirCategoria = this.exibeModalIncluirCategoria.bind(this);

        this.state.titulo = "Formulário";
        this.state.id = Cache.formulario.get;
        this.state.dados = null;
        this.state.renderizaDados = true;
        
        this.service = FormularioService;
    }

    /* FUNCOES SET */
    setDados(value) {
        console.log("Value form:");
        console.log(value);
        console.log("Dados state form:");
        console.log(this.state.dados);
        var dados = {};
        Object.assign(dados, this.state.dados);
        dados.categorias = value;
        this.setState({ renderizaDados: false });
        console.log("Dados alterados form:");
        console.log(dados);
        this.setState({ dados: dados, renderizaDados: true });       
    }

    /* FUNCOES VERIFICACAO */


    /* FUNCOES MODAL */
    exibeModalIncluirCategoria() {
        this.setState({
            modal: Utils.getModal(true, "", ModalEnum.tipo.pergunta, false, false, this.incluir),
            registro: FormularioCategoriaDTO.json(0, null, this.state.id),
        });
    }

    /* REQUISICOES */
    async componentDidMount() {
        await this.consulta();
    }    

    async consulta() {
        this.setState({ renderizaDados: false });
        this.setRequisicaoEmAndamento(true);
        var response = await this.service.Get(Cache.formulario.get);
        this.setState({ dados: response.response });
        if (this.service.verificaErro(response))
            this.setModalResponse(response.erro);
        else
            this.setState({titulo: "Formulário - " + this.state.dados.descricao})
        this.setRequisicaoEmAndamento(false);
        this.setState({ renderizaDados: true });
    }

    async salvar() {
        this.setRequisicaoEmAndamento(true); 
        var response = await this.service.AlteraOrdem(this.state.dados);
        if (this.service.verificaErro(response))
            this.setModalResponse(response.erro);
        else {
            await this.consulta();
        }
        this.setRequisicaoEmAndamento(false);
    }

    cancelar() {
        window.location.href = "/Formulario/Listagem";
    }

    /* REQUISICOES DAS CATEGORIAS */
    async incluir(registro) {
        this.setRequisicaoEmAndamento(true); 
        if (registro.id > 0)
            var response = await FormularioCategoriaService.Put(registro);
        else
            var response = await FormularioCategoriaService.Post(registro);
        if (this.service.verificaErro(response))
            this.setModalResponse(response.erro);
        else {
            this.resetaModal();
            await this.consulta();
        }
        this.setRequisicaoEmAndamento(false);
    }

    async excluirCategoria(id) {
        this.setRequisicaoEmAndamento(true); 
        var response = await FormularioCategoriaService.Delete(id);
        if (this.service.verificaErro(response))
            this.setModalResponse(response.erro);
        else {
            this.setModalResponse("Categoria excluída com sucesso.", ModalEnum.tipo.sucesso);
            await this.consulta();
        }
        this.setRequisicaoEmAndamento(false);
    }

    /* REQUISICOES DOS ITENS */
    async incluirItem(registro) {
        this.setRequisicaoEmAndamento(true); 
        if (registro.id > 0)
            var response = await FormularioItemService.Put(FormularioItemPostDTO.json(registro.id, registro.formularioCategoria, registro.descricao,
                                                                            registro.tipo, registro.alternativas));
        else
            var response = await FormularioItemService.Post(FormularioItemPostDTO.json(registro.id, registro.formularioCategoria, registro.descricao,
                                                                            registro.tipo, registro.alternativas));
        if (this.service.verificaErro(response))
            this.setModalResponse(response.erro);
        else
            this.resetaModal();
        this.setRequisicaoEmAndamento(false);
        await this.consulta();
    }

    async excluirItem(id) {
        this.setRequisicaoEmAndamento(true); 
        var response = await FormularioItemService.Delete(id);
        if (this.service.verificaErro(response))
            this.setModalResponse(response.erro);
        else {
            this.setModalResponse("Item excluído com sucesso.", ModalEnum.tipo.sucesso);
            await this.consulta();
        }
        this.setRequisicaoEmAndamento(false);
    }

    /* RENDER */
    renderModal() {
        if (this.state.modal.show) {
            if (this.state.modal.tipo == ModalEnum.tipo.erro || this.state.modal.salvar) {
                return super.renderModal(this.state.modal);
            }
            else {
                return (
                    <FormularioCategoriaModal 
                        show={this.state.modal.show}
                        mensagem={this.state.modal.mensagem}
                        tipoModal={this.state.modal.tipo}
                        registro={this.state.registro}
                        funcao={this.state.modal.funcao}
                        funcaoSecundaria={this.resetaModal}
                    />
                );
            }
        }
        else {
            return (<></>);
        }
    }

    render() {
        return( <>
                {super.renderComponente()}
                {super.renderForm(
                    <>
                        <Col sm={12}>
                        <Row>                        
                            <Col sm={6}>
                            </Col>
                            <Col sm={2}>
                                <ButtonAux
                                    valido={true}
                                    texto={"Incluir Categoria"}
                                    funcao={this.exibeModalIncluirCategoria}
                                />  
                            </Col>
                            <Col sm={2}>
                                <ButtonSuccess
                                    valido={true}
                                    texto={"Salvar ordem"}
                                    funcao={this.salvar}
                                />  
                            </Col>
                            <Col sm={2}>
                                <ButtonCancel
                                    valido={true}
                                    texto={"Voltar"}
                                    funcao={this.cancelar}
                                />
                            </Col>                        
                        </Row>  
                        </Col>        
                    </>)}
                    <hr></hr>
                    {this.state.dados != null && this.state.renderizaDados
                        ? <FormularioCategoriaSortable 
                            dados={this.state.dados.categorias}
                            setDados={this.setDados}
                            funcaoIncluirItem={this.incluirItem}
                            funcaoExcluirItem={this.excluirItem}
                            funcaoEditarCategoria={this.incluir}
                            funcaoExcluirCategoria={this.excluirCategoria}
                          /> 
                        : <></>
                    }
                </>);                 
    }
}

export default FormularioForm;