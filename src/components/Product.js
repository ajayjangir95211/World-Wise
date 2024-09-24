import img from "../images/img-2.jpg";
export function Product() {
  return (
    <section className="product">
      <div>
        <img src={img} alt="" />
      </div>
      <div>
        <h2>About WorldWide.</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo est
          dicta illum vero culpa cum quaerat architecto sapiente eius non
          soluta, molestiae nihil laborum, placeat debitis, laboriosam at fuga
          perspiciatis? Lorem, ipsum dolor sit amet consectetur adipisicing
          elit. Corporis doloribus libero sunt expedita ratione iusto, magni, id
          sapiente sequi officiis et.
        </p>
      </div>
    </section>
  );
}
