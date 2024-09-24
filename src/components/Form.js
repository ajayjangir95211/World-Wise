import { useContext, useState } from "react";
import { PlacesContext } from "./PlaceMarker";
import { useNavigate } from "react-router-dom";

export function Form() {
  const { setPlaces, newPlace, setNewPlace, isLoading, error } =
    useContext(PlacesContext);
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [note, setNote] = useState("");
  const [cityName, setCityName] = useState("");

  if (isLoading) return <Loading />;
  if (error) return <Error message={error} />;

  const submitHandler = (e) => {
    e.preventDefault();
    setPlaces((places) => [...places, { ...newPlace, cityName, date, note }]);
    setNewPlace(null);
    navigate("/app");
  };

  return (
    <form onSubmit={(e) => submitHandler(e)}>
      <div className="form-control">
        <label htmlFor="city">City Name</label>
        <input
          type="text"
          id="city"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          required
        />
      </div>
      <div className="form-control">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          value={date.toISOString().split("T")[0]}
          onChange={(e) => setDate(new Date(e.target.value))}
          required
        />
      </div>

      <div className="form-control">
        <label htmlFor="note">Note</label>
        <input
          type="text"
          id="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          required
        />
      </div>
      <div className="form-control form-btn">
        <button
          className="btn btn-back"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr; Back
        </button>
        <button className="btn btn-primary">Submit</button>
      </div>
    </form>
  );
}

function Loading() {
  return <p>Loading...</p>;
}

function Error({ message }) {
  return <p>Error:{message}</p>;
}
