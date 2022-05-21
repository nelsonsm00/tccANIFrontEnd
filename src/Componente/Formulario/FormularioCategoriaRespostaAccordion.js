/* IMPORT REACT */
import React from "react";
import { Container, Row, Form, Col } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import FormCheck from 'react-bootstrap/FormCheck'

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
import Label from "../UI/Label";
import Input from "../UI/Input";
import Textarea from "../UI/Textarea/Textarea";

/* IMPORT DTO */
import FormularioCategoriaDTO from "../../DTO/Formulario/FormularioCategoriaDTO";
import FormularioItemDTO from "../../DTO/Formulario/FormularioItemDTO";

/* IMPORT GERAL */
import Utils from "../../Geral/Utils";
import Cache from "../../Geral/Cache/Cache";
import ModalEnum from "../../Geral/ModalEnum";

/* IMPORT SERVICE */
import FormularioService from "../../Service/Formulario/FormularioService";

class FormularioCategoriaRespostaAccordion extends Componente {
    constructor(props) {
        super(props);
        
        /* BIND */
        this.setDados = this.setDados.bind(this);

    }

    /* FUNCOES SET */
    setDados(value, parametros) {
        var dados = {};
        Object.assign(dados, this.props.dados);
        dados.itens[parametros.index].resposta.valor = value;
        this.props.setDados(dados, this.props.index);
    }

    /* FUNCOES VERIFICACAO */

    /* FUNCOES MODAL */

    /* REQUISICOES */

    /* RENDER */
    render() {
        return (
            <>
                <Accordion defaultActiveKey="1">
                    <Card className="cardBoxAccoordion itemFormula">
                        <Card.Header className="cardAccoordion">
                            <Accordion.Toggle
                                as={Button}
                                variant="link"
                                eventKey="0"
                                className="textAccordion"
                            >
                                {this.props.dados.descricao}
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body className="formularioResposta">
                                <>
                                    {
                                        
                                        this.props.dados.itens.map((i, index) => (
                                            <>
                                            <Row>
                                            <Label
                                                coluna={true}
                                                texto={i.descricao}
                                                parametrosTamanho={{formulario: true, label: true, textarea: i.tipo == "L"}}
                                            />
                                            {i.tipo == "T" 
                                                ?
                                                    <Input
                                                        ativo={true}
                                                        valor={i.resposta.valor} 
                                                        parametrosTamanho={{formulario: true, input: true}}
                                                        funcao={this.setDados}
                                                        parametrosFuncao={{index: index}}
                                                    />
                                                :
                                            i.tipo == "C" 
                                                ?
                                                    <Form>
                                                    {i.alternativas.map((a) => (
                                                        <FormCheck 
                                                                label={a}
                                                                name={"gb" + i.descricao}
                                                                type="checkbox"
                                                                checked={i.resposta.valor == a}
                                                                onChange={() => {this.setDados(a, {index: index})}}
                                                                inline
                                                                className="formCheckPublic"
                                                        />))
                                                    }                                                    
                                                    </Form>
                                                :
                                            i.tipo == "L"
                                                ?
                                                    <Textarea 
                                                        texto={Utils.converteQuebraLinhaHtml(i.resposta.valor)}
                                                        funcao={this.setDados}
                                                        parametrosFuncao={{index: index}}
                                                        ativo={true}
                                                    />
                                                :
                                                    <></>
                                            }
                                            </Row>
                                            <hr></hr>
                                            </>
                                        ))
                                    }
                                </>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </>
        );
    }
}

export default FormularioCategoriaRespostaAccordion;