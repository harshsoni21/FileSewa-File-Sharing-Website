import React from "react";
import {Routes,Route} from "react-router-dom"
import { useState } from "react";
import UploadPage from "./pages/UploadPage";
function App() {
  return (
    <Routes>
      <Route path="/" element = {<UploadPage/>}/>
    </Routes>
  );
}

export default App;
