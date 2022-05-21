/* IMPORT GERAL */
import MascaraNumerica from "./MascaraNumerica.js";

/* CLASSE RESPONSAVEL POR REALIZAR OS CALCULOS 
--> OS VALORES DEVEM RECEBIDOS POR PARAMETRO DEVEM SER CONVERTIDOS PARA FLOAT CONFORME O METODO converteFloat

--> DETERMINADOS PARAMETROS NAO POSSUEM A CONVERSAO, POIS SERAO CONVERTIDOS POSTERIORMENTE EM SEUS RESPECTIVOS METODOS,
    COMO POR EXEMPLO quantidade E valorUnitario DO METODO calculaCusto, POIS ESTES PARAMETROS SERAO CONVERTIDOS NO METODO
    calculaValorProduto
*/

class Calculadora {
    constructor() {}

    /* CONVERSOES */
    converteQuantidade(quantidade, valorOrigem, valorDestino) {
        quantidade = this.converteFloat(quantidade);
        valorOrigem = this.converteFloat(valorOrigem);
        valorDestino = this.converteFloat(valorDestino);

        return (quantidade * valorOrigem) / valorDestino;
    }

    converteRealParaMoeda(real, valorRealMoeda) {
        real = this.converteFloat(real);
        valorRealMoeda = this.converteFloat(valorRealMoeda);

        return real / valorRealMoeda;
    }

    converteMoedaParaReal(moeda, valorMoedaReal) {
        moeda = this.converteFloat(moeda);
        valorMoedaReal = this.converteFloat(valorMoedaReal);

        return moeda * valorMoedaReal;
    }

    converteFloat(value) {
        var mascara = new MascaraNumerica();
        var valueAux = mascara.numericToStr(value);
        valueAux = mascara.replaceDotEmpty(valueAux);
        valueAux = mascara.replaceCommonDot(valueAux);
        if (mascara.isNumeric(valueAux)) {
            return parseFloat(valueAux);
        } else {
            return 0;
        }
    }

    converteInt(value) {
        var mascara = new MascaraNumerica();
        var valueAux = mascara.numericToStr(value);
        valueAux = mascara.replaceDotEmpty(valueAux);
        if (mascara.isNumeric(valueAux)) {
            return parseInt(valueAux);
        } else {
            return 0;
        }
    }

    /* CALCULOS */
    calculaValorUnitario(total, quantidade) {
        total = this.converteFloat(total);
        quantidade = this.converteFloat(quantidade);

        var result = 0;
        if (quantidade == 0) {
            result = 0;
        } else result = total / quantidade;
        return result;
    }

    calculaValorUnitarioMoeda(total, quantidade, valorMoeda) {
        var valorUnitario = this.calculaValorUnitario(total, quantidade);
        valorUnitario = new MascaraNumerica().maskCoin(valorUnitario);

        return this.converteRealParaMoeda(valorUnitario, valorMoeda);
    }

    calculaValorProduto(quantidade, valorUnitario) {
        quantidade = this.converteFloat(quantidade);
        valorUnitario = this.converteFloat(valorUnitario);

        return quantidade * valorUnitario;
    }

    calculaCusto(quantidade, valorUnitario, valoresExtras) {
        var total = this.calculaValorProduto(quantidade, valorUnitario);

        valoresExtras.map((v) => {
            switch (v.operacao) {
                case "+":
                    total += this.converteFloat(v.total);
                    break;
                case "-":
                    total -= this.converteFloat(v.total);
                    break;
            }
        });

        return total;
    }

    calculaLucro(
        custo,
        percentualLucro,
        valorLucro,
        quantidade,
        valorFinal,
        valorMoeda,
        percentualImposto,
        valorImposto
    ) {
        custo = this.converteFloat(custo);
        percentualLucro = this.converteFloat(percentualLucro) / 100;
        quantidade = this.converteFloat(quantidade);
        percentualImposto = this.converteFloat(percentualImposto) / 100;
        valorImposto = this.converteFloat(valorImposto);

        //CONVERTE VALOR PARA MOEDA REAL
        valorLucro = this.converteMoedaParaReal(valorLucro, valorMoeda);
        valorFinal = this.converteMoedaParaReal(valorFinal, valorMoeda);

        if (percentualLucro > 0) {
            return custo * percentualLucro;
        } else if (valorLucro > 0) {
            return valorLucro * quantidade;
        } else if (valorFinal > 0) {
            valorFinal = valorFinal * quantidade;
            return valorFinal - custo - valorImposto;
        } else {
            return 0;
        }
    }

    calculaImposto(custo, lucro, percentualImposto) {
        custo = this.converteFloat(custo);
        lucro = this.converteFloat(lucro);
        percentualImposto = this.converteFloat(percentualImposto) / 100;
        return (custo + lucro) * percentualImposto;
    }

    calculaImpostoValorFinal(
        quantidade,
        valorFinal,
        valorMoeda,
        percentualImposto
    ) {
        percentualImposto = this.converteFloat(percentualImposto) / 100;
        quantidade = this.converteFloat(quantidade);

        //CONVERTE VALOR PARA MOEDA REAL
        valorFinal = this.converteMoedaParaReal(valorFinal, valorMoeda);

        return valorFinal * quantidade * percentualImposto;
    }

    calculaLucroReal(custo, lucro, percentualImposto, valorFinal) {
        var lucroParametro = this.converteFloat(lucro);

        if (this.converteFloat(valorFinal) > 0) {
            return lucroParametro;
        } else {
            return (
                lucroParametro -
                this.calculaImposto(custo, lucro, percentualImposto)
            );
        }
    }

    calculaPercentual(valor, percentual) {
        valor = this.converteFloat(valor);
        percentual = this.converteFloat(percentual) / 100;

        return valor * percentual;
    }

    calculaTotalCategoria(itens) {
        var total = 0;
        itens.map((linha) =>
            linha.itens.map((item) => (total += this.converteFloat(item.valor)))
        );
        return total;
    }

    calculaValorVendaSemImposto(custo, lucro) {
        custo = this.converteFloat(custo);
        lucro = this.converteFloat(lucro);

        return custo + lucro;
    }

    calculaValorFinal(custo, lucro, imposto) {
        custo = this.converteFloat(custo);
        lucro = this.converteFloat(lucro);
        imposto = this.converteFloat(imposto);

        return custo + lucro + imposto;
    }
}

export default Calculadora;
