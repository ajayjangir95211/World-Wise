import { useContext, useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";

import { PlacesContext } from "./PlaceMarker";
import { useNavigate, useSearchParams } from "react-router-dom";

const API_URL = "https://nominatim.openstreetmap.org/reverse?format=jsonv2&";
const TIMEOUT_SEC = 5;

function timeout() {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request timed out after ${TIMEOUT_SEC} secs`));
    }, TIMEOUT_SEC * 1000);
  });
}

export function Map() {
  const { activePlace, places, newPlace, error } = useContext(PlacesContext);

  const [position, setPosition] = useState(null);
  const [location, setLocation] = useState(new Date());
  const newRef = useRef(null);
  const activeRef = useRef(null);

  return (
    <div className="map">
      <MapContainer
        style={{ height: "100%" }}
        center={[0, 0]}
        zoom={8}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {position && (
          <>
            <Marker ref={newRef} position={position}>
              <Popup>{newPlace?.address || error || "Loading..."}</Popup>
            </Marker>
          </>
        )}

        {places.map((p) => (
          <Marker
            ref={activePlace?.id === p.id ? activeRef : null}
            position={p.position}
            key={p.id}
          >
            <Popup>{p.cityName}</Popup>
          </Marker>
        ))}
        <MapEvents
          location={location}
          activeRef={activeRef}
          position={position}
          setPosition={setPosition}
          newRef={newRef}
        />
      </MapContainer>
      <button
        className="btn btn-location"
        onClick={(e) => setLocation(new Date())}
      >
        Your Location
      </button>
    </div>
  );
}

function MapEvents({ location, position, setPosition, newRef, activeRef }) {
  const navigate = useNavigate();
  const map = useMap();
  const { activePlace, setNewPlace, setIsLoading, setError } =
    useContext(PlacesContext);
  const [searchParams] = useSearchParams();

  useEffect(
    () =>
      navigator.geolocation.getCurrentPosition(
        (pos) => map.setView([pos.coords.latitude, pos.coords.longitude]),
        (error) => console.error(error)
      ),
    [location, map]
  );

  useEffect(() => {
    setError(null);
    const newPos =
      searchParams.get("lat") && searchParams.get("lng")
        ? [searchParams.get("lat"), searchParams.get("lng")]
        : null;
    setPosition(newPos);
  }, [searchParams, setError, setPosition]);

  useEffect(() => {
    if (!position) return undefined;
    setIsLoading(true);
    getCity();

    async function getCity() {
      try {
        const res = await Promise.race([
          timeout(),
          fetch(`${API_URL}lat=${position[0]}&lon=${position[1]}`),
        ]);
        if (!res.ok) throw new Error(res.message || "Something went wrong");
        const data = await res.json();
        console.log(data);

        setNewPlace((newPlace) => ({
          position: position,
          id: data.osm_id,
          cc: data.address?.country_code,
          address: data.display_name,
        }));
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
  }, [position, setError, setIsLoading, setNewPlace]);

  function useUpdateCentre(position, ref) {
    useEffect(() => {
      if (!position) return undefined;
      map.setView(position);
      const timeout = setTimeout(() => {
        ref.current?.openPopup();
      }, 250);

      return () => clearTimeout(timeout);
    }, [position, ref]);
  }

  useUpdateCentre(position, newRef);
  useUpdateCentre(activePlace?.position, activeRef);

  useMapEvent("click", (e) =>
    navigate(`form/?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
  );
}
