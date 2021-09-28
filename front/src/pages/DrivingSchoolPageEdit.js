import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Container, Dropdown, Form, Image, Modal, Row} from "react-bootstrap";
import {useParams, useHistory} from 'react-router-dom';
import {fetchDeleteDrivingSchool, fetchOneDrivingSchool, updateDrivingSchools} from "../http/drivingschoolAPI";
import {Context} from "../index";
import {ADMIN_ROUTE} from "../utils/consts";


const DrivingSchoolPageEdit = () => {
    const {drivingschool} = useContext(Context);
    const history = useHistory();
    const {id} = useParams();
    const [drivingschoolCurr, setDrivingSchoolCurr] = useState({});
    const [showMsg, setShowMsg] = useState(false);
    const [msg, setMsg] = useState("");
    const [selectBrand, setSelectBrand] = useState({});
    const [selectType, setSelectType] = useState({});
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [img, setImg] = useState("");
    const [imgFile, setImgFile] = useState(null);
    const [info, setInfo] = useState([]);

    const [isDisabledPutBtn, setDisabledPutBtn] = useState(true);

    const deleteDrivingSchool = () => {
        fetchDeleteDrivingSchool(id).then(() => {
            history.push(ADMIN_ROUTE);
        })
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const imgHandler = e => {
        e.preventDefault();

        const reader = new FileReader();
        reader.onload = () => {
            setImg(reader.result);
        };
        reader.readAsDataURL(e.target.files[0]);
        setImgFile(e.target.files[0]);
    }

    //info
    const addInfo = () => {
        setInfo([...info, {title: '', description: '', id: Date.now()}]);
    };

    const deleteInfo = (number) => {
        setInfo(info.filter(item => item.number !== number));
    };

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.id === number ? {...i, [key]: value} : i));
    };

    const putDrivingSchool = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', `${price}`);
        formData.append('img', imgFile);
        formData.append('brandId', selectBrand.id);
        formData.append('typeId', selectType.id);
        formData.append('info', JSON.stringify(info));
        updateDrivingSchools(id, formData).then(data => {
            setShowMsg(true);
            setMsg(data);
            setTimeout(() => setShowMsg(true), 5000)
        });
    }

    const checkInfo = () => {
        let isInfoEmpty = true;
        info.forEach(item => {
            for(let key in item) {
                if(key === "title" || key === "description") {
                    if(!item[key]) {
                        isInfoEmpty = false;
                    }
                }
            }
        });
        return isInfoEmpty;
    }

    useEffect(() => {
        let checkInfoVal = false;
        if(drivingschoolCurr.info && drivingschoolCurr.info.length !== info.length) {
            checkInfoVal = checkInfo();
        }

        if(drivingschoolCurr && drivingschoolCurr.brand && drivingschoolCurr.type) {
            if(drivingschoolCurr.brand.name !== selectBrand.name ||
                drivingschoolCurr.type.name !== selectType.name ||
                drivingschoolCurr.name !== name ||
                drivingschoolCurr.price !== price ||
                checkInfoVal ||
                img
            ) {
                setDisabledPutBtn(false);
            } else {
                setDisabledPutBtn(true);
            }
        }
    }, [name, selectBrand, selectType, price, img, info]);

    useEffect(() => {
        fetchOneDrivingSchool(id).then(data => {
            setDrivingSchoolCurr(data);
            setSelectBrand(data.brand);
            setSelectType(data.type);
            setName(data.name);
            setPrice(data.price);
            setInfo(data.info)
        });
    }, [id]);

    return (
        <Container className="mt-3">
            {showMsg && <Row>
                {msg}
            </Row>}

            <Row>
                <Col xs={12}>
                   
                    <Row>
                        <Col xs={1} className="d-flex align-items-center">
                            Форма обучения:
                        </Col>
                        <Col xs={11}>
                            <Dropdown className="mt-2 mb-2">
                                <Dropdown.Toggle>{selectBrand.name || "Choose Brand"}</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {drivingschool.brands.map(brand => {
                                        return brand.name === selectBrand.name ?
                                            <Dropdown.Item
                                                key={brand.id}
                                                disabled
                                            >
                                                {brand.name}
                                            </Dropdown.Item>
                                            :
                                            <Dropdown.Item
                                                key={brand.id}
                                                onClick={() => setSelectBrand(brand)}
                                            >
                                                {brand.name}
                                            </Dropdown.Item>

                                    })}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                    {/*Type*/}
                    <Row>
                        <Col xs={1} className="d-flex align-items-center">
                            Район:
                        </Col>
                        <Col xs={11}>
                            <Dropdown className="mt-2 mb-2">
                                <Dropdown.Toggle>{selectType.name || "Choose Type"}</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {drivingschool.types.map(type => {
                                        return type.name === selectType.name ?
                                            <Dropdown.Item
                                                key={type.id}
                                                disabled
                                            >
                                                {type.name}
                                            </Dropdown.Item>
                                            :
                                            <Dropdown.Item
                                                key={type.id}
                                                onClick={() => setSelectType(type)}
                                            >
                                                {type.name}
                                            </Dropdown.Item>

                                    })}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={1} className="d-flex align-items-center">
                            Название:
                        </Col>
                        <Col xs={8}>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </Col>
                        <Col xs={3} className="d-flex align-items-center">
                            {name.length === 0 && <b style={{color: "red"}}>Пожалуйста введите имя автошколы</b>}
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col xs={1} className="d-flex align-items-center">
                            Стоимость:
                        </Col>
                        <Col xs={8}>
                            <Form.Control
                                type="number"
                                value={price}
                                onChange={e => setPrice(Number(e.target.value))}
                            />
                        </Col>
                        <Col xs={3} className="d-flex align-items-center">
                            {price === 0 && <b style={{color: "red"}}>Пожалуйста введите стоимость курсов</b>}
                        </Col>
                    </Row>

                    <Row className="mt-4">
                        <Col xs={3} className="d-flex flex-column justify-content-center text-center">
                            Текущее изображение: <br/>
                            <Image style={{margin: "0 auto", marginTop: 15}} width={150} src={process.env.REACT_APP_API_URL + drivingschoolCurr.img}/>
                        </Col>
                        {img && <Col xs={6} className="d-flex flex-column justify-content-center text-center">
                            Новое изображение: <br/>
                            <Image style={{margin: "0 auto", marginTop: 15}} width={150} src={img}/>
                        </Col>}
                        <Col xs={3} className="d-flex align-items-center">
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Group>
                                    <Form.File id="exampleFormControlFile1" label="Upload file" onChange={imgHandler}/>
                                </Form.Group>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="d-flex flex-column m-3">
                        <h4>Описание</h4>
                        <Button
                            variant="outline-dark"
                            onClick={() => addInfo()}
                        >
                            Добавить описание
                        </Button>
                        {info.map((item, index) =>
                            <Row key={index} className="mt-3">
                                <Col md={4}>
                                    <Form.Control
                                        placeholder="Введите название"
                                        value={item.title}
                                        onChange={e => changeInfo('title', e.target.value, item.id)}
                                    />
                                    {!info[index].title &&  <b style={{color: "red"}}>Пожалуйста введите название</b>}
                                </Col>
                                <Col md={4}>
                                    <Form.Control
                                        placeholder="Введите описание"
                                        value={item.description}
                                        onChange={e => changeInfo('description', e.target.value, item.id)}
                                    />
                                    {!info[index].description &&  <b style={{color: "red"}}>Пожалуйста введите описание</b>}
                                </Col>
                                <Col md={4}>
                                    <Button
                                        variant="outline-danger"
                                        onClick={() => deleteInfo(item.number)}
                                    >
                                        Удалить описание
                                    </Button>
                                </Col>
                            </Row>
                        )}
                    </Row>

                    <Row className="mt-5">
                        <Col xs={12}>
                            {isDisabledPutBtn ? <Button disabled>Обновить автошколу</Button> : <Button onClick={putDrivingSchool}>Обновить автошколу</Button>}
                            <Button className="ml-5" variant="danger" onClick={handleShow}>Удалить автошколу</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Удалить данную автошколу? {drivingschoolCurr.name}?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={deleteDrivingSchool}>
                        Удалить
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default DrivingSchoolPageEdit;

