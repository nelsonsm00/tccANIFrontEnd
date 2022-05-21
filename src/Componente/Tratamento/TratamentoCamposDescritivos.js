/* IMPORT REACT */
import { Col, Row, Container } from "react-bootstrap";

/* IMPORT COMPONENTE */
import Componente from "../Arquitetura/Componente";

/* IMPORT UI */
import Label from "../UI/Label";
import Textarea from "../UI/Textarea/Textarea";
import ButtonSuccess from "../UI/Button/ButtonSuccess";

/* IMPORT DTO */
import TratamentoDTO from "../../DTO/Tratamento/TratamentoDTO";

/* IMPORT GERAL */
import Utils from "../../Geral/Utils";
import ModalEnum from "../../Geral/ModalEnum";

/* IMPORT SERVICE */
import TratamentoService from "../../Service/Tratamento/TratamentoService";

class TratamentoCamposDescritivos extends Componente {
    constructor(props) {
        super(props);

        /* BIND */
        this.setObservacao = this.setObservacao.bind(this);
        this.setMotivo = this.setMotivo.bind(this);
        this.setObjetivo = this.setObjetivo.bind(this);
        this.salvar = this.salvar.bind(this);
        this.resetaModal = this.resetaModal.bind(this);

        this.state.tratamento = TratamentoDTO.json();
        this.state.tratamento.id = props.tratamento;

        this.service = TratamentoService;
    }

    /* FUNCOES SET */
    setObservacao(valor) {
        var json = {};
        Object.assign(json, this.state.tratamento);
        json.observacao = Utils.converteQuebraLinhaHtml(valor)
        this.setState({tratamento: json});
    }

    setMotivo(valor) {
        var json = {};
        Object.assign(json, this.state.tratamento);
        json.motivo = Utils.converteQuebraLinhaHtml(valor)
        this.setState({tratamento: json});
    }

    setObjetivo(valor) {
        var json = {};
        Object.assign(json, this.state.tratamento);
        json.objetivo = Utils.converteQuebraLinhaHtml(valor)
        this.setState({tratamento: json});
    }

    /* REQUISICOES */

    async salvar() {
        this.setRequisicaoEmAndamento(true);
        var response = await this.service.Put(this.state.tratamento);
        this.setRequisicaoEmAndamento(false);
        if (this.service.verificaErro(response)) {
            this.setModalResponse(response.erro);
        }
        else {
            this.setModalResponse("Anotações salvas com sucesso.", ModalEnum.tipo.sucesso);
        }        
    }

    async componentDidMount() {
        this.setRequisicaoEmAndamento(true);
        var response = await this.service.Get(this.state.tratamento.id);
        var responseVazio = response.response == [];
        this.setState({ tratamento: (responseVazio ? TratamentoDTO.json() : response.response) });
        if (this.service.verificaErro(response)) {
            this.setModalResponse(response.erro);
        }
        this.setRequisicaoEmAndamento(false);
    }

    render() {
        return (<> 
                    {super.renderComponente()}
                    <Container>
                        <Row>
                            <Col sm={12}>
                                <Row>
                                    <Label 
                                        texto="Observação do tratamento" 
                                    />
                                    <Textarea 
                                        texto={this.state.tratamento.observacao}
                                        funcao={this.setObservacao}
                                    />
                                </Row>
                                <hr></hr>
                                <Row>
                                    <Label 
                                        texto="Motivo do tratamento" 
                                    />
                                    <Textarea 
                                        texto={this.state.tratamento.motivo}
                                        funcao={this.setMotivo}
                                    />
                                </Row>
                                <hr></hr>
                                <Row>
                                    <Label 
                                        texto="Objetivo do tratamento" 
                                    />
                                    <Textarea 
                                        texto={this.state.tratamento.objetivo}
                                        funcao={this.setObjetivo}
                                    />
                                </Row>
                                <hr></hr>
                                <Row>
                                    <Col sm={8}>
                                    </Col>
                                    <Col sm={4}>
                                        <ButtonSuccess 
                                            funcao={this.salvar}
                                            texto={"Salvar"}
                                            valido={true}
                                        />   
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
            </>);
    }
}

export default TratamentoCamposDescritivos;
