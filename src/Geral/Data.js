class Data {

    static formataStringData(valor) {
        valor = valor.replaceAll("-", "");
        var ano = valor.substr(0, 4);
        var mes = valor.substr(4, 2);
        var dia = valor.substr(6, 2);
        return mes + "/" + dia + "/" + ano;
    }

    static formataDataString(valor) {
        valor = valor.replaceAll("/", "");
        var dia = valor.substr(0, 2);
        var mes = valor.substr(2, 2);
        var ano = valor.substr(4, 4);
        return ano + "-" + mes + "-" + dia;
    }

    static converteDataString(d, o) {
        return (
            d.getFullYear() +
            "-" +
            (d.getMonth() < 9 && o
                ? "0" + (d.getMonth() + 1)
                : d.getMonth() + 1) +
            "-" +
            (d.getDate() < 10 && o ? "0" + d.getDate() : d.getDate())
        );
    }

    static converteStringData(valor, horario = false) {
        if (horario) {
            if (valor == "" || valor == null)
                valor = "00:00";
            return new Date("01/01/1900 " + valor);
        }
        else {
            if (valor == "" || valor == null)
                valor = "01/01/1900";
            else
                valor = Data.formataStringData(Data.formataDataString(valor));
            return new Date(valor);
        }
    }

    static converteStringDataHora(data, horario) {
        if (data == null || horario == null) return null;
        return data + "T" + horario + ":00.000Z";
    }

    static calculaIdade(data) {
        if (data == null) return null;
        data = data.replaceAll("/", "");
        var dia_aniversario = data.substr(0, 2);
        var mes_aniversario = data.substr(2, 2);
        var ano_aniversario = data.substr(4, 4);

        var d = new Date,
            ano_atual = d.getFullYear(),
            mes_atual = d.getMonth() + 1,
            dia_atual = d.getDate(),
    
            ano_aniversario = +ano_aniversario,
            mes_aniversario = +mes_aniversario,
            dia_aniversario = +dia_aniversario,
    
            quantos_anos = ano_atual - ano_aniversario;
    
        if (mes_atual < mes_aniversario || mes_atual == mes_aniversario && dia_atual < dia_aniversario) {
            quantos_anos--;
        }
    
        return quantos_anos < 0 ? 0 : quantos_anos;
    }
}

export default Data;
