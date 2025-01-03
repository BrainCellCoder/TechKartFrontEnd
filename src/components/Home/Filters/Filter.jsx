import "./Filter.css";
export const Filter = (props) => {
  const onChangeCategory = (event) => {
    props.cat(event.target.value);
  };
  const onChangePrice = (event) => {
    console.log("event", event.target.value);
    switch (event.target.value) {
      case "high-low":
        return props.highToLow();
      case "low-high":
        return props.lowToHigh();
      case "all":
        return props.products;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="filters ">
        <div className="category">
          <select onChange={onChangeCategory}>
            <option value="all">All Products</option>
            <option value="laptops">Laptop</option>
            <option value="phones">Phone</option>
            <option value="headphones">Headphone</option>
            <option value="accessories">Accessories</option>
            <option value="TV">TV</option>
            <option value="Camera">Camera</option>
            <option value="Gaming">Gaming</option>
            <option value="Landline">Landline</option>
            <option value="Radio">Radio</option>
            <option value="Speaker">Speaker</option>
          </select>
        </div>
        <div className="price">
          <select onChange={onChangePrice}>
            <option>Price</option>
            {/* <option value="all">All</option> */}
            <option value="high-low">High-Low</option>
            <option value="low-high">Low-High</option>
          </select>
        </div>
        {/* <div className="reviews">
          <select>
            <option>Reviews</option>
            <option value="">All</option>
            <option value="Laptop">5 stars</option>
            <option value="Mobile">4 stars</option>
            <option value="Mobile">3 stars</option>
            <option value="Mobile">2 stars</option>
            <option value="Mobile">1 stars</option>
            <option value="Mobile">Best-Worst</option>
            <option value="Mobile">Worst-Best</option>
          </select>
        </div> */}
      </div>
    </>
  );
};
