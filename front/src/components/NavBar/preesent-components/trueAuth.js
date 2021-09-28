import { Button, Nav, Modal } from "react-bootstrap";
import React, { useContext, useState } from "react";
import { Context } from "../../../index";
import { useHistory } from "react-router-dom";
import { ADMIN_ROUTE, REPORT_ALL_ROUTE } from "../../../utils/consts";

const TrueAuth = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { user } = useContext(Context);
    const history = useHistory();

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
        localStorage.removeItem('token');
    }
    return (
        <Nav className="ml-auto" style={{ color: "white" }}>
            <Button className={"mr-3"} variant={"outline-light"} onClick={handleShow}>Справка</Button>
            <Button
                className={"mr-3"}
                variant={"outline-light"}
                onClick={() => { history.push(REPORT_ALL_ROUTE) }}>
                Отчёты
            </Button>
            <Button
                className={"mr-3"}
                variant={"outline-light"}
                onClick={() => { history.push(ADMIN_ROUTE) }}>
                Админ панель
            </Button>
            <Button
                variant={"outline-light"}
                onClick={() => logOut()}>
                Выйти
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Справка</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Добро пожаловать в систему.
                    Вам представлена возмжность добавления
                    рейтинга на уже имеющиеся автошколы,
                    добавление/ удаление/ редактирование автошкол,
                    а также аналогичные действия
                    (за исключением редактирвоания)для районов,форм обучения.
                    Имеется возможность формирования отчетов.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>
        </Nav>
    );
};

export default TrueAuth;
