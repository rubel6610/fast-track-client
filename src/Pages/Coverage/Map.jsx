import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MapFlyer from "./MapFlyer";

const Map = ({ branches,searchText,flyPosition }) => {
  const position = [23.01, 90.7];
  const filteredBranch = branches.filter(branch=>branch.district.toLowerCase().includes(searchText.toLowerCase()))
  return (
    <MapContainer
      center={position}
      zoom={12}
      className="h-[400px] w-5xl my-2 mx-auto"
    >
      <TileLayer
        attribution=''
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {flyPosition && <MapFlyer flyPosition={flyPosition}/>}
      {filteredBranch.map((branch,index) => {
        return (
          <Marker key={index} position={[branch.latitude, branch.longitude]}>
            <Popup>
                <strong>{branch.district}</strong>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default Map;
