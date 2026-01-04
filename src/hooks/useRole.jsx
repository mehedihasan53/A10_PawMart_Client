import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";

const useRole = () => {
  const { user, loading } = useContext(AuthContext);
  const [role, setRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    const getRole = async () => {
      if (user?.email) {
        try {
          const { data } = await axios.get(
            `https://pawmart-server-ebon.vercel.app/users/role/${user.email}`
          );
          setRole(data.role);
        } catch (error) {
          console.error("Error fetching role:", error);
        } finally {
          setRoleLoading(false);
        }
      } else if (!loading) {
        setRoleLoading(false);
      }
    };
    getRole();
  }, [user, loading]);

  return [role, roleLoading];
};

export default useRole;
