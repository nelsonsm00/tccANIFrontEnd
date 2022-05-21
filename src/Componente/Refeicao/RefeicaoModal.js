/* IMPORT REACT */
import { Container, Row } from "reactstrap";

/* IMPORT UI */
import ModalANI from "../UI/Modal/ModalANI";
import Label from "../UI/Label";
import Input from "../UI/Input";

/* IMPORT GERAL */
import Utils from "../../Geral/Utils";

/* IMPORT DTO */
import RefeicaoDTO from "../../DTO/Refeicao/RefeicaoDTO";

class RefeicaoModal extends ModalANI {
    constructor(props) {
        super(props);

        /* BIND */
        this.setDescricao = this.setDescricao.bind(this);
        this.setHorario = this.setHorario.bind(this);

        this.state.registro = props.registro;
        this.state.titulo = this.isNovo()
            ? "Nova Refeição"
            : "Edição - Refeição " + this.state.registro.id;       
    }

    /* FUNCOES GET */
    getTextoPerguntaSuccess() {
        return "Salvar";
    }

    getTextoPerguntaCancel() {
        return "Cancelar";
    }

    /* FUNCOES VERIFICADORAS */
    isValidoSuccess() {
        var horarioSemPonto = "";
        if (this.state.registro.horario != null)
            horarioSemPonto = this.state.registro.horario.replaceAll(":", "");

        return Utils.isStringValida(this.state.registro.descricao) 
                && ((Utils.isStringValida(horarioSemPonto, true)
                && horarioSemPonto.length == 4 && (parseInt(horarioSemPonto[0]+horarioSemPonto[1]+"") <= 23 
                                                    && parseInt(horarioSemPonto[2]+horarioSemPonto[3]+"") <= 59)) 
                                            || horarioSemPonto.length == 0);
    }

    /* FUNCOES SET */
    setDescricao(value) {
        var registro = RefeicaoDTO.json();
        Object.assign(registro, this.state.registro);
        registro.descricao = value;
        this.setState({ registro: registro });
    }

    /* FUNCOES SET */
    setHorario(value) {
        var apagou = false;
        var inseriu = false;

        if (this.state.registro.horario != null) {
            apagou = value.length < this.state.registro.horario.length;
            inseriu = value.length > this.state.registro.horario.length;
        }
        var horarioSemPonto = value.replaceAll(":", "")
        
        //06:
        if (apagou && horarioSemPonto.length <= 2) {
            value = horarioSemPonto;
        }
        
        //06
        if (inseriu && horarioSemPonto.length == 2 && this.state.registro.horario.length == 1) {
            value = horarioSemPonto + ":";
        }

        //06:2
        if (inseriu && horarioSemPonto.length == 3 && this.state.registro.horario.length == 2) {
            value = horarioSemPonto[0] + horarioSemPonto[1] + ":" + horarioSemPonto[2];
        }

        var registro = RefeicaoDTO.json();
        Object.assign(registro, this.state.registro);
        registro.horario = value;
        this.setState({ registro: registro });
    }

    executaFuncao(funcao) {
        funcao(this.state.registro);
    }

    renderBody() {
        return (
            <Container>
                <Row>
                    <Label
                        texto="Descrição:"
                        classe="labelCustom"
                        parametrosTamanho={this.paramsColunaLabel}
                    /> 
                    <Input
                        valor={this.state.registro.descricao}
                        funcao={this.setDescricao}
                        inputTexto={true}
                        parametrosTamanho={this.paramsColunaInput}
                        max={100}
                    />           
                </Row>
                <hr></hr>
                <Row>
                    <Label
                        texto="Horário:"
                        classe="labelCustom"
                        parametrosTamanho={this.paramsColunaLabel}
                    /> 
                    <Input
                        valor={this.state.registro.horario}
                        funcao={this.setHorario}
                        inputTexto={true}
                        parametrosTamanho={this.paramsColunaInput}
                        max={100}
                    />
                </Row>
            </Container>
        );
    }
}

export default RefeicaoModal;