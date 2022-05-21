/* IMPORT REACT */
import { Col, Row } from "react-bootstrap";
import React from "react";
import Container from "react-bootstrap/Container";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

/* IMPORT COMPONENTE */
import FormCustom from "../Arquitetura/FormCustom";

/* IMPORT UI */

/* IMPORT GERAL */
import Utils from "../../Geral/Utils";

class PrincipalForm extends FormCustom {
    constructor(props) {
        super(props);
    }

    render() {
        var parametrosTamanhoLabelHead = {head: true, label: true, min: true};

        return(<>
            {this.renderComponente()}
            <Container>
                <Row>
                    <Col sm={12}>
                        <Row>
                            <Col sm={12}>
                                <h1 class="tituloInfo">ANI - Auxiliador Nutricionial Integrado</h1>
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col sm={6} className="textoInfoPrincipal">                        
                                <div class="textoInfo">
                                    Seja bem-vindo ao protótipo da ferramenta <b>ANI</b>, resultado do trabalho de conclusão do curso de <b>Ciência da Computação (2022/01) </b>
                                    da
                                    <b> <a href="https://www.unisinos.br/graduacao/?gclid=Cj0KCQjwm6KUBhC3ARIsACIwxBj_59d5rq9f0Me5G54RIqNgpF2aFgUkrBLV_P3_4v-iqHLeb1myzPgaApGKEALw_wcB"
                                    target="_blank">
                                    Universidade do Vale Rio dos Sinos - UNISINOS
                                    </a></b>
                                    . Este trabalho tem como objetivo pesquisar e estabelecer ideias para amenizar o processo de reeducação alimentar,
                                    propondo funcionalidades que uma ferramenta computacional deverá apresentar para que consiga realizar tal ação. A partir desta pesquisa foram estabelecidas 
                                    estas funcionalidades e algumas delas foram implementadas para dar forma ao protótipo que hoje você está acessando. A ideia deste protótipo é validar algumas 
                                    destas funcionalidades e verificar se o resultado deste trabalho pode ser utilizado pelos principais facilitadores do processo de reeducação alimentar que são
                                    os nutricionistas. 
                                </div>
                                <div class="textoInfo">
                                    <b>Ao lado você encontra algumas informações das funcionalidades para conhecer mais do protótipo.</b>
                                </div>
                            </Col>
                            <Col sm={6}>                        
                                <Row>
                                    <Col sm={12}>
                                        <Accordion defaultActiveKey="1">
                                            <Card className="cardBoxAccoordion">
                                                <Card.Header className="cardAccoordion">
                                                    <Accordion.Toggle
                                                        as={Button}
                                                        variant="link"
                                                        eventKey="0"
                                                        className="textAccordion"
                                                    >
                                                        {"Tratamento"}
                                                    </Accordion.Toggle>
                                                </Card.Header>
                                                <Accordion.Collapse eventKey="0">
                                                    <Card.Body>
                                                        <Container>
                                                            <Row>
                                                            <div class="textoInfo">
                                                                O tratamento é o vínculo entre o paciente e o nutricionista. Este vínculo é o coração do protótipo, pois é a partir
                                                                dele que é possível realizar as consultas, disponibilizar orientações, fazer as medidas antropométricas e etc. Para visualizar
                                                                os seus tratamentos acesse o menu <b><a href="/Tratamento/Listagem">Tratamentos</a></b>.
                                                            </div>
                                                            <div class="textoInfo">
                                                                Ao acessar o tratamento que deseja, você pode agendar e realizar as consultas, preenchendo o peso, observações,
                                                                informando as medidas do paciente, como também vincular os planos alimentares, orientações e preencher a anamnese.
                                                            </div>
                                                            </Row>
                                                        </Container>
                                                    </Card.Body>
                                                </Accordion.Collapse>
                                            </Card>
                                        </Accordion>
                                    </Col>
                                </Row>
                                <hr></hr>
                                <Row>
                                    <Col sm={12}>
                                        <Accordion defaultActiveKey="1">
                                            <Card className="cardBoxAccoordion">
                                                <Card.Header className="cardAccoordion">
                                                    <Accordion.Toggle
                                                        as={Button}
                                                        variant="link"
                                                        eventKey="0"
                                                        className="textAccordion"
                                                    >
                                                        {"Paciente"}
                                                    </Accordion.Toggle>
                                                </Card.Header>
                                                <Accordion.Collapse eventKey="0">
                                                    <Card.Body>
                                                        <Container>
                                                            <Row>
                                                            <div class="textoInfo">
                                                                O paciente é o indivíduo que estará passando pela mudança comportamental alimentar e contará com o seu apoio e da ferramenta <b>ANI</b> para isso.
                                                                Neste momento o protótipo contempla apenas funcionalidades destinadas ao nutricionista, mas foram estipuladas diversas
                                                                funcionalidades na pesquisa que integram o paciente juntamente com o nutricionista. 
                                                            </div>
                                                            <div class="textoInfo">
                                                                Ao cadastrar o paciente é necessário, além do nome, informar o e-mail dele para que ele possa preencher algumas informações,
                                                                como endereço, idade e etc.  
                                                            </div>
                                                            </Row>
                                                        </Container>
                                                    </Card.Body>
                                                </Accordion.Collapse>
                                            </Card>
                                        </Accordion>
                                    </Col>
                                </Row>
                                <hr></hr>
                                <Row>
                                    <Col sm={12}>
                                        <Accordion defaultActiveKey="1">
                                            <Card className="cardBoxAccoordion">
                                                <Card.Header className="cardAccoordion">
                                                    <Accordion.Toggle
                                                        as={Button}
                                                        variant="link"
                                                        eventKey="0"
                                                        className="textAccordion"
                                                    >
                                                        {"Refeições"}
                                                    </Accordion.Toggle>
                                                </Card.Header>
                                                <Accordion.Collapse eventKey="0">
                                                    <Card.Body>
                                                        <Container>
                                                            <Row>
                                                            <div class="textoInfo">
                                                                Nesta parte do protótipo você pode cadastrar as refeições que normalmente os pacientes podem fazer, juntamente com o horário.
                                                                Inicialmente o <b>ANI</b> já disponibiliza seis refeições: café da manhã, lanche da manhã, almoço, lanche da tarde, janta e ceia.
                                                                Você pode editar estas refeições ou adicionar novas, lembrando que o horário não é obrigatório, portanto você pode cadastrar
                                                                refeições livres! Estas refeições vão ser utilizadas para vincular os planos alimentares.
                                                            </div>
                                                            </Row>
                                                        </Container>
                                                    </Card.Body>
                                                </Accordion.Collapse>
                                            </Card>
                                        </Accordion>
                                    </Col>
                                </Row>
                                <hr></hr>
                                <Row>
                                    <Col sm={12}>
                                        <Accordion defaultActiveKey="1">
                                            <Card className="cardBoxAccoordion">
                                                <Card.Header className="cardAccoordion">
                                                    <Accordion.Toggle
                                                        as={Button}
                                                        variant="link"
                                                        eventKey="0"
                                                        className="textAccordion"
                                                    >
                                                        {"Orientações"}
                                                    </Accordion.Toggle>
                                                </Card.Header>
                                                <Accordion.Collapse eventKey="0">
                                                    <Card.Body>
                                                        <Container>
                                                            <Row>
                                                            <div class="textoInfo">
                                                                As orientações podem ser dicas nutricionistas ou informações que você queira disponibilizar para o paciente durante
                                                                o tratamento. Você pode cadastrá-las pelo menu <b><a href="/Orientacao/Listagem">Orientações</a></b> ou pelo próprio tratamento. Lembrando que estas orientações
                                                                podem ser vinculadas a diversos tratamentos, mas caso for alterada alguma orientação todos os tratamentos visualizarão esta alteração.
                                                            </div>
                                                            </Row>
                                                        </Container>
                                                    </Card.Body>
                                                </Accordion.Collapse>
                                            </Card>
                                        </Accordion>
                                    </Col>
                                </Row>
                                <hr></hr>
                                <Row>
                                    <Col sm={12}>
                                        <Accordion defaultActiveKey="1">
                                            <Card className="cardBoxAccoordion">
                                                <Card.Header className="cardAccoordion">
                                                    <Accordion.Toggle
                                                        as={Button}
                                                        variant="link"
                                                        eventKey="0"
                                                        className="textAccordion"
                                                    >
                                                        {"Formulário"}
                                                    </Accordion.Toggle>
                                                </Card.Header>
                                                <Accordion.Collapse eventKey="0">
                                                    <Card.Body>
                                                        <Container>
                                                            <Row>
                                                            <div class="textoInfo">
                                                                Os formulários se referem a fichas que queira preencher durante a consulta, como por exemplo a anamnse, que é o tipo de
                                                                formulário que está habilitado para ser utilizado neste protótipo. Antes de iniciar uma consulta, lembre-se de cadastrar a sua
                                                                anamnese!
                                                            </div>
                                                            </Row>
                                                        </Container>
                                                    </Card.Body>
                                                </Accordion.Collapse>
                                            </Card>
                                        </Accordion>
                                    </Col>
                                </Row>
                                <hr></hr>
                                <Row>
                                    <Col sm={12}>
                                        <Accordion defaultActiveKey="1">
                                            <Card className="cardBoxAccoordion">
                                                <Card.Header className="cardAccoordion">
                                                    <Accordion.Toggle
                                                        as={Button}
                                                        variant="link"
                                                        eventKey="0"
                                                        className="textAccordion"
                                                    >
                                                        {"Plano alimentar"}
                                                    </Accordion.Toggle>
                                                </Card.Header>
                                                <Accordion.Collapse eventKey="0">
                                                    <Card.Body>
                                                        <Container>
                                                            <Row>
                                                            <div class="textoInfo">
                                                                Esta funcionalidade do protótipo permite que você monte um plano alimentar para as refeições cadastradas no <b>ANI</b>, informando os
                                                                alimentos que podem ser consumidos nestas refeições. Estes alimentos são consultados diretamenta da <b><a href="http://www.fcf.usp.br/tbca" target="_blank">Tabela Brasileira de Composição de
                                                                Alimentos (TBCA)</a></b> e são exibidos no protótipo, podendo ser possível visualizar seus valores nutricionais.
                                                            </div>
                                                            <div class="textoInfo">
                                                                <strong>Referência:</strong> Tabela Brasileira de Composição de Alimentos (TBCA). Universidade de São Paulo (USP). Food Research Center (FoRC). Versão 7.1. São Paulo, 2020. Disponível em: <b><a href="http://www.fcf.usp.br/tbca" target="_blank">http://www.fcf.usp.br/tbca</a></b>.
                                                            </div>
                                                            </Row>
                                                        </Container>
                                                    </Card.Body>
                                                </Accordion.Collapse>
                                            </Card>
                                        </Accordion>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>                                
            </Container>
        </>);
    }
}

export default PrincipalForm;