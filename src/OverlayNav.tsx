import { useEffect, useRef, useState } from 'react';
import { contentData } from './data/data';
import { FaLocationDot } from "react-icons/fa6";
import { Data } from './types/data';
import Map from '/images/map/map.svg?raw'

import './assets/styles/overlays.scss';

type OverlayNavProps = {
    onClose: (content?: Data) => void;
    screenSize: string;
}

function OverlayNav({ onClose, screenSize }: OverlayNavProps) {
    const svgContainerRef = useRef<HTMLDivElement | null>(null);
    const [hoveredContent, setHoveredContent] = useState<Data | null>(null);

    useEffect(() => {
        const processSvg = () => {
            try {
                // Parse the raw SVG content
                const parser = new DOMParser();
                const svgDocument = parser.parseFromString(Map, "image/svg+xml");
                const svgElement = svgDocument.querySelector("svg");

                if (!svgElement || !svgContainerRef.current) return;

                // Append SVG to the container
                svgContainerRef.current.innerHTML = ""; // Clear previous content
                svgContainerRef.current.appendChild(svgElement);

                const svgRect = svgElement.getBoundingClientRect();
                const svgCTM = svgElement.getScreenCTM();

                if (!svgCTM) {
                    console.error('Failed to get the coordinate transform matrix (CTM).');
                    return;
                }
                // Find paths with IDs and add markers
                const pathsWithIds = svgElement.querySelectorAll("path[id]");

                pathsWithIds.forEach((path) => {
                    const pathId = (path as SVGPathElement).getAttribute("id");
                    if (!pathId) return;

                    const bbox = (path as SVGPathElement).getBBox();

                    // Calculate center for marker placement
                    const centerX = bbox.x + bbox.width / 2;
                    const centerY = bbox.y + bbox.height / 2;

                    const point = svgElement.createSVGPoint();
                    point.x = centerX;
                    point.y = centerY;
                    const transformedPoint = point.matrixTransform(svgCTM);

                    const marker = document.createElement("div");
                    marker.className = 'marker';
                    marker.style.left = `${transformedPoint.x - svgRect.left}px`;
                    marker.style.top = `${transformedPoint.y - svgRect.top - 10}px`;;
                    // Append marker to the container
                    svgContainerRef.current!.appendChild(marker);

                    marker.addEventListener("mouseenter", () => {
                        // Find the corresponding content for this marker (using pathId or any identifier)
                        const content = contentData.find((item) => String(item.title) === pathId);
                        if (content) {
                            setHoveredContent(content); // Update the hovered content
                        }

                    });

                    // Reset hover when leaving marker
                    marker.addEventListener("mouseleave", () => {
                        setHoveredContent(null); // Clear hovered content
                    });

                    // Add click event listener to select the content
                    marker.addEventListener("click", () => {
                        const content = contentData.find((item) => String(item.title) === pathId);
                        if (content) {
                            onClose(content); // Trigger content selection on click
                        }
                    });
                });
            } catch (error) {
                console.error("Error processing SVG:", error);
            }
        };

        processSvg();
    }, []);

    return (
        <div className={`overlay ${screenSize}`}>
            <div className='button'>
                <button onClick={() => onClose(hoveredContent ? hoveredContent : contentData[0])}>
                    &#x2715;
                </button>
            </div>

            <div className='overlay__left-side'>
                <span className='prompt'>Choose location</span>

                <div className='map-description'>
                    <div>
                        {hoveredContent ? (
                            hoveredContent.title.toLowerCase().startsWith("mount")
                                ? hoveredContent.title.replace("mount", "mountain")  // Modifying title if it starts with "mount"
                                : hoveredContent.title
                        ) : "Fog Belt"}  {/* Default title */}
                    </div>
                    <div><FaLocationDot /><span>{hoveredContent?.coordinates || contentData[0].coordinates}</span></div>
                    <p>{hoveredContent?.description || contentData[0].description}</p>
                </div>
            </div>


            <div className="overlay__right-side">
                <div className='ref-svg' ref={svgContainerRef} />

                <div className='button-nav'>
                    {contentData.map(item => (
                        <button key={item.id}
                            style={{ backgroundImage: `url(${item.bgImg})` }}
                            onClick={() => setHoveredContent(item)}  // Click to close on selection
                            // onMouseEnter={() => setHoveredContent(item)}  // Update hovered content
                            // onMouseLeave={() => setHoveredContent(null)}  // Clear hovered content on mouse leave
                            className={hoveredContent?.id === item.id ? 'hovered' : ''}
                        >
                        </button>
                    ))}
                </div>

            </div>

        </div >
    )
}

export default OverlayNav
