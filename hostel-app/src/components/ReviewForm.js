import React, { useState } from 'react';

const ReviewForm = () => {
    const [hostelId, setHostelId] = useState('');
    const [reviewer, setReviewer] = useState('');
    const [review, setReview] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

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

            // Reset form fields
            setHostelId('');
            setReviewer('');
            setReview('');
        } catch (error) {
            console.error('Failed to submit review:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Hostel ID:
                    <input
                        type="text"
                        value={hostelId}
                        onChange={e => setHostelId(e.target.value)}
                    />
                </label>
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
