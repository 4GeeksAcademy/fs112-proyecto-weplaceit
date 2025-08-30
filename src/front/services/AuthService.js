const API_URL = import.meta.env.VITE_BACKEND_URL;

const AuthService = {
  verifyToken: async (navigate) => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return { valid: false, msg: "No token found" };
    }

    try {
      const response = await fetch(`${API_URL}/api/verify-token`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        return { valid: true, userId: data.user_id };
      } else {
        localStorage.removeItem("token");
        navigate("/login");
        return { valid: false, msg: "Invalid or expired token" };
      }
    } catch (error) {
      console.error("Error verifying token:", error);
      navigate("/login");
      return { valid: false, msg: "Error verifying token" };
    }
  }


};

export default AuthService;