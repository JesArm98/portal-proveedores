import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useProtectedRoute = () => {
  const [isLoading, setIsLoading] = useState(true); // To manage the display state
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/sign-in");
    }
    setIsLoading(false); // Once check is complete and (if needed) navigation is done
  }, [navigate]);

  return { isLoading };
};

export default useProtectedRoute;
