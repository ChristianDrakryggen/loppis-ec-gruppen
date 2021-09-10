import React, { useContext } from "react";
import { BasketContext } from "../../context/BasketContext";

export const Basket = () => {
  //initiation of basketcontext variable to use the contexts methods
  const basketContext = useContext(BasketContext);

  //removes all products with the supplied id from the basket global state, and removes the products from localstorage
  const removeFromBasket = (id) => {
    basketContext.setBasket(
      basketContext.basket.filter((item) => item._id !== id)
    );
    localStorage.setItem(
      "storageBasket",
      JSON.stringify(basketContext.basket.filter((item) => item._id !== id))
    );
  };

  return (
    <>
      {basketContext.showBasket && (
        <div
          style={{
            padding: "10px",
            borderBottom: "1px solid black",
          }}
        >
          {basketContext.basket.length > 0 ? (
            <div>
              {basketContext.basket
                //filter function before map to retrieve only the last added item with a specific id (aka the item with the highest count value),
                //slice() before filter as a precaution to not modify state directly
                //v = current value
                //i = index
                //a = arrayen
                //findindex to find index of currentvalue
                .slice()
                .filter((v, i, a) => a.findIndex((t) => t._id === v._id) === i)
                .map((product) => (
                  <div
                    key={product._id}
                    style={{
                      display: "flex",
                      padding: "10px",
                      borderBottom: "1px solid #e1e1e1",
                    }}
                  >
                    <p style={{ marginRight: "10px" }}>{`${product.name} ${
                      product.count
                    } st - ${product.price * product.count} kr`}</p>
                    <button onClick={() => removeFromBasket(product._id)}>
                      Remove
                    </button>
                  </div>
                ))}
            </div>
          ) : (
            <div>
              <p>No items in basket...</p>
            </div>
          )}
          {basketContext.basket.length > 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <p>{`Total: ${basketContext.basket
                .map((product) => product.price)
                .reduce((total, partial) => total + partial)} kr`}</p>
              <button onClick={() => basketContext.setShowBasket(false)}>
                Close
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};
