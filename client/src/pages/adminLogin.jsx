import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();
   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         setLoading(true);
         const res = await axios.post("/server/admin/login", {
            email,
            password,
         });
         console.log(res.data);
         setLoading(false);
         navigate("/admin/panel");
      } catch (error) {
         setError(err);
         setLoading(false);
      }
   };

   useEffect(() => {
      const checkAdmin = async () => {
         try {
            setLoading(true)
            const response = await axios.get("/server/admin/refresh-token", {
               withCredentials: true,
            });

            if (response.data) {
               navigate("/admin/panel");
            }
            setLoading(false)
         } catch (error) {
            console.log("Not logged in:", error);
            setLoading(false)
         }
      };

      checkAdmin();
   }, []);

   return (
      <div>
         <h1>Admin Login</h1>
         {error && <p>{error}</p>}
         {loading && <p>Loadingg....</p>}
         <form onSubmit={handleSubmit}>
            <div>
               <label>Admin Email</label>
               <input
                  type='text'
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
            <button type='submit'>Login</button>
         </form>
      </div>
   );
}

export default AdminLogin;
