import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import StyledItineraryStages from './StyledItineraryStages';

const Itinerary = () => {
    const [itinerary, setItinerary] = useState([]);
    const [userName, setUserName] = useState("");

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showStage, setShowStage] = useState(false);
    const handleCloseStage = () => setShowStage(false) && handleSubmit();
    const handleShowStage = () => setShowStage(true);

    const [showUpdateStage, setShowUpdateStage] = useState(false);
    const handleCloseUpdateStage = () => setShowUpdateStage(false);
    const handleShowUpdateStage = () => setShowUpdateStage(true);

    const [showDeleteStage, setShowDeleteStage] = useState(false);
    const handleCloseDeleteStage = () => setShowDeleteStage(false);
    const handleShowDeleteStage = () => setShowDeleteStage(true);

    const [showUpdateStartDate, setShowUpdateStartDate] = useState(false);
    const handleCloseUpdateStartDate = () => setShowUpdateStartDate(false);
    const handleShowUpdateStartDate = () => setShowUpdateStartDate(true);

    const [hostel, setSelectedHostelID] = useState([]);
    const [nights, setStayDuration] = useState('');
    const [stageToUpdate, setStage] = useState('');
    const [stageToDelete, setStageDelete] = useState(null);
    const [newStartDate, setNewStartDate] = useState('');



    const [hostelOptions, setHostelOptions] = useState([]);
    const [showHostelList, setShowHostelList] = useState(false);

    useEffect(() => {
        fetchHostels();
    }, []);

    const fetchHostels = async () => {
        try {
            const response = await fetch('http://localhost:3000/hostels');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const Data = data.map(hostel => ({
                id: hostel.id,
                name: hostel.name
            }));
            setHostelOptions(Data);
            //console.log('Hostel Options:', Data);
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    };

    const handleSubmit = async (e) => {
        //e.preventDefault();
        console.log('userName picked:', userName);

        try {
            const response = await fetch(`http://localhost:3000/itineraries/${userName}`, {
                method: 'GET'
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const result = await response.json();
            //console.log("result", result)
            setItinerary(result)
        } catch (error) {
            console.error('Failed to fetch itineraries:', error);
        }
        //console.log('itinerary:', itinerary);
    };


    const toggleHostelList = () => {
        setShowHostelList(!showHostelList);
    };

    const handleHostelSelection = (e) => {
        setSelectedHostelID(e.target.value);
    };

    const handleDurationChange = (event) => {
        const value = event.target.value;
        setStayDuration(value.replace(/[^0-9]/g, ''));
    };

    const handleStageSelection = (event) => {
        const value = event.target.value;
        setStage(value.replace(/[^0-9]/g, ''));
    };

    const handleStageDeletion = (event) => {
        const value = event.target.value;
        setStageDelete(value.replace(/[^0-9]/g, ''));
    };

    const handleUpdateStartDate = (e) => {
        setNewStartDate(e.target.value);
    };

    const handleSubmitStage = async (e) => {
        //e.preventDefault();
        //console.log('hostelOptions Submission:', hostelOptions);
        //console.log('User Name:', userName);
        //console.log('Selected Hostel ID:', hostel);
        //console.log('Stay Duration:', nights);

        const itineraryData = { hostel, nights };
        let userItineraryExists = false;


        try {
            const response = await fetch(`http://localhost:3000/itineraries`, {
                method: 'GET'
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const result = await response.json();

            for (let itinerary of result) {
                if (itinerary.user === userName) {
                    try {
                        const response = await fetch(`http://localhost:3000/itineraries/stages/new/${userName}`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(itineraryData),
                        });

                        if (!response.ok) {
                            throw new Error(`Error: ${response.status}`);
                        }

                        const result = await response.json();
                        console.log('Itinerary successfully created:', result);

                        setSelectedHostelID('');
                        setStayDuration('');
                    } catch (error) {
                        console.error('Failed to create itinerary:', error);
                    }

                    userItineraryExists = true;

                }
            }

            if (!userItineraryExists) {

                try {
                    const response = await fetch(`http://localhost:3000/itineraries/new/${userName}`, {
                        method: 'GET'
                    });

                    if (!response.ok) {
                        throw new Error(`Error: ${response.status}`);
                    }


                    const result = await response.json();
                    console.log('Itinerary successfully created:', result);

                } catch (error) {
                    console.error('Failed to create itinerary:', error);
                }

                try {
                    const response = await fetch(`http://localhost:3000/itineraries/stages/new/${userName}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(itineraryData),
                    });

                    if (!response.ok) {
                        throw new Error(`Error: ${response.status}`);
                    }

                    const result = await response.json();
                    console.log('Itinerary successfully created:', result);

                    setSelectedHostelID('');
                    setStayDuration('');
                } catch (error) {
                    console.error('Failed to create itinerary:', error);
                }
            }

            console.log('Itinerary already created:', userItineraryExists ? 'yes' : 'no');

        } catch (error) {
            console.error('Failed to fetch itineraries:', error);
        }

    };

    const handleSubmitUpdateStage = async (e) => {

        const itineraryData = { hostel, nights };
        let userItineraryExists = false;

        try {
            const response = await fetch(`http://localhost:3000/itineraries`, {
                method: 'GET'
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const result = await response.json();

            for (let itinerary of result) {
                if (itinerary.user === userName) {
                    try {
                        const response = await fetch(`http://localhost:3000/itineraries/stages/update/${userName}/${stageToUpdate}`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(itineraryData),
                        });

                        if (!response.ok) {
                            throw new Error(`Error: ${response.status}`);
                        }

                        const result = await response.json();
                        console.log('Stage ', stageToUpdate, ' successfully Updated:', result);

                        setSelectedHostelID('');
                        setStayDuration('');
                        setStage('');
                    } catch (error) {
                        console.error('Failed to Updated Stage:', error);
                    }

                    userItineraryExists = true;

                }
            }

            if (!userItineraryExists) {
                alert('User does not have itinerary. Click Add Stage to create a itinerary.');
            }

            console.log('Itinerary already created:', userItineraryExists ? 'yes' : 'no');

        } catch (error) {
            console.error('Failed to fetch itineraries:', error);
        }

    };

    const handleSubmitDeleteStage = async (e) => {
        let userItineraryExists = false;

        const stageToDeleteSubtracted = stageToDelete - 1;

        try {
            const response = await fetch(`http://localhost:3000/itineraries`, {
                method: 'GET'
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const result = await response.json();

            for (let itinerary of result) {
                if (itinerary.user === userName) {
                    try {
                        const response = await fetch(`http://localhost:3000/itineraries/stages/delete/${userName}/${stageToDeleteSubtracted}`, {
                            method: 'GET',
                        });

                        if (!response.ok) {
                            throw new Error(`Error: ${response.status}`);
                        }

                        const result = await response.json();
                        console.log('Stage ', stageToUpdate, ' successfully delete:', result);

                        setStageDelete('');
                    } catch (error) {
                        console.error('Failed to delete Stage:', error);
                    }

                    userItineraryExists = true;

                }
            }

            if (!userItineraryExists) {
                alert('User does not have itinerary. Click Add Stage to create a itinerary.');
            }

        } catch (error) {
            console.error('Failed to fetch itineraries:', error);
        }

    };

    const handleSubmitUpdateStartDate = async (e) => {

        const formattedDate = newStartDate + 'T00:00:00.000Z';
        console.log('Submitting date:', formattedDate);
        let userItineraryExists = false;

        try {
            const response = await fetch(`http://localhost:3000/itineraries`, {
                method: 'GET'
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const result = await response.json();

            for (let itinerary of result) {
                if (itinerary.user === userName) {
                    try {
                        const response = await fetch(`http://localhost:3000/itineraries/startdate/${userName}/${formattedDate}`, {
                            method: 'GET'

                        });

                        if (!response.ok) {
                            throw new Error(`Error: ${response.status}`);
                        }

                        const result = await response.json();
                        console.log('Start Date successfully updated:', result);

                        setNewStartDate('');
                    } catch (error) {
                        console.error('Failed to updated Start Date:', error);
                    }

                    userItineraryExists = true;

                }
            }

            if (!userItineraryExists) {
                alert('User does not have itinerary. Click Add Stage to create a itinerary.');
            }

            console.log('Itinerary already created:', userItineraryExists ? 'yes' : 'no');

        } catch (error) {
            console.error('Failed to fetch itineraries:', error);
        }

    };

    return (
        <>
            <div className="container-fluid itinerary-page-container" style={{ flex: '1' }}>
                <div className='content-wrap'>
                    <div className="row itinerary-image-header">
                    </div>

                    <div className="row itinerary-page-header">
                        <h2>Itinerary</h2>

                    </div>

                    <div className="row">
                        <div className="col">

                        </div>

                        <div className="col-9" >
                            <div className='row'>
                                <div className="col" >

                                    <h4>Itinerary for {userName}</h4>
                                </div>
                                <div className="col-7" >
                                    <Button variant="primary" onClick={handleShow} className="close-info-panel ms-2">
                                        Add User
                                    </Button>

                                    <Button variant="primary" onClick={() => { handleClose(); handleSubmit(); }} className="close-info-panel ms-2">
                                        Refresh Itinerary
                                    </Button>

                                    <Button variant="primary" onClick={handleShowUpdateStartDate} className="close-info-panel ms-2">
                                        Update Start Date
                                    </Button>

                                    <Button variant="primary" onClick={handleShowDeleteStage} className="close-info-panel ms-2">
                                        Delete Stage
                                    </Button>

                                    <Button variant="primary" onClick={handleShowUpdateStage} className="close-info-panel ms-2">
                                        Update Stage
                                    </Button>

                                    <Button variant="primary" onClick={handleShowStage} className="close-info-panel ms-2">
                                        Add Stage
                                    </Button>

                                </div>

                                <Modal show={show} onHide={handleClose} >
                                    <Modal.Header closeButton>
                                        <Modal.Title>Add Username</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form>
                                            <Form.Group className="mb-3" controlId="usernameControlInput">
                                                <Form.Label>UserName</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter username"
                                                    value={userName}
                                                    onChange={e => setUserName(e.target.value)}
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
                                            Save Username
                                        </Button>
                                    </Modal.Footer>
                                </Modal>


                                <Modal show={showStage} onHide={handleCloseStage} >
                                    <Modal.Header closeButton>
                                        <Modal.Title>Add Stage</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form>
                                            <Form.Group className="mb-3" controlId="hostelControlInput">
                                                <div>
                                                    <label>Select a Hostel:</label>
                                                    <select value={hostel} onChange={handleHostelSelection}>
                                                        <option value="">Select a Hostel</option>
                                                        {hostelOptions.map(hostel => (
                                                            <option key={hostel.id} value={hostel.id}>
                                                                {hostel.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="hostelDurationControlInput">
                                                <Form.Label>Stay Duration (in days):</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    value={nights}
                                                    onChange={handleDurationChange}
                                                    placeholder="Enter number of days"
                                                    autoFocus
                                                />
                                            </Form.Group>

                                            {showHostelList && (
                                                <div>
                                                    <h5>Hostel Options:</h5>
                                                    <ul>
                                                        {hostelOptions.map(hostel => (
                                                            <li key={hostel.id}>
                                                                {hostel.name}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={toggleHostelList}>
                                            {showHostelList ? 'Hide Hostel Options' : 'Show Hostel Options'}
                                        </Button>
                                        <Button variant="secondary" onClick={handleCloseStage}>
                                            Close
                                        </Button>
                                        <Button variant="primary" onClick={() => { handleSubmitStage(); handleCloseStage(); handleSubmit(); }}>
                                            Save Stage
                                        </Button>
                                    </Modal.Footer>
                                </Modal>


                                <Modal show={showUpdateStage} onHide={handleCloseUpdateStage} >
                                    <Modal.Header closeButton>
                                        <Modal.Title>Update Stage</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form>
                                            <Form.Group className="mb-3" controlId="stageControlInput">
                                                <Form.Label>Enter Stage:</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    value={stageToUpdate}
                                                    onChange={handleStageSelection}
                                                    placeholder="Enter Stage to Update"
                                                    autoFocus
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="hostelControlInput">
                                                <div>
                                                    <label>Select a Hostel:</label>
                                                    <select value={hostel} onChange={handleHostelSelection}>
                                                        <option value="">Select a Hostel</option>
                                                        {hostelOptions.map(hostel => (
                                                            <option key={hostel.id} value={hostel.id}>
                                                                {hostel.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="hostelDurationControlInput">
                                                <Form.Label>Stay Duration (in days):</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    value={nights}
                                                    onChange={handleDurationChange}
                                                    placeholder="Enter number of days"
                                                    autoFocus
                                                />
                                            </Form.Group>

                                            {showHostelList && (
                                                <div>
                                                    <h5>Hostel Options:</h5>
                                                    <ul>
                                                        {hostelOptions.map(hostel => (
                                                            <li key={hostel.id}>
                                                                {hostel.name}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}

                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={toggleHostelList}>
                                            {showHostelList ? 'Hide Hostel Options' : 'Show Hostel Options'}
                                        </Button>
                                        <Button variant="secondary" onClick={handleCloseUpdateStage}>
                                            Close
                                        </Button>
                                        <Button variant="primary" onClick={() => { handleCloseUpdateStage(); handleSubmitUpdateStage(); }}>
                                            Update Stage
                                        </Button>
                                    </Modal.Footer>
                                </Modal>

                                <Modal show={showDeleteStage} onHide={handleCloseDeleteStage} >
                                    <Modal.Header closeButton>
                                        <Modal.Title>Delete Stage</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form>
                                            <Form.Group className="mb-3" controlId="stageDeleteControlInput">
                                                <Form.Label>Enter Stage:</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    value={stageToDelete}
                                                    onChange={handleStageDeletion}
                                                    placeholder="Enter Stage to Delete"
                                                    autoFocus
                                                />
                                            </Form.Group>

                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleCloseDeleteStage}>
                                            Close
                                        </Button>
                                        <Button variant="primary" onClick={() => { handleCloseDeleteStage(); handleSubmitDeleteStage(); }}>
                                            Delete Stage
                                        </Button>
                                    </Modal.Footer>
                                </Modal>


                                <Modal show={showUpdateStartDate} onHide={handleCloseUpdateStartDate} >
                                    <Modal.Header closeButton>
                                        <Modal.Title>Update Start Date</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form>
                                            <Form.Group className="mb-3" controlId="updateStartDateControlInput">
                                                <Form.Label>Enter New Start Date:</Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    value={newStartDate}
                                                    onChange={handleUpdateStartDate}
                                                    placeholder="Enter New Start Date"
                                                    autoFocus
                                                />
                                            </Form.Group>
                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleCloseUpdateStartDate}>
                                            Close
                                        </Button>
                                        <Button variant="primary" onClick={() => { handleCloseUpdateStartDate(); handleSubmitUpdateStartDate(); }}>
                                            Update Start Date
                                        </Button>
                                    </Modal.Footer>
                                </Modal>


                            </div>

                            <div className='row'>
                                {itinerary.length > 0 ? (
                                    itinerary.map((itineraryItem, index) => (
                                        <div key={index} className="itinerary-item">

                                            <p>Itinerary Start Date: {new Date(itineraryItem.startdate).toLocaleDateString()}</p>

                                            <StyledItineraryStages stages={itineraryItem.stages} />
                                        </div>
                                    ))
                                ) : (
                                    <p>No itinerary Available.</p>
                                )}
                            </div>
                        </div>

                        <div className="col">

                        </div>
                    </div>

                    <div className="row">
                        <Footer />
                    </div>

                </div>
            </div >

        </>
    );
};

export default Itinerary;