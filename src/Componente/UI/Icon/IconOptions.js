/* IMPORT REACT */
import { AiOutlineEllipsis } from "react-icons/ai";

/* IMPORT PROJETO */
import Icon from "./Icon";

class IconOptions extends Icon {
    constructor(props) {
        super(props, "auxIcon selectOptions", new AiOutlineEllipsis(), "2em", "Abrir cadastro");
    }
}

export default IconOptions;
