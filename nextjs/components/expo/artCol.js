import Image from 'next/image'
import { useEffect, useState } from 'react'
import { AnimatePresence, useAnimation, motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function ArtCol({
    art,
    highestVolgorde,
}) {
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

    // Priority art?
    const numberFastLoadedArts = 8 // bovenste hoeveelheid arts die snel geladen moeten worden
    const priorityBorder = highestVolgorde - numberFastLoadedArts
    const priorityArt = art.volgorde > priorityBorder

    const { id } = art
    return (
        <AnimatePresence
            key={id}
            mode='wait'
        >
            <motion.div
                ref={ref}
                animate={controls}
                initial="hidden"
                variants={squareVariants}
            >
                <div className='flex flex-col gap-3'>
                    {/* With priority */}
                    {priorityArt && (
                        <Image
                            onLoad={handleLoad}
                            src={art.src}
                            height={art.y}
                            width={art.x}
                            alt={art.title}
                            className='shadow-md'
                            priority
                        />
                    )}
                    {/* Without priority */}
                    {!priorityArt && (
                        <Image
                            onLoad={handleLoad}
                            src={art.src}
                            height={art.y}
                            width={art.x}
                            alt={art.title}
                            className='shadow-md'
                        />
                    )}
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