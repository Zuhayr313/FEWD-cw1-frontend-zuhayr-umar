import React, { useState, useEffect } from 'react';

const ReviewForm = () => {
    const [selectedHostelID, setSelectedHostelID] = useState([]);
    const [hostelOptions, setHostelOptions] = useState([]);

    const [reviewer, setReviewer] = useState('');
    const [review, setReview] = useState('');

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
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    };

    const handleHostelSelection = (e) => {
        setSelectedHostelID(e.target.value);
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('hostelOptions Submission:', hostelOptions);


        const reviewData = { reviewer, review };

        try {
            const response = await fetch(`http://localhost:3000/hostels/review/${selectedHostelID}`, {
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

            // Reset form fields
            setSelectedHostelID('');
            setReviewer('');
            setReview('');
        } catch (error) {
            console.error('Failed to submit review:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>

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
                    Reviewer:
                    <input
                        type="text"
                        value={reviewer}
                        onChange={e => setReviewer(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    Review:
                    <textarea
                        value={review}
                        onChange={e => setReview(e.target.value)}
                    ></textarea>
                </label>
            </div>
            <button type="submit">Submit Review</button>
        </form>
    );
};

export default ReviewForm;
