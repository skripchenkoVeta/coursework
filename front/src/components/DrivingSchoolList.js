import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import DrivingSchoolItem from "./drivingschoolItem";

const DrivingSchoolList = observer(() => {
    const {drivingschool} = useContext(Context);

    return (
        <Row className="d-flex">
            {drivingschool.drivingschools.map(drivingschool =>
                <DrivingSchoolItem key={drivingschool.id} drivingschool={drivingschool}/>
            )}
        </Row>
    );
});

export default DrivingSchoolList;
