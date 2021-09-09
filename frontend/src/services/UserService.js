const UserService = {
  getAllUsers: async () => {
    try {
      const res = await fetch("/public/getallusers");
      const data = await res.json();
      return data;
    } catch (error) {
      return { error: error };
    }
  },
  updateUser: async (user) => {
    try {
      const res = await fetch("/user/updateuser", {
        method: "put",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status !== 401) {
        const data = await res.json();
        return data;
      } else {
        return {
          message: {
            msgBody: "Unauthorized to add product",
            msgError: true,
          },
        };
      }
    } catch (error) {
      return { error: error };
    }
  },
};

export default UserService;
