import React from "react";
// import Stars from "./stars";
import Accordion from "react-bootstrap/Accordion";

const Item = ({ item, index }) => {
    return (
        <>
            <Accordion.Header> {item.name}</Accordion.Header>
            <Accordion.Body>
                <p>{item.description}</p>
                <p> £{item.address}</p>
                {/* <Stars position={index} /> */}
            </Accordion.Body>

        </>
    );
};

export default Item;
