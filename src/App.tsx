import {
  Navigate, Route, BrowserRouter as Router, Routes,
} from "react-router-dom";
import MainLayout from "./components/layouts/main-layout/MainLayout";
import {
  AUTH_CALLBACK_ROUTE, MANAGE_RESTAURANT_ROUTE, ORDERS_ROUTE, REPORT_ROUTE,
} from "./lib/consts";
import AuthCallbackPage from "./pages/auth/AuthCallbackPage";
import Auth0ProviderWithNavigate from "./components/providers/Auth0ProviderWithNavigate";
import RootPage from "./pages/root/RootPage";
import ProtectedRoute from "./components/misc/ProtectedRoute";
import ReportPage from "./pages/report/ReportPage";
import ManageRestaurantPage from "./pages/manage-restaurant/ManageRestaurantPage";
import OrdersPage from "./pages/orders/OrdersPage";

function App() {
  return (
    <Router>
      <Auth0ProviderWithNavigate>
        <Routes>
          <Route
            path="/"
            element={(
              <MainLayout noContainer>
                <RootPage />
              </MainLayout>
            )}
          />
          <Route
            path={`/${AUTH_CALLBACK_ROUTE}`}
            element={(
              <AuthCallbackPage />
            )}
          />
          <Route element={<ProtectedRoute />}>
            <Route
              path={`/${ORDERS_ROUTE}`}
              element={(
                <MainLayout>
                  <OrdersPage />
                </MainLayout>
            )}
            />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route
              path={`/${REPORT_ROUTE}`}
              element={(
                <MainLayout>
                  <ReportPage />
                </MainLayout>
            )}
            />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route
              path={`/${MANAGE_RESTAURANT_ROUTE}`}
              element={(
                <MainLayout>
                  <ManageRestaurantPage />
                </MainLayout>
            )}
            />
          </Route>
          <Route
            path="*"
            element={(
              <Navigate
                to="/"
              />
            )}
          />
        </Routes>
      </Auth0ProviderWithNavigate>
    </Router>
  );
}

export default App;
