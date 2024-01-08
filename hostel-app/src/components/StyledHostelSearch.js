import React from "react";
import StyledHostel from "./StyledHostel";
import Accordion from "react-bootstrap/Accordion";

const HostelSearch = ({ hostels }) => {
    if (!Array.isArray(hostels)) {
        return <div>No hostels found.</div>;
    }

    return (

        <Accordion>
            {hostels.map((hostel, index) => (
                <Accordion.Item eventKey={index} key={index}>
                    <StyledHostel item={hostel} index={index} />
                </Accordion.Item>
            ))}
        </Accordion>

    );
};

export default HostelSearch;

