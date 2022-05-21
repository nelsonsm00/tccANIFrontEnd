/* IMPORT REACT */
import { Col, Row, Container } from "react-bootstrap";

/* IMPORT COMPONENTE */
import Componente from "../Arquitetura/Componente";
import MedidaHistoricoAccordion from "../Medida/MedidaHistoricoAccordion";

/* IMPORT GERAL */

class TratamentoHistorico extends Componente {
    constructor(props) {
        super(props);

        this.state.tratamento = props.tratamento;
    }

    render() {
        return (<> 
                    {super.renderComponente()}
                    <Container>
                        <Row>
                            <Col sm={12}>
                                <MedidaHistoricoAccordion tratamento={this.state.tratamento} />                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
                            </Col>
                            <hr></hr>
                        </Row>
                    </Container>
            </>);
    }
}

export default TratamentoHistorico;
