// utils/validateUser.js
import axios from "axios";

export const validateUserJWTToken = async (token) => {
  try {
    const res = await axios.get("/api/validate", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.data;
  } catch (error) {
    console.error("JWT validation failed", error);
    return null;
  }
};
