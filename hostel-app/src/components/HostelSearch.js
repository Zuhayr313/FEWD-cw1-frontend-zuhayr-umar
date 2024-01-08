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
            <div style={{ marginBottom: "10px" }}>
                <input
                    className="form-control d-inline-block"
                    style={{ width: "calc(60% - 10px)" }}
                    type="text"
                    placeholder="Search for Hostels..."
                    onChange={(e) => setSearchField(e.target.value)}
                />
                <input
                    className="form-control d-inline-block"
                    style={{ width: "20%", marginLeft: "10px" }}
                    type="text"
                    placeholder="Key phrase..."
                    onChange={(e) => setKeyPhrase(e.target.value)}
                />
                <select
                    className="form-control d-inline-block"
                    style={{ width: "15%", marginLeft: "10px" }}
                    onChange={(e) => setCafeFilter(e.target.value)}
                >
                    <option value="all">All Hostels</option>
                    <option value="true">With Café</option>
                    <option value="false">Without Café</option>
                </select>
            </div>
            {/* <div>
                <p>Search Term: {searchField}</p>
                <p>Key Phrase: {keyPhrase}</p>
                <p>Café Filter: {cafeFilter}</p>
            </div> */}
            {searchField.length >= 1 && <StyledHostelSearch hostels={filteredHostels} />}
        </div>
    );
}

export default Search;
