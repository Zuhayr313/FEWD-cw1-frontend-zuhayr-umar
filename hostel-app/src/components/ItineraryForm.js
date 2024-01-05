import React, { useState, useEffect } from 'react';


const ItineraryForm = () => {
    const [userName, setUserName] = useState('');
    const [selectedHostelID, setSelectedHostelID] = useState([]);
    const [stayDuration, setStayDuration] = useState('');


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
            const simplifiedData = data.map(hostel => ({
                id: hostel.id,
                name: hostel.name
            }));
            setHostelOptions(simplifiedData);
            //console.log('Hostel Options:', simplifiedData);
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    };


    const toggleHostelList = () => {
        setShowHostelList(!showHostelList);
    };

    const handleHostelSelection = (e) => {
        setSelectedHostelID(e.target.value);
    };

    const handleNameChange = (event) => {
        setUserName(event.target.value);
    };

    const handleDurationChange = (event) => {
        // Ensure that only numbers are entered
        const value = event.target.value;
        setStayDuration(value.replace(/[^0-9]/g, ''));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('hostelOptions Submission:', hostelOptions);
        console.log('User Name:', userName);
        console.log('Selected Hostel ID:', selectedHostelID);
        console.log('Stay Duration:', stayDuration);
    };

    return (
        <div>
            <button onClick={toggleHostelList}>
                {showHostelList ? 'Hide Hostel Options' : 'Show Hostel Options'}
            </button>

            {showHostelList && (
                <div>
                    <h3>Hostel Options:</h3>
                    <ul>
                        {hostelOptions.map(hostel => (
                            <li key={hostel.id}>
                                {hostel.name} (ID: {hostel.id})
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <form onSubmit={handleSubmit}>

                <div>
                    <label>
                        Name:
                        <input
                            type="text"
                            value={userName}
                            onChange={handleNameChange}
                            placeholder="Enter your name"
                        />
                    </label>
                </div>

                <div>
                    <label>Select a Hostel:</label>
                    <select value={selectedHostelID} onChange={handleHostelSelection}>
                        <option value="">Select a Hostel</option>
                        {hostelOptions.map(hostel => (
                            <option key={hostel.id} value={hostel.id}>
                                {hostel.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>
                        Stay Duration (in days):
                        <input
                            type="text" // Using type "text" to allow validation
                            value={stayDuration}
                            onChange={handleDurationChange}
                            placeholder="Enter number of days"
                        />
                    </label>
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default ItineraryForm;