import React,  {useState} from "react";
import {Button, Nav,Modal} from "react-bootstrap";
import {LOGIN_ROUTE} from "../../../utils/consts";
import {NavLink} from "react-router-dom";

const FalseAuth = () => {
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Nav className="ml-auto" style={{color: "white"}}>
             <Button className={"mr-3"} variant={"outline-light"} onClick={handleShow}>Справка</Button>
            <NavLink to={LOGIN_ROUTE}>
                <Button variant={"outline-light"}>Авторизация</Button>
            </NavLink>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Справка</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Добро пожаловать. 
                    На данный момент у вас ограниченный функционал, чтобы это исправить вам необходимо войти в систему. Но вы можете просмотреть информацию.
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

export default FalseAuth;
