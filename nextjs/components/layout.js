
import { motion } from 'framer-motion'
import Footer from '../components/footer'

const variants = {
    hidden: { opacity: 0, },
    enter: { opacity: 1, y: 0 },
    exit: { opacity: 0, },
}

export default function Layout({ children }) {
    return (
        <div>
            <motion.main
                variants={variants}
                initial="hidden"
                animate="enter"
                exit="exit"
                transition={{ type: 'linear' }}
            >
                <div className='
                    px-[20px]
                    flex flex-col 
                    w-screen
                    min-h-screen
                '>
                    <div>{children}</div>
                    <div className='flex-none w-full mt-auto self-end'><Footer /></div>
                    
                </div>
            </motion.main>
        </div>
    )
}