import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './index.css'
import Lays from "./lays";
import Landing from "./landing.tsx";
import Tron from "./tron.tsx"
// import Test from "./test.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
     <Routes>
         <Route path="/" element={<Landing/>} />
        <Route path="/bv.gaurav" element={<Lays />} />
        <Route path="/tron" element={<Tron />} /> 
        {/* <Route path="/" element={<Lays />} /> */}
      </Routes> 
    </BrowserRouter>
);