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
import IconMove from "../UI/Icon/IconMove";
import FormularioCategoriaAccordion from "./FormularioCategoriaAccordion";
import FormularioCategoriaModal from "./FormularioCategoriaModal";
import FormularioItemModal from "./FormularioItemModal";

/* IMPORT UI */


/* IMPORT GERAL */
import Utils from "../../Geral/Utils";
import ModalEnum from "../../Geral/ModalEnum";

const DragHandle = sortableHandle(() => <IconMove />);

const SortableItem = SortableElement(
    ({ posicaoArray, value, funcaoIncluir, funcaoEditar, funcaoExcluir, funcaoSetDados, funcaoExcluirItem }) => (
        <ListGroup.Item className="itemFormula">
            <Row>
                <Col sm="1">                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
                    <DragHandle />
                </Col>
                <Col sm="11">
                    <FormularioCategoriaAccordion
                        dados={value}
                        setDados={funcaoSetDados}
                        funcaoIncluir={funcaoIncluir}
                        funcaoEditar={funcaoEditar}
                        funcaoExcluir={funcaoExcluir}
                        funcaoExcluirItem={funcaoExcluirItem}
                    />
                </Col>
            </Row>            
        </ListGroup.Item>
    )
);

const SortableList = SortableContainer(
    ({ items, funcaoIncluir, funcaoEditar, funcaoExcluir, funcaoSetDados, funcaoExcluirItem }) => {
        return (
            <ul>
                {items.map((d, index) => (
                    <SortableItem
                        key={`item-${index}`}
                        index={index}
                        value={d}
                        funcaoIncluir={funcaoIncluir}
                        funcaoEditar={funcaoEditar}
                        funcaoExcluir={funcaoExcluir}
                        funcaoSetDados={funcaoSetDados}
                        funcaoExcluirItem={funcaoExcluirItem}
                        posicaoArray={index}
                    />
                ))}
            </ul>
        );
    }
);

class FormularioCategoriaSortable extends Componente {
    constructor(props) {
        super(props);
        /* BIND */
        this.exibeModalEditarCategoria = this.exibeModalEditarCategoria.bind(this);
        this.exibeModalExcluirCategoria = this.exibeModalExcluirCategoria.bind(this);
        this.exibeModalIncluirItem = this.exibeModalIncluirItem.bind(this);
        this.resetaModal = this.resetaModal.bind(this);
        this.setDados = this.setDados.bind(this);
        this.resetaModal = this.resetaModal.bind(this);

        this.state.dados = props.dados;
        this.state.setDados = props.setDados;
        this.state.renderizaDados = true;
        this.state.id = 0;
    }

    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState({
            dados: arrayMove(this.state.dados, oldIndex, newIndex),
        });
        this.state.setDados(this.state.dados);
    };

    setDados(value) {
        var dados = [];
        var novoDados = [];
        Object.assign(dados, this.state.dados);
        this.setState({ renderizaDados: false });
        var index = 0;
        for (index = 0; index < dados.length; index++) {
            if (dados[index].id == value.id) {
                break;
            }
        }
        dados[index] = value;
        Object.assign(novoDados, dados);
        this.setState({ dados: novoDados });
        this.state.setDados(novoDados);
        this.setState({ renderizaDados: true });
    }

    exibeModalIncluirItem(registro) {
        this.setState({
            modal: Utils.getModal(true, "I", ModalEnum.tipo.pergunta, false, false, async (registro) => {
                                                                            await this.props.funcaoIncluirItem(registro);
                                                                            this.resetaModal();
                                                                        }),
            registro: registro,
        });
    }

    exibeModalEditarCategoria(registro) {
        this.setState({
            modal: Utils.getModal(true, "", ModalEnum.tipo.pergunta, false, false, async (registro) => {
                await this.props.funcaoEditarCategoria(registro);
                this.resetaModal();
            }),
            registro: registro,
        });
    }

    exibeModalExcluirCategoria(registro) {
        this.setState({
            id: registro.id,
            modal: Utils.getModal(true, "Tem certeza que deseja excluir a categoria? Este processo não pode ser revertido.", ModalEnum.tipo.pergunta, true, false, async () => {
                await this.props.funcaoExcluirCategoria(this.state.id);
                this.resetaModal();
            }, this.resetaModal)
        });
    }
    
    /* RENDERIZACAO */
    renderModal() {
        if (this.state.modal.show) {
            if (this.state.modal.tipo == ModalEnum.tipo.erro || this.state.modal.salvar) {
                return super.renderModal(this.state.modal);
            }
            else if(this.state.modal.mensagem == "I") {
                return (
                    <FormularioItemModal 
                        show={this.state.modal.show}
                        mensagem={""}
                        tipoModal={this.state.modal.tipo}
                        registro={this.state.registro}
                        funcao={this.state.modal.funcao}
                        funcaoSecundaria={this.resetaModal}
                    />
                );
            }
            else {
                return (
                    <FormularioCategoriaModal 
                        show={this.state.modal.show}
                        mensagem={this.state.modal.mensagem}
                        tipoModal={this.state.modal.tipo}
                        registro={this.state.registro}
                        funcao={this.state.modal.funcao}
                        funcaoSecundaria={this.resetaModal}
                    />
                );
            }
        }
        else {
            return (<></>);
        }
    }

    render() {
        return (
            <>
                {super.renderComponente()}
                {this.state.renderizaDados ?
                <ListGroup variant="flush">
                    <SortableList
                        items={this.state.dados}
                        onSortEnd={this.onSortEnd}
                        funcaoIncluir={this.exibeModalIncluirItem}
                        funcaoEditar={this.exibeModalEditarCategoria}
                        funcaoExcluir={this.exibeModalExcluirCategoria}
                        funcaoSetDados={this.setDados}
                        funcaoExcluirItem={this.props.funcaoExcluirItem}
                        axis="y"
                        lockAxis="y"
                        useDragHandle={true}
                    />
                </ListGroup>
                : <></>}
            </>
        );
    }
}

export default FormularioCategoriaSortable;
