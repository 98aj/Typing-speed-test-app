import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AppBar, Box, Modal, Tab, Tabs } from "@mui/material";
import Login from "./Login";
import Signup from "./Signup";
import { useTheame } from "../Context/TheamContext";
import GoogleButton from 'react-google-button'
import {signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import { auth } from "../FirebaseConfig";
import { toast } from "react-toastify";
import errormapping from "../Utils/Errorms";
import LogoutIcon from '@mui/icons-material/Logout';
import {useAuthState} from 'react-firebase-hooks/auth'
import { useNavigate } from "react-router-dom";

export default function AccountCircle() {
  const [open, setOpen] = useState(false);
  const [val, setVal] = useState(0);
  const {theame} = useTheame();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleClick = () => {
    if(user){
      navigate('/user');
    }else{

      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTabChange = (e, v) => {
    setVal(v);
  };

  const googleProvider = new GoogleAuthProvider();
  const googleLogin = ()=>{
    signInWithPopup(auth, googleProvider).then((res)=>{
        toast.success('Google Log-in Successfull', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
            handleClose()
    }).catch((err)=>{
        toast.error(errormapping[err.code] || 'Some thing went worng', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
           
    })
  }

  const logout = ()=>{
    auth.signOut().then((res)=>{
      toast.success('Logout', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    }).catch((err)=>{
      toast.error('Not able to logout', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    })
  }



  return (
    <div>
      <AccountCircleIcon onClick={handleClick} />
      {user && <LogoutIcon onClick={logout}/>}

      <Modal
        open={open}
        onClose={handleClose}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ width: "480px", textAlign:'center'}}>
          <AppBar position="static" style={{ background: "transparent" }}>
            <Tabs 
                value={val} 
                onChange={handleTabChange}
                variant="fullWidth">
              <Tab label="Login" style={{color: theame.textColor, backgroundColor: theame.background}}></Tab>
              <Tab label="Sign-up" style={{color: theame.textColor, backgroundColor: theame.background}}></Tab>
            </Tabs>
          </AppBar>
          {val === 0 && <Login handleClose={handleClose}/>}
          {val === 1 && <Signup handleClose={handleClose}/>}
          <Box>
            <span>OR</span>
            <GoogleButton style={{width: '100%', marginTop: '10px',}} onClick={googleLogin}/>
          </Box>
        </div>
      </Modal>
    </div>
  );
}
