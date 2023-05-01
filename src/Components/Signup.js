import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useTheame } from "../Context/TheamContext";
import { auth } from "../FirebaseConfig";
import { toast } from "react-toastify";
import errormapping from "../Utils/Errorms";



export default function Signup({handleClose}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { theame } = useTheame();

  const handelClick = ()=>{
    if(!email || !password || !confirmPassword){
       
        toast.warning('Please fill all details to sign-up', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
        return;
    }
    if(password!==confirmPassword){
        
        toast.error('Password Does not match', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });

        return;
    }

 
    auth.createUserWithEmailAndPassword(email, password).then((res)=>{
        toast.success('Account Created Successfully', {
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
        
    }).catch((err)=>{
        console.log(err)
        
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
        <TextField
          variant="outlined"
          type="password"
          label="Confirm your password"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
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
          onClick={handelClick}
        >
          Sign-up
        </Button>
      </Box>
    </div>
  );
}
