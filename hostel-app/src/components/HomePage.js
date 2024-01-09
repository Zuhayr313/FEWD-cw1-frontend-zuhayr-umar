import React, { useState, useEffect } from 'react';
import Map from './Map';
import HostelSearch from './HostelSearch';
import Footer from './Footer';

const Home = () => {
    const [hostels, setHostels] = useState([]);

    useEffect(() => {
        const fetchHostels = async () => {
            try {
                const response = await fetch('http://localhost:3000/hostels');
                const data = await response.json();
                setHostels(data);
                //console.log(data);
            } catch (error) {
                console.error('Error fetching hostels:', error);
            }
        };

        fetchHostels();
    }, []);

    return (
        <>
            <div className="container-fluid home-page-container" style={{ flex: '1' }}>
                <div className='content-wrap'>
                    <div className="row map-row">
                        <Map hostels={hostels} />
                    </div>

                    <div className="row home-page-header">
                        <h2>Search for Hostels</h2>

                    </div>

                    <div className="row">
                        <div className="col">
                        </div>

                        <div className="col-9">
                            <HostelSearch hostels={hostels} />
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

export default Home;