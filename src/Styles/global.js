
import {createGlobalStyle} from 'styled-components'

export const GlobalStyles = createGlobalStyle`

*{
    box-sizing : border-box;
    padding: 0;
    margin: 0;
}

body{
    background: ${({theme})=> theme.background};
    transition: all 0.25s linear;
    color: ${({theme})=> theme.textColor};
}

.canvas{
    display: grid;
    min-height: 100vh;
    grid-auto-flow: row;
    grid-template-row: auto 1fr auto;
    gap: 0.5rem;
    padding: 2rem;
    width: 100vw;
    text-align: center;
    align-items: center;
}

.textField{
    display: block;
    max-width: 1000px;
    height: 150px;
    margin-left: auto;
    margin-right: auto;
    overflow: hidden;
}

.words{
    font-size: 25px;
    display: flex;
    flex-wrap: wrap;
    color: ${({theme})=> theme.textBoxArea}
      
}

.word{
    margin: 5px;
    padding-left: 2px;
}

.inputBox{
    opacity: 0;
}

.current{
    border-left: 1px solid;
    animation: blink 2s infinite;
    animation-timing-function: ease;

    @keyframes blink {
        0% {border-left-color: white; }
        25% {border-left-color: #333;}
        50% {border-left-color: white;}
        75% {border-left-color: #333;}
        100% {border-left-color: white;}
    }
}

.current-right{
    border-right: 1px solid;
    animation: blink-right 2s infinite;
    animation-timing-function: ease;

    @keyframes blink-right {
        0% {border-right-color: white; }
        25% {border-right-color: #333;}
        50% {border-right-color: white;}
        75% {border-right-color: #333;}
        100% {border-right-color: white;}
    }
}

.correct{
    color: green;
}

.wrong{
    color: red;
}

.testTimerMode{
    display: flex;
    width: 1000px;
    margin-left: auto;
    margin-right: auto;
    justify-content: space-between;
    padding: 0.5rem;
}

.mode{
    display: flex;
    gap: 10px;
}

.testMode:hover{
    color: green;
    cursor: pointer;
}

.footer{
    width : 1000px;
    display: flex;
    justify-content: space-between;
    margin-left: auto;
    margin-right: auto;
}

.stats-box{
    display: flex;
    justify-content: space-between;
    width: 1000px;
    margin-left: auto;
    margin-right: auto; 
}

.leftStat{
    width: 30%;
    padding: 30px;
}

.rightStat{
    width: 70%;
}

.title{
    font-size: 20px;
    color: ${({theme})=> theme.textBoxArea}
}

.subtitle{
    font-size: 30px;
    color: ${({theme})=> theme.textColor}
}

.header{
    display: flex;
    width: 1000px;
    margin-left: auto;
    margin-right: auto;
    justify-content: space-between;
}

.user-profile{
    width : 1000px;
    display: flex;
    background: ${({theme})=> theme.textColor};
    color: ${({theme})=> theme.background};
    justify-content: center;
    align-text: center;
    margin: auto;
    padding: 30px;
    height: 15rem;
    border-radius: 45px;
}

.user{
    display: flex;
    width: 50%;
   
    margin-bottom: 30px;
    font-size : 1.5rem;
    padding: 1rem;
}
.info{
    width: 60%;
    padding: 1rem;
    margin-top: 1rem;
}

.picture{
    width: 40%;
}

.testTaken{
    width: 50%;
    border-left: 2px solid;
    font-size: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    
}

.user-graph, .table{
    margin: auto;
    width: 1000px;
    margin-top: 5rem;
}

.circleLoad{
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;

}
.logo{
    display: grid;
    
}

.linkedin, .git{
    color: ${({theme})=> theme.textColor};
}
`