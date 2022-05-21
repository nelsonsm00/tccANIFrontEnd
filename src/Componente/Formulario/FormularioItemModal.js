/* IMPORT REACT */
import { Container, Row, Col } from "reactstrap";

/* IMPORT COMPONENTE */
import FormularioItemSelect from "./FormularioItemSelect";

/* IMPORT UI */
import ModalANI from "../UI/Modal/ModalANI";
import Label from "../UI/Label";
import Input from "../UI/Input";
import Textarea from "../UI/Textarea/Textarea";

/* IMPORT GERAL */
import Utils from "../../Geral/Utils";

/* IMPORT DTO */
import FormularioItemDTO from "../../DTO/Formulario/FormularioItemDTO";

class FormularioItemModal extends ModalANI {
    constructor(props) {
        super(props);

        /* BIND */
        this.setDescricao = this.setDescricao.bind(this);
        this.setTipo = this.setTipo.bind(this);
        this.setAlternativas = this.setAlternativas.bind(this);

        this.state.registro = props.registro;
        this.state.titulo = this.isNovo() ? "Novo Item"
            : "Edição - Item " + this.state.registro.id;       
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
        var registro = FormularioItemDTO.json();
        Object.assign(registro, this.state.registro);
        registro.descricao = value;
        this.setState({ registro: registro });
    }

    setTipo(value) {
        var registro = FormularioItemDTO.json();
        Object.assign(registro, this.state.registro);
        registro.tipo = value.id;
        this.setState({ registro: registro });
    }

    setAlternativas(value) {
        if (value == null) value = "";
        var registro = FormularioItemDTO.json();
        Object.assign(registro, this.state.registro);
        registro.alternativas = Utils.converteQuebraLinhaHtml(value);
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
                <hr></hr>
                <Row>
                    <Label
                        texto="Tipo:"
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
                        <FormularioItemSelect
                            funcao={this.setTipo}
                            valorPadrao={!this.isNovo() ? this.state.registro.tipo : "T"}
                            inativo={!this.isNovo()}
                        />
                    </Col>   
                </Row>
                {this.state.registro.tipo == "C" 
                ?   <>
                        <hr></hr>
                        <Row>
                            <Label
                                texto="Alternativas (a cada nova linha é uma alternativa):"
                                classe="labelCustom"
                            />
                        </Row>
                        <Row>
                            <Textarea 
                                texto={this.state.registro.alternativas}
                                funcao={this.setAlternativas}
                                ativo={true}
                            />
                        </Row>
                    </>
                : <></>}
            </Container>
        );
    }
}

export default FormularioItemModal;