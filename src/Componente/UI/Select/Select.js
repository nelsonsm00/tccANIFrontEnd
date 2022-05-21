/* IMPORT REACT */
import React from "react";
import { Form } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";

/* IMPORT COMPONENTE */
import Componente from "../../Arquitetura/Componente";
import OptionDefault from "./OptionDefault";
import IconOptions from "../Icon/IconOptions";

class Select extends Componente {
    constructor(props, comOpcao = false) {
        super(props);

        this.state.renderizaOpcao = false;

        this.funcao = props.hasOwnProperty("funcao") ? props.funcao : () => {};
        this.key = {
            id: "id",
            descricao: "descricao",
        };
        this.atribuiuValorPadrao = false;
        this.renderizaComOpcao = comOpcao;
    }

    /* METODO SUBSTITUIDO PELO DA CLASSE FILHA */
    getJsonDefault() {
        return this.key;
    }

    renderJanelaOpcao() {
        return <></>;
    }

    consulta() { }

    abreOpcao() {
        this.setState({ renderizaOpcao: true });
    }

    async fechaOpcao() {
        await this.consulta();
        this.setState({ renderizaOpcao: false });
    }

    /* CONTROLE DOS MODAIS */
    resetaModal() {
        this.serviceResponse.reseta();
        this.setState({ dados: [] });
    }

    /* EXECUTA FUNCAO */
    executaFuncao(value) {
        var result = this.getJsonDefault();
        for (var i = 0; i < this.state.dados.length; i++) {
            var d = this.state.dados[i];
            if (d[this.key.id] == value) {
                result = d;
                break;
            }
        }
        this.funcao(result);
    }

    /* VERIFICADORES */
    valorPadrao() {
        if (
            this.props.hasOwnProperty("valorPadrao") &&
            this.props.valorPadrao != -1 &&
            this.props.valorPadrao != ""
        ) {
            if (!this.atribuiuValorPadrao && this.state.dados.length > 0) {
                this.executaFuncao(this.props.valorPadrao);
                this.atribuiuValorPadrao = true;
            }
            return this.props.valorPadrao;
        } else {
            return -1;
        }
    }

    /* RENDERIZACAO */
    renderOption(selected, value, text) {
        if (selected == value) {
            return (
                <option value={value} selected>
                    {text}
                </option>
            );
        } else {
            return <option value={value}>{text}</option>;
        }
    }

    renderComOpcao() {
        return (
            <>
                {this.renderJanelaOpcao()}
                <Form>
                    <InputGroup style={{ "margin-left": "0px" }}>
                        <Form.Control
                            as="select"
                            custom
                            onChange={(e) => this.executaFuncao(e.target.value)}
                            disabled={this.props.inativo}
                        >
                            {this.valorPadrao() == -1 ? (
                                <OptionDefault />
                            ) : null}
                            {this.state.dados.map((d) =>
                                this.renderOption(
                                    this.valorPadrao(),
                                    d[this.key.id],
                                    d[this.key.descricao]
                                )
                            )}
                        </Form.Control>
                        <InputGroup.Prepend
                            style={{
                                "margin-right": "0px",
                                "margin-top": "-5px",
                            }}
                        >
                            <IconOptions funcao={this.abreOpcao} />
                        </InputGroup.Prepend>
                    </InputGroup>
                </Form>
            </>
        );
    }

    renderSemOpcao() {
        return (
            <>
                <Form>
                    <Form.Control
                        as="select"
                        custom
                        onChange={(e) => this.executaFuncao(e.target.value)}
                        disabled={this.props.inativo}
                    >
                        {this.valorPadrao() == -1 ? <OptionDefault /> : null}
                        {this.state.dados.map((d) =>
                            this.renderOption(
                                this.valorPadrao(),
                                d[this.key.id],
                                d[this.key.descricao]
                            )
                        )}
                    </Form.Control>
                </Form>
            </>
        );
    }

    render() {
        if (this.renderizaComOpcao) {
            return (
                <>
                    {this.renderComOpcao()}
                </>
            );
        } else {
            return (
                <>
                    {this.renderSemOpcao()}
                </>
            );
        }
    }
}

export default Select;
