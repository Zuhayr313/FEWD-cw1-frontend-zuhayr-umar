import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ItineraryForm = () => {
    const [selectedHostels, setSelectedHostels] = useState([]);
    const [hostelOptions, setHostelOptions] = useState([
        { id: 1, name: 'Highland Hostel' },
        { id: 2, name: 'Lochside Lodge' },
        { id: 3, name: 'Edinburgh Escape' },
        // ... add more hostels as needed
    ]);

    const addHostelToItinerary = (hostelId) => {
        const hostel = hostelOptions.find(h => h.id === parseInt(hostelId));
        if (hostel) {
            setSelectedHostels([...selectedHostels, { ...hostel, startDate: new Date(), duration: '' }]);
        }
    };

    const handleStartDateChange = (index, date) => {
        const updatedHostels = [...selectedHostels];
        updatedHostels[index].startDate = date;
        setSelectedHostels(updatedHostels);
    };

    const handleDurationChange = (index, duration) => {
        const updatedHostels = [...selectedHostels];
        updatedHostels[index].duration = duration;
        setSelectedHostels(updatedHostels);
    };

    const handleRemoveHostel = (index) => {
        const updatedHostels = selectedHostels.filter((_, i) => i !== index);
        setSelectedHostels(updatedHostels);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Itinerary Submission:', selectedHostels);
        // Add logic here for what to do with the submitted data
    };

    const getMinDate = (index) => {
        if (index === 0) return new Date();

        const previousHostel = selectedHostels[index - 1];
        const previousDate = new Date(previousHostel.startDate);
        return new Date(previousDate.setDate(previousDate.getDate() + parseInt(previousHostel.duration)));
    };

    return (
        <form onSubmit={handleSubmit}>
            <select onChange={(e) => addHostelToItinerary(e.target.value)} defaultValue="">
                <option value="" disabled>Select a Hostel</option>
                {hostelOptions.map(hostel => (
                    <option key={hostel.id} value={hostel.id}>{hostel.name}</option>
                ))}
            </select>

            {selectedHostels.map((hostel, index) => (
                <div key={hostel.id}>
                    <label>{hostel.name}</label>
                    <DatePicker
                        selected={new Date(hostel.startDate)}
                        onChange={(date) => handleStartDateChange(index, date)}
                        minDate={getMinDate(index)}
                    />
                    <input
                        type="number"
                        placeholder="Duration (nights)"
                        value={hostel.duration}
                        onChange={(e) => handleDurationChange(index, e.target.value)}
                    />
                    <button type="button" onClick={() => handleRemoveHostel(index)}>Remove</button>
                </div>
            ))}

            <button type="submit">Submit Itinerary</button>
        </form>
    );
};

export default ItineraryForm;
