import React from 'react'


interface MiddleRowProps{
  screenSize: string;
}


function MiddleRow({ screenSize }: MiddleRowProps) {
  return (
    <div className={`row__middle ${screenSize}`}>

      <div className="middle__row--loader">
        <div className="loader-line">
        </div>
        <span>
          {/* loader indicators */}
        </span>
      </div>
      <div className="middle__row--title">
        <span className="title title-top"></span>
        <span className="title title-bottom"></span>
      </div>
      <div className="middle__row--social-links">
        {/* 3x icons */}
      </div>

    </div>
  )
}

export default MiddleRow
