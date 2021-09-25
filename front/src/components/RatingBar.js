import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {ListGroup} from "react-bootstrap";

const RatingBar = observer(() => {
    const {drivingschool} = useContext(Context);

    const getAllDrivingSchools = () => {
        drivingschool.setSelectedType("all");
        drivingschool.setSelectedBrand("all");
        drivingschool.setSelectedRating("all");
    }

    return (
        <ListGroup>
            <ListGroup.Item
                style={{cursor: "pointer"}}
                active={"all" === drivingschool.selectedRating}
                onClick={getAllDrivingSchools}
            >
                Все
            </ListGroup.Item>
            {drivingschool.types.map(rating =>
                <ListGroup.Item
                    style={{cursor: "pointer"}}
                    active={rating.id === drivingschool.selectedRating.id}
                    key={rating.id}
                    onClick={() => drivingschool.setSelectedRating(rating)}
                >
                    {rating.rate}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default RatingBar;
