import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Map from "./Map";
const Coverage = () => {
  const [branches,setBranches]=useState([])
  const [searchText,setSearchText]=useState('')
  const [flyPosition,setFlyPosition]=useState(null)
  const handleClear=()=>{
    setSearchText('')
    setFlyPosition(null);
  }
  const handleSearch = ()=>{
    const matchedBranch = branches.find(branch=>branch.district.toLowerCase().includes(searchText.toLowerCase()));
    if(matchedBranch){
      setFlyPosition([matchedBranch.latitude,matchedBranch.longitude])
    }
  }
  useEffect(()=>{
    fetch('./warehouses.json').then(res=>res.json())
    .then(data=>setBranches(data))
  },[])
  return (
    <div className="my-5 text-center text-4xl font-extrabold">
     <h1>We are available in 64 districts</h1>
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search by district name"
          className="input input-bordered w-80"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        {searchText && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
          >
            ✕
          </button>
        )}
        <button
          onClick={handleSearch}
          className="btn btn-success ml-2"
        >
          Search
        </button>
      </div>
     <Map branches={branches} searchText={searchText} flyPosition={flyPosition} />
    </div>
  );
};

export default Coverage;
