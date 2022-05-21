/* IMPORT GERAL */
import OrdenacaoEnum from "../OrdenacaoEnum";

class Coluna {
    constructor(texto = "", 
                chave = "", 
                type = OrdenacaoEnum.tipo.int, 
                order = false, 
                click = false, 
                sentido = OrdenacaoEnum.sentido.desc, 
                largura = 0,
                funcao = () => {}) {
        this.texto = texto;
        this.chave = chave;
        this.type = type;
        this.order = order;
        this.click = click;
        this.sentido = sentido;
        this.largura = largura;
        this.incluir = false;
        this.funcao = funcao;
    }

    executa(index) {
        if (this.order) {
            this.funcao(index, this.chave, this.type);
        }
    }
}

export default Coluna;