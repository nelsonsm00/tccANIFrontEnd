/* IMPORT REACT */
import { Container, Row } from "reactstrap";

/* IMPORT UI */
import ModalANI from "../UI/Modal/ModalANI";
import Label from "../UI/Label";
import Input from "../UI/Input";

/* IMPORT GERAL */
import Utils from "../../Geral/Utils";

/* IMPORT DTO */
import PacienteDTO from "../../DTO/Paciente/PacienteDTO";

class PacienteModal extends ModalANI {
    constructor(props) {
        super(props);

        /* BIND */
        this.setNome = this.setNome.bind(this);
        this.setSobrenome = this.setSobrenome.bind(this);
        this.setEmail = this.setEmail.bind(this);

        this.state.registro = props.registro;
        this.state.titulo = this.isNovo()
            ? "Novo Paciente"
            : "Edição - Paciente " + this.state.registro.id;       
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
        return Utils.isStringValida(this.state.registro.nome) && Utils.isStringValida(this.state.registro.sobrenome) && 
            (this.state.registro.email == null || Utils.isEmailValido(this.state.registro.email));
    }

    /* FUNCOES SET */
    setNome(value) {
        var registro = PacienteDTO.json();
        Object.assign(registro, this.state.registro);
        registro.nome = value;
        this.setState({ registro: registro });
    }

    /* FUNCOES SET */
    setSobrenome(value) {
        var registro = PacienteDTO.json();
        Object.assign(registro, this.state.registro);
        registro.sobrenome = value;
        this.setState({ registro: registro });
    }

    setEmail(value) {
        var registro = PacienteDTO.json();
        Object.assign(registro, this.state.registro);
        registro.email = value;
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
                        texto="Nome:"
                        classe="labelCustom"
                        parametrosTamanho={this.paramsColunaLabel}
                    /> 
                    <Input
                        valor={this.state.registro.nome}
                        funcao={this.setNome}
                        inputTexto={true}
                        parametrosTamanho={this.paramsColunaInput}
                        max={100}
                    />           
                </Row>
                <hr></hr>
                <Row>
                    <Label
                        texto="Sobrenome:"
                        classe="labelCustom"
                        parametrosTamanho={this.paramsColunaLabel}
                    /> 
                    <Input
                        valor={this.state.registro.sobrenome}
                        funcao={this.setSobrenome}
                        inputTexto={true}
                        parametrosTamanho={this.paramsColunaInput}
                        max={100}
                    />
                </Row>
                <hr></hr>
                <Row>
                    <Label
                        texto="E-mail:"
                        classe="labelCustom"
                        parametrosTamanho={this.paramsColunaLabel}
                    /> 
                    <Input
                        valor={this.state.registro.email}
                        funcao={this.setEmail}
                        inputTexto={true}
                        parametrosTamanho={this.paramsColunaInput}
                        max={50}
                    />
                </Row>
            </Container>
        );
    }
}

export default PacienteModal;