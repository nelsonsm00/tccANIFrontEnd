/* IMPORT REACT */
import { Container, Row } from "reactstrap";

/* IMPORT UI */
import ModalANI from "../UI/Modal/ModalANI";
import Label from "../UI/Label";
import Input from "../UI/Input";

/* IMPORT GERAL */
import Utils from "../../Geral/Utils";

/* IMPORT DTO */
import FormularioCategoriaDTO from "../../DTO/Formulario/FormularioCategoriaDTO";

class FormularioCategoriaModal extends ModalANI {
    constructor(props) {
        super(props);

        /* BIND */
        this.setDescricao = this.setDescricao.bind(this);

        this.state.registro = props.registro;
        this.state.titulo = this.isNovo() ? "Nova Categoria"
                                : "Edição - Categoria " + this.state.registro.id;       
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
        return Utils.isStringValida(this.state.registro.descricao);
    }

    /* FUNCOES SET */
    setDescricao(value) {
        var registro = FormularioCategoriaDTO.json();
        Object.assign(registro, this.state.registro);
        registro.descricao = value;
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
                        max={50}
                    />           
                </Row>
            </Container>
        );
    }
}

export default FormularioCategoriaModal;