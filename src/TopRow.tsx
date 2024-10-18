import React from 'react';
import { FaLocationDot } from "react-icons/fa6";

import './assets/styles/toprow.scss';

interface TopRowProps {
    screenSize: string;
}

function TopRow({ screenSize }: TopRowProps) {
    return (
        <div className={`row__top ${screenSize}`}>

            <div className="top__row--sound">
                <button className='sound-btn'>
                    {/* live sound btn */}
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>

            <div className="top__row--nav">
                {/* overlay navigation btn */}
                <button className='nav-btn'>
                    <FaLocationDot />
                </button>
            </div>

        </div>
    )
}

export default TopRow
