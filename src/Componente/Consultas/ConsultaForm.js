/* IMPORT REACT */
import { Col, Row, Form, Container } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

/* IMPORT COMPONENTE */
import FormCustom from "../Arquitetura/FormCustom";
import ConsultaOpcoesCard from "./ConsultaOpcoesCard";
import ConsultasAnterioresAccordion from "./ConsultasAnterioresAccordion";
import ConsultasNaoRealizadasAccordion from "./ConsultasNaoRealizadasAccordion";
import ConsultaNovaModal from "./ConsultaNovaModal";
import FormularioFormListagem from "../Formulario/FormularioFormListagem";
import FormularioResposta from "../Formulario/FormularioResposta";

/* IMPORT UI */
import Label from "../UI/Label";
import ButtonSuccess from "../UI/Button/ButtonSuccess";
import Textarea from "../UI/Textarea/Textarea";
import ButtonCancel from "../UI/Button/ButtonCancel";

/* IMPORT DTO */
import ConsultaDetalheDTO from "../../DTO/Consulta/ConsultaDetalheDTO";
import ConsultaRealizadaDTO from "../../DTO/Consulta/ConsultaRealizadaDTO";
import ConsultaReagendaDTO from "../../DTO/Consulta/ConsultaReagendaDTO";
import ConsultaDTO from "../../DTO/Consulta/ConsultaDTO";
import HorarioDTO from "../../DTO/Configuracao/HorarioDTO";

/* IMPORT GERAL */
import Utils from "../../Geral/Utils";
import Input from "../UI/Input";
import MascaraNumerica from "../../Geral/MascaraNumerica";
import ModalEnum from "../../Geral/ModalEnum";
import Data from "../../Geral/Data";

/* IMPORT SERVICE */
import ConsultaService from "../../Service/Consulta/ConsultaService";
import ConfiguracaoService from "../../Service/Configuracao/ConfiguracaoService";
import TratamentoService from "../../Service/Tratamento/TratamentoService";
import FormularioService from "../../Service/Formulario/FormularioService";
import MedidaForm from "../Medida/MedidaForm";

class ConsultaForm extends FormCustom {
    constructor(props) {
        super(props);

        /* BIND */
        this.resetaModal = this.resetaModal.bind(this);
        this.setObservacao = this.setObservacao.bind(this);
        this.setPeso = this.setPeso.bind(this);
        this.finaliza = this.finaliza.bind(this);
        this.agendarNovaConsulta = this.agendarNovaConsulta.bind(this);
        this.reagendaConsulta = this.reagendaConsulta.bind(this);
        this.exibeModalAgendarNovaConsulta = this.exibeModalAgendarNovaConsulta.bind(this);
        this.exibeModalReagendaConsulta = this.exibeModalReagendaConsulta.bind(this);
        this.desmarcar = this.desmarcar.bind(this);
        this.setAltura = this.setAltura.bind(this);
        this.exibeModalAnamnese = this.exibeModalAnamnese.bind(this);
        this.exibeModalAnamneseBotao = this.exibeModalAnamneseBotao.bind(this);
        this.exibeModalMedida = this.exibeModalMedida.bind(this);

        this.state.tratamento = props.tratamento;
        this.state.idConsulta = props.consulta
        this.state.consulta = ConsultaDetalheDTO.json();
        this.state.consultasNaoRealizadas = [];
        this.state.consultasAnteriores = []
        this.state.imc = 0;
        this.state.imcDescritivo = "";
        this.state.pesoIdeal = 0;
        
        this.horarios = [];

        this.service = ConsultaService;
    }

    /* FUNCOES SET */
    setObservacao(valor) {
        var json = {};
        Object.assign(json, this.state.consulta);
        json.observacao = Utils.converteQuebraLinhaHtml(valor)
        this.setState({consulta: json});
    }

    setPeso(valor) {
        var json = {};
        Object.assign(json, this.state.consulta);
        json.peso = valor;
        this.setState({consulta: json});
        this.calculaIMC(this.state.consulta.altura, valor);
    }

    setAltura(valor) {
        var json = {};
        Object.assign(json, this.state.consulta);
        json.altura = valor;
        this.setState({consulta: json});
        this.calculaIMC(valor, this.state.consulta.peso);
    }

    calculaIMC(altura, peso) {
        if (altura != null && peso != null) {
            var altura = (altura/100);
            altura = altura * altura;
            peso = MascaraNumerica.converteFloat(peso);
            var imc = peso / altura;
            var descricao = "";
            var pesoIdeal = 0;
            if (this.state.consulta.idade != null) {
                if (this.state.consulta.idade < 65) {
                    if (imc < 16)
                        descricao = "Desnutrição severa";
                    else if (imc >= 16 && imc <= 16.99)
                        descricao = "Desnutrição moderada";
                    else if (imc >= 17 && imc <= 18.49)
                        descricao = "Desnutrição leve";
                    else if (imc >= 18.5 && imc <= 24.9)
                        descricao = "Normalidade";
                    else if (imc >= 25 && imc <= 29.99)
                        descricao = "Sobrepeso";
                    else if (imc >= 30 && imc <= 34.99)
                        descricao = "Obesidade grau I";
                    else if (imc >= 35 && imc <= 39.99)
                        descricao = "Obesidade grau II";
                    else if (imc >= 40)
                        descricao = "Obesidade grau III";
                    else
                        descricao = "IMC inválido";

                    //Mediana do peso ideal 18.5 + 3.2
                    pesoIdeal = 21.7 * altura;
                }
                else {
                    if (imc < 22)
                        descricao = "Baixo peso";
                    else if (imc >= 22 && imc < 27)
                        descricao = "Peso adequado";
                    else if (imc >= 27)
                        descricao = "Sobrepeso";
                    else
                        descricao = "IMC inválido";

                    //Mediana do peso ideal 22 + 2.5
                    pesoIdeal = 24.5 * altura;
                }
            }
            else {
                descricao = "Idade não calculada.";
            }
            
            this.setState({imc: imc, imcDescritivo: descricao, pesoIdeal: pesoIdeal});
            
        }
    }

    /* FUNCOES VERIFICACAO */
    isCamposValido() {
        return this.state.consulta.id > 0;
    }

    /* FUNCOES MODAL */
    exibeModalAgendarNovaConsulta() {
        this.setState({
            modal: Utils.getModal(true, "", ModalEnum.tipo.pergunta, false, false, this.agendarNovaConsulta),
            registro: HorarioDTO.json()
        });
    }

    exibeModalDesejaAgendarNovaConsulta() {
        this.setState({
            modal: Utils.getModal(true, "Deseja agendar a próxima consulta?", ModalEnum.tipo.pergunta, true, false, this.exibeModalAgendarNovaConsulta, () => {document.location.href = "/Tratamento";})
        });
    }

    exibeModalReagendaConsulta() {
        this.setState({
            modal: Utils.getModal(true, "", ModalEnum.tipo.pergunta, false, false, this.reagendaConsulta),
            registro: HorarioDTO.json(Data.formataDataString(this.state.consulta.data), this.state.consulta.hora)
        });
    }

    exibeModalAnamnese() {
        this.resetaModal();
        this.setState({
            modal: Utils.getModal(true, "", ModalEnum.tipo.janela, false, false)
        });
    }

    exibeModalMedida() {
        this.setState({
            modal: Utils.getModal(true, "MD", ModalEnum.tipo.janela, false, false)
        });
    }

    async exibeModalAnamneseBotao() {
        var anamneseP = await this.anamnesePreenchida();
        if (anamneseP != null && anamneseP != "") {
            var registro = await this.consultaFormularioResposta(anamneseP);
            this.setState({
                modal: Utils.getModal(true, "AC", ModalEnum.tipo.janela, false, false),
                registro: registro
            });
        }
        else {
            this.setState({
                modal: Utils.getModal(true, "", ModalEnum.tipo.janela, false, false)
            });
        }
    }

    /* REQUISICOES */
    async consultaFormularioResposta(id) {
        var retorno = {};
        this.setRequisicaoEmAndamento(true);
        var response = await FormularioService.GetFormularioResposta(this.state.tratamento, id);
        if (this.service.verificaErro(response)) 
            this.setModalResponse(response.erro);
        else {
            retorno = response.response;
        }
        this.setRequisicaoEmAndamento(false);
        return retorno;
    }

    desmarcar() {
        this.setState({
            modal: Utils.getModal(true, "Tem certeza que deseja desmarcar a consulta? Este processo não pode ser revertido.", ModalEnum.tipo.pergunta, true, false, () => this.excluir(this.state.consulta.id), this.resetaModal)
        });
    }

    async excluir(id) {
        this.setRequisicaoEmAndamento(true); 
        var response = await this.service.Delete(id);
        if (this.service.verificaErro(response))
            this.setModalResponse(response.erro);
        else {
            document.location.href = "/Tratamento";
        }
        this.setRequisicaoEmAndamento(false);
    }

    async finaliza() {
        this.setRequisicaoEmAndamento(true);
        var params = ConsultaRealizadaDTO.json(this.state.consulta.id, MascaraNumerica.converteFloat(this.state.consulta.peso), Utils.converteQuebraLinhaUTF(this.state.consulta.observacao), this.state.consulta.altura);
        var response = await this.service.Realiza(params);
        this.setRequisicaoEmAndamento(false);
        if (this.service.verificaErro(response))
            this.setModalResponse(response.erro);
        else
            this.exibeModalDesejaAgendarNovaConsulta();                
    }

    async agendarNovaConsulta(data) {
        this.setRequisicaoEmAndamento(true);
        var params = ConsultaDTO.json(this.state.tratamento, Data.converteStringDataHora(data.data, data.horario));
        var response = await this.service.Post(params);
        if (this.service.verificaErro(response)) {
            this.setModalResponse(response.erro);
        }
        else {
            document.location.href = "/Tratamento";
        }
        this.setRequisicaoEmAndamento(false);
    }

    async reagendaConsulta(data) {
        this.setRequisicaoEmAndamento(true);
        var params = ConsultaReagendaDTO.json(this.state.consulta.id, Data.converteStringDataHora(data.data, data.horario));
        var response = await this.service.Reagenda(params);
        if (this.service.verificaErro(response)) {
            this.setModalResponse(response.erro);
        }
        else {
            document.location.href = "/Tratamento";
        }
        this.setRequisicaoEmAndamento(false);
    }

    async componentDidMount() {
        this.setRequisicaoEmAndamento(true);
        if (this.state.idConsulta != -1)
            var response = await this.service.Get(this.state.idConsulta);
        else
            var response = await this.service.Atual(this.state.tratamento);
        var responseVazio = response.response == [];
        this.setState({ consulta: (responseVazio ? ConsultaDetalheDTO.json() : response.response) });
        this.calculaIMC(this.state.consulta.altura, this.state.consulta.peso);    
        if (this.service.verificaErro(response)) {
            this.setModalResponse(response.erro);
        }
        else if (responseVazio) {
            this.setState({
                modal: Utils.getModal(true, "Não existe consulta a ser realizada. Deseja agendar uma consulta?", ModalEnum.tipo.pergunta, true, false, this.exibeModalAgendarNovaConsulta, this.resetaModal)})
        }
        this.setRequisicaoEmAndamento(false);

        /* Faz a requisição para guardar a lista de horários */
        this.setRequisicaoEmAndamento(true);
        var response = await ConfiguracaoService.HorarioLista();
        if (this.service.verificaErro(response))
            this.setModalResponse(response.erro);
        this.horarios = response.response;
        this.setRequisicaoEmAndamento(false);

        /* Faz a requisicao para recuperar as consultas não realizadas */
        this.setRequisicaoEmAndamento(true);
        var response = await this.service.AtualLista(this.state.tratamento);
        if (this.service.verificaErro(response))
            this.setModalResponse(response.erro);
        this.setState({ consultasNaoRealizadas: response.response });
        this.setRequisicaoEmAndamento(false);

        /* Faz a requisicao para recuperar as consultas anteriores */
        this.setRequisicaoEmAndamento(true);
        var response = await this.service.Realizadas(this.state.tratamento);
        if (this.service.verificaErro(response))
            this.setModalResponse(response.erro);
        var primeiraConsulta = !(response.response != null && response.response.length > 0);
        this.setState({ consultasAnteriores: response.response });
        this.setRequisicaoEmAndamento(false);

        /* Se existir consulta e for a primeira, faz a requisição para oferecer o preenchimento da anamnese */
        var anamneseP = -1;
        if (!responseVazio && primeiraConsulta) {
            anamneseP = await this.anamnesePreenchida();
        }
        if (anamneseP == null || anamneseP == "") {
            this.setState({
                modal: Utils.getModal(true, "Deseja preencher a anamnese?", ModalEnum.tipo.pergunta, true, false, this.exibeModalAnamnese, this.resetaModal)})
        }
    }

    async anamnesePreenchida() {
        this.setRequisicaoEmAndamento(true);
        var retorno = null;
        var response = await TratamentoService.AnamnesePreenchida(this.state.tratamento);
        if (this.service.verificaErro(response)) {
            this.setModalResponse(response.erro);
        }
        else {
            retorno = response.response;
        }
        this.setRequisicaoEmAndamento(false);
        return retorno;
    }

    /* RENDER */
    renderModal() {
        if (this.state.modal.show) {
            if (this.state.modal.tipo == ModalEnum.tipo.erro || this.state.modal.salvar) {
                return super.renderModal(this.state.modal);
            }
            else if (this.state.modal.tipo == ModalEnum.tipo.janela && this.state.modal.mensagem == "MD") {
                return (<>
                    <Modal
                        show={true}
                        backdrop="static"
                        keyboard={false}
                        fullscreen={true}
                        dialogClassName="modal-90w"
                        onHide={() => {
                            this.resetaModal();
                        }}
                    >
                        <Modal.Body>
                            <MedidaForm 
                                consulta={this.state.consulta.id} 
                                fechaJanela={() => {
                                    this.resetaModal();
                                }}
                            />
                        </Modal.Body>
                    </Modal>
                </>);
            }
            else if (this.state.modal.tipo == ModalEnum.tipo.janela && this.state.modal.mensagem == "AC") {
                return (<>
                    <Modal
                        show={true}
                        backdrop="static"
                        keyboard={false}
                        fullscreen={true}
                        dialogClassName="modal-100w"
                        onHide={() => {
                            this.resetaModal();
                        }}
                    >
                        <Modal.Body>
                            <FormularioResposta 
                                dados={this.state.registro.categorias}
                                descricao={this.state.registro.descricao}
                                fechaJanela={() => {
                                    this.resetaModal();
                                }}
                                tratamento={this.state.tratamento}
                                formulario={this.state.registro.id}
                            />
                        </Modal.Body>
                    </Modal>
                </>);
            }
            else if (this.state.modal.tipo == ModalEnum.tipo.janela) {
                return (<>
                            <Modal
                                show={true}
                                backdrop="static"
                                keyboard={false}
                                fullscreen={true}
                                dialogClassName="modal-100w"
                                onHide={() => {
                                    this.resetaModal();
                                }}
                            >
                                <Modal.Header closeButton></Modal.Header>
                                <Modal.Body>
                                    <FormularioFormListagem 
                                        tratamento={this.state.tratamento}
                                        fechaJanela={() => {
                                            this.resetaModal();
                                        }}/>
                                </Modal.Body>
                            </Modal>
                        </>);
            }
            else {
                return (<ConsultaNovaModal 
                            show={this.state.modal.show}
                            mensagem={this.state.modal.mensagem}
                            tipoModal={this.state.modal.tipo}
                            funcao={this.state.modal.funcao}
                            funcaoSecundaria={this.resetaModal}
                            horarios={this.horarios}
                            registro={this.state.registro}
                        />);
            }
        }
        else {
            return (<></>);
        }
    }

    render() {
        var parametrosTamanhoLabelHead = {head: true, label: true, min: true};
        var parametrosTamanhoInputIdHead = {head: true, input: true};
        var parametrosTamanhoButtonHead = {head: true};

        return(<>
            {this.renderComponente()}
           <Container>
                <Row>
                    <Col sm={10}>
                        <Form>
                            <Form.Group as={Row} controlId="head">
                                <Label
                                    coluna={true}
                                    texto="Consulta:"
                                    id="consultaId"
                                    parametrosTamanho={parametrosTamanhoLabelHead}
                                />
                                <Input
                                    ativo={false}
                                    valor={this.state.consulta.id > 0 ? this.state.consulta.id : ""} 
                                    parametrosTamanho={parametrosTamanhoInputIdHead}
                                    classeForm="inputMin"
                                />
                                <Label
                                    coluna={true}
                                    texto="Data:"
                                    id="head"
                                    parametrosTamanho={parametrosTamanhoLabelHead}
                                />
                                <Input
                                    ativo={false}
                                    valor={this.state.consulta.data} 
                                    parametrosTamanho={parametrosTamanhoInputIdHead}
                                    classeForm="inputMin"
                                />
                                <Label
                                    coluna={true}
                                    texto="Hora:"
                                    id="head"
                                    parametrosTamanho={parametrosTamanhoLabelHead}
                                />
                                <Input
                                    ativo={false}
                                    valor={this.state.consulta.hora} 
                                    parametrosTamanho={{head: true, input: true, min: true}}
                                    classeForm="inputMin"
                                />
                                <Form.Label
                                    column
                                    xs={Utils.getTamanhoColuna("xs", parametrosTamanhoButtonHead)}
                                    sm={Utils.getTamanhoColuna("sm", parametrosTamanhoButtonHead)}
                                    md={Utils.getTamanhoColuna("md", parametrosTamanhoButtonHead)}
                                    lg={Utils.getTamanhoColuna("lg", parametrosTamanhoButtonHead)}
                                    xl={Utils.getTamanhoColuna("xl", parametrosTamanhoButtonHead)}
                                    id="simulacaoheadButton"
                                >
                                    <ButtonSuccess
                                            valido={this.isCamposValido()}
                                            funcao={this.finaliza}
                                            texto={"Finalizar"}
                                    />
                                </Form.Label>
                                <Form.Label
                                    column
                                    xs={Utils.getTamanhoColuna("xs", parametrosTamanhoButtonHead)}
                                    sm={Utils.getTamanhoColuna("sm", parametrosTamanhoButtonHead)}
                                    md={Utils.getTamanhoColuna("md", parametrosTamanhoButtonHead)}
                                    lg={Utils.getTamanhoColuna("lg", parametrosTamanhoButtonHead)}
                                    xl={Utils.getTamanhoColuna("xl", parametrosTamanhoButtonHead)}
                                    id="simulacaoheadButton"
                                >
                                    <ButtonCancel
                                            valido={this.isCamposValido()}
                                            funcao={this.desmarcar}
                                            texto={"Desmarcar"}
                                    />
                                </Form.Label>
                            </Form.Group>
                        </Form>
                        <hr></hr>
                        <Row>
                            <Label 
                                texto="Observação da consulta" 
                            />
                            <Textarea 
                                texto={this.state.consulta.observacao}
                                funcao={this.setObservacao}
                                ativo={this.isCamposValido()}
                            />
                        </Row>
                        <hr></hr>
                        <Row>
                            <Label 
                                texto="Peso (Kg):" 
                                parametrosTamanho={Utils.parametrosTamanhoLabelMin}
                                coluna={true}
                            />
                            <Input 
                                valor={this.state.consulta.peso}
                                parametrosTamanho={Utils.parametrosTamanhoInputMin}
                                classeForm="inputMin"
                                inputTexto={false}
                                funcao={this.setPeso}
                                ativo={this.isCamposValido()}
                            />
                            <Label 
                                texto="Peso anterior (Kg):" 
                                parametrosTamanho={Utils.parametrosTamanhoLabelMin}
                                coluna={true}
                            />
                            <Input 
                                valor={this.state.consulta.pesoAnterior}
                                parametrosTamanho={Utils.parametrosTamanhoInputMin}
                                ativo={false}
                                inputTexto={false}
                                classeForm="inputMin"
                            />
                            <Label 
                                texto="Peso ideal ±(Kg):" 
                                parametrosTamanho={Utils.parametrosTamanhoLabelMin}
                                coluna={true}
                            />
                            <Input 
                                valor={this.state.pesoIdeal}
                                parametrosTamanho={Utils.parametrosTamanhoInputMin}
                                ativo={false}
                                inputTexto={false}
                                classeForm="inputMin"
                            />
                        </Row>
                        <p></p>
                        <Row>
                            <Label 
                                texto="Altura (cm):" 
                                parametrosTamanho={Utils.parametrosTamanhoLabelMin}
                                coluna={true}
                            />
                            <Input 
                                valor={this.state.consulta.altura}
                                parametrosTamanho={Utils.parametrosTamanhoInputMin}
                                classeForm="inputMin"
                                inputTexto={false}
                                decimal={0}
                                funcao={this.setAltura}
                                ativo={this.isCamposValido()}
                            />
                            <Label 
                                texto="IMC:" 
                                parametrosTamanho={Utils.parametrosTamanhoLabelMin}
                                coluna={true}
                            />
                            <Input 
                                valor={this.state.imc}
                                parametrosTamanho={Utils.parametrosTamanhoInputMin}
                                ativo={false}
                                inputTexto={false}
                                classeForm="inputMin"
                            />
                        </Row>
                        <p></p>
                        <Row>
                            <Label 
                                texto={"Resultado:"} 
                                parametrosTamanho={Utils.parametrosTamanhoLabelMin}
                                coluna={true}
                            />
                            <Input 
                                valor={this.state.imcDescritivo}
                                parametrosTamanho={{input: true}}
                                ativo={false}
                                inputTexto={true}
                                classeForm="inputMin"
                            />
                        </Row>
                    </Col>
                    <Col sm={2}>
                        <ConsultaOpcoesCard 
                            consultaValida={this.isCamposValido()}
                            funcaoAgendarNovaConsulta={this.exibeModalAgendarNovaConsulta}
                            funcaoReagendarConsulta={this.exibeModalReagendaConsulta}
                            consultaAtual={this.state.idConsulta == this.state.consulta.id && this.state.idConsulta > -1}
                            funcaoAnamnese={this.exibeModalAnamneseBotao}
                            funcaoMedida={this.exibeModalMedida}
                        />
                    </Col>
                </Row>
                <hr></hr>
                {this.state.consultasNaoRealizadas.length > 0 && this.state.idConsulta != this.state.consulta.id ? 
                <>                    
                    <Row>
                        <Col sm={12}>
                            <ConsultasNaoRealizadasAccordion dados={this.state.consultasNaoRealizadas}/>
                        </Col>
                    </Row>
                    <hr></hr>
                </>
                : <></>}
                {this.state.consultasAnteriores.length > 0 ?
                <>
                    <Row>
                        <Col sm={12}>
                            <ConsultasAnterioresAccordion dados={this.state.consultasAnteriores}/>
                        </Col>
                    </Row>
                </>
                : <></>}
            </Container>
        </>);
    }
}

export default ConsultaForm;