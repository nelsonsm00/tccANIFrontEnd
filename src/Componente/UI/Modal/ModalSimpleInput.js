/* IMPORT PROJETO */
import ModalInvoice from "./Modal";
import Input from "../Input";

class ModalSimpleInvoice extends ModalInvoice {
    constructor(props) {
        super(props);

        var funcaoInput = props.hasOwnProperty("funcaoInput")
            ? props.funcaoInput
            : () => {};

        this.state.funcaoInput = funcaoInput;
    }

    /* FUNCOES GET */
    getTextoPerguntaSuccess() {
        return "Exportar";
    }

    getTextoPerguntaCancel() {
        return "Cancelar";
    }

    renderBody() {
        return (
            <Input
                valor={this.props.valor}
                inputTexto={true}
                funcao={this.state.funcaoInput}
                classeColuna="inputDado"
            />
        );
    }
}

export default ModalSimpleInvoice;
