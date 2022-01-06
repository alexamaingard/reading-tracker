import { Route, Routes } from "react-router"

import { HomePage } from "./components/HomePage";
import "./styles/main.css"

//Modify:
//<Routes>
//  <Route path="" element={< />} />
//  <Route path="tickets/summary" element={< />} />
//</Routes>

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
}