import React, {useContext, useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DrivingSchoolList from "../components/DrivingSchoolList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchBrands, fetchDrivingSchool, fetchTypes} from "../http/drivingschoolAPI";
import Pages from "../components/Pages";

const Shop = observer(() => {
    const {drivingschool} = useContext(Context);

    useEffect(() => {
        fetchTypes().then(data => drivingschool.setTypes(data));
        fetchBrands().then(data => drivingschool.setBrands(data));
        fetchDrivingSchool(null, null, 1, 9).then(data => {
            drivingschool.setDrivingSchools(data.rows);
            drivingschool.setTotalCount(data.count);
        });
    }, []);

    useEffect(
        () => {
            if(drivingschool.selectedType === "all") {
                    fetchDrivingSchool(null, drivingschool.selectedBrand.id,/*drivingschool.selectedRating.id,*/ drivingschool.page, 9).then(data => {
                        drivingschool.setDrivingSchools(data.rows);
                        drivingschool.setTotalCount(data.count);
                    });
                } else {
                    fetchDrivingSchool(drivingschool.selectedType.id, drivingschool.selectedBrand.id,/*drivingschool.selectedRating.id,*/ drivingschool.page, 9).then(data => {
                        drivingschool.setDrivingSchools(data.rows);
                        drivingschool.setTotalCount(data.count);
                    });
                }
        }, [drivingschool.page, drivingschool.selectedType,/*drivingschool.selectedRating,*/ drivingschool.selectedBrand],
    );

    return (
        <Container>
            <Row className="mt-3">
                <Col md={3}>
                    <TypeBar/>
                </Col>
                <Col md={9}>
                    <BrandBar/>
                    <DrivingSchoolList/>
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;
