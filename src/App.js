import { ThemeProvider } from "styled-components";

import { GlobalStyles } from "./Styles/global";

import { useTheame } from "./Context/TheamContext";

import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import Userpage from "./Pages/Userpage";




function App() {
  const {theame} = useTheame()
  return (
    <ThemeProvider theme={theame}>
     
      <ToastContainer/>

      <GlobalStyles/>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/user" element={<Userpage/>}/>
      </Routes>
    

    
    </ThemeProvider>
  );
}

export default App;
