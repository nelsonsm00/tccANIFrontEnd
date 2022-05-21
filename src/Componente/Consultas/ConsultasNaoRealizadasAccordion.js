/* IMPORT REACT */
import React from "react";
import { Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

/* IMPORT PROJETO */
import Componente from "../Arquitetura/Componente";
import ConsultasNaoRealizadasFormListagem from "./ConsultasNaoRealizadasFormListagem";


class ConsultasNaoRealizadasAccordion extends Componente {
    constructor(props) {
        super(props);

        this.state.dados = props.dados;
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
                                {"Consultas futuras"}
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <Container>
                                    <Col sm="8">
                                        <ConsultasNaoRealizadasFormListagem dados={this.state.dados}/>
                                    </Col>
                                    <Col sm="4">
                                    </Col>
                                </Container>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </>
        );
    }
}

export default ConsultasNaoRealizadasAccordion;
