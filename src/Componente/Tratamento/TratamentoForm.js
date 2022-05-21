/* IMPORT REACT */
import { Col, Row, Form } from "react-bootstrap";

/* IMPORT COMPONENTE */
import FormCustom from "../Arquitetura/FormCustom";
import TratamentoTab from "./TratamentoTab";

/* IMPORT CACHE */
import Cache from "../../Geral/Cache/Cache";

class TratamentoForm extends FormCustom {
    constructor(props) {
        super(props);
        if (Cache.tratamento.get == null)
            document.location.href = "/";
    }

    render() {
        var consulta = Cache.consulta.get;
        Cache.consulta.set(-1);
        return(<>
            <Form>
                <TratamentoTab id={Cache.tratamento.get} consulta={consulta}/>
            </Form>
        </>);
    }
}

export default TratamentoForm;