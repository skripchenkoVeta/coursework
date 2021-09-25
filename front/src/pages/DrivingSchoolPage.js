import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import bigStar from './../assets/star.png';
import {useParams} from 'react-router-dom';
import {addRating, checkRating, fetchOneDrivingSchool} from "../http/drivingschoolAPI";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import RatingStars from "../components/ratingStars";

const DrivingSchoolPage = observer(() => {
    const {user} = useContext(Context);
    const [drivingschool, setDrivingSchool] = useState({info: []});
    const [resRate, setResRate] = useState("");
    const [isAccessRating, setSsAccessRating] = useState(false);
    const {id} = useParams();


    useEffect( () => {
        fetchOneDrivingSchool(id).then(data => setDrivingSchool(data));
        if(user.isAuth) {
            checkRating({drivingschoolId: id}).then(res => setSsAccessRating(res.allow));
        }
    },[id, resRate]);


    const ratingChanged = (rate) => {
        addRating({
            rate,
            drivingschoolId: id
        }).then(res => {
            setResRate(res);
        });
    };

    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image width={300} src={process.env.REACT_APP_API_URL + drivingschool.img}/>
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <h2>{drivingschool.name}</h2>
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{ background:`url(${bigStar}) no-repeat`, backgroundSize: "cover", width: 80, height: 80, fontSize: 28}}
                        >
                            {drivingschool?.rating || 0}
                        </div>
                        <RatingStars
                            ratingChanged={ratingChanged}
                            ratingVal={drivingschool?.rating || 0}
                            isAuth={user.isAuth}
                            isAccessRating={isAccessRating}
                        />
                        {resRate}
                    </Row>
                </Col>
                <Col md={4}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray'}}
                    >
                        <h3>Стоимость: {drivingschool?.price || 0} RUB</h3>
                       

                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1>Описание</h1>
                {drivingschool.info.map( (info, index) =>
                    <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>
        </Container>
    );
});

export default DrivingSchoolPage;


/**
 * @param {{rating}} rating of drivingschool
 * @param {{price}} price of drivingschool
 */
