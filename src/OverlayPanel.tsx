import './assets/styles/overlays.scss';
import { FaTwitter, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { SiVitest, SiTypescript, SiPnpm, SiThreedotjs, SiSass, SiReact } from "react-icons/si";
import { OverlayPanelProps } from './types/types';

function OverlayPanel({ onClose }: OverlayPanelProps) {
    return (
        <div className="overlay panel">
            <div className="header">
                <span className='h22'>- Redwood Forest</span>
                <div className='button'>
                    <button onClick={() => onClose()}>&#x2715;</button>
                </div>
            </div>
            <div className="panel__content">
                <div className="panel__content--about child">
                    <span className="heading">About this project</span>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis voluptatum fugiat, officiis id nihil amet praesentium ipsa earum debitis veritatis natus ad mini.
                        <br /><br />
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate temporibus, quas esse,
                        omnis harum expedita eveniet facere perferendis corrupti consectetur, facilis iste repellendus enim odio beatae? Vel, quasi? Et, ipsa.
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    </p>
                    <h3>Share</h3>
                    <div>
                        <FaLinkedin role="button" onClick={() => window.open("https://www.linkedin.com/sharing/share-offsite/?url=https://example.com", "_blank")} />

                        <FaTwitter role="button" onClick={() => window.open("https://twitter.com/intent/tweet?text=Check this out: https://example.com", "_blank")} />

                        <FaEnvelope role="button" onClick={() => window.location.href = "mailto:someone@example.com?subject=Hello&body=Check this out!"} />

                    </div>
                </div>
                <div className="panel__content--credit child">
                    <div className="tools">
                        <span className="heading">Tech & Workflow</span>
                        <SiReact data-icon="SiReact" />
                        <SiVitest data-icon="SiVitest" />
                        <SiTypescript data-icon="SiTypescript" />
                        <SiPnpm data-icon="SiPnpm" />
                        <SiThreedotjs data-icon="SiThreedotjs" />
                        <SiSass data-icon="SiSass" />
                    </div>
                    <div className="inspiration">
                        <iframe width='280' height='140' src="https://www.youtube.com/embed/IyZcSwbCTuI?si=MAmKkaKKdx3lKzsh&amp;controls=0&amp;rel=0&amp;"
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen>
                            {/* absolute video iframe */}
                        </iframe>
                        {/* controls=0 */}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default OverlayPanel
