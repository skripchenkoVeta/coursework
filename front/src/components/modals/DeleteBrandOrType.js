import React, {useEffect, useState} from 'react';
import {Button, Dropdown, Modal} from "react-bootstrap";
import {deleteBrand, deleteType, fetchBrands, fetchTypes} from "../../http/drivingschoolAPI";

const DeleteBrandOrType = ({show, onHide, showSuccessMsgFunc}) => {
    const [brandOrType, setBrandOrType] = useState("Форма обучения");
    const [brands, setBrands] = useState([]);
    const [types, setTypes] = useState([]);
    const [selectBrand, setSelectBrand] = useState({name: "Форма обучения не выбрана"});
    const [selectType, setSelectType] = useState({name: "Район не выбран"});
    const [showMsgErr, setShowMsgErr] = useState(false);
    const [msgErr, setMsgErr] = useState('');

    useEffect(() => {
        fetchTypes().then(data => setTypes(data));
        fetchBrands().then(data => setBrands(data));
    }, []);

    const Delete = async () => {
        if(brandOrType === "Форма обучения") {
            if(selectBrand.name !== "Форма обучения не выбрана") {
                await deleteBrand(selectBrand.id).then(data => {
                    showSuccessMsgFunc(data);
                    onHide();
                    setSelectBrand({name: "Форма обучения не выбрана"});
                });
            } else {
                setMsgErr("Выберите форму обучения");
                setShowMsgErr(true);
            }
        } else {
            if(selectType.name !== "Район не выбран") {
                await deleteType(selectType.id).then(data => {
                    showSuccessMsgFunc(data);
                    onHide();
                    setSelectType({name: "Район не выбран"});
                });
            } else {
                setMsgErr("ВЫберите район");
                setShowMsgErr(true);
            }
        }
    };

    useEffect(() => setShowMsgErr(false), [selectType, selectBrand, brandOrType])

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Удалить Форму обучения или Район
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {showMsgErr &&
                    <>
                        <p style={{color: "red", textAlign: "center"}}>{msgErr}</p>
                    </>
                }

                Выберите категорию:
                <Dropdown className="mb-3" style={{margin: "0 auto"}}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {brandOrType}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {brandOrType === "Форма обучения" ? <Dropdown.Item disabled>Форма обучения</Dropdown.Item> : <Dropdown.Item onClick={() => setBrandOrType("Форма обучения")}>Форма обучения</Dropdown.Item>}
                        {brandOrType === "Район" ? <Dropdown.Item disabled>Район</Dropdown.Item> : <Dropdown.Item onClick={() => setBrandOrType("Район")}>Район</Dropdown.Item>}
                    </Dropdown.Menu>
                </Dropdown>

                Выберите элемент {brandOrType === "Форма обучения" ? "Форма обучения" : "Type"}
                <Dropdown className="mb-3" style={{margin: "0 auto"}}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {brandOrType === "Форма обучения" ? selectBrand.name : selectType.name}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {brandOrType === "Форма обучения" ?
                            brands.map(({id, name}) =>
                                selectBrand.name === name ? <Dropdown.Item disabled key={id}>{name}</Dropdown.Item> : <Dropdown.Item  key={id} onClick={() => setSelectBrand({id, name})}>{name}</Dropdown.Item>
                            )
                            :
                            types.map(({id, name}) =>
                                selectType.name === name ? <Dropdown.Item disabled  key={id}>{name}</Dropdown.Item> : <Dropdown.Item  key={id} onClick={() => setSelectType({id, name})}>{name}</Dropdown.Item>
                            )
                        }

                    </Dropdown.Menu>
                </Dropdown>


            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
                <Button variant="outline-success" onClick={Delete}>Delete</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteBrandOrType;
