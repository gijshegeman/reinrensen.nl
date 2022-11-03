import data from '../data/data.json';
import { motion } from 'framer-motion'

const variants = {
  hidden: {
    opacity: 0
  },
  enter: { 
    opacity: 1, 
    x: 0, 
    y: 0,
    transition: {
      type: 'tween',
    },
  },
  exit: { 
    opacity: 0, 
    x: 0, 
    y: 0,
    transition: {
      type: 'tween',
    }, 
  },
}

function Post({ project }) {
  return (
    <motion.div
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{ type: 'linear' }} // Set the transition to linear
    >
      <div className="canvas">

        {project.images.map( img => (
          <div 
            key={img.id}
            className="projectPost"
          >
              <img 
                src={img.src}
                alt={img.alt}
              />
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export async function getStaticProps({ params }) {
  const filteredProjectData = data.projects.filter(( project ) => project.projectId === params.projectId)
  const project = filteredProjectData[0]
  
  return { 
    props: {
      project,
    },
  }
}

export async function getStaticPaths() {
  const paths = data.projects.map((a) => ({
    params: { projectId: a.projectId },
  }))

  return { paths, fallback: false }
}

export default Post