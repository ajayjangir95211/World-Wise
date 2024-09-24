import img from "../images/img-1.jpg";

export function Pricing() {
  return (
    <section className="pricing">
      <div>
        <img src={img} alt="" />
      </div>
      <div className="content">
        <h2>Simple pricing Just $9/month</h2>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae vel
          labore mollitia iusto. Recusandae quos provident, laboriosam fugit
          voluptatem iste.
        </p>
      </div>
    </section>
  );
}
