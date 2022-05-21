/* IMPORT PROJETO */
import ButtonInvoice from "./Button";

class ButtonCancel extends ButtonInvoice {
    constructor(props) {
        super(
            props,
            "btn-danger " +
                (props.hasOwnProperty("className") ? props.className : "")
        );
    }
}

export default ButtonCancel;
