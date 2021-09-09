import React, { useState, useEffect } from "react";
import ProductService from "../../services/ProductService";

export const Products = (props) => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [addingProduct, setAddingProduct] = useState(false);

  const getProducts = async () => {
    const data = await ProductService.getProducts();
    if (data && data.products) {
      setProducts(data.products);
    }
  };

  const handleInput = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    const data = await ProductService.newProduct(product);
    if (data && !data.message.msgError) {
      const data = await ProductService.getProducts();
      if (data && !data.msgError) {
        setProducts(data.products);
        resetFormFields();
      }
    }
  };

  const resetFormFields = () => {
    setProduct({
      name: "",
      price: "",
      description: "",
    });
  };

  const removeProduct = async (id) => {
    const data = await ProductService.removeProduct(id);
    if (data) {
      const data = await ProductService.getProducts();
      if (data) {
        setProducts(data.products);
      }
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <h3 style={{ marginBottom: "20px" }}>Products</h3>
      {!addingProduct && (
        <button onClick={() => setAddingProduct(true)}>Add product</button>
      )}
      {addingProduct && (
        <form
          onSubmit={saveProduct}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <input
            name="name"
            value={product.name}
            required
            placeholder="Name"
            onChange={handleInput}
          />
          <input
            name="price"
            value={product.price}
            required
            placeholder="Price"
            onChange={handleInput}
          />
          <input
            name="description"
            value={product.description}
            placeholder="Description"
            onChange={handleInput}
          />
          <button type="submit">Save</button>
          <button onClick={() => setAddingProduct(false)}>Close</button>
        </form>
      )}
      <div>
        {products.map((product) => (
          <div
            key={product._id}
            style={{ padding: "10px 0px", borderBottom: "1px solid #e1e1e1" }}
          >
            <p style={{ fontWeight: "bold" }}>{product.name}</p>
            <p>{`${product.price} kr`}</p>
            <p>{product.description}</p>
            <button onClick={() => removeProduct(product._id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};
