/* IMPORT REACT */
import { BsArrowUpRightSquareFill } from "react-icons/bs";

/* IMPORT PROJETO */
import Icon from "./Icon";

class IconArrow extends Icon {
    constructor(props) {
        super(props, "auxArrow", new BsArrowUpRightSquareFill(), "1.5em", "Acessar");
    }
}

export default IconArrow;
