import { useContext } from "react";
import { PlacesContext } from "./PlaceMarker";

export function Places() {
  const { places } = useContext(PlacesContext);
  return (
    <ul className="places">
      {places?.map((p) => (
        <Place key={p.id} place={p} />
      ))}
    </ul>
  );
}

function Place({ place }) {
  const { activePlace, setActivePlace, setPlaces } = useContext(PlacesContext);

  return (
    <li
      className={`place ${activePlace?.id === place.id && "active-place"}`}
      onClick={() => {
        setActivePlace(null);
        setTimeout(() => {
          setActivePlace(place);
        }, 250);
      }}
    >
      <span>{place.cc.toUpperCase()}</span>
      <span>{place.cityName}</span>
      <span>
        {new Intl.DateTimeFormat(navigator.language, {
          year: "numeric",
          month: "long",
          day: "numeric",
        }).format(place.date)}
      </span>
      <button
        className="btn btn-remove"
        onClick={() =>
          setPlaces((places) => places.filter((p) => p.id !== place.id))
        }
      >
        &times;
      </button>
    </li>
  );
}
