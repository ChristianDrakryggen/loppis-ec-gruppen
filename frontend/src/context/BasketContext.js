import React, { createContext, useState, useEffect } from "react";

//Context consumer variable is created
export const BasketContext = createContext();

//Context Provider function is created, taking a children prop representing all components the context is wrapping
const BasketProvider = ({ children }) => {
  //state for the shops basket
  const [basket, setBasket] = useState([]);

  //state to controll wheter the basket should be visible or not
  const [showBasket, setShowBasket] = useState(false);

  //useeffect to get the basket array previously saved in localstorage
  useEffect(() => {
    let fromStorage = JSON.parse(localStorage.getItem("storageBasket"));
    if (fromStorage) {
      setBasket(fromStorage);
    }
  }, []);

  return (
    <div>
      <BasketContext.Provider
        value={{ basket, setBasket, showBasket, setShowBasket }}
      >
        {children}
      </BasketContext.Provider>
    </div>
  );
};

export default BasketProvider;
