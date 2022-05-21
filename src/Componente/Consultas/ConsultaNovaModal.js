/* IMPORT REACT */
import { Container, Row, Col } from "reactstrap";

/* IMPORT UI */
import ModalANI from "../UI/Modal/ModalANI";
import Label from "../UI/Label";
import Calendario from "../UI/Calendario";
import RelogioSelect from "../UI/Select/RelogioSelect";

/* IMPORT DTO */
import HorarioDTO from "../../DTO/Configuracao/HorarioDTO";

/* IMPORT GERAL */
import Utils from "../../Geral/Utils";
import Data from "../../Geral/Data";

class ConsultaNovaModal extends ModalANI {
    constructor(props) {
        super(props);

        this.state.registro = props.registro;
        this.reagendar = this.state.registro.data != null;
        this.state.titulo =  this.reagendar ? "Reagendar consulta" : "Nova consulta";   
        this.state.dados = props.horarios;  

        this.setData = this.setData.bind(this);
        this.setHorario = this.setHorario.bind(this);
    }

    /* FUNCOES GET */
    getTextoPerguntaSuccess() {
        return this.reagendar ? "Reagendar" : "Agendar";
    }

    getTextoPerguntaCancel() {
        return "Cancelar";
    }

    /* FUNCOES SET */
    setData(value) {
        var registro = HorarioDTO.json();
        Object.assign(registro, this.state.registro);
        registro.data = value;
        this.setState({ registro: registro });
    }

    setHorario(value) {
        var registro = HorarioDTO.json();
        Object.assign(registro, this.state.registro);
        registro.horario = value.id;
        this.setState({ registro: registro });
    }

    executaFuncao(funcao) {
        if (this.state.registro.data == null)
            this.state.registro.data = Data.converteDataString(new Date(), true);
        funcao(this.state.registro);
    }

    renderBody() {
        return (
            <Container>
                <Row>
                    <Label
                        texto="Data:"
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
                            <Calendario
                                functionSetData={this.setData}
                                valorPadrao={this.state.registro.data}
                            />
                        </Col>         
                </Row>
                <hr></hr>
                <Row>
                    <Label
                        texto="Hora:"
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
                            <RelogioSelect
                                funcao={this.setHorario}
                                valorPadrao={this.state.registro.horario == null 
                                                ? this.state.dados[0]
                                                : this.state.registro.horario}
                                horarios={this.state.dados}
                            />
                        </Col>         
                </Row>
            </Container>
        );
    }
}

export default ConsultaNovaModal;