import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card, Row} from "react-bootstrap";

const BrandBar = observer(()  => {
    const {drivingschool} = useContext(Context);
    return (
        <Row className="d-flex">
            {drivingschool.brands.map(brand =>
                <Card
                    style={{cursor: "pointer"}}
                    border={brand.id === drivingschool.selectedBrand.id ? "danger" : "light"}
                    key={brand.id}
                    className="p-3"
                    onClick={() => drivingschool.setSelectedBrand(brand)}
                >
                    {brand.name}
                </Card>
            )}
        </Row>
    );
});

export default BrandBar;
