import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";

const Map = ({ hostels }) => {
    const icon = new Icon({
        iconUrl: "/hostelIcon.png",
        iconSize: [25, 25],
    });

    const initialMarker = {}
    const [activeHostel, setActiveHostel] = useState(initialMarker);
    const position = [57.543799, -5.504566];

    const [hostelsData, setHostelsData] = useState(hostels);
    const [isPanelOpen, setIsPanelOpen] = useState(false);


    const markerClicked = (hostel) => {
        setActiveHostel(hostel)
        setIsPanelOpen(true);
    }

    const closePanel = () => {
        setIsPanelOpen(false); // Close the panel
    };

    useEffect(() => {
        setHostelsData(hostels);

    }, [hostels]);

    //console.log("Hostel Data in map component", hostels)

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className={`col-12 ${isPanelOpen ? 'col-md-9' : ''}`}>
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

                            {hostels.map((hostel) => (
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
                                            {hostel.address}, {hostel.postcode}
                                        </div>
                                    </Popup>

                                </Marker>

                            ))}

                        </MapContainer>
                    </div>
                    {isPanelOpen && (
                        <div className="col-md-3 info-panel">
                            {activeHostel.id && (
                                <div className="info-slider">

                                    <div className="row">
                                        <div className="col">
                                            <h3>{activeHostel.name}</h3>
                                        </div>
                                        <div className="col ">
                                            <button type="button" class="btn btn-secondary close-info-panel" onClick={closePanel}>Close</button>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <p>{activeHostel.description}</p>
                                        <p>Get More Information By Search Hostels Below...</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div >
        </>
    );
};

export default Map;