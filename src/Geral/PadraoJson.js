/* IMPORT GERAL */
import Default from "./Default.js";

Object.freeze(Default);

const PadraoJson = {
    getModal: () => {
        return {
            show: false,
            mensagem: "",
            tipo: Default.modalAviso,
            salvar: false,
            senha: false,
            funcao: () => {},
        };
    },

    getUnidadeMedida: (unidadeMedida = "") => {
        return {
            unidadeMedidaDestino: unidadeMedida,
            valorOrigem: 1,
            valorDestino: 1,
        };
    },

    getProduto: (produto = -1) => {
        return {
            id: produto,
            descricao: "",
            descricaoProduto: "",
            valorUnitario: 0,
            unidadeMedida: "",
        };
    },

    getFormula: (formula = -1) => {
        return {
            id: formula,
            descricao: "",
            abreviacao: "",
        };
    },

    getCliente: (cliente = -1) => {
        return {
            id: cliente,
            descricao: "",
            btw: "",
            endereco: "",
            cep: "",
            cidade: "",
            pais: "",
            email: "",
        };
    },

    getMoedaEstrangeira: (moeda = -1) => {
        return {
            id: moeda,
            descricao: "",
            simbolo: "",
            valor: "0,00",
        };
    },

    getEnvioEmail: () => {
        return { enviarEmail: false, destinatario: null, cc: null, corpo: "" };
    },

    getTermo: (termo = -1) => {
        return { id: termo, descricao: "", texto: "" };
    },
};

export default PadraoJson;
