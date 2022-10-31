import { useState, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Image from 'next/image'

export default function AanvraagForm({
    // Form
    voornaam, setVoornaam,
    achternaam, setAchternaam,
    tel, setTel,
    email, setEmail,
    // file, setFile,
    selected, setSelected,
    lengteCM, setLengteCM,
    breedteCM, setBreedteCM,
    customLengteCM, setCustomLengteCM,
    customBreedteCM, setCustomBreedteCM,
    custom, setCustom,
    verassing, setVerassing,
    bericht, setBericht,

    // Handle page
    setSubmitted,
    setAanvraagForm,
    setLastCheck,
    aanvraag, setAanvraag,

    // New
    setBody,
    image, setImage,
    imageName, setImageName,
    createObjectURL, setCreateObjectURL
}) {
    const variants = {
        hidden: {
            opacity: 0,
        },
        enter: {
            opacity: 1,
        },
        exit: {
            opacity: 0,
        }
    }

    const sizes = [
        {
            "custom": false,
            "type": "staand",
            "l": 45,
            "b": 35,
        },
        {
            "custom": false,
            "type": "liggend",
            "l": 35,
            "b": 45,
        },
        {
            "custom": false,
            "type": "staand",
            "l": 80,
            "b": 60,
        },
        {
            "custom": false,
            "type": "liggend",
            "l": 60,
            "b": 80,
        },
        {
            "custom": true,
        },
        {
            "surprise": true,
            "message": "Ik laat me verrassen",
        }
    ]

    const [submitMessage, setSubmitMessage] = useState('')
    const [formReady, setFormReady] = useState(false)

    // New



    const handleImg = (event) => {
        if (event.target.files && event.target.files[0]) {
            const i = event.target.files[0]
            setImage(i)
            setImageName(i.name)
            setCreateObjectURL(URL.createObjectURL(i))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (bericht === 'Hey Rein, \n\n...') {
            setFormReady(false)
            setSubmitMessage("vergeet niet een persoonlijk bericht en/of voorkeuren achter te laten!")
        } else if (selected === '') {
            setFormReady(false)
            setSubmitMessage("geen formaat geselecteerd!")
        } else if (image === null) {
            setFormReady(false)
            setSubmitMessage("geen voorbeeldfoto geselecteerd!")
        } else if (email === "") {
            setFormReady(false)
            setSubmitMessage("e-mailadres niet ingevuld!")
        } else if (tel === "") {
            setFormReady(false)
            setSubmitMessage("telefoonnummer niet ingevuld!")
        } else if (achternaam === "") {
            setFormReady(false)
            setSubmitMessage("achternaam niet ingevuld!")
        } else if (voornaam === "") {
            setFormReady(false)
            setSubmitMessage("voornaam niet ingevuld!")
        } else {
            // Old
            setFormReady(true)
            setAanvraag({
                voornaam,
                achternaam,
                tel,
                email,
                custom,
                verassing,
                lengteCM,
                breedteCM,
                bericht
            })

            // New
            const body = new FormData()
            body.append("file", image)
            body.append('voornaam', voornaam)
            body.append('achternaam', achternaam)
            body.append('tel', tel)
            body.append('email', email)
            body.append('custom', custom)
            body.append('verassing', verassing)
            body.append('lengteCM', lengteCM)
            body.append('breedteCM', breedteCM)
            body.append('bericht', bericht)
            setBody(body)

            setSubmitted(true)

            setAanvraagForm(false)
            setLastCheck(true)
        }
    }

    return (<>
        <div className="flex flex-col gap-4">
            <div className="text-sm font-light leading-relaxed text-gray-600">
                <div>Uw eigen schilderij laten maken... ? Dat kan!</div>
                <div>
                    <ul className="list-disc list-inside">
                        <li>Vul uw gegevens in</li>
                        <li>Voeg een duidelijk schildervoorbeeld toe</li>
                        <li>Kies een formaat</li>
                        <li>Geef uw wensen aan in het bericht</li>
                    </ul>
                </div>
                <div>Geschatte leverduur: 2 - 3 weken (wisselend wegens drukte)</div>
                <div>Ik neem zo snel mogelijk contact met u op!</div>
            </div>

            <div className="text-sm font-light">
                <form action="/api/aanvraag" method="POST" encType="multipart/form-data">

                    {/* Naam */}
                    <div className="flex flex-col gap-4">

                        <div className="flex flex-col gap-2">
                            <div className="font-bold">Aanvraagformulier</div>
                            <div className="flex justify-between gap-2 items-baseline">
                                <input type="text" id="firstname" name="firstname" placeholder="Voornaam" className="w-full p-2 rounded-lg bg-[#f7f7f7] focus:outline-none focus:border-[#21564e] focus:ring-1 focus:ring-[#92aba6] ring-inset shadow-sm " onChange={(e) => setVoornaam(e.target.value)} value={voornaam} required />
                                <input type="text" id="lastname" name="lastname" placeholder="Achternaam" className="w-full p-2 rounded-lg bg-[#f7f7f7] focus:outline-none focus:border-[#21564e] focus:ring-1 focus:ring-[#92aba6] ring-inset shadow-sm" onChange={(e) => setAchternaam(e.target.value)} value={achternaam} required />
                            </div>

                            {/* Tel */}
                            <div className="flex justify-between gap-2 items-baseline">
                                <div className="flex-none">Telefoonnummer</div>
                                <input type="tel" id="phone" name="phone" placeholder="+ 31 (0) 6 ..." minLength="9" required className="w-full p-2 rounded-lg bg-[#f7f7f7] focus:outline-none focus:border-[#21564e] focus:ring-1 focus:ring-[#92aba6] ring-inset shadow-sm" onChange={(e) => setTel(e.target.value)} value={tel} />
                            </div>

                            {/* E-mail */}
                            <div className="flex justify-between gap-2 items-baseline">
                                <div className="flex-none">E-mail</div>
                                <input type="email" id="email" name="email" placeholder="youremail@provider.com" required className="w-full p-2 rounded-lg bg-[#f7f7f7] focus:outline-none focus:border-[#21564e] focus:ring-1 focus:ring-[#92aba6] ring-inset shadow-sm" onChange={(e) => setEmail(e.target.value)} value={email} />
                            </div>
                        </div>

                        {/* File */}
                        <div className="flex flex-col gap-">
                            <div className="font-bold">Voorbeeldfoto</div>
                            <div>Kies een scherpe foto. Dit is de foto die ik naschilder</div>
                            <div className="flex gap-4 mt-2 items-center justify-between">

                                <motion.div
                                    layoutId="resize"
                                    className="w-full"
                                    transition={{
                                        duration: .3,
                                        ease: "easeOut"
                                    }}
                                    animate
                                >
                                    <input
                                        type="file" id="file" name="file"
                                        className="     w-full p-[3px] bg-[#f7f7f7] rounded-lg shadow-sm border-2 border-dashed
                                                    focus:outline-none border-[#92aba6]/40 focus:border-[#92aba6] active:border-[#92aba6]/40 focus:ring-0 focus:ring-[#92aba6] focus:rounded
                                                    file:text-right 
                                                    file:py-2 file:mr-4 file:px-2 file:m-1
                                                    file:rounded-md file:border-0
                                                    file:text-sm file:font-semibold
                                                    file:bg-[#92aba6]/20 file:text-[#21564e]
                                                    hover:file:bg-[#92aba6]/50
                                                "
                                        accept="image/*"
                                        onChange={handleImg}
                                    />
                                </motion.div>

                                <AnimatePresence
                                    onExitComplete={() => window.scrollTo(0, 0)}
                                    mode='wait'
                                >
                                    {image && (
                                        <motion.div
                                            key='1'
                                            variants={variants}
                                            initial="hidden"
                                            animate="enter"
                                            exit="exit"
                                            transition={{
                                                delay: .3,
                                                duration: .2,
                                                ease: "easeIn"
                                            }}
                                            className="flex-none w-2/5 flex justify-center items-center"
                                        >
                                            <Image
                                                src={createObjectURL}
                                                alt='example IMG'
                                                height={"150px"}
                                                width={"200px"}
                                            />
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                            </div>

                        </div>

                        {/* Formaat */}
                        <div className="flex flex-col gap-1">
                            <div className="font-bold">Formaat</div>
                            <div>Selecteer hier uw formaat in centimeters (Lengte x Breedte cm)</div>
                            <div className="grid grid-cols-1 gap-2">
                                {sizes.map((size, index) => {
                                    return (
                                        <div
                                            key={index}
                                            onClick={() => {
                                                setSelected(index)
                                                if (size.custom === false) {
                                                    setVerassing(false)
                                                    setCustom(false)
                                                    setLengteCM(size.l)
                                                    setBreedteCM(size.b)
                                                }
                                                if (size.custom === true) {
                                                    setVerassing(false)
                                                    setCustom(true)
                                                    setLengteCM(customLengteCM)
                                                    setBreedteCM(customBreedteCM)
                                                }
                                                if (size.surprise === true) {
                                                    setCustom(false)
                                                    setVerassing(true)
                                                    setLengteCM('')
                                                    setBreedteCM('')
                                                }
                                            }}
                                            className="relative bg-[#f7f7f7] border border-[#21564e]/10 rounded-lg p-2 z-20 shadow-sm hover:shadow-md hover:scale-[102%] transform-gpu animate ease-out duration-300 active:scale-100"
                                        >
                                            {size.custom === false && (<div>L: {size.l} x B: {size.b} cm ({size.type})</div>)}
                                            {size.custom && (
                                                <div>
                                                    <div>Anders namelijk:</div>
                                                    <div className="flex items-baseline gap-2">
                                                        <div>L:</div>
                                                        <input type="number" id="lengteCM" name="lengteCM" min="0" placeholder="." className="w-12 bg-[#f7f7f7] p-1 rounded-lg z-20 hover:ring-1 hover:ring-[#21564e] focus:outline-none focus:border-[#21564e] focus:ring-1 focus:ring-[#92aba6] ring-inset"
                                                            onChange={(e) => {
                                                                setCustomLengteCM(e.target.value)
                                                                setLengteCM(e.target.value)
                                                            }}
                                                            value={customLengteCM}
                                                        />
                                                        <div>x</div>
                                                        <div>B:</div>
                                                        <input type="number" id="breedteCM" name="breedteCM" min="0" placeholder="." className="w-12 bg-[#f7f7f7] p-1 rounded-lg z-20 hover:ring-1 hover:ring-[#21564e] focus:outline-none focus:border-[#21564e] focus:ring-1 focus:ring-[#92aba6] ring-inset"
                                                            onChange={(e) => {
                                                                setCustomBreedteCM(e.target.value)
                                                                setBreedteCM(e.target.value)
                                                            }}
                                                            value={customBreedteCM}
                                                        />
                                                        <div>cm</div>
                                                    </div>
                                                </div>
                                            )}
                                            {size.surprise && <div>{size.message}</div>}
                                            {index === selected && (
                                                <motion.div
                                                    layoutId="selected"
                                                    className="absolute inset-0 border border-[#21564e] rounded-lg z-10"
                                                    animate
                                                />
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="flex gap-1">
                                <div>Geselecteerd formaat:</div>
                                {!custom && !verassing && lengteCM && <div>L: {lengteCM} x B: {breedteCM} cm</div>}
                                {custom && <div>L: {customLengteCM} x B: {customBreedteCM} cm</div>}
                                {verassing && <div>Ik laat me verrassen</div>}
                            </div>
                        </div>

                        {/* Bericht */}
                        <div className="flex flex-col gap-1">
                            <div className="font-bold">Bericht</div>
                            <div>Geef hier specifieke wensen/voorkeuren aan!</div>
                            <textarea id="berricht" name="berricht" className="w-full h-[20vh] p-2 rounded-lg bg-[#f7f7f7] shadow-sm focus:outline-none focus:border-[#21564e] focus:ring-1 focus:ring-[#92aba6] ring-inset" onChange={(e) => setBericht(e.target.value)} value={bericht}></textarea>
                        </div>

                        {/* Send button */}
                        <div className="flex flex-col gap-2">
                            <div className="font-bold text-rose-700">{!formReady && submitMessage && (`Let op: ${submitMessage}`)}</div>
                            <button type="submit" value="Verstuur aanvraag" className="w-full text-center p-2 rounded-lg bg-[#92aba6] hover:bg-[#21564e] text-xl font-bold text-white shadow-xl hover:shadow-2xl hover:scale-[102%] transform-gpu animate ease-out duration-300 active:scale-100 focus:outline-none focus:border-[#21564e] focus:ring-1 focus:ring-[#92aba6] ring-inset" onClick={handleSubmit} >Verstuur aanvraag</button>
                        </div>
                    </div>
                </form>
            </div >
        </div >
    </>)
}