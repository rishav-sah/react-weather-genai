import { useState, useEffect } from "react";

function useCurrentLocation() {
  
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    error: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation({
        latitude: null,
        longitude: null,
        error: "Geolocation is not supported by your browser.",
      });
      return;
    }

    const geoSuccess = (position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error: null,
      });
    };

    const geoError = () => {
      setLocation({
        latitude: null,
        longitude: null,
        error: "Unable to retrieve your location.",
      });
    };

    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
  }, []);

  return location;
}

export default useCurrentLocation;
