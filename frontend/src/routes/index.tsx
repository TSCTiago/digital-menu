import {
  Route,
  Navigate,
  BrowserRouter,
  Routes as RouterRoutes,
} from "react-router-dom";
import { HomePage } from "../pages/Home";
import { MenuPage } from "../pages/Menu";
import { LoginPage } from "../pages/Login";
import { DashboardPage } from "../pages/Dashboard";
// import { LoginMiddleware } from "./Middlewares/LoginMiddleware";

export function Routes() {
  return (
    <BrowserRouter>
      <RouterRoutes>
        {/* <Route element={<LoginMiddleware />}> */}
        <Route path="/" element={<HomePage />} />
        <Route path="/:restaurantId" element={<MenuPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        {/* </Route> */}
        <Route path="/login" element={<LoginPage />} />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </RouterRoutes>
    </BrowserRouter>
  );
}
