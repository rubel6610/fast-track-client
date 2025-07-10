import React, { useEffect } from "react";
import { useMap } from "react-leaflet";

const MapFlyer = ({ flyPosition }) => {
  const map = useMap();
  useEffect(() => {
    if (flyPosition) {
      map.flyTo(flyPosition, 12, { duration: 1 });
    }
  }, [flyPosition,map]);
  return null;
};
export default MapFlyer;
