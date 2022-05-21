/* IMPORT REACT */
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'

/* IMPORT COMPONENTE */
import Componente from "../Arquitetura/Componente";

/* IMPORT GERAL */
import Utils from "../../Geral/Utils";

class RefeicaoCard extends Componente {
    constructor(props) {
        super(props);

        /* BIND */
        this.resetaModal = this.resetaModal.bind(this);
        
        this.setSelecionado = props.funcao;
        this.state.modal = Utils.getModal();
    }

    render() {
        return(<>
                    {this.renderComponente()}
                    <Card className="cardRefeicao">
                        <ListGroup variant="flush">
                            {this.props.dados.map((d, index) => 
                                <ListGroup.Item 
                                    className={this.props.idRefeicao == index ? "itemRefeicaoSelecionado" : "itemRefeicao"}
                                    onClick={() => this.setSelecionado(index)}>
                                        {d.descricaoRefeicao}
                                </ListGroup.Item>)}
                        </ListGroup>
                    </Card>
            </>);
    }
}

export default RefeicaoCard;