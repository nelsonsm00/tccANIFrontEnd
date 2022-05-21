/* IMPORT REACT */
import { Row, Container } from "react-bootstrap";

/* IMPORT COMPONENTE */
import Componente from "../Arquitetura/Componente";

/* IMPORT UI */
import ButtonAux from "../UI/Button/ButtonAux";

class ConsultaOpcoesCard extends Componente {
    constructor(props) {
        super(props);
    }

    render() {
        return(<>
                    <Container>
                        {this.props.consultaAtual ?
                        (<>
                            <Row>
                                <ButtonAux
                                        texto={"Consulta atual"}
                                        valido={true}
                                        funcao={() => {document.location.href="/Tratamento"}}
                                />
                            </Row>
                            <hr></hr>
                        </>)
                        : <></>}
                        {this.props.consultaValida ?
                        (<>
                            <Row>
                                <ButtonAux
                                        texto={"Medidas"}
                                        valido={true}
                                        funcao={this.props.funcaoMedida}
                                />
                            </Row>
                            <hr></hr>
                        </>)
                        : <></>}
                        {this.props.consultaValida ?
                        (<>
                            <Row>
                                <ButtonAux
                                        texto={"Anamnese"}
                                        valido={true}
                                        funcao={this.props.funcaoAnamnese}
                                />
                            </Row>
                            <hr></hr>
                        </>)
                        : <></>}
                        {this.props.consultaValida ?
                        (<>
                            <Row>
                                <ButtonAux
                                        texto={"Reagendar consulta"}
                                        valido={true}
                                        funcao={this.props.funcaoReagendarConsulta}
                                />
                            </Row>
                            <hr></hr>
                        </>)
                        : <></>}
                        <Row>
                            <ButtonAux
                                    texto={"Agendar nova consulta"}
                                    valido={true}
                                    funcao={this.props.funcaoAgendarNovaConsulta}
                            />
                        </Row>
                    </Container>
        </>);
    }
}

export default ConsultaOpcoesCard;