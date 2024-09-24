import { useEffect } from "react";

export function Homepage() {
  useEffect(() => {
    document.querySelector("#root").classList.add("home");

    return () => document.querySelector("#root").classList.remove("home");
  });

  return (
    <section className="homepage">
      <h1>
        You travel the world.
        <br />
        WorldWise keeps track of your adventures.
      </h1>
      <p>
        A world map that tracks your footsteps into every city you can think of.
        Never forget your wonderful experiences, and show your friends how you
        have wandered the world.
      </p>
      <a href="/app/" className="btn btn-primary">
        {" "}
        Start Tracking Now
      </a>
    </section>
  );
}
