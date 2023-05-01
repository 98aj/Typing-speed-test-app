import React, { useState } from "react";
import Select from "react-select";
import { TheameOption } from "../Utils/TheamOption";
import { useTheame } from "../Context/TheamContext";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Link } from "react-router-dom";

export default function Footer() {
  const { setTheame, theame } = useTheame();



  const customStyles = {
    option: (provided) => ({
      ...provided,
      backgroundColor: theame.background,
      //color: theame.textBoxColor
    }),
    control: (provided, state) => ({
      ...provided,

      backgroundColor: theame.background,
      //color: theame.textBoxColor
      color: state.isSelected ? theame.textBoxColor : theame.textColor,
    }),
  };

  const handleChange = (e) => {
    setTheame(e.value);
    localStorage.setItem('theame', JSON.stringify(e.value));
  };
  return (
    <div className="footer">
      <div className="link">
        <Link to="https://www.linkedin.com/in/abhishek-junagade-728340244/">
          <LinkedInIcon className="linkedin"/>
        </Link>
        <Link to='https://github.com/98aj?tab=repositories'>
          <GitHubIcon className="git"/>
        </Link>
      </div>
      <div className="selectButton">
        <Select
          className="select"
          onChange={handleChange}
          options={TheameOption}
          menuPlacement="top"
          //styles={customStyles}
          styles={{
            control : styles => ({...styles, backgroundColor: theame.background}),

            menu : styles => ({...styles, backgroundColor: theame.background}),

            option: (provided, {isFocused}) => ({
              ...provided,
              backgroundColor: (!isFocused) ? theame.background : theame.textColor,
              color: (!isFocused) ? theame.textColor : theame.background
            })

          }}
        />
      </div>
    </div>
  );
}
