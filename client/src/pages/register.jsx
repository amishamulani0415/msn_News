import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
   const [loading, setLoading] = useState(false);
   const [username, setUsername] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");
   const navigate = useNavigate();

   const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");

      try {
         setLoading(true);
         const response = await axios.post(
            "http://localhost:5000/api/v1/user/register",
            { username, email, password },
            { withCredentials: true }
         );

         console.log("Register response:", response.data);
         navigate("/dashboard");
      } catch (error) {
         const errorMsg =
            error.response?.data?.message ||
            error.message ||
            "Registration failed";
         setError(errorMsg);
      } finally {
         setLoading(false);
      }
   };
   return (
      <div>
         {loading && <p>Loading...</p>}

         <div>
            <h1>Register Page</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
               <div>
                  <label>Username</label>
                  <input
                     type='text'
                     className='form-control'
                     value={username}
                     onChange={(e) => setUsername(e.target.value)}
                     required
                  />
               </div>
               <div>
                  <label>Email</label>
                  <input
                     type='email'
                     className='form-control'
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     required
                  />
               </div>
               <div>
                  <label>Password</label>
                  <input
                     type='password'
                     className='form-control'
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     required
                  />
               </div>
               <button type='submit' disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
               </button>
            </form>
         </div>
      </div>
   );
}

export default Register;
