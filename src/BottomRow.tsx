import { CgMouse, CgScrollV } from "react-icons/cg";
import './assets/styles/bottomrow.scss';
import { useRef } from "react";
import { type BottomRowProps } from './type/types';
import { motion, useScroll, useTransform } from 'framer-motion';

function BottomRow({ screenSize, chosenContent }: BottomRowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: ref });

  const translateY = useTransform(
    scrollYProgress,
    [0, 1],
    screenSize === 'small' ? ['0%', '150%'] : ['0%', '160%']
  );
  const opacity = useTransform(scrollYProgress, [0, 1], [0.5, 0.2]);

  return (
    <div className={`row__bottom ${screenSize}`}>

      <div className="bottom__row--description" ref={ref}>
        <motion.div
          className='svgbox'
          style={{
            translateY,
            opacity
          }}
        >
          {!["medium", "small"].includes(screenSize) ? <CgMouse /> : <CgScrollV />}
        </motion.div>
        <div className='description-top'>
          <span>Lorem ipsum</span>
          <p >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
        </div>
        <div className='description-bottom'>
          <img src={chosenContent.descriptionImg} alt="" />
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
        </div>
      </div>


      <iframe width='280' height='140' src="https://www.youtube.com/embed/IyZcSwbCTuI?si=MAmKkaKKdx3lKzsh&amp;controls=0&amp;rel=0&amp;"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen>
        {/* absolute video iframe */}
      </iframe>
      {/* controls=0 */}

    </div>
  )
}

export default BottomRow
