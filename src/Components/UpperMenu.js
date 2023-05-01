import React from "react";
import { useTestMode } from "../Context/TestModeContext";
import { toast } from "react-toastify";
import { auth } from "../FirebaseConfig";

export default function UpperMenu(props) {

  const{setTestMode} = useTestMode();
  const user = auth.currentUser;

  function handelClick(e){
    if(props.afterState==false){

      setTestMode(Number(e.target.id))
    }else if(user){
      window.location.reload()
    }
    else{
      toast.warning('Please Sign-in/Login To Save Test', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });

        
    }
    
  }

  return (
    <div className="testTimerMode">
      <div className="counters">{props.counter}</div>
      <div className="mode"> 
        <div className="testMode" id={15} onClick={handelClick}>15s</div>
        <div className="testMode" id={30} onClick={handelClick}>30s</div>
        <div className="testMode" id={60} onClick={handelClick}>60s</div>
      </div>
    </div>
  );
}
