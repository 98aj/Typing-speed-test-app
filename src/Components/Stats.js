import React, { useEffect } from 'react'
import Graphs from './Graphs'
import { auth, db } from '../FirebaseConfig'
import { toast } from 'react-toastify';

export default function Stats({
    WPM,
    Accuracy,
    CorrectChar,
    IncorrectChar,
    MissedChar,
    ExtraChar,
    dataOfGraph 
}) {


  const pushToDB = ()=>{
    if(isNaN(Accuracy)){
      toast.error('Invalid Test', {
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

    const refrence = db.collection("Result");
    const {uid} = auth.currentUser;
    refrence.add({
      WordsPerMin : WPM,
      AccuracyScore : Accuracy,
      Characters : `${CorrectChar} / ${IncorrectChar} / ${MissedChar} / ${ExtraChar}`,
      timeStamp: new Date(),
      UserId : uid
    }).then((res)=>{
      toast.success('Data saved successfull', {
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
      toast.warning('Not able to save result', {
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

  useEffect(()=>{
    if(auth.currentUser){
      pushToDB();
    }else{
      toast.warning('Login to save result', {
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
  }, [])

  return (
    <div className='stats-box'>
        <div className='leftStat'>
            <div className='title'>WPM</div>
            <div className='subtitle'>{WPM}</div>
            <div className='title'>Accuracy</div>
            <div className='subtitle'>{Accuracy}</div>
            <div className='title'>Characters</div>
            <div className='subtitle'>{CorrectChar} / {IncorrectChar} / {MissedChar} / {ExtraChar}</div>
        </div>
        <div className='rightStat'>
            {/* Chart */}
            <Graphs graphData = {dataOfGraph}/>
        </div>
      
    </div>
  )
}
