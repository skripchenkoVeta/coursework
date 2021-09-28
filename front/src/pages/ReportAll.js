import React, {useContext, useEffect} from 'react';
import {Container} from "react-bootstrap";
import '../components/NavBar/style/style.css'
import {Context} from "../index";
import {fetchBrands, fetchDrivingSchool, fetchTypes} from "../http/drivingschoolAPI";
import DrivingSchoolTableList from "../components/DrivingSchoolTableList";

const ReportAll = () => {

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
          {
                    fetchDrivingSchool(drivingschool.selectedType.id, drivingschool.selectedBrand.id,drivingschool.page, 9).then(data => {
                        drivingschool.setDrivingSchools(data.rows);
                        drivingschool.setTotalCount(data.count);
                    });
                }
        }, [drivingschool.page, drivingschool.selectedType,drivingschool.selectedBrand],
    );

    return (
        <Container>
    
         <h2 className="header-name">Отчёт</h2>
         <table width={1030}>
         <tr className="table-header">
                <th>Изображение</th>
                <th>Название</th>
                <th>Форма обучения</th>
                <th>Район</th>
                <th>Стоимость</th>
                <th>Рейтинг</th>
            </tr></table>
                <DrivingSchoolTableList/>
            
        </Container>
    );
};

export default ReportAll;
