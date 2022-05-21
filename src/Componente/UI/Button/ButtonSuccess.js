/* IMPORT PROJETO */
import ButtonInvoice from "./Button";

class ButtonSuccess extends ButtonInvoice {
    constructor(props) {
        super(
            props,
            "btn-success " +
                (props.hasOwnProperty("className") ? props.className : "")
        );
    }
}

export default ButtonSuccess;
