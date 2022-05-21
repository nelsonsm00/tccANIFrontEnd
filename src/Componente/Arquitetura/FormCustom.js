/* IMPORT REACT */
import { Container, Row } from "react-bootstrap";

/* IMPORT COMPONENTE */
import Componente from "./Componente";

class FormCustom extends Componente {
    constructor(props) {
        super(props);
    }

    renderForm(conteudo) {
        return (<>
                    <Container>
                        <Row>
                            {super.renderTitulo()}   
                        </Row>
                        <Row>
                            {conteudo}
                        </Row>
                    </Container>
        </>);
    }

    render() {
        return(<></>);
    }
}

export default FormCustom;