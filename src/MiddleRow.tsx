import React from 'react';
import { Data } from './types/data';
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

import './assets/styles/middlerow.scss';


type MiddleRowProps = {
  screenSize: string;
  chosenContent: Data;
}


function MiddleRow({ screenSize, chosenContent }: MiddleRowProps) {

  return (
    <div className={`row__middle ${screenSize}`}>

      <div className="middle__row--loader" data-title={chosenContent.title}>
        <div className="loader-line">
        </div>
        <span>
          {/* loader indicators */}
          {String(chosenContent.id).padStart(2, '0')}
        </span>
      </div>
      <div className="middle__row--title" data-title={chosenContent.title}>
        {/* <span className="title title-top">fog</span>
        <span className="title title-bottom">belt</span> */}
        {chosenContent.title.split(' ').map((word, index) => (
          <span key={index} className={`title title-${index === 0 ? 'top' : 'bottom'}`}>
            {word}
          </span>
        ))}
      </div>
      <div className="middle__row--social-links" data-title={chosenContent.title}>
        {/* 3x icons */}
        <FaLinkedin />
        <FaGithub />
        <FaEnvelope />
      </div>

    </div>
  )
}

export default MiddleRow
