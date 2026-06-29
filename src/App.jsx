import {useNavigate } from "react-router";
import AppRouter from "./routes/AppRouter";
import { Toaster } from "sonner";
import { useEffect } from "react";
import { routes } from "./routes/routes";

function App() {

  const nav = useNavigate()

  useEffect(() => {
    if (localStorage.getItem("token")) {
      nav(routes.HOME);
    }
  }, []);

  
  return (
    <div>
      <Toaster position="bottom-center" />
      <AppRouter />
    </div>
  );
}

export default App;
