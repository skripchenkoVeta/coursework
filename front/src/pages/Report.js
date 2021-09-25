import React, { useEffect, useState} from 'react';
import {Button, Container, Image, } from "react-bootstrap";
import {useParams} from 'react-router-dom';
import {fetchOneDrivingSchool} from "../http/drivingschoolAPI";

const Report = ()=> {
    const {id} = useParams();
    const [drivingschoolCurr, setDrivingSchoolCurr] = useState({});

    const [selectBrand, setSelectBrand] = useState({});
    const [selectType, setSelectType] = useState({});
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [img, setImg] = useState("");
    const [info, setInfo] = useState({});
   
  

   

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
            <h3>Отчёт</h3>
        <table className="table">
        <thead>
            <tr>
                <th>Изображение</th>
                <th>Название</th>
                <th>Форма обучения</th>
                <th>Район</th>
                <th>Стоимость</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                <Image width={200} src={process.env.REACT_APP_API_URL + drivingschoolCurr.img}/>
                </td>
                <td>{name}</td>
                <td>{selectBrand.name}</td>
                <td>{selectType.name}</td>
                <td>{price}</td>
                                </tr>
        </tbody>
    </table>
  
</Container>


    );
};

  
export default Report;

