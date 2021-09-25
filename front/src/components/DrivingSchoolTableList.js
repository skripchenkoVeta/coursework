import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Container, Row} from "react-bootstrap";
import DrivingSchoolTable from "./drivingschooltable";

const DrivingSchoolTableList = observer(() => {
    const {drivingschool} = useContext(Context);

    return (
        <Container>
             <table className="table">
      
                {drivingschool.drivingschools.map(drivingschool =>
                <DrivingSchoolTable key={drivingschool.id} drivingschool={drivingschool}/>
            )}
        </table>
        </Container>
    );
});

export default DrivingSchoolTableList;
