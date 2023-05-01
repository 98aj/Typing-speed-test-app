import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useTheame } from "../Context/TheamContext";
import { auth } from "../FirebaseConfig";
import { toast } from "react-toastify";
import errormapping from "../Utils/Errorms";
import { useNavigate } from "react-router-dom";

export default function Login({handleClose}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { theame } = useTheame();
  const navi = useNavigate();

  const handleClick = ()=>{
    if(!email || !password){
        toast.warning('Please Enter Details', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });


        return;    
    }

    auth.signInWithEmailAndPassword(email, password).then((res)=>{
        toast.success('Log-in Successfull', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
            handleClose();
            window.location.reload();
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

  return (
    <div>
      <Box
        p={3}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <TextField
          variant="outlined"
          type="email"
          label="Enter you Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          InputLabelProps={{
            style: {
              color: theame.textColor,
            },
          }}
          inputProps={{
            style: {
              color: theame.textColor,
            },
          }}
        />
        <TextField
          variant="outlined"
          type="password"
          label="Enter your password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          InputLabelProps={{
            style: {
              color: theame.textColor,
            },
          }}
          inputProps={{
            style: {
              color: theame.textColor,
            },
          }}
        />
        <Button
          variant="contained"
          size="large"
          style={{
            color: theame.textColor,
            backgroundColor: theame.background,
          }}
          onClick={handleClick}
        >
          Login
        </Button>
      </Box>
    </div>
  );
}
