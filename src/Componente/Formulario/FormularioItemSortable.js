/* IMPORT REACT */
import React from "react";
import { Col, Row } from "react-bootstrap";
import {
    SortableContainer,
    SortableElement,
    arrayMove,
    sortableHandle,
} from "react-sortable-hoc";
import ListGroup from "react-bootstrap/ListGroup";

/* IMPORT PROJETO */
import Componente from "../Arquitetura/Componente";
import Label from "../UI/Label.js";
import IconMove from "../UI/Icon/IconMove";
import CRUDIcon from "../UI/Icon/CRUDIcon.js";

/* IMPORT UI */

/* IMPORT DTO */
import FormularioItemDTO from "../../DTO/Formulario/FormularioItemDTO";

/* IMPORT GERAL */
import Utils from "../../Geral/Utils";
import ModalEnum from "../../Geral/ModalEnum";

/* IMPORT SERVICES */
import FormularioItemService from "../../Service/Formulario/FormularioItemService";

const DragHandle = sortableHandle(() => <IconMove />);

const SortableItem = SortableElement(
    ({ posicaoArray, value, funcao, funcaoSecundaria }) => (
        <ListGroup.Item className="itemFormula">
            <Row>
                <Col sm="1">                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
                    <DragHandle />
                </Col>
                <Col sm="7">
                    <Label
                        texto={value.descricao}
                        classe="labelCustom"
                    />
                </Col>
                <Col sm="4">
                    <CRUDIcon
                        editar={funcao}
                        parametrosEditar={FormularioItemDTO.json(value.id, value.formularioCategoria, value.descricao, value.tipo, value.alternativas)}
                        deletar={funcaoSecundaria}
                        parametrosDeletar={FormularioItemDTO.json(value.id, value.formularioCategoria, value.descricao, value.tipo, value.alternativas)}
                    />
                </Col>
            </Row>
        </ListGroup.Item>
    )
);

const SortableList = SortableContainer(
    ({ items, funcao, funcaoSecundaria }) => {
        return (
            <ul>
                {items.map((d, index) => (
                    <SortableItem
                        key={`item-${index}`}
                        index={index}
                        value={d}
                        funcao={funcao}
                        funcaoSecundaria={funcaoSecundaria}
                        posicaoArray={index}
                    />
                ))}
            </ul>
        );
    }
);

class FormularioItemSortable extends Componente {
    constructor(props) {
        super(props);
        /* BIND */
        this.exibeModalExcluir = this.exibeModalExcluir.bind(this);
        this.resetaModal = this.resetaModal.bind(this);

        this.state.dados = props.dados;
        this.state.setDados = props.setDados;
        this.state.id = 0;
        this.service = FormularioItemService;
    }

    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState({
            dados: arrayMove(this.state.dados, oldIndex, newIndex),
        });
        this.state.setDados(this.state.dados);
    };

    exibeModalExcluir(registro) {
        this.setState({
            id: registro.id,
            modal: Utils.getModal(true, "Tem certeza que deseja excluir o item? Este processo não pode ser revertido.", ModalEnum.tipo.pergunta, true, false, 
            async () => {
                await this.props.funcaoExcluir(this.state.id);
                this.resetaModal()
            }, this.resetaModal)
        });
    }
    
    /* RENDERIZACAO */
    render() {
        return (
            <>
                {super.renderComponente()}
                <ListGroup variant="flush">
                    <SortableList
                        items={this.state.dados}
                        onSortEnd={this.onSortEnd}
                        funcao={this.props.funcao}
                        funcaoSecundaria={this.exibeModalExcluir}
                        axis="y"
                        lockAxis="y"
                        useDragHandle={true}
                    />
                </ListGroup>
            </>
        );
    }
}

export default FormularioItemSortable;
