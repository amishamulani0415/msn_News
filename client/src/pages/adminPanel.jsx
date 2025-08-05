import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminPanel() {
  const navigate= useNavigate()
  const [loading,setLoading]=useState(true)

  useEffect(() => {
      const checkAdmin = async () => {
         try {
            const response = await axios.get("/server/admin/refresh-token", {
               withCredentials: true,
            });

            if (!response.data) {
               navigate("/admin");
            }
            setLoading(false)
         } catch (error) {
            navigate('/admin')
         }
      };

      checkAdmin();
   }, []);

  if(loading)return <h1>Loading..........</h1>

  return (
    <div>
      <h2>Welcome to Admin Panel</h2>
      <p>Your secure content goes here.</p>
    </div>
  );
}

export default AdminPanel
