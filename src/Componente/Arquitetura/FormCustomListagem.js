/* IMPORT REACT */

/* IMPORT COMPONENTE */
import FormCustom from "./FormCustom";

/* IMPORT UI */
import Table from "../UI/Table";
import SearchInput from "../UI/SearchInput";

/* IMPORT GERAL */
import OrdenacaoEnum from "../../Geral/OrdenacaoEnum";
import MascaraNumerica from "../../Geral/MascaraNumerica";
import Data from "../../Geral/Data";

class FormCustomListagem extends FormCustom {
    constructor(props, formMain = true, inativar = false, renderTitulo = true, pesquisa = true, renderPesquisa = true, showIcon = false) {
        super(props);
        this.state.colunas = [];
        this.state.propriedadesBusca = [];
        this.state.dados = [];
        this.state.dadosBackup = [];
        this.formMain = formMain;
        this.renderPesquisa = renderPesquisa;
        this.pesquisa = pesquisa;
        this.renderTitulo = renderTitulo;
        this.inativarBotao = inativar;
        this.showIcon = showIcon;
        this.chaveOrdenacao = "";
    }

    editar() { }

    deletar() { }

    show() { }

    funcaoPesquisa() { }

    setDados(value) {
        this.setState({ dados: value });
    }    

    /* ORDENACAO */
    compareIntAsc(a, b) {
        return MascaraNumerica.converteInt(a[this.chaveOrdenacao]) - MascaraNumerica.converteInt(b[this.chaveOrdenacao]);
    }

    compareIntDesc(a, b) {
        return MascaraNumerica.converteInt(b[this.chaveOrdenacao]) - MascaraNumerica.converteInt(a[this.chaveOrdenacao]);
    }

    compareStringAsc(a, b) {
        if (a[this.chaveOrdenacao] < b[this.chaveOrdenacao])
            return -1;
        if (a[this.chaveOrdenacao] > b[this.chaveOrdenacao])
            return 1;
        return 0;
    }

    compareStringDesc(a, b) {
        if (b[this.chaveOrdenacao] < a[this.chaveOrdenacao])
            return -1;
        if (b[this.chaveOrdenacao] > a[this.chaveOrdenacao])
            return 1;
        return 0;
    }

    compareDataAsc(a, b) {
        var aD = Data.converteStringData(a[this.chaveOrdenacao]);
        var bD = Data.converteStringData(b[this.chaveOrdenacao]);
        
        return aD - bD;
    }

    compareDataDesc(a, b) {
        var aD = Data.converteStringData(a[this.chaveOrdenacao]);
        var bD = Data.converteStringData(b[this.chaveOrdenacao]);
        return bD - aD;
    }

    compareHoraAsc(a, b) {
        var aD = Data.converteStringData(a[this.chaveOrdenacao], true);
        var bD = Data.converteStringData(b[this.chaveOrdenacao], true);
        
        return aD - bD;
    }

    compareHoraDesc(a, b) {
        var aD = Data.converteStringData(a[this.chaveOrdenacao], true);
        var bD = Data.converteStringData(b[this.chaveOrdenacao], true);
        return bD - aD;
    }

    ordernaDados(chave, type, sentido) {
        this.chaveOrdenacao = chave;
        var d = [];
        Object.assign(d, this.state.dados);
        if (type == OrdenacaoEnum.tipo.int) {
            if (sentido == OrdenacaoEnum.sentido.asc) {
                d.sort(this.compareIntAsc.bind(this));
            }
            else {
                d.sort(this.compareIntDesc.bind(this));
            }
        }
        else if (type == OrdenacaoEnum.tipo.string) {
            if (sentido == OrdenacaoEnum.sentido.asc) {
                d.sort(this.compareStringAsc.bind(this));
            }
            else {
                d.sort(this.compareStringDesc.bind(this));
            }
        }
        else if (type == OrdenacaoEnum.tipo.data) {
            if (sentido == OrdenacaoEnum.sentido.asc) {
                d.sort(this.compareDataAsc.bind(this));
            }
            else {
                d.sort(this.compareDataDesc.bind(this));
            }
        }
        else if (type == OrdenacaoEnum.tipo.hora) {
            if (sentido == OrdenacaoEnum.sentido.asc) {
                d.sort(this.compareHoraAsc.bind(this));
            }
            else {
                d.sort(this.compareHoraDesc.bind(this));
            }
        }
        this.setState({dados: d});
    }

    ordenaTabela(index, chave, type) {
        var json = [];
        var jaEstavaSelecionado = this.state.colunas[index].click;
        Object.assign(json, this.state.colunas);
        json.forEach(c => {
            c.click = false;
        });
        json[index].click = true;
        if (jaEstavaSelecionado) {
            json[index].sentido = json[index].sentido * OrdenacaoEnum.sentido.padraoDiferenca;
        }
        this.setState({colunas: json});
        this.ordernaDados(chave, type, json[index].sentido);
    }

    render() {
        return (<>
                    {this.renderComponente()}
                    {this.renderTitulo ? super.renderTitulo() : <></>}
                    <center>
                    {this.pesquisa || this.renderPesquisa
                        ?   <SearchInput 
                                funcao={this.setDados}
                                propriedades={this.state.propriedadesBusca}
                                dadosBackup={this.state.dadosBackup}
                                pesquisa={this.pesquisa}
                                funcaoPesquisa={this.funcaoPesquisa}
                            /> 
                        : <></>}
                    <Table 
                        colunas={this.state.colunas}
                        dados={this.state.dados}
                        crud={this.formMain}
                        inativar={this.inativarBotao}
                        editar={this.editar}
                        deletar={this.deletar}
                        selecionaLinha={this.props.hasOwnProperty("selecionaLinha") ? this.props.selecionaLinha : false}
                        funcaoSelecionaLinha={this.props.hasOwnProperty("funcaoSelecionaLinha") ? this.props.funcaoSelecionaLinha : () => {}}
                        funcaoOrdenaTabela={this.ordenaTabela}
                        show={this.show}
                        showIcon={this.showIcon}
                    />
                    </center>
        </>);
    }
}

export default FormCustomListagem;