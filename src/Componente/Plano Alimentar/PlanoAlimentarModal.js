/* IMPORT REACT */
import { Container, Row } from "reactstrap";

/* IMPORT COMPONENTE */
import RefeicaoCheck from "../Refeicao/RefeicaoCheck";

/* IMPORT UI */
import ModalANI from "../UI/Modal/ModalANI";
import Label from "../UI/Label";
import Input from "../UI/Input";

/* IMPORT GERAL */
import Utils from "../../Geral/Utils";

/* IMPORT DTO */
import PlanoAlimentarDTO from "../../DTO/Plano Alimentar/PlanoAlimentarDTO";

class PlanoAlimentarModal extends ModalANI {
    constructor(props) {
        super(props);

        /* BIND */
        this.setDescricao = this.setDescricao.bind(this);
        this.setRefeicaoSelecionados = this.setRefeicaoSelecionados.bind(this);

        this.state.registro = props.registro;
        this.state.titulo = this.isNovo()
            ? "Novo Plano Alimentar"
            : "Edição - Plano Alimentar " + this.state.registro.id;       
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
        var registro = PlanoAlimentarDTO.json();
        Object.assign(registro, this.state.registro);
        registro.descricao = value;
        this.setState({ registro: registro });
    }

    setRefeicaoSelecionados(value) {
        var registro = PlanoAlimentarDTO.json();
        Object.assign(registro, this.state.registro);
        registro.refeicoes = value;
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
                        texto="Refeições:"
                        classe="labelCustom"
                        parametrosTamanho={this.paramsColunaLabel}
                    />
                    <RefeicaoCheck 
                        planoAlimentar={this.state.registro.id > 0 ? this.state.registro.id : null}
                        parametrosTamanho={this.paramsColunaInput} 
                        setRefeicaoSelecionados={this.setRefeicaoSelecionados}/>
                </Row>
            </Container>
        );
    }
}

export default PlanoAlimentarModal;