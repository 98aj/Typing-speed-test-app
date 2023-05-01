import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../FirebaseConfig";

export default function UserProfile( {testTakens}) {
    const [user] = useAuthState(auth);
  return (
    <div className="user-profile">
        <div className="user">

      <div className="picture">
        <AccountCircleIcon style={{display: 'block' , transform: 'scale(6)', margin: 'auto', marginTop: '3rem'}}/>
      </div>
      <div className="info">
        <div className="email">
            {user.email}
        </div>
        <div className="joinDate">
            {user.metadata.creationTime}
        </div>
      </div>
        </div>
      <div className="testTaken">
        <span>Total Test Taken - {testTakens}</span>
      </div>
    </div>
  );
}
