import React, { useState, useEffect } from 'react';
import Map from './Map';

const Home = () => {
    const [hostels, setHostels] = useState([]);

    useEffect(() => {
        // Fetch the hostels data
        const fetchHostels = async () => {
            try {
                const response = await fetch('http://localhost:3000/hostels');
                const data = await response.json();
                setHostels(data); // Set the hostels data
                //console.log(data);
            } catch (error) {
                console.error('Error fetching hostels:', error);
            }
        };

        fetchHostels();
    }, []);

    return (
        <>
            <div>
                <Map hostels={hostels} /> {/* Pass hostels data to MapComponent */}
            </div>

            {/* <div className="col">
                    <h3>Info for clicked on hostel</h3>
                </div> */}

        </>
    );
};

export default Home;