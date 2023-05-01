import React, { useEffect, useState } from "react";
import { auth, db } from "../FirebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import TableComp from "../Components/TableComp";
import Graphs from "../Components/Graphs";
import UserProfile from  '../Components/UserProfile' 


export default function Userpage() {
  const [data, setData] = useState([]);
  const [user, loading] = useAuthState(auth);
  const [grampData, setGraphData] = useState([]);
  const navi = useNavigate();

  const fetchData = () => {
    const resultRef = db.collection("Result");
    const { uid } = auth.currentUser; //currently uid will be null as we refresh page
    //1. React refreshs 2. Firebase is refreshing so we get uid as null initally so it will be handle in useEffect
    const temp = [];
    const temp1 = [];
    resultRef
      .where("UserId", "==", uid)
      .orderBy('timeStamp', 'desc')
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          temp.push({ ...doc.data() });
          temp1.push([
            doc.data().timeStamp.toDate().toLocaleString().split(","),
            doc.data().WordsPerMin,
          ]);
        });

        setData(temp);
        setGraphData(temp1.reverse());
      });
  };

  useEffect(() => {
    if (!loading) {
      fetchData();
    }

    if (!loading && !user) {
      navi("/");
    }
  }, [loading]);

  if (loading) {
    return <div className="circleLoad">
      <CircularProgress size={200}/>;
    </div>
  }

  return (
    <div className="canvas">
      <UserProfile testTakens={data.length}/>
      <div className="user-graph">

      <Graphs graphData={grampData} />
      </div>
      <TableComp data={data} />
    </div>
  );
}
