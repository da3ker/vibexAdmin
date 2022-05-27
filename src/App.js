import tw, { styled } from "twin.macro";
import { useSelector } from "react-redux";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import RightBar from "./components/RightBar";
import SideBar from "./components/SideBar";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Products from "./pages/Products";
import User from "./pages/User";
import ProductItem from "./pages/ProductItem";
import AddProduct from "./pages/AddProduct";
import OrderDetails from "./pages/OrderDetails";
import Analytics from "./pages/Analytics";
import Login from "./pages/Login";
import Reports from "./pages/Reports";
import ReportDetails from "./pages/ReportDetails";

const Container = styled.div`
  ${tw`h-screen flex flex-row items-center justify-center`}
  background: linear-gradient(270deg, hsla(185, 64%, 51%, 1) 0%, hsla(277, 74%, 24%, 1) 100%);
`;
const Glass = styled.div`
  ${tw`grid rounded-3xl gap-4 overflow-hidden pb-1`}
  background: rgba(255, 255, 255, 0.4);
  grid-template-columns: 12rem auto 18rem;
  height: 97%;
  width: 97%;
  @media screen and (max-width: 1024px) {
    grid-template-columns: 12rem 40% auto;
  }
  @media screen and (max-width: 770px) {
    grid-template-columns: 1fr;
    overflow-y: scroll;
  }
`;
const MidContainer = styled.div`
  ${tw` px-2 pt-10 pb-4 md:overflow-y-auto overflow-y-hidden`}
  @media screen and (max-width: 770px) {
    height: max-content;
  }
`;

function App() {
  const admin = useSelector((state) => state.user.currentUser?.isAdmin);

  const location = useLocation();
  const path = location.pathname.split("/")[1];

  return (
    <Container>
      <Glass
        className={path === "login" && "!grid-cols-1 !bg-black/[.2] !shadow-lg"}
      >
        {path !== "login" && <SideBar />}
        <MidContainer>
          <Routes>
            <Route
              path="/"
              element={!admin ? <Navigate to="/login" /> : <Home />}
            />
            <Route
              path="/orders"
              element={!admin ? <Navigate to="/login" /> : <Orders />}
            />
            <Route
              path="/customers"
              element={!admin ? <Navigate to="/login" /> : <Customers />}
            />
            <Route
              path="/products"
              element={!admin ? <Navigate to="/login" /> : <Products />}
            />
            <Route
              path="/user/:id"
              element={!admin ? <Navigate to="/login" /> : <User />}
            />
            <Route
              path="/product/:productId"
              element={!admin ? <Navigate to="/login" /> : <ProductItem />}
            />
            <Route
              path="/addProduct"
              element={!admin ? <Navigate to="/login" /> : <AddProduct />}
            />
            <Route
              path="/order/:orderId"
              element={!admin ? <Navigate to="/login" /> : <OrderDetails />}
            />
            <Route
              path="/analytics"
              element={!admin ? <Navigate to="/login" /> : <Analytics />}
            />
            <Route
              path="/login"
              element={admin ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="/reports"
              element={!admin ? <Navigate to="/login" /> : <Reports />}
            />
            <Route
              path="/report/:reportId"
              element={!admin ? <Navigate to="/login" /> : <ReportDetails />}
            />
          </Routes>
        </MidContainer>
        {path !== "login" && <RightBar />}
      </Glass>
    </Container>
  );
}

export default App;
