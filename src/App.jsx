import React, { useRef, useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useSwipeable } from 'react-swipeable';
import Root from './components/Root';
import ChatBox from './components/community/ChatBox';

const App = () => {
  const [overlayOffset, setOverlayOffset] = useState(100);
  const [transition, setTransition] = useState('transform 0.3s ease');
  const mainRef = useRef(null);

  useEffect(() => {
    // Set --vh dynamically
    const setVh = () => {
      const vh = window.visualViewport ? window.visualViewport.height : window.innerHeight;
      document.documentElement.style.setProperty('--vh', `${vh * 0.01}px`);
    };

    setVh();
    window.addEventListener('resize', setVh);

    return () => window.removeEventListener('resize', setVh);
  }, []);

  const handlers = useSwipeable({
    onSwiping: (eventData) => {
      if(overlayOffset === 0)return;
      if (eventData.dir !== 'Left') return;
      const newOffset = Math.max(0, Math.min(100, 100 - (eventData.absX / window.innerWidth) * 100));
      setTransition('none');
      setOverlayOffset(newOffset);
    },
    onSwipedLeft: () => {
      setTransition('transform 0.3s ease');
      setOverlayOffset(overlayOffset < 50 ? 0 : 100);
    },
    onSwipedRight: () => {
      setTransition('transform 0.3s ease');
    },
    trackMouse: false,
    preventScrollOnSwipe: true,
  });

  const resetOverlay = () => {
    setTransition('transform 0.3s ease');
    setOverlayOffset(100);
  };

  return (
    <Container
      fluid
      ref={mainRef}
      {...handlers}
      style={{
        position: 'relative',
        width: '100vw',
        height: 'calc(var(--vh) * 100)',
        overflow: 'hidden',
        margin: 0,
        padding: 0,
      }}
    >
      {/* Main Content */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
          zIndex: 1,
          opacity: overlayOffset / 100,
          transform: `translateX(-${(100 - overlayOffset) / 2}%)`,
        }}
      >
        <Root />
      </div>
      {/* Overlay */}
      <div
        style={{
          position: 'fixed', // Ensure it doesn't interfere with layout
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          color: 'white',
          backgroundColor: 'rgba(0, 0, 0, 0.8)', // Ensure visibility
          transition: transition,
          zIndex: 2,
          transform: `translateX(${overlayOffset}%)`,
          touchAction: 'none',
          userSelect: 'none',
          pointerEvents: overlayOffset === 100 ? 'none' : 'auto', // Disable when offscreen
          visibility: overlayOffset === 100 ? 'hidden' : 'visible',
        }}
      >
        <ChatBox resetOverlay={resetOverlay} isMobile />
      </div>
    </Container>
  );
};

export default App;
