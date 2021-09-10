import React, { useState, useEffect, useContext } from "react";
import ProductService from "../../services/ProductService";
import { BasketContext } from "../../context/BasketContext";

export const Store = (props) => {
  //id from url param used to gather specific user
  const { id } = props.match.params;

  //initiation of basketcontext variable to use the contexts methods
  const basketContext = useContext(BasketContext);

  //state to hold info about the store (user)
  const [storeInfo, setStoreInfo] = useState({ storename: "", username: "" });

  //state to hold the stores (users) products
  const [products, setProducts] = useState([]);

  //function to gather a specific user with a populated products array
  const getStore = async () => {
    const data = await ProductService.getPublicProducts(id);
    if (data) {
      setStoreInfo(data);
      setProducts(data.products);
    }
  };

  //add to cart function that initiates a new count property to keep track of how many products that's been added to the basket and then, pushes the product to the basket state
  const addToCart = (product) => {
    const same = basketContext.basket.filter((item) => item === product);
    Object.assign(product, {
      count: same.length + 1,
      price: parseInt(product.price),
    });
    basketContext.setBasket([...basketContext.basket, product]);
    localStorage.setItem(
      "storageBasket",
      JSON.stringify([...basketContext.basket, product])
    );
  };

  useEffect(() => {
    getStore();
  }, []);

  return (
    <div>
      <h1>{storeInfo.storename || `${storeInfo.username}'s shop`}</h1>
      <div>
        {products.map((product) => (
          <div
            style={{
              borderBottom: "1px solid #e1e1e1",
              maxWidth: "25%",
              padding: "10px 0px",
            }}
            key={product._id}
          >
            <p style={{ fontWeight: "bold" }}>{product.name}</p>
            <p>{product.price} kr</p>
            <p>{product.description}</p>
            <button onClick={() => addToCart(product)}>Add to cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};
