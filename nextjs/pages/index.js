
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import data from '../data/data.json';
import FadeInSection from '../hooks/FadeInSection';

const variants = {
  hidden: {    
    opacity:0
  },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { 
    transition: {
      type: 'tween',
    },
    opacity: 0, 
    x: 0, 
    y:0,
    transition: {
      type: 'tween',
    }
  }
}

function Home({ homePageImages }) {
  const imagesCol1 = homePageImages.filter((e, a) => a % 3 === 0)
  const imagesCol2 = homePageImages.filter((e, a) => a % 3 === 1)
  const imagesCol3 = homePageImages.filter((e, a) => a % 3 === 2)
  
  return (
    <div>
    <Head>
        <title>Gijs Hegeman</title>
        <meta name="description" content="Portfolio of Gijs Hegeman" />
    </Head>
        
    <motion.div
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ type: 'linear' }} // Set the transition to linear
    >
        <div className="canvas">
        <div className="row">
          <div className="col">
            {imagesCol1
              .map((img) => (
                <div key={img.id} className="post">
                  <FadeInSection>
                      <Link key ={img.id} href={`/${img.project}`} scroll={false}>
                        <a>
                          <img
                            src={img.src} 
                            alt={img.alt}
                          />
                        </a>
                      </Link>
                  </FadeInSection>
                </div>
            ))}
          </div>

          <div className="col">
            {imagesCol2
              .map((img) => (
                <div key={img.id} className="post">
                  <FadeInSection>
                      <Link key ={img.id} href={`/${img.project}`} scroll={false}>
                        <a>
                          <img
                            src={img.src} 
                            alt={img.alt}
                          />
                        </a>
                      </Link>
                  </FadeInSection>
                </div>
            ))}
          </div>

          <div className="col">
            {imagesCol3
              .map((img) => (
                <div key={img.id} className="post">
                  <FadeInSection>
                      <Link key ={img.id} href={`/${img.project}`} scroll={false}>
                        <a>
                          <img
                            src={img.src} 
                            alt={img.alt}
                          />
                        </a>
                      </Link>
                  </FadeInSection>
                </div>
            ))}
          </div>
          
        </div>     
      </div>
    </motion.div>
    </div>
    )
}

export async function getStaticProps(context) {  
    const images = 
    [...new
        Set([].concat(...data.projects.map( project => project.images)))
    ];
    images.forEach((o, i) => o.id = i + 1);
    const homePageImages = images.filter((a) => a.onHomePage === true)
    
    return {
      props: {
        homePageImages,
      },
    }
}

export default Home
