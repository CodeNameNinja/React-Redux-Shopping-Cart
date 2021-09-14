import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_PRODUCTS = [
  {
    id: 1,
    title: "Test",
    price: 6,
    description: "This is a first product - amazing!",
  },
  {
    id: 2,
    title: "Test2",
    price: 8,
    description: "This is a second product - amazing!",
  },
];

const Products = (props) => {
  const products = DUMMY_PRODUCTS.map((product) => (
    <ProductItem
      key={product.id}
      title={product.title}
      price={product.price}
      description={product.description}
      id={product.id}
    />
  ));
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>{products}</ul>
    </section>
  );
};

export default Products;
