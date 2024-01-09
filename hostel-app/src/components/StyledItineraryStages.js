import React, { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import IndividualHostelMap from "./IndividualHostelMap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const StyledItineraryStages = ({ stages }) => {
    const [hostelsData, setHostelsData] = useState([]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [reviewer, setReviewer] = useState('');
    const [review, setReview] = useState('');
    const [selectedRating, setSelectedRating] = useState('');

    useEffect(() => {
        const fetchHostelData = async () => {
            const hostelInfo = await Promise.all(stages.map(async (stage) => {
                const response = await fetch(`http://localhost:3000/hostels/${stage.hostel}`);
                if (!response.ok) {
                    console.error(`Error fetching data for hostel ${stage.hostel}: ${response.statusText}`);
                    return null;
                }
                const data = await response.json();
                return { ...data, nights: stage.nights };
            }));
            setHostelsData(hostelInfo.filter(hostel => hostel !== null));
        };

        if (stages && stages.length > 0) {
            fetchHostelData();
        }
    }, [stages]);



    const handleSelectedRatingChange = (event) => {
        const value = event.target.value;
        if (value === '' || (/^[1-5]$/).test(value)) {
            setSelectedRating(value);
        }
    };

    if (!Array.isArray(hostelsData) || hostelsData.length === 0) {
        return <div>No stages found.</div>;
    }

    function getCafe(hasCafe) {
        return hasCafe ? "Yes" : "No";
    }


    function getAverageRating(ratings) {
        if (!ratings || ratings.length === 0) {
            return "No ratings";
        }
        const sum = ratings.reduce((acc, curr) => acc + curr, 0);
        return (sum / ratings.length).toFixed(1);
    }


    const handleSubmit = async (hostelId) => {
        //e.preventDefault();
        console.log('selectedHostelID picked:', hostelId);
        console.log('reviewer:', reviewer);
        console.log('review written:', review);
        console.log('Rating:', selectedRating);


        const reviewData = { reviewer, review };

        try {
            const response = await fetch(`http://localhost:3000/hostels/review/${hostelId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reviewData),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const result = await response.json();
            console.log('Success:', result);

            setReviewer('');
            setReview('');
        } catch (error) {
            console.error('Failed to submit review:', error);
        }

        try {
            const response = await fetch(`http://localhost:3000/hostels/rate/${hostelId}/${selectedRating}`, {
                method: 'GET'
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const result = await response.json();
            console.log('Success:', result);

            setSelectedRating('');
        } catch (error) {
            console.error('Failed to submit rating:', error);
        }
    };

    //console.log("The id of the hostel in the first stage:", hostelsData[0][0].location.lat);

    return (

        <Accordion>

            {hostelsData.map((stage, index) => {
                const hostel = stage[0];
                return (
                    <Accordion.Item eventKey={index} key={index}>

                        <Accordion.Header>Stage {index + 1} - {stage.nights} Nights at {hostel.name}</Accordion.Header>

                        <Accordion.Body>
                            {/* <h3>{hostel.name}</h3>
                            <p>{hostel.description}</p> */}

                            <div className="container-fluid">
                                <div className="row">

                                    <div className="col">
                                        <h3>{hostel.name}</h3>
                                        <p>{hostel.description}</p>
                                        <p> {hostel.address}, {hostel.postcode}</p>
                                        <p> {hostel.phone}</p>
                                        <p> {hostel.email}</p>
                                        <p>Does it have a cafe?: {getCafe(hostel.cafe)}</p>
                                        <p> Average Rating: {getAverageRating(hostel.ratings)}</p>

                                        <div>
                                            <div className="row">
                                                <div className="col">
                                                    <h3>Reviews:</h3>
                                                </div>
                                                <div className="col">

                                                    <Button variant="primary" onClick={handleShow} className="close-info-panel">
                                                        Add Review & Rating
                                                    </Button>
                                                </div>


                                                <Modal show={show} onHide={handleClose}>
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Add Review & Rating</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <Form>
                                                            <Form.Group className="mb-3" controlId="reviewerControlInput">
                                                                <Form.Label>Reviewer</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    placeholder="Enter Name"
                                                                    value={reviewer}
                                                                    onChange={e => setReviewer(e.target.value)}
                                                                    autoFocus
                                                                />
                                                            </Form.Group>

                                                            <Form.Group
                                                                className="mb-3"
                                                                controlId="reviewControlInput"
                                                            >
                                                                <Form.Label>Review</Form.Label>
                                                                <Form.Control
                                                                    as="textarea"
                                                                    rows={3}
                                                                    placeholder="Enter Review"
                                                                    value={review}
                                                                    onChange={e => setReview(e.target.value)}
                                                                />
                                                            </Form.Group>

                                                            <Form.Group className="mb-3" controlId="ratingControlInput">
                                                                <Form.Label>Rating</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    placeholder="Enter Rating For Chosen Hostel (1-5):"
                                                                    value={selectedRating}
                                                                    onChange={handleSelectedRatingChange}
                                                                    autoFocus
                                                                />
                                                            </Form.Group>
                                                        </Form>
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <Button variant="secondary" onClick={handleClose}>
                                                            Close
                                                        </Button>
                                                        <Button variant="primary" onClick={() => { handleClose(); handleSubmit(hostel.id); }}>
                                                            Save Review
                                                        </Button>
                                                    </Modal.Footer>
                                                </Modal>

                                            </div>
                                            <div className="row">
                                                {hostel.reviews && hostel.reviews.length > 0 ? (
                                                    <ul>
                                                        {hostel.reviews.map((review, idx) => (
                                                            <p key={idx}>

                                                                <strong>Reviewer:</strong> {review.reviewer}
                                                                <br></br>
                                                                <strong>Review:</strong> {review.review}

                                                            </p>
                                                        ))}
                                                    </ul>

                                                ) : (
                                                    <p>No reviews available.</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col">

                                        <h4 className="hostel-map-header">Hostel on Map</h4>
                                        <IndividualHostelMap hostels={hostel.id} />

                                    </div>
                                </div>

                            </div>

                        </Accordion.Body>

                    </Accordion.Item>
                );
            })}
        </Accordion>

    );
};

export default StyledItineraryStages;
