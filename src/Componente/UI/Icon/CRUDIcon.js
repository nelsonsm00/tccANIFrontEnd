/* IMPORT REACT */
import { Col, Row, Container } from "react-bootstrap";

/* IMPORT PROJETO */
import IconEdit from "./IconEdit";
import IconDelete from "./IconDelete";
import IconArrow from "./IconArrow";

/* IMPORT GERAL */
import Utils from "../../../Geral/Utils";
import IconInativo from "./IconInativo";

export default (props) => {
    var renderizaContainer = props.hasOwnProperty("renderizaContainer")
        ? props.renderizaContainer
        : true;
    var inativar = props.hasOwnProperty("inativar")
        ? props.inativar
        : false;
    var showIcon = props.hasOwnProperty("showIcon")
        ? props.showIcon
        : false;

        var parametrosGetSizeColumn = {button: true, show: showIcon && !inativar};

    if (renderizaContainer) {
        return (
            <Container>
                <Row>
                    {inativar && showIcon ? <></> :
                    <Col
                        xs={Utils.getTamanhoColuna(
                            "xs",
                            parametrosGetSizeColumn
                        )}
                        sm={Utils.getTamanhoColuna(
                            "sm",
                            parametrosGetSizeColumn
                        )}
                        md={Utils.getTamanhoColuna(
                            "md",
                            parametrosGetSizeColumn
                        )}
                        lg={Utils.getTamanhoColuna(
                            "lg",
                            parametrosGetSizeColumn
                        )}
                        xl={Utils.getTamanhoColuna(
                            "xl",
                            parametrosGetSizeColumn
                        )}
                        className="crudIcon"
                    >
                        <IconEdit
                            funcao={props.editar}
                            parametrosFuncao={props.parametrosEditar}
                        />
                    </Col>
                    }
                    <Col
                        xs={Utils.getTamanhoColuna(
                            "xs",
                            parametrosGetSizeColumn
                        )}
                        sm={Utils.getTamanhoColuna(
                            "sm",
                            parametrosGetSizeColumn
                        )}
                        md={Utils.getTamanhoColuna(
                            "md",
                            parametrosGetSizeColumn
                        )}
                        lg={Utils.getTamanhoColuna(
                            "lg",
                            parametrosGetSizeColumn
                        )}
                        xl={Utils.getTamanhoColuna(
                            "xl",
                            parametrosGetSizeColumn
                        )}
                        className="crudIcon"
                    >
                        {inativar 
                        ? <IconInativo
                            funcao={props.deletar}
                            parametrosFuncao={props.parametrosDeletar}
                        />
                        : <IconDelete
                            funcao={props.deletar}
                            parametrosFuncao={props.parametrosDeletar}
                        />
                    }
                    </Col>
                    {showIcon ?
                        <Col
                            xs={Utils.getTamanhoColuna("xs", parametrosGetSizeColumn)}
                            sm={Utils.getTamanhoColuna("sm", parametrosGetSizeColumn)}
                            md={Utils.getTamanhoColuna("md", parametrosGetSizeColumn)}
                            lg={Utils.getTamanhoColuna("lg", parametrosGetSizeColumn)}
                            xl={Utils.getTamanhoColuna("xl", parametrosGetSizeColumn)}
                            className="crudIcon"
                        >
                            <IconArrow 
                                funcao={props.show}
                                parametrosFuncao={props.parametrosShow}
                            />
                        </Col> : <></>}
                </Row>
            </Container>
        );
    } else {
        return (
            <>
                {inativar && showIcon ? <></> :
                <Col
                    xs={Utils.getTamanhoColuna("xs", parametrosGetSizeColumn)}
                    sm={Utils.getTamanhoColuna("sm", parametrosGetSizeColumn)}
                    md={Utils.getTamanhoColuna("md", parametrosGetSizeColumn)}
                    lg={Utils.getTamanhoColuna("lg", parametrosGetSizeColumn)}
                    xl={Utils.getTamanhoColuna("xl", parametrosGetSizeColumn)}
                    className="crudIcon"
                >
                    <IconEdit
                        funcao={props.editar}
                        parametrosFuncao={props.parametrosEditar}
                    />
                </Col>
                }
                <Col
                    xs={Utils.getTamanhoColuna("xs", parametrosGetSizeColumn)}
                    sm={Utils.getTamanhoColuna("sm", parametrosGetSizeColumn)}
                    md={Utils.getTamanhoColuna("md", parametrosGetSizeColumn)}
                    lg={Utils.getTamanhoColuna("lg", parametrosGetSizeColumn)}
                    xl={Utils.getTamanhoColuna("xl", parametrosGetSizeColumn)}
                    className="crudIcon"
                >
                    {inativar 
                        ? <IconInativo
                            funcao={props.deletar}
                            parametrosFuncao={props.parametrosDeletar}
                        />
                        : <IconDelete
                            funcao={props.deletar}
                            parametrosFuncao={props.parametrosDeletar}
                        />
                    }
                </Col>
                {showIcon ?
                <Col
                    xs={Utils.getTamanhoColuna("xs", parametrosGetSizeColumn)}
                    sm={Utils.getTamanhoColuna("sm", parametrosGetSizeColumn)}
                    md={Utils.getTamanhoColuna("md", parametrosGetSizeColumn)}
                    lg={Utils.getTamanhoColuna("lg", parametrosGetSizeColumn)}
                    xl={Utils.getTamanhoColuna("xl", parametrosGetSizeColumn)}
                    className="crudIcon"
                >
                    <IconArrow 
                        funcao={props.show}
                        parametrosFuncao={props.parametrosShow}
                    />
                </Col> : <></>}
            </>
        );
    }
};
