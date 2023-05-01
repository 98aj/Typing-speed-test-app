import {createContext, useContext, useState} from 'react'

const TestModeContext = createContext();

export const TestModeProvider = ({children})=>{

    
    const [testMode, setTestMode] = useState(15);
    
    const value = {
        testMode,
        setTestMode
    }
    
    return (<TestModeContext.Provider value={value}>{children}</TestModeContext.Provider>)
}

export const useTestMode = ()=> useContext(TestModeContext);