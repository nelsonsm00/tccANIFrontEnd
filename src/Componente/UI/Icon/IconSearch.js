/* IMPORT REACT */
import { FaSearch } from "react-icons/fa";

/* IMPORT PROJETO */
import Icon from "./Icon";

class IconSearch extends Icon {
    constructor(props) {
        super(
            props,
            "auxIcon searchIcon" +
                (props.hasOwnProperty("className") ? props.className : ""),
            new FaSearch(),
            "1.5em",
            "Pesquisar"
        );
    }
}

export default IconSearch;
