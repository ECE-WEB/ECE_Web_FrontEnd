// Overlay.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';

const Overlay = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const overlayRef = useRef(null);
  const hiddenOffset = 90;
  const openOffset = 0;   
  const threshold = 80;
  const initialOffset = location.pathname === '/overlay' ? openOffset : hiddenOffset;
  const [offset, setOffset] = useState(initialOffset);

  useEffect(() => {
    if (location.pathname === '/overlay') {
      setOffset(openOffset);
      if (overlayRef.current) {
        overlayRef.current.style.transition = 'transform 300ms ease';
        overlayRef.current.style.transform = `translateX(${openOffset}%)`;
      }
    } else {
      setOffset(hiddenOffset);
      if (overlayRef.current) {
        overlayRef.current.style.transition = 'transform 300ms ease';
        overlayRef.current.style.transform = `translateX(${hiddenOffset}%)`;
      }
    }
  }, [location.pathname]);

  useEffect(() => {
    const overlayElem = overlayRef.current;
    if (!overlayElem) return;
    let initialTouchX = 0;
    let isDragging = false;
    const handleTouchStart = (e) => {
      isDragging = true;
      initialTouchX = e.touches[0].clientX;
      overlayElem.style.transition = 'none';
    };
    const handleTouchMove = (e) => {
      if (!isDragging) return;
      const currentTouchX = e.touches[0].clientX;
      const deltaX = currentTouchX - initialTouchX;
      console.log(deltaX)
      // Use hiddenOffset as the scaling factor so that a full-width drag (-window.innerWidth) moves
      // the overlay from 90% (hidden) to 0% (open).
      let newOffset = hiddenOffset * (1 + deltaX / window.innerWidth);
      newOffset = Math.min(hiddenOffset, Math.max(openOffset, newOffset));
      setOffset(newOffset);
      overlayElem.style.transform = `translateX(${newOffset}%)`;
    };
    const handleTouchEnd = () => {
      if (!isDragging) return;
      isDragging = false;
      overlayElem.style.transition = 'transform 300ms ease';
      if (offset < threshold) {
        overlayElem.style.transform = `translateX(${openOffset}%)`;
        setOffset(openOffset);
        navigate('/overlay');
      } else {
        overlayElem.style.transform = `translateX(${hiddenOffset}%)`;
        setOffset(hiddenOffset);
        navigate('/uploadAttandance'); // Change this route as needed.
      }
    };
    overlayElem.addEventListener('touchstart', handleTouchStart);
    overlayElem.addEventListener('touchmove', handleTouchMove);
    overlayElem.addEventListener('touchend', handleTouchEnd);
    overlayElem.addEventListener('touchcancel', handleTouchEnd);
    return () => {
      overlayElem.removeEventListener('touchstart', handleTouchStart);
      overlayElem.removeEventListener('touchmove', handleTouchMove);
      overlayElem.removeEventListener('touchend', handleTouchEnd);
      overlayElem.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, [offset, navigate]);
  return createPortal(
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0, 0, 0, 0.7)',
        transform: `translateX(${offset}%)`,
        transition: 'transform 300ms ease',
        touchAction: 'none', 
        zIndex: 1000,
      }}
    />,
    document.getElementById('overlay-root')
  );
};

export default Overlay;
