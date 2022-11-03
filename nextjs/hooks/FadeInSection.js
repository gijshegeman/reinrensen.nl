import React, {useState, useRef, useEffect} from 'react';
import { motion, AnimatePresence, transform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const FadeInSection = ({ children }) => {
  const domRef = useRef();
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      // In your case there's only one element to observe:     
      if (entries[0].isIntersecting) {
      
        // Not possible to set it back to false like this:
        setVisible(true);
        
        // No need to keep observing:
        observer.unobserve(domRef.current);
      }
    });
    
    observer.observe(domRef.current);
    
    return () => observer.unobserve(domRef.current);
  }, []);

  var random_number = Math.random() * 0.2;

  return (
      <motion.section
        ref={ domRef } 
        initial={{ opacity: 0, y: 15 }}
        animate={isVisible ? {
          opacity: 1,
          y:0,
          transition: { 
            duration: 0.4,
            type: 'tween',
            delay: random_number,
          }
        }: ''}
      >
        { children }     
      </motion.section>
    );
};

export default FadeInSection