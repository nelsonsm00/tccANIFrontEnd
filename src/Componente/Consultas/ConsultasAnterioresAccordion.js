/* IMPORT REACT */
import React from "react";
import { Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

/* IMPORT PROJETO */
import Componente from "../Arquitetura/Componente";
import Label from "../UI/Label";
import ConsultasAnterioresFormListagem from "./ConsultasAnterioresFormListagem";
import Textarea from "../UI/Textarea/Textarea";
import Utils from "../../Geral/Utils";

class ConsultasAnterioresAccordion extends Componente {
    constructor(props) {
        super(props);
        /* BIND */
        this.setObservacao = this.setObservacao.bind(this);

        this.state.observacao = "";
    }

    setObservacao(value) {
        this.setState({observacao: Utils.converteQuebraLinhaHtml(value)});
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
                                {"Consultas anteriores"}
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <Container>
                                    <Row>
                                        <Col sm="8">
                                            <ConsultasAnterioresFormListagem dados={this.props.dados} setObservacao={this.setObservacao}/>
                                        </Col>
                                        <Col sm="4">
                                            <Label 
                                                texto="Observação da consulta" 
                                            />
                                            <Textarea 
                                                texto={this.state.observacao}
                                                ativo={false}
                                            />
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

export default ConsultasAnterioresAccordion;
