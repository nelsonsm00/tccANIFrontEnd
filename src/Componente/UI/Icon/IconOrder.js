/* IMPORT REACT */
import { CgArrowsExchangeAltV } from "react-icons/cg";

/* IMPORT PROJETO */
import Icon from "./Icon";

class IconOrder extends Icon {
    constructor(props) {
        super(props, "orderIcon", new CgArrowsExchangeAltV(), "1.1em", "Ordenar");
    }
}

export default IconOrder;
