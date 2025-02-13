import { useState, useRef } from 'react';
import { FaLocationDot } from "react-icons/fa6";
import { PiGearFill } from "react-icons/pi";
import { Data } from './types/data';

import './assets/styles/toprow.scss';
import OverlayNav from './OverlayNav';
import OverlayPanel from './OverlayPanel';

type TopRowProps = {
    screenSize: string;
    onContentChoose: (content: Data) => void;
}

function TopRow({ screenSize, onContentChoose }: TopRowProps) {

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    const [overlayNavVisible, setOverlayNavVisible] = useState(false);
    const [overlayPanelVisible, setOverlayPanelVisible] = useState(false);

    const openNavOverlay = () => setOverlayNavVisible(true), openPanelOverlay = () => setOverlayPanelVisible(true);
    const closeNavOverlay = () => setOverlayNavVisible(false), closePanelOverlay = () => setOverlayPanelVisible(false);

    const handleContentSelect = (content: Data | null) => {
        if (content) onContentChoose(content);
        closeNavOverlay();
        console.log(content)
    };

    const toggleTrack = () => {
        if (audioRef.current) {
            audioRef.current.volume = 0.5;
            if (isPlaying) {
                // Pause the audio if it is currently playing
                audioRef.current.pause();
            } else {
                // Play the audio if it is currently paused
                audioRef.current.play();
            }

            setIsPlaying(!isPlaying);
        };

    }


    return (
        <div className={`row__top ${screenSize}`}>

            {/*  if screenSize !== small  */}
            {['large', 'medium'].includes(screenSize) ? (
                <>
                    <div className="top__row--sound">
                        <button className={`sound-btn ${isPlaying ? 'paused' : ''}`} onClick={toggleTrack}>
                            {/* live sound btn */}
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                    {/* audio element */}
                    <audio ref={audioRef} src={new URL('/audio/ambient.mp3', import.meta.url).href} />
                </>
            ) : (
                <>
                    {/* /* else use content for small screens  */}
                    < div className="top__row--sound">
                        <button className='option-btn' onClick={openPanelOverlay}>
                            <PiGearFill />
                        </button>
                    </div>

                    {overlayPanelVisible && (
                        <OverlayPanel
                            // simple overlay
                            onClose={closePanelOverlay}
                        />
                    )}
                </>

            )
            }


            <div className="top__row--nav">
                {/* overlay navigation btn */}
                <button className='nav-btn' onClick={openNavOverlay}>
                    <FaLocationDot />
                </button>
            </div>

            {overlayNavVisible && (
                <OverlayNav
                    // onClose={(content) => {
                    //     if (content) onContentChoose(content);
                    //     closeOverlay();
                    // }}
                    onClose={handleContentSelect}
                    screenSize={screenSize}
                />
            )}

        </div >
    );
}

export default TopRow
