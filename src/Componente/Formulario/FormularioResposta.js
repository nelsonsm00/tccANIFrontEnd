/* IMPOR REACT */
import { Col, Row, Form, Container } from "react-bootstrap";

/* IMPORT COMPONENTE */
import FormCustom from "../Arquitetura/FormCustom";
import FormularioCategoriaRespostaAccordion from "./FormularioCategoriaRespostaAccordion";

/* IMPORT UI */
import Label from "../UI/Label";
import ButtonSuccess from "../UI/Button/ButtonSuccess";
import Textarea from "../UI/Textarea/Textarea";
import ButtonCancel from "../UI/Button/ButtonCancel";

/* IMPORT GERAL */
import OrdenacaoEnum from "../../Geral/OrdenacaoEnum";
import Coluna from "../../Geral/Coluna/Coluna";
import ColunaIncluir from "../../Geral/Coluna/ColunaIncluir";
import ModalEnum from "../../Geral/ModalEnum";
import Utils from "../../Geral/Utils";
import Cache from "../../Geral/Cache/Cache";

/* IMPORT DTO */


/* IMPORT SERVICE */
import FormularioService from "../../Service/Formulario/FormularioService";

class FormularioResposta extends FormCustom {
    constructor(props) {
        super(props);

        /* BIND */
        this.salvar = this.salvar.bind(this);
        this.setDados = this.setDados.bind(this);
        this.resetaModal = this.resetaModal.bind(this);

        this.state.titulo = props.descricao;
        this.state.dados = props.dados;
        this.state.tratamento = props.tratamento;
        this.state.formulario = props.formulario;
        this.state.modal = Utils.getModal();

        this.service = FormularioService;       
    }

    /* SET */
    setDados(value, index) {
        var dados = [];
        Object.assign(dados, this.state.dados);
        dados[index] = value;
        this.setState({dados: dados});
    }

    /* REQUISICOES */
    async salvar() {
        this.setRequisicaoEmAndamento(true);
        var response = await this.service.Responde(this.state.dados, this.state.tratamento, this.state.formulario);
        if (this.service.verificaErro(response))
            this.setModalResponse(response.erro);
        else {
            this.setState({
                modal: Utils.getModal(true, "Formulário preenchido com sucesso.", ModalEnum.tipo.sucesso, true, false, this.resetaModal)
            });
        }
        this.setRequisicaoEmAndamento(false);
    }

    /* RENDER */
    render() {
            return( <>
                {super.renderComponente()}
                {super.renderForm(
                    <>
                        <Col sm={12}>
                        <Row>                        
                            <Col sm={8}>
                            </Col>
                            <Col sm={2}>
                                <ButtonSuccess
                                    valido={true}
                                    texto={"Salvar"}
                                    funcao={this.salvar}
                                />  
                            </Col>
                            <Col sm={2}>
                                <ButtonCancel
                                    valido={true}
                                    texto={"Voltar"}
                                    funcao={this.props.fechaJanela}
                                />
                            </Col>                        
                        </Row>
                        <br/>
                        <>
                        {this.state.dados.map((d, index) => (                            
                            <Row>
                                <Col sm={12}>
                                    <FormularioCategoriaRespostaAccordion index={index} dados={d} setDados={this.setDados}/>
                                    <hr></hr>
                                </Col>
                            </Row>
                        ))}    
                        </>  
                        </Col>        
                    </>)}
                    <hr></hr>
                    <></>
                </>); 
    }
}

export default FormularioResposta; 