// import jwt_decode from "jwt-decode";

// function isAuthenticated() {
//   const token = localStorage.getItem("token");

//   if (!token) {
//     return false;
//   }

//   const decoded = jwt_decode(token);
//   localStorage.setItem("user_id", decoded.id);
//   return true;
// }

// export default isAuthenticated;

import { jwtDecode } from "jwt-decode";

function isAuthenticated() {
  const token = localStorage.getItem("token");

  if (!token) {
    return false;
  }

  try {
    // Decode the token
    const decoded = jwtDecode(token);

    // Check if the token is expired (JWT typically includes an "exp" field)
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      return false;
    }

    // If valid, store user information
    localStorage.setItem("user_id", decoded.id);
    return true;
  } catch (error) {
    console.error("Error decoding token:", error);
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    return false;
  }
}

export default isAuthenticated;
