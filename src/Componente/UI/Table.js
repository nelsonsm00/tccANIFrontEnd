/* IMPORT REACT */
import { Table } from "reactstrap";

/* IMPORT COMPONENTE */
import IconArrow from "../UI/Icon/IconArrow";
import CRUDIcon from "../UI/Icon/CRUDIcon";
import Th from "../UI/Th";

function exibeValor(d, chave) {
    if (chave.indexOf('.') > -1) {
        var chaveSplit = chave.split('.');
        var dAux = d;
        chaveSplit.forEach(c => {
            dAux = dAux[c];
        });
        return dAux;
    }
    else return d[chave];
}

export default (p) => { 
    var colunas = p.colunas;
    var dados = p.dados;

    var crud = p.hasOwnProperty("crud") ? p.crud : false;
    var inativar = p.hasOwnProperty("inativar") ? p.inativar : false;

    var editar = p.hasOwnProperty("editar") ? p.editar : () => {};
    var deletar = p.hasOwnProperty("deletar") ? p.deletar : () => {};
    var show = p.hasOwnProperty("show") ? p.show : () => {};

    var showIcon = p.hasOwnProperty("showIcon") ? p.showIcon : false;

    var permiteSelecionarLinha = p.hasOwnProperty("selecionaLinha") ? p.selecionaLinha : false;
    var funcaoSelecionaLinha = p.hasOwnProperty("funcaoSelecionaLinha") ? p.funcaoSelecionaLinha : () => {};

    var funcaoOrdenaTabela = p.hasOwnProperty("funcaoOrdenaTabela") ? p.funcaoOrdenaTabela : () => {};

    return (
                <Table bordered striped className="tableListagemSimulacao">
                    <thead>
                        <tr>
                            {colunas.map((c, index) => <Th value={c} index={index} funcao={funcaoOrdenaTabela}/>)}
                            {!crud && inativar ? <></> : <th className="btnSpace" width={"10%"}></th>}
                        </tr>
                    </thead>
                    <tbody>
                        {dados.map((d) => (
                            <tr className="listagemSimulacaoTr">
                                <>
                                    {colunas.map((c) => (c.incluir) ? <></> : 
                                        <td onClick={() =>
                                            permiteSelecionarLinha
                                                ? funcaoSelecionaLinha(d)
                                                : null
                                        }
                                            style={{
                                                cursor: permiteSelecionarLinha
                                                    ? "pointer"
                                                    : "normal",
                                            }}>
                                                {exibeValor(d, c.chave)}
                                        </td>)}
                                </>
                                {!crud && inativar ? <></> :
                                <td align="center" class="btnSpace">
                                    {crud 
                                        ?  <CRUDIcon
                                                editar={editar}
                                                parametrosEditar={d}
                                                deletar={deletar}
                                                parametrosDeletar={d}
                                                inativar={inativar}
                                                showIcon={showIcon}
                                                show={show}
                                                parametrosShow={d}
                                            /> 
                                        : <IconArrow 
                                            funcao={show}
                                            parametrosFuncao={d}
                                            />
                                    }                                    
                                </td>}
                            </tr>
                        ))}
                    </tbody>
                </Table>);
}