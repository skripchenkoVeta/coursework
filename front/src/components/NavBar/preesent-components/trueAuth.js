import {Button, Nav} from "react-bootstrap";
import React, {useContext} from "react";
import {Context} from "../../../index";
import {useHistory} from "react-router-dom";
import {ADMIN_ROUTE,REPORT_ALL_ROUTE} from "../../../utils/consts";

const TrueAuth = () => {
    const {user} = useContext(Context);
    const history = useHistory();

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
        localStorage.removeItem('token');
    }

    return (
        <Nav className="ml-auto" style={{color: "white"}}>
              
              <Button
                className={"mr-3"}
                variant={"outline-light"}
                onClick={() => {history.push(REPORT_ALL_ROUTE)}}
            >
                Отчёты
            </Button>
            <Button
                className={"mr-3"}
                variant={"outline-light"}
                onClick={() => {history.push(ADMIN_ROUTE)}}
            >
                Админ панель
            </Button>
            <Button
                variant={"outline-light"}
                onClick={() => logOut()}
            >
                Выйти
            </Button>
        </Nav>
    );
};

export default TrueAuth;
