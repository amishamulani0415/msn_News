import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
   const navigate = useNavigate();
   const [loading, setLoading] = useState(true);
   const [user,setUser]=useState({})
   useEffect(() => {
      const checkUser = async () => {
         try {
            const response = await axios.post(
               "http://localhost:5000/api/v1/user/refresh-token",{},
               {
                  withCredentials: true,
               }
            );
            console.log(response.data.data.user)
            if (!response?.data) {
               navigate("/login");
            }
         } catch (error) {
            navigate("/login");
         } finally {
            setLoading(false);
         }
      };
      checkUser();
   }, [navigate]);

   if (loading) return <p>Loadingggg.......</p>;

   return (
      <div>
         <h1>Dashboard</h1>
         {/* Add dashboard UI here */}
      </div>
   );
}

export default Dashboard;
