/* IMPORT REACT */
import { Col, Form, Container, Row } from "reactstrap";
import FormCheck from 'react-bootstrap/FormCheck';
import { EditorState, convertToRaw, convertFromHTML, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

/* IMPORT UI */
import ModalANI from "../UI/Modal/ModalANI";
import Label from "../UI/Label";
import Input from "../UI/Input";
import Editor from "../UI/Textarea/Editor";

/* IMPORT GERAL */
import Utils from "../../Geral/Utils";

/* IMPORT DTO */
import OrientacaoDTO from "../../DTO/Orientacao/OrientacaoDTO";

class OrientacaoModal extends ModalANI {
    constructor(props) {
        super(props);

        /* BIND */
        this.setTitulo = this.setTitulo.bind(this);
        this.setTexto = this.setTexto.bind(this);
        this.setPublico = this.setPublico.bind(this);

        this.state.registro = props.registro;
        this.state.titulo = this.isNovo()
            ? "Nova Orientação"
            : "Edição - Orientação " + this.state.registro.id;       
        this.state.editorState = this.isNovo() || !Utils.isStringValida(this.state.registro.texto)
            ? EditorState.createEmpty()
            : EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(this.state.registro.texto)));
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
        return Utils.isStringValida(this.state.registro.titulo) && Utils.isStringValida(this.state.registro.texto)
    }

    /* FUNCOES SET */
    setTitulo(value) {
        var registro = OrientacaoDTO.json();
        Object.assign(registro, this.state.registro);
        registro.titulo = value;
        this.setState({ registro: registro });
    }

    setTexto(value) {
        var registro = OrientacaoDTO.json();
        Object.assign(registro, this.state.registro);
        registro.texto = draftToHtml(convertToRaw(value.getCurrentContent()));         
        this.setState({editorState: value, registro: registro});
        console.log(registro);
    }

    setPublico() {
        var registro = OrientacaoDTO.json();
        Object.assign(registro, this.state.registro);
        registro.publico = !registro.publico;
        this.setState({ registro: registro });
    }

    executaFuncao(funcao) {
        funcao(this.state.registro);
    }

    renderBody() {
        var paramsColuna = {modal: true, line: true};
        var paramsColunaMin = {modal: true, line: true, min: true};
        return (
            <Container>
                <Row>
                    <Label
                        texto="Título:"
                        classe="labelCustom"
                        parametrosTamanho={paramsColunaMin}
                    /> 
                    <Input
                        valor={this.state.registro.titulo}
                        funcao={this.setTitulo}
                        inputTexto={true}
                        parametrosTamanho={paramsColuna}
                        max={30}
                    />     
                    <Col
                        xs={Utils.getTamanhoColuna("xs", paramsColunaMin)}
                        sm={Utils.getTamanhoColuna("sm", paramsColunaMin)}
                        md={Utils.getTamanhoColuna("md", paramsColunaMin)}
                        lg={Utils.getTamanhoColuna("lg", paramsColunaMin)}
                        xl={Utils.getTamanhoColuna("xl", paramsColunaMin)}
                    >
                        <Form>
                            <FormCheck 
                                label={"Orientação pública"}
                                name="gbPublico"
                                type="checkbox"
                                checked={this.state.registro.publico}
                                onChange={() => this.setPublico()}
                                className="formCheckPublic"
                            />  
                        </Form>   
                    </Col>   
                </Row>
                <hr></hr>
                <Row>
                    <Editor editor={this.state.editorState} funcao={this.setTexto}/>
                </Row>
                <br/><br/>
            </Container>
        );
    }
}

export default OrientacaoModal;