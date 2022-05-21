/* IMPORT REACT */
import { Container, Row, Col } from "reactstrap";

/* IMPORT COMPONENTE */
import AlimentoUnidadeSelect from "./AlimentoUnidadeSelect";

/* IMPORT UI */
import ModalANI from "../UI/Modal/ModalANI";
import Label from "../UI/Label";
import Input from "../UI/Input";

/* IMPORT GERAL */
import Utils from "../../Geral/Utils";
import MascaraNumerica from "../../Geral/MascaraNumerica";

/* IMPORT DTO */
import PlanoAlimentarRefeicaoAlimentoDTO from "../../DTO/Plano Alimentar/PlanoAlimentarRefeicaoAlimentoDTO";

class AlimentoModal extends ModalANI {
    constructor(props) {
        super(props);

        /* BIND */
        this.setDescricao = this.setDescricao.bind(this);
        this.setQuantidade = this.setQuantidade.bind(this);
        this.setUnidade = this.setUnidade.bind(this);

        this.state.registro = props.registro;
        this.state.unidades = this.getUnidades(props.registro);
        this.state.titulo = this.isNovo() ? "Novo Alimento" : "Edição Alimento";    
    }

    /* FUNCOES GET */
    getTextoPerguntaSuccess() {
        return "Salvar";
    }

    getTextoPerguntaCancel() {
        return "Cancelar";
    }

    getUnidades(registro) {
        var unidades = [{id: "PADRAO", descricao: "PADRAO"}];
        registro.unidadeMedidaCaseira.forEach(un => {
            unidades.push({id: un.unidadeMedidaCaseira.toUpperCase(), descricao: un.unidadeMedidaCaseira.toUpperCase()})
        });
        return unidades;
    }

    /* FUNCOES VERIFICADORAS */
    isValidoSuccess() {
        return Utils.isStringValida(this.state.registro.alimento.descricao) && this.state.registro.quantidade > 0;
    }

    /* FUNCOES SET */
    setDescricao(value) {
        var registro = PlanoAlimentarRefeicaoAlimentoDTO.json();
        Object.assign(registro, this.state.registro);
        registro.alimento.descricao = value;
        this.setState({ registro: registro });
    }

    setQuantidade(value) {
        var registro = PlanoAlimentarRefeicaoAlimentoDTO.json();
        Object.assign(registro, this.state.registro);
        registro.quantidade = MascaraNumerica.converteFloat(value);
        this.setState({ registro: registro });
    }

    setUnidade(value) {
        var registro = PlanoAlimentarRefeicaoAlimentoDTO.json();
        Object.assign(registro, this.state.registro);
        registro.unidade = value.id;
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
                        valor={this.state.registro.alimento.descricao}
                        funcao={this.setDescricao}
                        inputTexto={true}
                        parametrosTamanho={this.paramsColunaInput}
                        max={100}
                    />           
                </Row>
                <hr></hr>
                <Row>
                    <Label
                        texto="Quantidade:"
                        classe="labelCustom"
                        parametrosTamanho={this.paramsColunaLabel}
                    /> 
                    <Input
                        valor={this.state.registro.quantidade}
                        funcao={this.setQuantidade}
                        inputTexto={false}
                        parametrosTamanho={this.paramsColunaInput}
                    />
                </Row>
                <hr></hr>
                {this.state.unidades != undefined && this.state.unidades.length > 0 ?
                <Row>
                    <Label
                        texto="Unidade:"
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
                        <AlimentoUnidadeSelect dados={this.state.unidades} valorPadrao={this.isNovo() ? "PADRAO" : this.state.registro.unidade} funcao={this.setUnidade}/>
                    </Col>
                </Row> : <></>}
            </Container>
        );
    }
}

export default AlimentoModal;