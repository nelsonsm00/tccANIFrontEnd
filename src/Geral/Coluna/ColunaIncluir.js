/* IMPORT GERAL */
import Coluna from "./Coluna";

class ColunaIncluir extends Coluna {
    constructor(funcao, parametros = {}, pesquisa = false, vincular = false, importar = false) {
        super();
        this.incluir = true;
        this.funcao = funcao;
        this.parametros = parametros
        this.pesquisa = pesquisa;
        this.vincular = vincular;
        this.importar = importar;
    }
}

export default ColunaIncluir;