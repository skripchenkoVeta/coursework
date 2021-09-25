import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {ListGroup} from "react-bootstrap";

const TypeBar = observer(() => {
    const {drivingschool} = useContext(Context);

    const getAllDrivingSchools = () => {
        drivingschool.setSelectedType("all");
        drivingschool.setSelectedBrand("all");
    }

    return (
        <ListGroup>
            <ListGroup.Item
                style={{cursor: "pointer"}}
                active={"all" === drivingschool.selectedType}
                onClick={getAllDrivingSchools}
            >
                Все
            </ListGroup.Item>
            {drivingschool.types.map(type =>
                <ListGroup.Item
                    style={{cursor: "pointer"}}
                    active={type.id === drivingschool.selectedType.id}
                    key={type.id}
                    onClick={() => drivingschool.setSelectedType(type)}
                >
                    {type.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default TypeBar;
