import Image from 'next/future/image'
import { useEffect, useState } from 'react'
import { AnimatePresence, useAnimation, motion } from "framer-motion"
import { useInView } from "react-intersection-observer"


function Art({ art, index, handleClick }) {
    var ranNum = Math.random() * 0.8

    const controls = useAnimation()
    const [ref, inView] = useInView('')
    const [imgLoaded, setImgLoaded] = useState(false)

    const handleLoad = () => {
        // your image is ready
        setImgLoaded(true)
    }

    useEffect(() => {
        if (inView && imgLoaded) {
            controls.start("visible");
        }
    }, [controls, inView, imgLoaded]);

    const squareVariants = {
        hidden: {
            opacity: 0,
            // y: 10,
            scale: .9
        },
        visible: {
            // y: 0,
            scale: 1,
            opacity: 1,
            transition: {
                duration: 0.4,
                type: 'easeInOut',
                delay: ranNum,
            }
        },
    }


    return (
        <AnimatePresence
            mode='wait'
        >
            <motion.div
                ref={ref}
                animate={controls}
                initial="hidden"
                variants={squareVariants}
                key={index}
                onClick={() => handleClick(art)}
            >
                <div className='flex flex-col gap-3'>
                    <Image
                        onLoadingComplete={handleLoad}
                        src={art.src}
                        height={art.y}
                        width={art.x}
                        alt={art.title}
                        priority={true}
                        className='shadow-md'
                    />

                    <div className="flex flex-col gap-1 text-sm md:hidden">
                        <p className="font-bold text-sm">{art.title}</p>
                        <div className="flex gap-2 md:text-sm md:hidden">
                            {art.sizeCM && (<div>{art.sizeCM}</div>)}
                            {art.sizeCM && art.typeArt && (<div>|</div>)}
                            {art.typeArt && (<div>{art.typeArt}</div>)}
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence >
    )
}

export default function ArtCollection({ arts, handleClick }) {
    const ascendingSortedArts = [...arts].sort((a, b) => b.volgorde - a.volgorde)



    return (<>
        <motion.div>
            {/* Large */}
            <div className='hidden md:block md:mx-[10vw] lg:mx-[15vw] xl:mx-[20vw] 2xl:mx-[25vw]'>
                <div className='grid grid-cols-3 gap-[30px]'>
                    <div className='flex flex-col gap-[30px]'>
                        {ascendingSortedArts
                            .filter((e, a) => a % 3 === 0)
                            .map((art, index) =>
                                <div className="relative" key={index}>
                                    <Art art={art} index={index} handleClick={handleClick} />
                                </div>

                            )}
                    </div>

                    <div className='flex flex-col gap-[30px]'>
                        {ascendingSortedArts
                            .filter((e, a) => a % 3 === 1)
                            .map((art, index) =>
                                <div className="relative" key={index}>
                                    <Art art={art} index={index} handleClick={handleClick} />
                                </div>

                            )}
                    </div>

                    <div className='flex flex-col gap-[30px]'>
                        {ascendingSortedArts
                            .filter((e, a) => a % 3 === 2)
                            .map((art, index) =>
                                <div className="relative" key={index}>
                                    <Art art={art} index={index} handleClick={handleClick} />
                                </div>

                            )}
                    </div>
                </div>
            </div>

            {/* Mobile */}
            <div className='block md:hidden'>
                <div className="flex flex-col gap-5">
                    {ascendingSortedArts.map((art, index) => (
                        <Art key={index} art={art} handleClick={handleClick} />
                    ))}
                </div>
            </div>

        </motion.div>

    </>)
}