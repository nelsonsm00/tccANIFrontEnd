/* IMPORT REACT */
import React from "react";
import { Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

/* IMPORT PROJETO */
import Componente from "../Arquitetura/Componente";
import MedidaHistoricoFormListagem from "./MedidaHistoricoFormListagem";

class MedidaHistoricoAccordion extends Componente {
    constructor(props) {
        super(props);

        this.state.tratamento = props.tratamento;
    }

    render() {
        return (
            <>
                <Accordion defaultActiveKey="1">
                    <Card className="cardBoxAccoordion">
                        <Card.Header className="cardAccoordion">
                            <Accordion.Toggle
                                as={Button}
                                variant="link"
                                eventKey="0"
                                className="textAccordion"
                            >
                                {"Medidas"}
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <Container>
                                    <Row>
                                        <Col sm="12">
                                            <MedidaHistoricoFormListagem tratamento={this.state.tratamento}/>
                                        </Col>
                                    </Row>
                                </Container>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </>
        );
    }
}

export default MedidaHistoricoAccordion;
