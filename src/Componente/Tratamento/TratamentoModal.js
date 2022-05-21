/* IMPORT REACT */
import { Container, Row, Col } from "reactstrap";

/* IMPORT UI */
import ModalANI from "../UI/Modal/ModalANI";
import Label from "../UI/Label";
import PacienteSelect from "../Paciente/PacienteSelect";

/* IMPORT GERAL */
import Utils from "../../Geral/Utils";
import PacienteDTO from "../../DTO/Paciente/PacienteDTO";

class TratamentoModal extends ModalANI {
    constructor(props) {
        super(props);

        this.state.registro = props.registro;
        this.state.titulo = "Novo Tratamento";
        this.setPaciente = this.setPaciente.bind(this);
    }

    /* FUNCOES GET */
    getTextoPerguntaSuccess() {
        return "Salvar";
    }

    getTextoPerguntaCancel() {
        return "Cancelar";
    }

    /* FUNCOES SET */
    setPaciente(value) {
        var registro = PacienteDTO.json();
        Object.assign(registro, this.state.registro);
        registro.id = value.id;
        this.setState({ registro: registro });
    }

    /* FUNCOES VERIFICADORAS */
    isValidoSuccess() {
        return this.state.registro.id > 0;
    }

    executaFuncao(funcao) {
        funcao(this.state.registro.id);
    }

    renderBody() {
        return (
            <Container>
                <Row>
                    <Label
                        texto="Paciente:"
                        classe="labelCustom"
                        parametrosTamanho={this.paramsColunaLabel}
                    />           
                    <Col
                            xs={Utils.getTamanhoColuna("xs", this.paramsColunaInput)}
                            sm={Utils.getTamanhoColuna("sm", this.paramsColunaInput)}
                            md={Utils.getTamanhoColuna("md", this.paramsColunaInput)}
                            lg={Utils.getTamanhoColuna("lg", this.paramsColunaInput)}
                            xl={Utils.getTamanhoColuna("xl", this.paramsColunaInput)}
                        >
                            <PacienteSelect
                                funcao={this.setPaciente}
                                valorPadrao={this.state.registro.id > 0 ? this.state.registro.id : -1}
                            />
                        </Col>         
                </Row>
            </Container>
        );
    }
}

export default TratamentoModal;