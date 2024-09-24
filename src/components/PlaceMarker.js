import { Outlet } from "react-router-dom";
import { Map } from "./Map";
import { createContext, useEffect, useState } from "react";

export const PlacesContext = createContext();

export function PlaceMarker() {
  const [places, setPlaces] = useState(() => {
    const storedPlaces = localStorage.getItem("places");

    const places = storedPlaces ? JSON.parse(storedPlaces) : [];
    places?.forEach((p) => (p.date = new Date(p.date)));
    return places;
  });
  const [activePlace, setActivePlace] = useState(null);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [newPlace, setNewPlace] = useState(null);

  useEffect(() => {
    if (places.length) localStorage.setItem("places", JSON.stringify(places));
  }, [places]);

  return (
    <PlacesContext.Provider
      value={{
        places,
        setPlaces,
        isLoading,
        setIsLoading,
        newPlace,
        setNewPlace,
        activePlace,
        setActivePlace,
        error,
        setError,
      }}
    >
      <section className="place-marker">
        <Map />
        <Outlet />
      </section>
    </PlacesContext.Provider>
  );
}
