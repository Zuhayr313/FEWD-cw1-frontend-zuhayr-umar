import React, { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import IndividualHostelMap from './IndividualHostelMap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


const StyledHostel = ({ item, index }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [reviewer, setReviewer] = useState('');
    const [review, setReview] = useState('');
    const [selectedRating, setSelectedRating] = useState('');

    const getAverageRating = (ratings) => {
        const sum = ratings.reduce((acc, curr) => acc + curr, 0);
        return ratings.length > 0 ? (sum / ratings.length).toFixed(1) : "No ratings";
    };

    const averageRating = getAverageRating(item.ratings);
    const [hostelsId, setHostelsId] = useState("");


    useEffect(() => {
        //setHostelsData(hostelsID);
        //console.log("ID: ", item.id)
        setHostelsId(item.id);

    }, [item]);

    const handleSelectedRatingChange = (event) => {
        const value = event.target.value;
        if (value === '' || (/^[1-5]$/).test(value)) {
            setSelectedRating(value);
        }
    };

    const handleSubmit = async (e) => {
        //e.preventDefault();
        console.log('selectedHostelID picked:', hostelsId);
        console.log('reviewer:', reviewer);
        console.log('review written:', review);
        console.log('Rating:', selectedRating);


        const reviewData = { reviewer, review };

        try {
            const response = await fetch(`http://localhost:3000/hostels/review/${hostelsId}`, {
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
            const response = await fetch(`http://localhost:3000/hostels/rate/${hostelsId}/${selectedRating}`, {
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

    return (
        <>
            <Accordion.Header> {item.name}</Accordion.Header>
            <Accordion.Body>

                <div className="container-fluid">
                    <div className="row">

                        <div className="col">
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                            <p> {item.address}, {item.postcode}</p>
                            <p> {item.phone}</p>
                            <p> {item.email}</p>
                            <p> Does it have a cafe (True or False): {item.cafe.toString()}</p>
                            <p> Average Rating: {averageRating}</p>

                            {/* Change to in line */}
                            <div>
                                <div className="row">
                                    <div className="col">
                                        <h3>Reviews:</h3>
                                    </div>
                                    <div className="col">

                                        <Button variant="primary" onClick={handleShow}>
                                            Add Review & Rating
                                        </Button>
                                    </div>
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
                                        <Button variant="primary" onClick={() => { handleClose(); handleSubmit(); }}>
                                            Save Changes
                                        </Button>
                                    </Modal.Footer>
                                </Modal>

                            </div>

                            {item.reviews && item.reviews.length > 0 ? (
                                <ul>
                                    {item.reviews.map((review, idx) => (
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

                        <div className="col">

                            <p>map colum</p>
                            <IndividualHostelMap hostels={hostelsId} />

                        </div>
                    </div>

                </div>
            </Accordion.Body >
        </>
    );
};

export default StyledHostel;
