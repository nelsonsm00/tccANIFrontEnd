/* IMPOR REACT */
import { Col, Row, Container } from "react-bootstrap";

/* IMPORT COMPONENTE */
import FormCustom from "../Arquitetura/FormCustom";

/* IMPORT UI */
import Label from "../UI/Label";
import ButtonSuccess from "../UI/Button/ButtonSuccess";
import ButtonCancel from "../UI/Button/ButtonCancel";
import Input from "../UI/Input";

/* IMPORT GERAL */
import ModalEnum from "../../Geral/ModalEnum";
import Utils from "../../Geral/Utils";
import MascaraNumerica from "../../Geral/MascaraNumerica";

/* IMPORT DTO */

/* IMPORT SERVICE */
import MedidaService from "../../Service/Medida/MedidaService";

class MedidaForm extends FormCustom {
    constructor(props) {
        super(props);

        /* BIND */
        this.salvar = this.salvar.bind(this);
        this.resetaModal = this.resetaModal.bind(this);
        this.setDados = this.setDados.bind(this);

        this.state.dados = [];
        this.state.consulta = props.consulta;
        this.state.modal = Utils.getModal();

        this.service = MedidaService;       
    }

    /* SET */
    setDados(value, parametros) {
        var dados = [];
        Object.assign(dados, this.state.dados);
        dados[parametros.index].valor = MascaraNumerica.converteFloat(value);
        this.setState({dados: dados});
    }

    /* REQUISICOES */
    async componentDidMount() {
        this.setRequisicaoEmAndamento(true);
        var response = await this.service.Lista(this.state.consulta);
        this.setState({ dados: response.response });
        if (this.service.verificaErro(response))
            this.setModalResponse(response.erro);
        this.setRequisicaoEmAndamento(false);
    }

    async salvar() {
        this.setRequisicaoEmAndamento(true);
        var response = await this.service.Put(this.state.dados);
        if (this.service.verificaErro(response))
            this.setModalResponse(response.erro);
        else {
            this.setState({
                modal: Utils.getModal(true, "Medidas salvas com sucesso.", ModalEnum.tipo.sucesso, true, false, this.resetaModal)
            });
        }
        this.setRequisicaoEmAndamento(false);
    }

    /* RENDER */
    renderMedidas() {
        var dadosLadoLado = [];
        for(var i = 0; i < this.state.dados.length; i++) {
            var aux = [];
            aux.push({dado: this.state.dados[i], index: i});
            if (i+1 < this.state.dados.length)
                aux.push({dado: this.state.dados[i+1], index: i+1});
            dadosLadoLado.push(aux);
            i++;
        }
        return dadosLadoLado;
    }

    render() {
            var params = {form: true};
            var paramsLabel = {form: true, label: true};
            return(<>
                    {super.renderComponente()}
                    <Container>
                        <Row>
                            <Col sm={12}>
                                <>
                                {this.renderMedidas().map((d) => (      
                                    <>                      
                                    <Row>
                                        <Label
                                            texto={d[0].dado.descricao + ":"}
                                            classe="labelCustom"
                                            parametrosTamanho={paramsLabel}
                                        /> 
                                        <Input
                                            valor={d[0].dado.valor}
                                            funcao={this.setDados}
                                            inputTexto={false}
                                            parametrosTamanho={params}
                                            parametrosFuncao={{index: d[0].index}}
                                        />
                                        {d.length > 1 ?
                                        <>
                                        <Label
                                        texto={d[1].dado.descricao + ":"}
                                        classe="labelCustom"
                                        parametrosTamanho={paramsLabel}
                                        /> 
                                        <Input
                                            valor={d[1].dado.valor}
                                            funcao={this.setDados}
                                            inputTexto={false}
                                            parametrosTamanho={params}
                                            parametrosFuncao={{index: d[1].index}}
                                        />
                                        </> : <></>}
                                    </Row>
                                    <hr></hr>
                                    </>
                                ))}
                                </>  
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
                            </Col> 
                        </Row>
                    </Container>
                </>); 
    }
}

export default MedidaForm; 