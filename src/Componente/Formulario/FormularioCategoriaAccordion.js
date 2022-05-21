/* IMPORT REACT */
import React from "react";
import { Container, Row, Form, Col } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

/* IMPORT COMPONENTE */
import Componente from "../Arquitetura/Componente";
import RefeicaoCard from "../Refeicao/RefeicaoCard";
import RefeicaoAlimentoFormListagem from "../Alimento/RefeicaoAlimentoFormListagem";
import FormularioItemSortable from "./FormularioItemSortable"

/* IMPORT UI */
import ButtonSuccess from "../UI/Button/ButtonSuccess";
import ButtonCancel from "../UI/Button/ButtonCancel";
import IconAdd from "../UI/Icon/IconAdd";
import IconEdit from "../UI/Icon/IconEdit";
import IconDelete from "../UI/Icon/IconDelete";


/* IMPORT DTO */
import FormularioCategoriaDTO from "../../DTO/Formulario/FormularioCategoriaDTO";
import FormularioItemDTO from "../../DTO/Formulario/FormularioItemDTO";

/* IMPORT GERAL */
import Utils from "../../Geral/Utils";
import Cache from "../../Geral/Cache/Cache";
import ModalEnum from "../../Geral/ModalEnum";

/* IMPORT SERVICE */
import FormularioService from "../../Service/Formulario/FormularioService";

class FormularioCategoriaAccordion extends Componente {
    constructor(props) {
        super(props);

        /* BIND */
        this.setDados = this.setDados.bind(this);

        this.state.dados = props.dados;
        if (!this.state.dados.hasOwnProperty("aberto"))
            this.state.dados.aberto = "1";
        this.state.setDados = props.setDados;
        this.state.renderizaDados = true;
    }

    /* FUNCOES SET */
    setDados(value) {
        var dados = {};
        Object.assign(dados, this.state.dados);
        dados.itens = value;
        dados.aberto = "0";
        this.setState({ renderizaDados: false });

        this.setState({ dados: dados });
        this.state.setDados(this.state.dados);
        this.setState({ renderizaDados: true });
    }

    /* FUNCOES VERIFICACAO */


    /* FUNCOES MODAL */


    /* REQUISICOES */
    async componentDidMount() {

    }



    /* RENDER */
    render() {
        return (
            <>
                <Accordion defaultActiveKey={this.state.dados.aberto}>
                    <Card className="cardBoxAccoordion">
                        <Card.Header className="cardAccoordion">
                            <Row>
                                <Col
                                   
                                >
                                    <Accordion.Toggle
                                        as={Button}
                                        variant="link"
                                        eventKey="0"
                                        className="textAccordion"
                                    >
                                        {this.state.dados.descricao}
                                    </Accordion.Toggle>
                                </Col>
                                <Col
                                    sm="1"
                                >
                                    <IconAdd
                                        funcao={this.props.funcaoIncluir}
                                        parametrosFuncao={FormularioItemDTO.json(0, this.state.dados.id)}
                                        className="addItem"
                                    />
                                </Col>
                                <Col
                                    sm="1"
                                >
                                    <IconEdit
                                        funcao={this.props.funcaoEditar}
                                        parametrosFuncao={FormularioCategoriaDTO.json(this.state.dados.id, this.state.dados.descricao)}
                                        className="addItem"
                                    />
                                </Col>
                                <Col
                                    sm="1"
                                >
                                    <IconDelete
                                        funcao={this.props.funcaoExcluir}
                                        parametrosFuncao={FormularioCategoriaDTO.json(this.state.dados.id, this.state.dados.descricao)}
                                        className="addItem"
                                    />
                                </Col>
                            </Row>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body className="item">
                                {this.state.renderizaDados ? (
                                    <FormularioItemSortable
                                        dados={this.state.dados.itens}
                                        funcao={this.props.funcaoIncluir}
                                        setDados={this.setDados}
                                        funcaoExcluir={this.props.funcaoExcluirItem}
                                    />
                                ) : null}
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </>
        );
    }
}

export default FormularioCategoriaAccordion;