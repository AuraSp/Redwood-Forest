import { useEffect, useRef, useState } from 'react';
import { contentData } from './data/data';
import { FaLocationDot } from "react-icons/fa6";
import { Data, type OverlayNavProps } from './type/types';
import Map from '/images/map/nav.svg?raw'

import './assets/styles/overlays.scss';


function OverlayNav({ onClose, screenSize }: OverlayNavProps) {
    const svgContainerRef = useRef<HTMLDivElement | null>(null);
    const [activeContent, setActiveContent] = useState<Data | null>(null);

    const handleSelect = (data: Data) => {
        setActiveContent(data);
        if (screenSize === "large") {
            onClose(data);
        }
    }

    const handleClose = () => {
        onClose(activeContent); 
    };


    useEffect(() => {

        try {
            const parser = new DOMParser();
            const svgDocument = parser.parseFromString(Map, "image/svg+xml");
            const svgElement = svgDocument.querySelector("svg");

            if (!svgElement || !svgContainerRef.current) return;

            svgContainerRef.current.innerHTML = "";
            svgContainerRef.current.appendChild(svgElement);
        } catch (error) {
            console.error("Error processing SVG:", error);
        }

    }, [activeContent]);

    return (
        <div className={`overlay ${screenSize}`}>
            <div className="header">
                <span className="h22-l">- Choose location</span>
                <div className="button">
                    <button onClick={handleClose}>&#x2715;</button>
                </div>
            </div>

            <div className="selection__container">
                <div className="selection__container--list">
                    {contentData.map((data) => (
                        <div
                            key={data.id}
                            className="card"
                            tabIndex={0}
                            data-title={data.title}
                            onClick={() => handleSelect(data)}
                        >
                            <div className="card--front" >
                                <img src={data.bgImg} alt="image" loading="lazy"/>
                                {!["medium", "small"].includes(screenSize) && (
                                    <>
                                        <div>{data.title}</div>
                                        <div>
                                            <FaLocationDot /> {data.coordinates}
                                        </div>
                                    </>
                                )}
                            </div>
                            {!["medium", "small"].includes(screenSize) && (
                                <div className="card--back">
                                    <p>{data.description}</p>
                                </div>
                            )}
                        </div>
                    ))}

                    {["medium", "small"].includes(screenSize) && (
                        <div className="card--back-mq">
                            <h1>{activeContent?.title.replace(/^mount/i, "mountain")}</h1>
                            <span>{activeContent && <FaLocationDot />} {activeContent?.coordinates}</span>
                            <p>{activeContent?.description}</p>
                        </div>
                    )}
                </div>

                <div className="selection__container--map" ref={svgContainerRef}></div>
            </div>
        </div>
    );
}

export default OverlayNav
