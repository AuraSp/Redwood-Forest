import { useEffect, useState } from 'react';
import TopRow from "./TopRow";
import MiddleRow from "./MiddleRow";
import BottomRow from "./BottomRow";
import { contentData } from "./data/data";
import { Data } from './types/data';
// define the union type for screen sizes
type ScreenSize = 'small' | 'medium' | 'large';

function App() {
  const [screenSize, setScreenSize] = useState<ScreenSize>('small');
  const [chosenContent, setChosenContent] = useState<Data>(contentData[0]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 856) {
        setScreenSize('small');
      } else if (width >= 856 && width <= 1200) {
        setScreenSize('medium');
      } else {
        setScreenSize('large');
      }
    };

    handleResize(); // Initial check

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleContentChoose = (content: Data | undefined) => {
    if (content) {
      setChosenContent(content);
      console.log(content)
    }
  };

  console.log(chosenContent.bgImg)
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

  // const [progress, setProgress] = useState(0);
  // useEffect(() => {
  //   let w = 0;
  //   const interval = setInterval(() => {
  //     if (w < 100) {
  //       w += 1; // Increment progress
  //       setProgress(w);
  //     } else {
  //       clearInterval(interval); // Clear the interval once complete
  //     }
  //   }, 20);

  //   return () => clearInterval(interval); // Cleanup on unmount
  // }, []);

  return (
    <>
      {/* <div className='loader-box'>
        <span id='loader'>{progress}%</span>
      </div> */}


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
