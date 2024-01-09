import React from "react";
import StyledHostel from "./StyledHostel";
import Accordion from "react-bootstrap/Accordion";

const HostelSearch = ({ hostels }) => {
    if (!Array.isArray(hostels)) {
        return <div className="homepage-Accordion">No hostels found.</div>;
    }

    return (
        <div className="homepage-Accordion">
            <Accordion>
                {hostels.map((hostel, index) => (
                    <Accordion.Item eventKey={index} key={index}>
                        <StyledHostel item={hostel} index={index} />
                    </Accordion.Item>
                ))}
            </Accordion>
        </div>
    );
};

export default HostelSearch;

