import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";

const IndividualHostelMap = ({ hostels }) => {
    const icon = new Icon({
        iconUrl: "/hostelIcon.png",
        iconSize: [25, 25],
    });

    const initialMarker = {}
    const [activeHostel, setActiveHostel] = useState(initialMarker);
    //const position = [57.543799, -5.504566];
    const [position, setPosition] = useState([57.543799, -5.504566]);
    const [hostelsData, setHostelsData] = useState([]);


    const markerClicked = (hostel) => {
        setActiveHostel(hostel)
    }

    useEffect(() => {
        //setHostelsData(hostelsID);
        //console.log("HostelsID: ", hostels)

        const fetchHostels = async () => {
            try {
                const response = await fetch(`http://localhost:3000/hostels/${hostels}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();

                setHostelsData(data);
                //console.log("lat:", data[0].location.lat, "long:", data[0].location.long);

                setPosition([data[0].location.lat, data[0].location.long])

            } catch (error) {
                console.error('There has been a problem with your fetch operation:', error);
            }
        };

        fetchHostels();
    }, [hostels]);

    //console.log("Hostel Data in map component", hostelsData[0].location)

    return (
        <>
            <div className="container-fluid">
                <div className="col">
                    <MapContainer
                        center={position}
                        zoom={7}
                        scrollWheelZoom={true}
                        className="map"
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        {hostelsData.map((hostel) => (
                            <Marker
                                key={hostel.id}
                                position={[
                                    hostel.location.lat,
                                    hostel.location.long,
                                ]}
                                icon={icon}
                                eventHandlers={{ mouseover: () => markerClicked(hostel) }}
                            >
                                <Popup>
                                    <div className="popup" role="alert">
                                        Here is the location of the {hostel.name} cafe.
                                    </div>
                                </Popup>

                            </Marker>

                        ))}

                    </MapContainer>
                </div>
            </div >
        </>
    );
};

export default IndividualHostelMap;