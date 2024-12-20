import { BrowserRouter, Routes, Route, Link } from "react-router";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";
import RegisterPage from "./pages/RegisterPage";
import Layout from "./layouts/Layout";
import Dashboard from "./pages/Dashboard";
import { AppRoutes } from "./utils/routes";

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path={"/"} element={<Layout />}>
            {AppRoutes?.map((routeGroup, index) =>
              routeGroup?.children?.map((route, index2) => {
                let Component = route.component;
                if (route?.index)
                  return <Route index element={<Component />} />;
                return <Route path={route?.path} element={<Component />} />;
              })
            )}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
