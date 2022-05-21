import Data from "../../Geral/Data";

class HorarioDTO {
    static json(data = null, horario = null) {
        return {
            data: data,
            horario: horario
        };
    }
}

export default HorarioDTO;