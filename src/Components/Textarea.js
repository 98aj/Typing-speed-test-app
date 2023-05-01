import React, { createRef, useEffect, useMemo, useRef, useState } from "react";
import UpperMenu from "./UpperMenu";
import { useTestMode } from "../Context/TestModeContext";
import Stats from "./Stats";

const randomWords = require("random-words");
export default function Textarea() {

  //To store Graph data
  const [graphData, setGraphData] = useState([]);
  //Test result 
  const [correctChar, setCorrectChar] = useState(0);
  const [incorrectChar, setIncorrectChar] = useState(0);
  const [missedChar, setMissedChar] = useState(0);
  const [extraChar, setExtraChar] = useState(0);
  const [correctWord, setCorrectWord] = useState(0);
  //context
  const { testMode } = useTestMode();

  // Creating Random words
  const [wordsArray, setWordsArray] = useState(() => {
    return randomWords(50);
  });
  // Wrong and right word

  const [currWordIndex, setcurrWordIndex] = useState(0);
  const [currCharIndex, setcurrCharIndex] = useState(0);

  //for timer funcion
  const [counter, setCounter] = useState(testMode);
  const [startTest, setStartTest] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [testEnd, setTestEnd] = useState(false);

  function startTimer() {
    let timer = setInterval(time, 1000);
    setIntervalId(timer);
    if (counter == 1) {
      clearInterval(timer);
      setStartTest(false);
    }

    function time() {
      setCounter((latestCount) => {
        //Set graph data

        setCorrectChar((correctChar)=>{
          setGraphData((graphData)=>{
            return [...graphData, [(testMode-latestCount+1),
            ((correctChar/5)/((testMode-latestCount+1)/60))
            ]]
          })
          return correctChar;
        })

        
        if (latestCount == 1) {
          

          //set interval
          setTestEnd(true);
          clearInterval(timer);
          return 0;
        }
        return latestCount - 1;
      });
    }
  }
  //Creating input functionality providing refrence of input and words

  const inputeRef = useRef(null);

  function handleInput(e) {
    if (testEnd) {
      return;
    }
    if (!startTest) {
      startTimer();
      setStartTest(true);
    }

    const allcurrChar = wordSpanRef[currWordIndex].current.childNodes;

    //for space event
    if (e.keyCode === 32) {

      let correctCharsInWord = wordSpanRef[currWordIndex].current.querySelectorAll('.correct')
      if(correctCharsInWord.length === allcurrChar.length){
        setCorrectWord(correctWord+1);
      }

      if (allcurrChar.length === currCharIndex) {
        //remove curser from last place of word
        allcurrChar[currCharIndex - 1].classList.remove("current-right");
      } else {

        // remove curser from in between of words
        setMissedChar(missedChar + (allcurrChar.length - currCharIndex))
        allcurrChar[currCharIndex].classList.remove("current");
      }
      wordSpanRef[currWordIndex + 1].current.childNodes[0].className = "current";
      setcurrWordIndex(currWordIndex + 1);
      setcurrCharIndex(0);
      return;
    }

    //for backspace event
    if (e.keyCode === 8) {
      if (currCharIndex !== 0) {
        //if courser is at last char
        if (allcurrChar.length === currCharIndex) {
          if (allcurrChar[currCharIndex - 1].className.includes("extra")) {
            allcurrChar[currCharIndex - 1].remove();
            allcurrChar[currCharIndex - 2].className += " current-right";
          } else {
            allcurrChar[currCharIndex - 1].className = "current";
          }
          setcurrCharIndex(currCharIndex - 1);
          return;
        }
        allcurrChar[currCharIndex].className = "";
        allcurrChar[currCharIndex - 1].className = "current";
        setcurrCharIndex(currCharIndex - 1);
      }
      return;
    }

    //insert extra word in display if user is wrong

    if (currCharIndex === allcurrChar.length) {
      let newSpan = document.createElement("span");
      newSpan.innerText = e.key;
      newSpan.className = "wrong extra current-right";
      allcurrChar[currCharIndex - 1].classList.remove("current-right");
      wordSpanRef[currWordIndex].current.append(newSpan);
      setcurrCharIndex(currCharIndex + 1);
      setExtraChar(extraChar+1);
      return;
    }

    // when user start typing
    if (e.key === allcurrChar[currCharIndex].innerText) {
      allcurrChar[currCharIndex].className = "correct";
      setCorrectChar(correctChar+1);
    } else {
      allcurrChar[currCharIndex].className = "wrong";
      setIncorrectChar(incorrectChar+1);
    }

    if (currCharIndex + 1 === allcurrChar.length) {
      allcurrChar[currCharIndex].className += " current-right";
    } else {
      allcurrChar[currCharIndex + 1].className = "current";
    }
    setcurrCharIndex(currCharIndex + 1);
  }
  // WPM function
  function calculateWPM(){
    return Math.round((correctChar/5)/(testMode/60));
  }
  // Acurracy
  function calculateAcc(){
    return Math.round((correctWord/currWordIndex)*100);
  }
  //Focus input box
  function userInput() {
    inputeRef.current.focus();
  }

  //for context

  useEffect(() => {
    reset();
  }, [testMode]);

  // reste timer
  const reset = () => {
    clearInterval(intervalId);
    setCounter(testMode);
    setcurrCharIndex(0);
    setcurrWordIndex(0);
    setWordsArray(randomWords(50));
    setTestEnd(false);
    setStartTest(false);
    userInput();
    wordSpanRefClassName();
    
  };

  const wordSpanRefClassName = ()=>{
    wordSpanRef.map((i)=>{
      //as childNodes is not an array so convert it to array and itrate it
      Array.from(i.current.childNodes).map(j=>{
        j.className = '';
      })
    })
    wordSpanRef[0].current.childNodes[0].className = "current";
  }

  //for wordArray
  useEffect(() => {
    userInput();
    wordSpanRef[0].current.childNodes[0].className = "current";
  }, []);

  // Taking wordsArray in hook

  const wordSpanRef = useMemo(() => {
    return Array(wordsArray.length)
      .fill(0)
      .map((i) => createRef(null));
  }, [wordsArray]);

  return (
    <div>
      <UpperMenu counter={counter} afterState={testEnd}/>
      {testEnd ? (
        <Stats
        WPM={calculateWPM()}
        Accuracy={calculateAcc()}
        IncorrectChar={incorrectChar}
        CorrectChar={correctChar}
        MissedChar={missedChar}
        ExtraChar={extraChar}
        dataOfGraph = {graphData}
        />
      ) : (
        <div className="textField" onClick={userInput}>
          <div className="words">
            {wordsArray.map((word, index) => {
              return (
                <span className="word" ref={wordSpanRef[index]}>
                  {word.split("").map((char) => {
                    return <span>{char}</span>;
                  })}
                </span>
              );
            })}
          </div>
        </div>
      )}
      <input
        type="text"
        className="inputBox"
        onKeyDown={handleInput}
        ref={inputeRef}
      />
    </div>
  );
}
