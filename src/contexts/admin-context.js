import { useRouter } from "next/navigation";
import { createContext, useEffect, useRef, useState } from "react";
import axiosInstance from "src/config/axios";

export const adminContext = createContext({
  loading: true,
  error: "",
  data: {
    orders: [],
    user: {},
    customers: [],
    services: [],
    transactions: [],
    sales: [],
    pendingOrders: 0,
  },
});

export const AdminProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState({});
  const router = useRouter();
  const initialized = useRef(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/admin");
      console.log(response);
      setData(response.data.data);
    } catch (error) {
      router.replace("/auth/login");
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialized.current) {
      return;
    }
    initialized.current = true;

    fetchData();
  }, []);
  return (
    <adminContext.Provider
      value={{
        data,
        loading,
        error,
      }}
    >
      {children}
    </adminContext.Provider>
  );
};
