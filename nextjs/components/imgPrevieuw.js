import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'

const BackDrop = ({ setImgPrevieuwActive }) => {
    return (<>
        <div
            onClick={() => setImgPrevieuwActive(false)}
            className='absolute top-0 left-0 w-full h-[100vh] bg-neutral-900/[90%]'
        >
        </div>
    </>)
}
export default function ImgPrevieuw({
    imgPrevieuwActive, setImgPrevieuwActive,
    selectedArt,
    prevButton,
    nextButton,
    arts
}) {
    const { id, title, src, x, y } = selectedArt || arts[0]

    const variants = {
        hidden: {
            opacity: 0,
            scale: .9
        },
        enter: {
            opacity: 1,
            scale: 1,
            transition: {
                delay: .4,
                duration: .4
            }
        },
        exit: {
            opacity: 0,
            scale: .9,
            transition: {
                duration: .4
            }
        }
    }

    return (<>
        <AnimatePresence
            mode='wait'
        >
            {imgPrevieuwActive && (
                <motion.div
                    key='modal1'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: .4, delay: .5 } }}
                    transition={{
                        duration: .3,
                        ease: "easeIn"
                    }}
                    className={imgPrevieuwActive
                        ? "fixed top-0 left-0 flex flex-col w-full min-h-screen justify-center items-center z-20"
                        : "hidden"
                    }
                >
                    <BackDrop setImgPrevieuwActive={setImgPrevieuwActive} />
                    <motion.div
                        key='id'
                        variants={variants}
                        initial="hidden"
                        animate="enter"
                        exit="exit"
                        transition={{
                            ease: "easeInOut"
                        }}
                        className='flex flex-col gap-2 justify-center items-center tracking-wider
                                    px-[20px]
                                    max-w-[70vh]
                                    sm:max-w-[70vh]
                                    text-zinc-300 text-xs
                                    z-30
                                    '
                    >
                        <div className='flex flex-col gap-2'>
                            <div className='self-end hover:text-zinc-100 animate ease-out duration-300 ' onClick={() => setImgPrevieuwActive(false)}>&#x2715;</div>
                            <div className='drop-shadow-2xl'>
                                <Image
                                    src={src}
                                    alt={title}
                                    width={x}
                                    height={y}
                                />
                            </div>


                            <div className='self-start font-bold '>{title}</div>
                            <div className='self-end w-full flex gap-2 justify-between flex-none'>
                                <div className='flex gap-2'>
                                    <div onClick={() => prevButton(id)} className='hover:text-zinc-100 animate ease-out duration-300'>&#x2190; prev</div>
                                    <div>|</div>
                                    <div onClick={() => nextButton(id)} className='hover:text-zinc-100 animate ease-out duration-300 '>next &#x2192;</div>
                                </div>
                            </div>

                        </div>
                    </motion.div>
                </motion.div>
            )
            }
        </AnimatePresence >
    </>)
}