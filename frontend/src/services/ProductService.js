const ProductService = {
  getProducts: async () => {
    try {
      const res = await fetch("/user/getproducts");
      if (res.status !== 401) {
        const data = await res.json();
        return data;
      } else {
        return {
          message: { msgBody: "Unauthorized to get products", msgError: true },
        };
      }
    } catch (error) {
      return { error: error };
    }
  },
  newProduct: async (product) => {
    try {
      const res = await fetch("/user/newproduct", {
        method: "post",
        body: JSON.stringify(product),
        headers: {
          "Content-type": "application/json",
        },
      });
      if (res.status !== 401) {
        const data = await res.json();
        return data;
      } else {
        return {
          message: { msgBody: "Unauthorized to add product", msgError: true },
        };
      }
    } catch (error) {
      return { error: error };
    }
  },
};

export default ProductService;
