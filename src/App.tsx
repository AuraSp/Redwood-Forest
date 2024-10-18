import React, { useEffect, useState } from 'react';
import TopRow from "./TopRow";
import MiddleRow from "./MiddleRow";
import BottomRow from "./BottomRow";

function App() {

  const [screenSize, setScreenSize] = useState<string>('');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScreenSize('small');
      } else if (width >= 768 && width <= 1200) {
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

  useEffect(() => {
    const root = document.getElementById('root');
    if (root) {
      root.className = screenSize; // Set the class based on screenSize
    }
  }, [screenSize]);

  return (
    <>

      {/* TOP CHILD ROW */}
      <TopRow screenSize={screenSize} />

      {/* MIDDLE CHILD ROW */}
      <MiddleRow screenSize={screenSize} />

      {/* BOTTOM CHILD ROW */}
      <BottomRow />
    </>
  )
}

export default App
