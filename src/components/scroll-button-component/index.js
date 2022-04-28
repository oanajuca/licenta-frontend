import React, { useState, useEffect } from 'react';
import './style.css';
import { Top } from './icons';
import Button from '../button-component';

function ScrollButton() {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',

    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisible);
    return () => {
      window.removeEventListener('scroll', toggleVisible);
    };
  }, []);

  return (
    <div>
      {visible && (
      <div className="scroll_on_top">
        <Button className="scroll_button" type="button" handleClick={scrollToTop}>

          <i className="scroll_arrow">
            {Top}
          </i>
        </Button>
      </div>
      )}
    </div>
  );
}

export default ScrollButton;
