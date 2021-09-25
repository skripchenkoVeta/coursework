import React, {useEffect, useState} from 'react';
import {
    Alert,
    Button,
    Col,
    Container,
    Dropdown,
    Form,
    Image,
    InputGroup,
    ListGroup,
    Pagination,
    Row
} from "react-bootstrap";

import CreateDrivingSchool from "../components/modals/CreateDrivingSchool";
import CreateBrand from "../components/modals/CreateBrand";
import CreateType from "../components/modals/CreateType";
import {getAllDrivingSchoolsInAdminPage} from "../http/drivingschoolAPI";
import {NavLink} from "react-router-dom";
import {DEVICE_EDIT_ROUTE, REPORT_ONE_ROUTE} from "../utils/consts";
import DeleteBrandOrType from "../components/modals/DeleteBrandOrType";

const Admin = () => {
    const [brandVisible, setBrandVisible] = useState(false);
    const [typeVisible, setTypeVisible] = useState(false);
    const [drivingschoolVisible, setDrivingSchoolVisible] = useState(false);
    const [deleteBrandOrType, setDeleteBrandOrType] = useState(false);

    const [searchDrivingSchool, setSearchDrivingSchool] = useState('');
    const [searchedDrivingSchool, setSearchedDrivingSchool] = useState([]);
    const [filter, setFilter] = useState("Все");
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(1);

    const [successMsg, setSuccessMsg] = useState('');
    const [showSuccessMsg, setShowSuccessMsg] = useState(false);

    //pagination
    const limit = 5;
    const pageCount = Math.ceil(Number(count) / limit);
    const pages = [];
    for (let number = 1; number < pageCount + 1; number++) {
        pages.push(
            <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
                {number}
            </Pagination.Item>
        );
    }


    useEffect(() => {
        getAllDrivingSchoolsInAdminPage(searchDrivingSchool, currentPage, filter).then(({count, rows}) => {
            setSearchedDrivingSchool(rows);
            setCount(count)
        })
    }, [currentPage])

    useEffect(() => {
        getAllDrivingSchoolsInAdminPage(searchDrivingSchool, 1, filter).then(({count, rows}) => {
            setSearchedDrivingSchool(rows);
            setCount(count);
            setCurrentPage(1);
        })
    }, [filter, successMsg])


    const fetchDrivingSchool = () => {
        getAllDrivingSchoolsInAdminPage(searchDrivingSchool, currentPage, filter).then(({count, rows}) => {
            setSearchedDrivingSchool(rows);
            setCount(count)
        })
    };

    const showSuccessMsgFunc = (msg) => {
        setSuccessMsg(msg);
        setShowSuccessMsg(true);
        setTimeout(() => setShowSuccessMsg(false), 5000);
    }

    return (
        <Container className="d-flex flex-column">
            {showSuccessMsg && <p>{successMsg}</p>}
            <Button
                onClick={() => setTypeVisible(true)}
                variant="outline-dark"
                className="mt-4 p-2"
            >
                Добавить район
            </Button>
            <Button
                onClick={() => setBrandVisible(true)}
                variant="outline-dark"
                className="mt-4 p-2"
            >
                Добавить форму обучения
            </Button>
            <Button
                onClick={() => setDrivingSchoolVisible(true)}
                variant="outline-dark"
                className="mt-4 p-2"
            >
                Добавить автошколу
            </Button>
            <Button
                onClick={() => setDeleteBrandOrType(true)}
                variant="outline-dark"
                className="mt-4 p-2"
            >
                Удалить "район"/"форму обучения"
            </Button>
            <CreateDrivingSchool show={drivingschoolVisible} onHide={() => setDrivingSchoolVisible(false)}/>
            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
            <DeleteBrandOrType show={deleteBrandOrType} onHide={() => setDeleteBrandOrType(false)} showSuccessMsgFunc={showSuccessMsgFunc}/>

            <Dropdown className="mt-5 mb-3" style={{margin: "0 auto"}}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {filter}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {filter === "Все" ? <Dropdown.Item disabled>Все</Dropdown.Item> : <Dropdown.Item onClick={() => setFilter("Все")}>Все</Dropdown.Item>}
                    {filter === "Без характеристик" ? <Dropdown.Item disabled>Без характеристик</Dropdown.Item> : <Dropdown.Item onClick={() => setFilter("Без характеристик")}>Без характеристик</Dropdown.Item>}
                </Dropdown.Menu>
            </Dropdown>

            <InputGroup className="mb-3">
                <Form.Control
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    value={searchDrivingSchool}
                    onChange={e => setSearchDrivingSchool(e.target.value)}
                    placeholder="Введите название автошколы"
                />
                <Button
                    onClick={fetchDrivingSchool}
                    variant="outline-dark"
                    className="ml-2"
                >
                    Поиск
                </Button>
            </InputGroup>

            <ListGroup>
                {searchedDrivingSchool && searchedDrivingSchool.map( ({id, img, brand, type, price, name}) => {
                    return (
                        <ListGroup.Item className="mt-3" key={id}>
                            <Row>
                                <Col xs={2}>
                                    <Image width={150} src={process.env.REACT_APP_API_URL + img}/>
                                </Col>
                                <Col xs={8}>
                                   
                                    <Row>
                                        <Col xs={12}>
                                            Название: {name}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            Стоимость: {price}
                                        </Col>
                                    </Row>
                                  
                                </Col>
                                <Col xs={2}>
                                    <Row>
                                    <NavLink to={DEVICE_EDIT_ROUTE + `/${id}`}>Редактировать</NavLink>
                                    </Row>
                                    <Row>
                                    <NavLink to={REPORT_ONE_ROUTE + `/${id}`}>Отчет</NavLink>
                                    </Row>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    )
                })}
            </ListGroup>

            <Pagination size="sm" className="mt-4 mb-4" style={{margin: "0 auto"}}>
                {searchedDrivingSchool && searchedDrivingSchool.length > 0 ? pages : false}
            </Pagination>
        </Container>
    );
};

export default Admin;
//{type.name !== null ? type.name : " " }
