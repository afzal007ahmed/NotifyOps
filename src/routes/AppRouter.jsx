import React from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import Login from "@/pages/Login";
import AuthProvider from "@/AuthProvider";
import Home from "@/pages/Home";
import Register from "@/pages/Register";
import Subscriptions from "@/pages/Subscriptions";
import Templates from "@/pages/Templates";
import ApiKeys from "@/pages/ApiKeys";
import TemplateInfo from "@/pages/TemplateInfo";
import Logs from "@/pages/Logs";
import Analytics from "@/pages/Analytics";

const AppRouter = () => {
  return (
    <Routes>
      <Route path={routes.LOGIN} element={<Login />} />
      <Route path={routes.REGISTER} element={<Register />} />
      <Route element={<AuthProvider />}>
        <Route path={routes.HOME} element={<Home />} />
        <Route path={routes.SUBSCRIPTIONS} element={<Subscriptions />} />
        <Route path={routes.TEMPLATES} element={<Templates />} />
        <Route path={routes.APIKEYS} element={<ApiKeys />} />
        <Route path={routes.TEMPLATEINFO} element={<TemplateInfo />} />
        <Route path={routes.LOGS} element={<Logs />} />
        <Route path={routes.ANALYTICS} element={<Analytics />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
