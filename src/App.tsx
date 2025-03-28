import { useEffect, useState } from 'react';

import { contentData } from "./data/data";
import { ScreenSize, Data } from './type/types';

import TopRow from "./TopRow";
import MiddleRow from "./MiddleRow";
import BottomRow from "./BottomRow";
import Fog from "./Fog";


function App() {
  const [screenSize, setScreenSize] = useState<ScreenSize>('small');
  const [chosenContent, setChosenContent] = useState<Data>(contentData[0]);
  const [progress, setProgress] = useState<number>(0);


  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenSize(width < 856 ? 'small' : width <= 1200 ? 'medium' : 'large');
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const handleContentChoose = (content: Data | undefined) => {
    if (content && content !== chosenContent) {
      setChosenContent(content);
    } else {
      console.error('No content selected');
    }
  };


  useEffect(() => {
    const root = document.getElementById('root');
    const body = document.body;
    if (root && body) {
      root.className = screenSize;
      body.className = screenSize;

      body.style.setProperty('--body-bg-image', `url(${chosenContent.bgImg})`);
      root.style.setProperty('--root-bg-image', `url(${chosenContent.bgImg})`);
      root.setAttribute('root-bg-position', `${chosenContent.title}`);
    }
  }, [screenSize, chosenContent]);


  return (
    <>

      {/* PRELOADER FOR CANVAS */}
      <div className='preloader'
        style={{
          background: `rgba(37, 37, 37, ${(100 - progress) / 100})`,
          "--opacity": progress === 100 ? 0 : 1,
        } as React.CSSProperties}>
        <div className="line" style={{
          "--height": `${progress}%`,
        } as React.CSSProperties}></div>
        <span>{progress}%</span>
      </div >

      {/* FOG CHILD ROW */}
      <Fog setProgress={setProgress} progress={progress} />

      {/* TOP CHILD ROW */}
      <TopRow onContentChoose={handleContentChoose} screenSize={screenSize} />

      {/* MIDDLE CHILD ROW */}
      <MiddleRow chosenContent={chosenContent} screenSize={screenSize} />

      {/* BOTTOM CHILD ROW  */}
      <BottomRow chosenContent={chosenContent} screenSize={screenSize} />

    </>
  )
}

export default App
