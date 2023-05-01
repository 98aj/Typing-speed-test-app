import React, { createContext, useContext, useState } from 'react'
import { TheameOption } from '../Utils/TheamOption';

const TheamContext = createContext();
export const TheameContextProvider = ({children})=>{
    let defaultTheame = JSON.parse(localStorage.getItem('theame')) || TheameOption[0].value
    const [theame, setTheame] = useState(defaultTheame);

    const values = {
        theame,
        setTheame,
    }
    return(

        <TheamContext.Provider value={values}>{children}</TheamContext.Provider>
    )
}

export const useTheame = ()=> useContext(TheamContext);