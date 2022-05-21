/* IMPORT REACT */
import axios from "axios";
import Default from "./Default";
import Cache from "./Cache";

const efetuaLogin = {
    value: 0,
    endPoint: "login",
    method: "post",
    params: { login: "", senha: "" },
    response: {},
    demo: {},
};
const consultaProduto = {
    value: 1,
    endPoint: "consultaProduto",
    method: "get",
    params: {},
    response: {
        id: -1,
        descricao: "",
        valorUnitario: -1,
        unidadeMedida: "",
    },
    demo: {
        1: {
            id: 1,
            descricao: "Lenha",
            valorUnitario: 5.0,
            unidadeMedida: "KG",
        },
        2: {
            id: 2,
            descricao: "Carvão",
            valorUnitario: 15.0,
            unidadeMedida: "KG",
        },
        3: {
            id: 3,
            descricao: "Narguile",
            valorUnitario: 25.0,
            unidadeMedida: "KG",
        },
    },
};
const consultaFormula = {
    value: 2,
    endPoint: "consultaFormula",
    method: "get",
    params: {},
    response: { id: -1, descricao: "", abreviacao: "" },
    read: true,
    demo: {
        1: {
            id: 1,
            descricao: "Cost and Freight",
            abreviacao: "CFR",
        },
    },
};
const consultaDadosFormula = {
    value: 3,
    endPoint: "consultaDadosFormula",
    method: "get",
    params: { idFormula: -1 },
    response: {
        id: -1,
        descricao: "",
        operacao: "",
        itens: { id: -1, descricao: "", usaPercentual: false },
    },
    demo: {
        1: {
            id: 1,
            descricao: "MERCADO INTERNO",
            operacao: "-",
            itens: {
                1: {
                    id: 1,
                    descricao: "ICMS",
                    usaPercentual: true,
                },
                2: {
                    id: 2,
                    descricao: "COFINS",
                    usaPercentual: true,
                },
                3: {
                    id: 3,
                    descricao: "PIS",
                    usaPercentual: true,
                },
                4: {
                    id: 4,
                    descricao: "Outros Tributos",
                    usaPercentual: true,
                },
                5: {
                    id: 5,
                    descricao: "Lucro de mercado interno",
                    usaPercentual: false,
                },
                6: {
                    id: 6,
                    descricao: "Embalagem",
                    usaPercentual: false,
                },
                7: {
                    id: 7,
                    descricao: "Outras despesas",
                    usaPercentual: false,
                },
            },
        },
        2: {
            id: 2,
            descricao: "EXPORTAÇÃO",
            operacao: "+",
            itens: {
                1: {
                    id: 1,
                    descricao: "Frete rodoviário",
                    usaPercentual: false,
                },
                2: {
                    id: 2,
                    descricao: "Retirada Conteiner Porto",
                    usaPercentual: false,
                },
                3: {
                    id: 3,
                    descricao: "Serviço de Estufagem de Conteiner",
                    usaPercentual: false,
                },
                4: {
                    id: 4,
                    descricao: "Liberação de BL",
                    usaPercentual: false,
                    percentual: 0,
                    valor: 0,
                },
                5: {
                    id: 5,
                    descricao: "Lacre",
                    usaPercentual: false,
                    percentual: 0,
                    valor: 0,
                },
                6: {
                    id: 6,
                    descricao: "ISPS",
                    usaPercentual: false,
                    percentual: 0,
                    valor: 0,
                },
                7: {
                    id: 7,
                    descricao: "THC Conteiner",
                    usaPercentual: false,
                },
                8: {
                    id: 8,
                    descricao: "Export Fee",
                    usaPercentual: false,
                },
                9: {
                    id: 9,
                    descricao: "Self Heating Certificate",
                    usaPercentual: false,
                },
                10: {
                    id: 10,
                    descricao: "Despachante",
                    usaPercentual: false,
                },
                11: {
                    id: 11,
                    descricao: "Courrier",
                    usaPercentual: false,
                },
                12: {
                    id: 12,
                    descricao: "Certificado de Origem",
                    usaPercentual: false,
                },
            },
        },
    },
};
const consultaConversaoUnidadesMedidas = {
    value: 4,
    endPoint: "consultaConversaoUnidadesMedidas",
    method: "get",
    params: { unidadeMedida: "" },
    response: {
        unidadeMedidaDestino: "",
        valorOrigem: -1,
        valorDestino: -1,
    },
    demo: {
        KG: {
            unidadeMedidaDestino: "KG",
            valorOrigem: 1,
            valorDestino: 1,
        },
        TONS: {
            unidadeMedidaDestino: "TONS",
            valorOrigem: 1,
            valorDestino: 0.001,
        },
    },
};
const consultaImposto = {
    value: 5,
    endPoint: "consultaConfiguracaoSimulacao",
    method: "get",
    params: {},
    response: { imposto: -1 },
    demo: { 0: { imposto: 2.2 } },
};
const consultaMoedaEstrangeira = {
    value: 6,
    endPoint: "consultaMoedaEstrangeira",
    method: "get",
    params: {},
    response: {
        id: -1,
        descricao: "",
        simbolo: "",
        valorReal: -1,
        valorEstrangeiro: -1,
    },
    demo: [
        { id: 1, descricao: "Dólar", simbolo: "US$", valor: 5.6728 },
        { id: 2, descricao: "Euro", simbolo: "€", valor: 6.789 },
    ],
};
const salvarSimulacao = {
    value: 7,
    endPoint: "salvarSimulacao",
    method: "post",
    params: {
        idFormula: -1,
        produto: { id: -1, quantidade: 0, valorUnitario: 0, unidadeMedida: "" },
        valoresIniciais: {
            lucroDesejado: 0,
            valorLucro: 0,
            valorFinalDesejado: 0,
            imposto: 0,
            moedaEstrangeira: { id: -1, valor: 0 },
        },
        categorias: {
            1: {
                id: -1,
                itens: {
                    id: -1,
                    usaPercentual: false,
                    percentual: 0,
                    valor: 0,
                },
                total: 0,
            },
        },
        total: {
            custoFinal: 0,
            lucroFinal: 0,
            valorVendaSemImposto: 0,
            valorImposto: 0,
            valorFinal: 0,
        },
    },
    response: {},
    demo: { status: true },
};
const exportarPDF = {
    value: 8,
    endPoint: "emiteOrcamento",
    method: "post",
    params: { idSimulacao: -1 },
    response: {},
    demo: { status: true },
};
const excluirSimulacao = {
    value: 9,
    endPoint: "deletaSimulacao",
    method: "post",
    params: { id: -1 },
    response: {},
    demo: { status: true },
};
const gerarInvoice = {
    value: 10,
    endPoint: "emiteInvoice",
    method: "post",
    params: { idSimulacao: -1 },
    response: {},
    demo: { status: true },
};
const consultaSimulacao = {
    value: 11,
    endPoint: "consultaSimulacao",
    method: "get",
    params: {},
    response: {
        idSimulacao: -1,
        nomeSimulacao: "",
        descricaoProduto: "",
        nomeCliente: "",
        data: "",
    },
    demo: {
        1: {
            idSimulacao: 1,
            nomeSimulacao: "Simulação Lenha",
            descricaoProduto: "Lenha",
            nomeCliente: "Irlanda",
            data: "27/02/2021",
        },
        2: {
            idSimulacao: 2,
            nomeSimulacao: "Simulação Carvão",
            descricaoProduto: "Carvão",
            nomeCliente: "Alemanha",
            data: "30/12/2020",
        },
        3: {
            idSimulacao: 3,
            nomeSimulacao: "Simulação Narguile",
            descricaoProduto: "Narguile",
            nomeCliente: "Austrália",
            data: "01/01/2021",
        },
    },
};
const consultaDadosSimulacao = {
    value: 12,
    endPoint: "consultaDadosSimulacao",
    method: "get",
    params: { idSimulacao: -1 },
    response: {},
    demo: {
        idFormula: 1,
        produto: {
            id: 1,
            quantidade: 200,
            valorUnitario: 500,
            unidadeMedida: "KG",
        },
        valoresIniciais: {
            lucroDesejado: 0,
            valorLucro: 0,
            valorFinalDesejado: 300,
            imposto: 2.02,
            moedaEstrangeira: {
                id: 1,
                descricao: "Dólar",
                simbolo: "US$",
                valor: 5.67,
            },
        },
        categorias: {
            1: {
                id: 1,
                descricao: "MERCADO INTERNO",
                operacao: "-",
                itens: {
                    1: {
                        id: 1,
                        descricao: "ICMS",
                        usaPercentual: true,
                    },
                    2: {
                        id: 2,
                        descricao: "COFINS",
                        usaPercentual: true,
                    },
                    3: {
                        id: 3,
                        descricao: "PIS",
                        usaPercentual: true,
                    },
                    4: {
                        id: 4,
                        descricao: "Outros Tributos",
                        usaPercentual: true,
                    },
                    5: {
                        id: 5,
                        descricao: "Lucro de mercado interno",
                        usaPercentual: false,
                    },
                    6: {
                        id: 6,
                        descricao: "Embalagem",
                        usaPercentual: false,
                    },
                    7: {
                        id: 7,
                        descricao: "Outras despesas",
                        usaPercentual: false,
                    },
                },
            },
            2: {
                id: 2,
                descricao: "EXPORTAÇÃO",
                operacao: "+",
                itens: {
                    1: {
                        id: 1,
                        descricao: "Frete rodoviário",
                        usaPercentual: false,
                    },
                    2: {
                        id: 2,
                        descricao: "Retirada Conteiner Porto",
                        usaPercentual: false,
                    },
                    3: {
                        id: 3,
                        descricao: "Serviço de Estufagem de Conteiner",
                        usaPercentual: false,
                    },
                    4: {
                        id: 4,
                        descricao: "Liberação de BL",
                        usaPercentual: false,
                        percentual: 0,
                        valor: 0,
                    },
                    5: {
                        id: 5,
                        descricao: "Lacre",
                        usaPercentual: false,
                        percentual: 0,
                        valor: 0,
                    },
                    6: {
                        id: 6,
                        descricao: "ISPS",
                        usaPercentual: false,
                        percentual: 0,
                        valor: 0,
                    },
                    7: {
                        id: 7,
                        descricao: "THC Conteiner",
                        usaPercentual: false,
                    },
                    8: {
                        id: 8,
                        descricao: "Export Fee",
                        usaPercentual: false,
                    },
                    9: {
                        id: 9,
                        descricao: "Self Heating Certificate",
                        usaPercentual: false,
                    },
                    10: {
                        id: 10,
                        descricao: "Despachante",
                        usaPercentual: false,
                    },
                    11: {
                        id: 11,
                        descricao: "Courrier",
                        usaPercentual: false,
                    },
                    12: {
                        id: 12,
                        descricao: "Certificado de Origem",
                        usaPercentual: false,
                    },
                },
            },
        },
        total: {
            custoFinal: 300,
            lucroFinal: 10,
            valorVendaSemImposto: 0,
            valorImposto: 0,
            valorFinal: 0,
        },
    },
};
const excluiProduto = {
    value: 13,
    endPoint: "deletaProduto",
    method: "post",
    params: {
        id: -1,
    },
    response: {},
    demo: { status: true },
};
const salvarProduto = {
    value: 14,
    endPoint: "salvarProduto",
    method: "post",
    params: { id: -1, quantidade: 0, valorUnitario: 0, unidadeMedida: "" },
    response: {},
    demo: { status: true },
};
const salvaFormula = {
    value: 15,
    endPoint: "salvaFormula",
    method: "post",
    params: {
        id: -1,
        descricao: "",
        abreviacao: "",
    },
    response: {},
    demo: { status: true },
};
const excluiFormula = {
    value: 16,
    endPoint: "deletaFormula",
    method: "post",
    params: {
        id: -1,
    },
    response: {},
    demo: { status: true },
};
const insereFormula = {
    value: 17,
    endPoint: "insereFormula",
    method: "post",
    params: {
        descricao: "",
        abreviacao: "",
    },
    response: {},
    demo: { status: true },
};
const consultaUnidadesMedidas = {
    value: 18,
    endPoint: "consultaUnidadeMedida",
    method: "get",
    params: { unidadeMedida: "" },
    response: {
        unidadeMedida: "",
        descricao: "",
    },
    demo: {
        KG: {
            unidadeMedida: "KG",
            descricao: "Quilo",
        },
        TONS: {
            unidadeMedida: "TONS",
            descricao: "Tonelada",
        },
    },
};
const consultaCliente = {
    value: 19,
    endPoint: "consultaCliente",
    method: "get",
    params: { id: -1 },
    response: {
        id: -1,
        descricao: "",
        endereco: "",
        cep: "",
        cidade: "",
        pais: "",
    },
    demo: {
        1: {
            id: 1,
            descricao: "Arcade",
            endereco: "R BRAGA, 62",
            cep: "9595",
            cidade: "Londres",
            pais: "Inglaterra",
        },
    },
};
const salvaCliente = {
    value: 20,
    endPoint: "salvaCliente",
    method: "post",
    params: {
        id: -1,
        descricao: "",
        endereco: "",
        cep: "",
        cidade: "",
        pais: "",
    },
    response: {},
    demo: {},
};
const excluiCliente = {
    value: 21,
    endPoint: "deletaCliente",
    method: "post",
    params: {
        id: -1,
    },
    response: true,
    demo: {},
};
const consultaTermo = {
    value: 22,
    endPoint: "consultaTermo",
    method: "get",
    params: { id: -1 },
    response: {
        id: -1,
        descricao: "",
        texto: "",
    },
    demo: {},
};
const salvaTermo = {
    value: 23,
    endPoint: "salvaTermo",
    method: "post",
    params: {
        id: -1,
        descricao: "",
        texto: "",
    },
    response: {},
    demo: {},
};
const excluiTermo = {
    value: 24,
    endPoint: "deletaTermo",
    method: "post",
    params: {
        id: -1,
    },
    response: true,
    demo: {},
};
const consultaDadosFormulaCadastro = {
    value: 25,
    endPoint: "consultaDadosFormulaCadastro",
    method: "get",
    params: { idFormula: -1 },
    response: {
        id: -1,
        descricao: "",
        operacao: "",
        itens: { id: -1, descricao: "", usaPercentual: false },
    },
    demo: {
        1: {
            id: 1,
            descricao: "MERCADO INTERNO",
            operacao: "-",
            itens: {
                1: {
                    id: 1,
                    descricao: "ICMS",
                    usaPercentual: true,
                },
                2: {
                    id: 2,
                    descricao: "COFINS",
                    usaPercentual: true,
                },
                3: {
                    id: 3,
                    descricao: "PIS",
                    usaPercentual: true,
                },
                4: {
                    id: 4,
                    descricao: "Outros Tributos",
                    usaPercentual: true,
                },
                5: {
                    id: 5,
                    descricao: "Lucro de mercado interno",
                    usaPercentual: false,
                },
                6: {
                    id: 6,
                    descricao: "Embalagem",
                    usaPercentual: false,
                },
                7: {
                    id: 7,
                    descricao: "Outras despesas",
                    usaPercentual: false,
                },
            },
        },
        2: {
            id: 2,
            descricao: "EXPORTAÇÃO",
            operacao: "+",
            itens: {
                1: {
                    id: 1,
                    descricao: "Frete rodoviário",
                    usaPercentual: false,
                },
                2: {
                    id: 2,
                    descricao: "Retirada Conteiner Porto",
                    usaPercentual: false,
                },
                3: {
                    id: 3,
                    descricao: "Serviço de Estufagem de Conteiner",
                    usaPercentual: false,
                },
                4: {
                    id: 4,
                    descricao: "Liberação de BL",
                    usaPercentual: false,
                    percentual: 0,
                    valor: 0,
                },
                5: {
                    id: 5,
                    descricao: "Lacre",
                    usaPercentual: false,
                    percentual: 0,
                    valor: 0,
                },
                6: {
                    id: 6,
                    descricao: "ISPS",
                    usaPercentual: false,
                    percentual: 0,
                    valor: 0,
                },
                7: {
                    id: 7,
                    descricao: "THC Conteiner",
                    usaPercentual: false,
                },
                8: {
                    id: 8,
                    descricao: "Export Fee",
                    usaPercentual: false,
                },
                9: {
                    id: 9,
                    descricao: "Self Heating Certificate",
                    usaPercentual: false,
                },
                10: {
                    id: 10,
                    descricao: "Despachante",
                    usaPercentual: false,
                },
                11: {
                    id: 11,
                    descricao: "Courrier",
                    usaPercentual: false,
                },
                12: {
                    id: 12,
                    descricao: "Certificado de Origem",
                    usaPercentual: false,
                },
            },
        },
    },
};
const salvaItem = {
    value: 26,
    endPoint: "salvaItem",
    method: "post",
    params: {
        id: -1,
        descricao: "",
        usaPercentual: false,
        ativo: false,
        idCategoria: -1,
        idFormula: -1,
    },
    response: {},
    demo: { status: true },
};
const excluiItem = {
    value: 27,
    endPoint: "deletaItem",
    method: "post",
    params: {
        id: -1,
    },
    response: {},
    demo: { status: true },
};
const consultaConfiguracao = {
    value: 28,
    endPoint: "consultaConfiguracao",
    method: "get",
    params: {},
    response: {},
    demo: {},
};
const salvaConfiguracao = {
    value: 29,
    endPoint: "salvaConfiguracao",
    method: "post",
    params: {},
    response: {},
    demo: { status: true },
};
const efetuaLogoff = {
    value: 30,
    endPoint: "logoff",
    method: "post",
    params: {},
    response: {},
    demo: { status: true },
};
const consultaUsuario = {
    value: 31,
    endPoint: "consultaUsuario",
    method: "get",
    params: { id: -1 },
    response: {},
    demo: { status: true },
};
const salvaUsuario = {
    value: 32,
    endPoint: "salvaUsuario",
    method: "post",
    params: { id: -1, login: "", email: "", nome: "" },
    response: {},
    demo: { status: true },
};
const atualizaSenha = {
    value: 33,
    endPoint: "atualizaSenha",
    method: "post",
    params: { id: -1, senha: "" },
    response: {},
    demo: { status: true },
};
const recuperaSenha = {
    value: 34,
    endPoint: "recuperaSenha",
    method: "post",
    params: { login: "" },
    response: {},
    demo: { status: true },
};
const atualizaSenhaRecuperacao = {
    value: 35,
    endPoint: "atualizaSenhaRecuperacao",
    method: "post",
    params: { codigo: -1, senha: "" },
    response: {},
    demo: { status: true },
};

const url = "http://" + document.location.hostname + ":81/?method=";

/* CONSTANTE SERVICE REQUEST */
const ServiceRequest = {
    /* REQUISICOES */
    consultaProduto: {
        value: consultaProduto.value,
        read: true,
    },
    consultaFormula: {
        value: consultaFormula.value,
        read: true,
    },
    consultaDadosFormula: {
        value: consultaDadosFormula.value,
        read: true,
    },
    consultaConversaoUnidadesMedidas: {
        value: consultaConversaoUnidadesMedidas.value,
        read: true,
    },
    consultaImposto: {
        value: consultaImposto.value,
        read: true,
    },
    consultaMoedaEstrangeira: {
        value: consultaMoedaEstrangeira.value,
        read: true,
    },
    salvarSimulacao: {
        value: salvarSimulacao.value,
        read: true,
    },
    exportarPDF: {
        value: exportarPDF.value,
        read: true,
    },
    excluirSimulacao: {
        value: excluirSimulacao.value,
        read: true,
    },
    gerarInvoice: {
        value: gerarInvoice.value,
        read: true,
    },
    consultaSimulacao: {
        value: consultaSimulacao.value,
        read: true,
    },
    consultaDadosSimulacao: {
        value: consultaDadosSimulacao.value,
        read: true,
    },
    excluiProduto: {
        value: excluiProduto.value,
        read: true,
    },
    salvarProduto: {
        value: salvarProduto.value,
        read: true,
    },
    salvaFormula: {
        value: salvaFormula.value,
        read: true,
    },
    excluiFormula: {
        value: excluiFormula.value,
        read: true,
    },
    insereFormula: {
        value: insereFormula.value,
        read: true,
    },
    consultaUnidadesMedidas: {
        value: consultaUnidadesMedidas.value,
        read: true,
    },
    consultaCliente: {
        value: consultaCliente.value,
        read: true,
    },
    salvaCliente: {
        value: salvaCliente.value,
        read: true,
    },
    excluiCliente: {
        value: excluiCliente.value,
        read: true,
    },
    consultaTermo: {
        value: consultaTermo.value,
        read: true,
    },
    salvaTermo: {
        value: salvaTermo.value,
        read: true,
    },
    excluiTermo: {
        value: excluiTermo.value,
        read: true,
    },
    consultaDadosFormulaCadastro: {
        value: consultaDadosFormulaCadastro.value,
        read: true,
    },
    salvaItem: {
        value: salvaItem.value,
        read: true,
    },
    excluiItem: {
        value: excluiItem.value,
        read: true,
    },
    consultaConfiguracao: {
        value: consultaConfiguracao.value,
        read: true,
    },
    salvaConfiguracao: {
        value: salvaConfiguracao.value,
        read: true,
    },
    efetuaLogin: {
        value: efetuaLogin.value,
        read: true,
    },
    efetuaLogoff: { value: efetuaLogoff.value, read: true },
    consultaUsuario: { value: consultaUsuario.value, read: true },
    salvaUsuario: { value: salvaUsuario.value, read: true },
    atualizaSenha: { value: atualizaSenha.value, read: true },
    atualizaSenhaRecuperacao: {
        value: atualizaSenhaRecuperacao.value,
        read: true,
    },
    recuperaSenha: {
        value: recuperaSenha.value,
        read: true,
    },

    /* FUNCOES */
    doRequest: async (requisicao, params = {}) => {
        var config = {
            method: "",
            url: url,
            params: params,
        };
        var requisicaoValida = true;
        var response = null;
        var requisicaoJson = {};

        switch (requisicao) {
            case efetuaLogin.value:
                requisicaoJson = efetuaLogin;
                break;
            case consultaProduto.value:
                requisicaoJson = consultaProduto;
                break;
            case consultaFormula.value:
                requisicaoJson = consultaFormula;
                break;
            case consultaDadosFormula.value:
                requisicaoJson = consultaDadosFormula;
                break;
            case consultaConversaoUnidadesMedidas.value:
                requisicaoJson = consultaConversaoUnidadesMedidas;
                break;
            case consultaImposto.value:
                requisicaoJson = consultaImposto;
                break;
            case consultaMoedaEstrangeira.value:
                requisicaoJson = consultaMoedaEstrangeira;
                break;
            case salvarSimulacao.value:
                requisicaoJson = salvarSimulacao;
                break;
            case exportarPDF.value:
                requisicaoJson = exportarPDF;
                break;
            case excluirSimulacao.value:
                requisicaoJson = excluirSimulacao;
                break;
            case gerarInvoice.value:
                requisicaoJson = gerarInvoice;
                break;
            case consultaSimulacao.value:
                requisicaoJson = consultaSimulacao;
                break;
            case consultaDadosSimulacao.value:
                requisicaoJson = consultaDadosSimulacao;
                break;
            case excluiProduto.value:
                requisicaoJson = excluiProduto;
                break;
            case salvarProduto.value:
                requisicaoJson = salvarProduto;
                break;
            case salvaFormula.value:
                requisicaoJson = salvaFormula;
                break;
            case excluiFormula.value:
                requisicaoJson = excluiFormula;
                break;
            case insereFormula.value:
                requisicaoJson = insereFormula;
                break;
            case consultaUnidadesMedidas.value:
                requisicaoJson = consultaUnidadesMedidas;
                break;
            case consultaCliente.value:
                requisicaoJson = consultaCliente;
                break;
            case salvaCliente.value:
                requisicaoJson = salvaCliente;
                break;
            case excluiCliente.value:
                requisicaoJson = excluiCliente;
                break;
            case consultaTermo.value:
                requisicaoJson = consultaTermo;
                break;
            case salvaTermo.value:
                requisicaoJson = salvaTermo;
                break;
            case excluiTermo.value:
                requisicaoJson = excluiTermo;
                break;
            case consultaDadosFormulaCadastro.value:
                requisicaoJson = consultaDadosFormulaCadastro;
                break;
            case salvaItem.value:
                requisicaoJson = salvaItem;
                break;
            case excluiItem.value:
                requisicaoJson = excluiItem;
                break;
            case consultaConfiguracao.value:
                requisicaoJson = consultaConfiguracao;
                break;
            case salvaConfiguracao.value:
                requisicaoJson = salvaConfiguracao;
                break;
            case efetuaLogoff.value:
                requisicaoJson = efetuaLogoff;
                break;
            case consultaUsuario.value:
                requisicaoJson = consultaUsuario;
                break;
            case salvaUsuario.value:
                requisicaoJson = salvaUsuario;
                break;
            case atualizaSenha.value:
                requisicaoJson = atualizaSenha;
                break;
            case atualizaSenhaRecuperacao.value:
                requisicaoJson = atualizaSenhaRecuperacao;
                break;
            case recuperaSenha.value:
                requisicaoJson = recuperaSenha;
                break;
            default:
                requisicaoValida = false;
                break;
        }

        if (requisicaoValida) {
            config.method = requisicaoJson.method;
            config.url = config.url + requisicaoJson.endPoint;
            if (Default.demo.value) response = requisicaoJson.demo;
        }

        if (requisicaoValida && !Default.demo.value) {
            var response;
            var configuracaoPost = {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    token: Cache.token.value,
                },
            };
            try {
                // SE A REQUISICAO É PARA GERAR PDF
                if (
                    requisicao == exportarPDF.value ||
                    requisicao == gerarInvoice.value
                ) {
                    configuracaoPost.responseType = "arraybuffer";
                    configuracaoPost.headers.Accept = "application/pdf";
                }

                if (config.method == "get") {
                    config.headers = configuracaoPost.headers;
                    response = await axios(config);
                } else if (config.method == "post") {
                    response = await axios.post(
                        config.url,
                        JSON.stringify(Object.assign({}, [config.params])),
                        configuracaoPost
                    );
                }
            } catch (error) {
                return { mensagem: error.message };
            }

            // SE EXISTIR TOKEN ATUALIZA
            if (response.hasOwnProperty("headers")) {
                if (response.headers.hasOwnProperty("token")) {
                    Cache.token.set(response.headers.token);
                    Cache.token.value = response.headers.token;
                }
            }

            if (response.hasOwnProperty("data")) {
                // SE A REQUISICAO É PARA GERAR PDF
                if (
                    requisicao == exportarPDF.value ||
                    requisicao == gerarInvoice.value
                ) {
                    var urlPDF = window.URL.createObjectURL(
                        new Blob([response.data])
                    );
                    var linkPDF = document.createElement("a");
                    linkPDF.href = urlPDF;
                    linkPDF.setAttribute(
                        "download",
                        config.params.nomeArquivo + ".pdf"
                    );
                    document.body.appendChild(linkPDF);
                    linkPDF.click();
                    return {};
                } else if (response.data.hasOwnProperty("status")) {
                    if (response.data.status) {
                        return response.data.data;
                    } else {
                        // SE O TOKEN É INVÁLIDO
                        if (response.data.msg.includes("[13007]")) {
                            document.location.href = "/Logoff";
                        }

                        return { mensagem: response.data.msg };
                    }
                } else {
                    return {
                        mensagem: "Não foi possível completar a requisição.",
                    };
                }
            } else {
                return {};
            }
        } else if (Default.demo.value) {
            return response;
        } else {
            return {};
        }
    },
};

export default ServiceRequest;
