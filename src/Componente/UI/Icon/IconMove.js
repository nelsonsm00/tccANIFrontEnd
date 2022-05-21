/* IMPORT REACT */
import { IoMdMove } from "react-icons/io";

/* IMPORT PROJETO */
import Icon from "./Icon";

class IconMove extends Icon {
    constructor(props) {
        super(props, "moveIcon", new IoMdMove());
    }

    render() {
        return (
            <i className={this.className} style={{ fontSize: this.fontSize }} title="Mover">
                {this.icone}
            </i>
        );
    }
}

export default IconMove;
