import React, { useState } from "react";
import StyledHostelSearch from "./StyledHostelSearch";

function Search({ hostels }) {
    const [searchField, setSearchField] = useState("");
    const [cafeFilter, setCafeFilter] = useState("all");
    const [keyPhrase, setKeyPhrase] = useState("");

    const filteredHostels = hostels.filter((hostel) => {
        const matchesSearchField = searchField.length >= 1 &&
            (hostel.name.toLowerCase().includes(searchField.toLowerCase()) || hostel.description.toLowerCase().includes(searchField.toLowerCase()));

        const matchesCafeFilter = cafeFilter === "all" ||
            (cafeFilter === "true" && hostel.cafe) ||
            (cafeFilter === "false" && !hostel.cafe);

        const matchesKeyPhrase = !keyPhrase || hostel.description.toLowerCase().includes(keyPhrase.toLowerCase());

        return matchesSearchField && matchesCafeFilter && matchesKeyPhrase;
    });

    return (
        <div>
            <div className="container-fluid search-area" >
                <div className="row map-row">
                    <div className="col-7">

                        <input
                            className="form-control d-inline-block search-bar"
                            type="text"
                            placeholder="Search for Hostels..."
                            onChange={(e) => setSearchField(e.target.value)}
                        />
                    </div>
                    <div className="col-3">
                        <input
                            className="form-control d-inline-block key-phrase-bar"
                            type="text"
                            placeholder="Key phrase..."
                            onChange={(e) => setKeyPhrase(e.target.value)}
                        />
                    </div>
                    <div className="col-2">
                        <select
                            className="form-control d-inline-block cafe-option-menu"
                            onChange={(e) => setCafeFilter(e.target.value)}
                        >
                            <option value="all">With/Without Café</option>
                            <option value="true">With Café</option>
                            <option value="false">Without Café</option>
                        </select>
                    </div>
                </div>
            </div>


            {searchField.length >= 1 && <StyledHostelSearch hostels={filteredHostels} />}

        </div>
    );
}

export default Search;
