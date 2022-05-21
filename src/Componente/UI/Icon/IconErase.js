/* IMPORT REACT */
import { RiEraserFill } from "react-icons/ri";

/* IMPORT PROJETO */
import Icon from "./Icon";

class IconErase extends Icon {
    constructor(props) {
        super(props, "auxIcon", new RiEraserFill(), "2em", "Apagar");
    }
}

export default IconErase;
