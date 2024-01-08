import React, { useState, useEffect } from 'react';
import Map from './Map';
import HostelSearch from './HostelSearch';

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
            <div className="container-fluid">
                <div className="row">
                    <Map hostels={hostels} />
                </div>
                <div className="row">
                    <div className="col">
                    </div>

                    <div className="col-9">
                        <h2>Search for Hostels</h2>
                        <HostelSearch hostels={hostels} />
                    </div>

                    <div className="col">
                    </div>
                </div>
            </div >

        </>
    );
};

export default Home;