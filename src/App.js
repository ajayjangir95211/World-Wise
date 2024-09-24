import "./styles/App.scss";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Homepage } from "./components/Homepage";
import { Product } from "./components/Product";
import { Pricing } from "./components/Pricing";
import { Navigation } from "./components/Navigation";
import { Error } from "./components/Error";
import { PlaceMarker } from "./components/PlaceMarker";
import { Places } from "./components/Places";
import { Form } from "./components/Form";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route index element={<Homepage />}></Route>
        <Route path="pricing" element={<Pricing />}></Route>
        <Route path="product" element={<Product />}></Route>
        <Route path="app" element={<PlaceMarker />}>
          <Route index element={<Places />}></Route>
          <Route path="form" element={<Form />}></Route>
        </Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
