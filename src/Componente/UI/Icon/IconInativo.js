/* IMPORT REACT */
import { BsXOctagonFill } from "react-icons/bs";

/* IMPORT PROJETO */
import Icon from "./Icon";

class IconInativo extends Icon {
    constructor(props) {
        super(props, "deleteIcon", new BsXOctagonFill(), "1.5em", "Inativar");
    }
}

export default IconInativo;
