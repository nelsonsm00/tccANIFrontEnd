/* IMPORT REACT */
import { Col, Form } from "reactstrap";
import FormCheck from 'react-bootstrap/FormCheck'

/* IMPORT COMPONENTE */
import Componente from "../Arquitetura/Componente";

/* IMPORT UI */

/* IMPORT GERAL */
import Utils from "../../Geral/Utils";

/* IMPORT SERVICE */
import RefeicaoService from "../../Service/Refeicao/RefeicaoService";

class RefeicaoCheck extends Componente {
    constructor(props) {
        super(props);

        /* BIND */
        this.resetaModal = this.resetaModal.bind(this);
        this.setSelecionado = this.setSelecionado.bind(this);
        
        this.state.modal = Utils.getModal();
        this.state.dados = [];
        this.state.planoAlimentar = props.planoAlimentar;

        this.service = RefeicaoService;
    }

    setSelecionado(index) {
        this.state.dados[index].selecionado = this.state.dados[index].hasOwnProperty("selecionado") ? !this.state.dados[index].selecionado : true;
        this.props.setRefeicaoSelecionados(this.state.dados);
    }

    async componentDidMount() {
        this.setRequisicaoEmAndamento(true);
        var response = await this.service.Lista(this.state.planoAlimentar);
        this.setState({ dados: response.response });
        if (this.service.verificaErro(response))
            this.setModalResponse(response.erro);
        this.setRequisicaoEmAndamento(false);
    }

    render() {
        return (<>
                    {this.renderComponente()}
                    <Col
                        xs={Utils.getTamanhoColuna("xs", this.props.parametrosTamanho)}
                        sm={Utils.getTamanhoColuna("sm", this.props.parametrosTamanho)}
                        md={Utils.getTamanhoColuna("md", this.props.parametrosTamanho)}
                        lg={Utils.getTamanhoColuna("lg", this.props.parametrosTamanho)}
                        xl={Utils.getTamanhoColuna("xl", this.props.parametrosTamanho)}
                    >
                    <Form>
                            {this.state.dados.map((d, index) => (
                            <FormCheck 
                                    label={d.descricao}
                                    name="gbRefeicao"
                                    type="checkbox"
                                    checked={d.selecionado}
                                    id={d.id}
                                    onChange={() => this.setSelecionado(index)}
                            />))}
                            
                    </Form>
                    </Col>
                </>);
    }
}

export default RefeicaoCheck;