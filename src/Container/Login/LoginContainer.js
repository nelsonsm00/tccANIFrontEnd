/* IMPORT REACT */
import React from "react";
import Card from "react-bootstrap/Card";

/* IMPORT PROJETO */
import LoginForm from "../../Componente/Login/LoginForm";

export default () => {
    return (
        <>
            <center>
                <Card className="text-center login">
                    <Card.Body>
                        <Card.Text>
                            <LoginForm />
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="text-muted">ANI - Auxiliador Nutricional Integrado</Card.Footer>
                </Card>
            </center>
        </>
    );
};
