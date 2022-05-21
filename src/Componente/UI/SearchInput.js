/* IMPORT REACT */
import React, { Component } from "react";
import { Container, Row } from "reactstrap";

/* IMPORT PROJETO */
import IconErase from "./Icon/IconErase.js";
import IconSearch from "./Icon/IconSearch.js";
import Utils from "../../Geral/Utils";

class SearchInput extends Component {
    constructor(props) {
        super(props);

        var funcao = props.hasOwnProperty("funcao") ? props.funcao : () => {};
        var propriedades = props.hasOwnProperty("propriedades")
            ? props.propriedades
            : [];

        this.state = { termo: "" };
        this.funcao = funcao;
        this.propriedades = propriedades;
        this.pesquisa = props.hasOwnProperty("pesquisa") ? props.pesquisa : false;
        this.funcaoPesquisa = props.hasOwnProperty("funcaoPesquisa") ? props.funcaoPesquisa : () => {};

        //REALIZA O BIND DAS FUNCOES
        this.executaFuncao = this.executaFuncao.bind(this);
        this.executaFuncaoPesquisa = this.executaFuncaoPesquisa.bind(this);
    }

    /* FUNCOES SET */
    setTermo(value) {
        this.setState({ termo: value });
    }

    /* PESQUISA O REGISTRO */
    onSearchSubmit(value) {
        this.setTermo(value);
        var dados = [];
        Object.assign(dados, this.props.dadosBackup);
        if (value != "") {
            var busca = [];
            dados.forEach((d) => {
                for (var i = 0; i < this.propriedades.length; i++) {
                    if (
                        (d[this.propriedades[i]] + "")
                            .toUpperCase()
                            .match(value.toUpperCase())
                    ) {
                        busca.push(d);
                        break;
                    }
                }
            });
        } else {
            return dados;
        }
        if (busca != null && Object.entries(busca).length > 0) {
            return busca;
        } else {
            return [];
        }
    }

    /* RESETA OS REGISTROS */
    onBlurSubmit() {
        this.setTermo("");
        return this.props.dadosBackup;
    }

    /* EXECUTA FUNCAO */
    executaFuncao(value = "") {
        if (value == "") {
            this.funcao(this.onBlurSubmit());
        } else {
            this.funcao(this.onSearchSubmit(value));
        }
    }

    executaFuncaoPesquisa() {
        if (Utils.isStringValida(this.state.termo)) {
            this.funcaoPesquisa(this.state.termo);
            this.setTermo("");
        }
    }

    render() {
        return (
            <div align="left">
                <Container>
                    <Row>
                        <input
                            onChange={(e) => this.executaFuncao(e.target.value)}
                            onKeyDown={(e) => {
                                if (this.pesquisa && e.which == 13) {
                                    this.executaFuncaoPesquisa();
                                }
                            }}
                            className="form-control buscar"
                            type="text"
                            placeholder="Buscar"
                            aria-label="Buscar"
                            id="buscar"
                            value={this.state.termo}
                        ></input>
                        <span>{"   "}</span>
                        <IconErase funcao={this.executaFuncao} />
                        <span>{"   "}</span>
                        {this.pesquisa ? <IconSearch funcao={this.executaFuncaoPesquisa}/>: <></> }
                    </Row>
                </Container>
                <br />
            </div>
        );
    }
}

export default SearchInput;
