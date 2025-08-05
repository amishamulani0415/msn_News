import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
   const [loading, setLoading] = useState(false);
   const [userInfo, setUserInfo] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");
   const navigate = useNavigate();

   const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");

      try {
         setLoading(true);
         const response = await axios.post(
            "http://localhost:5000/api/v1/user/login",
            { userInfo, password },
            { withCredentials: true }
         );

         console.log("Login response:", response.data);
         navigate("/dashboard");
      } catch (error) {
         const errorMsg =
            error.response?.data?.message || error.message || "Login failed";
         setError(errorMsg);
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      const checkUser = async () => {
         try {
            setLoading(true);
            const response = await axios.post(
               "http://localhost:5000/api/v1/user/refresh-token",
               {},
               { withCredentials: true }
            );

            if (response?.data) {
               navigate("/dashboard");
            }
         } catch (error) {
            if (axios.isAxiosError(error)) {
               console.log(error?.response)
            } 
         } finally {
            setLoading(false);
         }
      };

      checkUser();
   }, [navigate]);

   return (
      <div>
         {loading && <p>Loading...</p>}

         <div>
            <h1>Login Page</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
               <div>
                  <label>Email</label>
                  <input
                     type='text'
                     className='form-control'
                     value={userInfo}
                     onChange={(e) => setUserInfo(e.target.value)}
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

export default Login;

