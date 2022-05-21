/* IMPORT REACT */
import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pt from "date-fns/locale/pt";

/* IMPORT GERAL */
import Data from "../../Geral/Data.js";

function setDate(props, date, f) {
    date == null ? (date = new Date()) : (date = date);

    props.functionSetData(Data.converteDataString(date, true));

    if (f != null) {
        f(date);
    }
}

export default (props) => {
    registerLocale("pt-BR", pt);
    const [startDate, setStartDate] = useState(new Date());
    var data =
        props.hasOwnProperty("valorPadrao") &&
        props.valorPadrao != null &&
        props.valorPadrao != ""
            ? new Date(
                  props.valorPadrao.substr(0, 4),
                  props.valorPadrao.substr(5, 2) - 1,
                  props.valorPadrao.substr(8, 2),
                  0,
                  0,
                  0,
                  0
              )
            : startDate;
    return (
        <DatePicker
            selected={data}
            onChange={(date) => setDate(props, date, setStartDate)}
            locale="pt-BR"
            mode="date"
            dateFormat="dd/MM/yyyy"
            className="form-control"
        />
    );
};
