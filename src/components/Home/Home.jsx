import React, { useEffect, useState } from "react";
import { Hero } from "./Hero/Hero";
import { Filter } from "./Filters/Filter";
import { Phones } from "./Products/Phones/Phones";
import { Laptops } from "./Products/Laptops/Laptops";
import { Hero2 } from "./Hero2/Hero2";
import { FilteredCategory } from "./FilteredCategory/FilteredCategory";
import { PopularCategory } from "./PopularCategory/PopularCategory";
import { Card } from "./Products/Card";
import { SearchProducts } from "../SearchProducts";
import "./Home.css";
export const Home = (props) => {
  const [cat, setCat] = useState("all");
  const [products, setProducts] = useState([]);
  const [filterDep, setFilterDep] = useState(false);
  useEffect(() => {
    async function allProducts() {
      // const res = await fetch("https://ecommercetechv.onrender.com/products");
      const res = await fetch("https://ecommercetechv.onrender.com/products");
      const product = await res.json();
      setProducts(product.products);
    }
    allProducts();
  }, []);
  const lowToHigh = () => {
    const sortProducts = products.sort((a, b) => a.price - b.price);
    setProducts(sortProducts);
    setFilterDep(!filterDep);
  };
  const highToLow = () => {
    const sortProducts = products.sort((a, b) => b.price - a.price);
    setProducts(sortProducts);
    setFilterDep(!filterDep);
  };
  const all = () => {
    setProducts(products);
    setFilterDep(!filterDep);
  };
  const laptops = products.filter((product) => product.category === "Laptop");
  const phones = products.filter((product) => product.category === "Mobile");
  const headPhones = products.filter(
    (product) => product.category === "Headphone"
  );
  const accessories = products.filter(
    (product) => product.category === "Accessories"
  );
  const tv = products.filter((product) => product.category === "TV");
  const camera = products.filter((product) => product.category === "Camera");
  const gaming = products.filter((product) => product.category === "Gaming");
  const landline = products.filter(
    (product) => product.category === "Landline"
  );
  const radio = products.filter((product) => product.category === "Radio");
  const speaker = products.filter((product) => product.category === "Speaker");
  return (
    <div id="home">
      {!props.searchProducts.length && <Hero data={headPhones} />}
      {!props.searchProducts.length && <PopularCategory />}
      {!props.searchProducts.length && (
        <Filter
          cat={setCat}
          products={products}
          all={all}
          lowToHigh={lowToHigh}
          highToLow={highToLow}
        />
      )}
      {props.searchProducts.length > 0 && (
        <SearchProducts data={props.searchProducts} />
      )}
      {!props.searchProducts.length && cat === "all" && (
        <>
          <Phones data={phones} />
          <Hero2 data={accessories} />
          <Laptops data={laptops} />
        </>
      )}
      {cat === "laptops" && <FilteredCategory data={laptops} />}
      {cat === "phones" && <FilteredCategory data={phones} />}
      {cat === "headphones" && <FilteredCategory data={headPhones} />}
      {cat === "accessories" && <FilteredCategory data={accessories} />}
      {cat === "TV" && <FilteredCategory data={tv} />}
      {cat === "Camera" && <FilteredCategory data={camera} />}
      {cat === "Gaming" && <FilteredCategory data={gaming} />}
      {cat === "Landline" && <FilteredCategory data={landline} />}
      {cat === "Radio" && <FilteredCategory data={radio} />}
      {cat === "Speaker" && <FilteredCategory data={speaker} />}
    </div>
  );
};
