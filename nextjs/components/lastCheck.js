import { useState } from "react"
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'

export default function LastCheck({
    aanvraag,
    setRoundupPage,
    setLastCheck,
    setAanvraagForm,
    pevieuwImgDimensions,
    body,
    createObjectURL
}) {
    const [submitMessage, setSubmitMessage] = useState('')
    const [status, setStatus] = useState('')
    const [clicked, setClicked] = useState(false)
    const [delayMessage, setDelayMessage] = useState('')

    const handleDefSubmit = async () => {
        setClicked(true)
        setTimeout(() => {
            setDelayMessage("Een moment geduld alstublieft!")
        }, 3000)
        setTimeout(() => {
            setDelayMessage("Het uploaden kan een aantal minuten duren doordat de foto's verstuud moeten worden. Graag uw geduld!")
        }, 8000)

        setTimeout(() => {
            setDelayMessage("Uploaden nog steeds bezig. Het lijkt er op dat u een groot bestand upload, dit kost tijd! Blijf op de pagina!")
        }, 20000)

        await fetch("/api/aanvraag", {
            method: "POST",
            body
        }).then((res) => {
            console.log('response received:', res)
            if (res.status === 200) {
                setLastCheck(false)
                setRoundupPage(true)
            }

            // Fout
            if (res.status === 404) {
                console.log(res.message)
                setSubmitMessage('ERROR 404 | Er is iets mis gegaan, refresh de pagina, en probeer het opnieuw.')
            }

            if (res.status === 500) {
                console.log('Internal server error!')
                setSubmitMessage('ERROR 500 | Er is iets mis gegaan, refresh de pagina, en probeer het opnieuw.')
            }
        })
    }

    const handleWijzigAanvraag = () => {
        setLastCheck(false)
        setAanvraagForm(true)
    }

    return (<>
        <div className="md:mx-[10vw] lg:mx-[15vw] xl:mx-[20vw] 2xl:mx-[25vw]">

            <div className="flex flex-col gap-4 text-sm w-full">

                <div>Controleer hieronder of uw gegevens kloppen.</div>

                {/* New */}
                <div className="flex flex-col">
                    <div className="font-bold">Contact gegevens</div>
                    <div className="flex flex-col">
                        <div className="flex gap-1">
                            <div>{aanvraag.voornaam}</div>
                            <div>{aanvraag.achternaam}</div>
                        </div>
                        <div className="">{aanvraag.tel}</div>
                        <div>{aanvraag.emailCustommer}</div>
                    </div>

                </div>

                <div className="flex flex-col">
                    <div className="font-bold">Formaat</div>
                    <div>
                        {!aanvraag.custom && !aanvraag.verassing && aanvraag.lengteCM && <div>L {aanvraag.lengteCM} x B {aanvraag.breedteCM} cm</div>}
                        {aanvraag.custom && <div>L {aanvraag.lengteCM} x B {aanvraag.breedteCM} cm</div>}
                        {aanvraag.verassing && <div>Ik laat mij verrassen!</div>}
                    </div>
                </div>

                <div className="flex flex-col">
                    <div className="font-bold">Bericht</div>
                    <div className="flex-nonewhitespace-pre-wrap w-4/5">{aanvraag.bericht}</div>
                </div>

                <div
                    className={pevieuwImgDimensions.height > pevieuwImgDimensions.width
                        ? "flex w-5/6 max-w-xl"
                        : "flex max-w-7xl"
                    }
                >
                    <Image
                        src={createObjectURL}
                        alt='example IMG'
                        height={pevieuwImgDimensions.height}
                        width={pevieuwImgDimensions.width}
                    />
                </div>

                <div>Druk op &apos;Bevestig aanvraag&apos; wanneer alle gegevens kloppen!</div>

                <div className="flex flex-col gap-2">
                    <div className="flex gap-4 justify-between items-baseline text-[#21564e]">
                        <div className="flex-none hover:scale-[102%] transform-gpu animate ease-out duration-300 active:scale-100 hover:text-[#92aba6]" onClick={handleWijzigAanvraag}>&larr; Wijzig aanvraag</div>
                        <AnimatePresence
                            mode='wait'
                        >
                            {clicked
                                ? <motion.div
                                    initial={{ opacity: 0 }}
                                    exit={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-full flex-col items-center content-center text-white bg-[#21564e] text-xl rounded-lg px-5 py-2 text-center inline-flex items-center shadow-xl hover:shadow-2xl hover:scale-[98%] transform-gpu animate ease-out duration-300"
                                >
                                    <div className="flex gap-2 items-center content-center">
                                        <div className="flex gap-1  items-center content-center">
                                            <div className="p-[3px] bg-white rounded-full bounce1"></div>
                                            <div className="p-[3px] bg-white rounded-full bounce2"></div>
                                            <div className="p-[3px] bg-white rounded-full bounce3"></div>
                                        </div>
                                        <div>Aan het uploaden</div>
                                    </div>
                                </motion.div>
                                : <motion.div
                                    initial={{ opacity: 0 }}
                                    exit={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-full text-center p-2 rounded-lg bg-[#92aba6] hover:bg-[#21564e] text-xl font-bold text-white shadow-xl hover:shadow-2xl hover:scale-[102%] transform-gpu animate ease-out duration-300 active:scale-100 mx-4 px-4"
                                    onClick={handleDefSubmit}
                                >
                                    Bevestig aanvraag
                                </motion.div>
                            }
                        </AnimatePresence>
                    </div>

                </div>
                {delayMessage && (
                    <AnimatePresence
                        mode='wait'
                    >
                        <motion.div
                            className="text-rose-800 font-bold text-center whitespace-pre-wrap"
                            initial={{ opacity: 0, scale: 0.8 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            {delayMessage}
                        </motion.div>
                    </AnimatePresence>
                )}
                <div className="flex flex-col gap-1 text-rose-700">
                    {submitMessage && (
                        <div>
                            <div className="font-bold">Let op:</div>
                            <div>{submitMessage}</div>
                            <div className="flex-none">Lukt het daarna nog steeds niet, neem dan contact met mij op via <a href='https://www.instagram.com/schilderein/'><span className="font-bold underline hover:text-rose-700/70">Instagram</span></a>.</div>
                            {status && <div>Server: {status}</div>}
                        </div>
                    )}
                </div>
            </div>
        </div>
    </>)
}