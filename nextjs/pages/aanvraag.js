import Layout from "../components/layout"
import AanvraagForm from "../components/aanvraagForm"
import LastCheck from '../components/lastCheck'
import RoundupPage from "../components/roundupPage"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Head from 'next/head'


export default function Aanvraag() {
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

    // Page handle
    const [aanvraagForm, setAanvraagForm] = useState(true)
    const [lastCheck, setLastCheck] = useState(false)
    const [roundupPage, setRoundupPage] = useState(false)

    const [aanvraag, setAanvraag] = useState('')

    // Formulier
    const [voornaam, setVoornaam] = useState('')
    const [achternaam, setAchternaam] = useState('')
    const [tel, setTel] = useState('')
    const [email, setEmail] = useState('')
    // const [file, setFile] = useState('')
    const [selected, setSelected] = useState('')
    const [lengteCM, setLengteCM] = useState('')
    const [breedteCM, setBreedteCM] = useState('')
    const [customLengteCM, setCustomLengteCM] = useState('')
    const [customBreedteCM, setCustomBreedteCM] = useState('')
    const [custom, setCustom] = useState('')
    const [verassing, setVerassing] = useState('')
    const [bericht, setBericht] = useState('Beste Rein, \n\n...')

    const resetForm = () => {
        // Form
        setVoornaam('')
        setVoornaam('')
        setAchternaam('')
        setTel('')
        setEmail('')
        setSelected('')
        setLengteCM('')
        setBreedteCM('')
        setCustomLengteCM('')
        setCustomBreedteCM('')
        setCustom('')
        setVerassing('')
        setBericht('Hey Rein, \n\n...')

        // New
        setBody(false)
        setImage(false)
        setImageName('')
        setCreateObjectURL('')
    }

    // New
    const [body, setBody] = useState(false)
    const [image, setImage] = useState(null)
    const [imageName, setImageName] = useState('')

    const [createObjectURL, setCreateObjectURL] = useState(null)

    return (<>
        <Head>
            <title>Rein Rensen | Aanvraag</title>
        </Head>

        <Layout>
            <AnimatePresence
                initial={false}
                onExitComplete={() => window.scrollTo(0, 0)}
                mode='wait'
            >
                {/* 1. Aanvraag formulier */}
                {aanvraagForm && (
                    <motion.div
                        key='modal0'
                        variants={variants}
                        initial="hidden"
                        animate="enter"
                        exit="exit"
                        transition={{
                            duration: .6,
                            ease: "backInOut"
                        }}
                    >
                        <div className="md:mx-[10vw] lg:mx-[15vw] xl:mx-[20vw] 2xl:mx-[25vw]">
                            <AanvraagForm
                                // Form
                                voornaam={voornaam} setVoornaam={setVoornaam}
                                achternaam={achternaam} setAchternaam={setAchternaam}
                                tel={tel} setTel={setTel}
                                email={email} setEmail={setEmail}
                                // file={file} setFile={setFile}
                                selected={selected} setSelected={setSelected}
                                lengteCM={lengteCM} setLengteCM={setLengteCM}
                                breedteCM={breedteCM} setBreedteCM={setBreedteCM}
                                customLengteCM={customLengteCM} setCustomLengteCM={setCustomLengteCM}
                                customBreedteCM={customBreedteCM} setCustomBreedteCM={setCustomBreedteCM}
                                custom={custom} setCustom={setCustom}
                                verassing={verassing} setVerassing={setVerassing}
                                bericht={bericht} setBericht={setBericht}

                                // HandlePage
                                setAanvraagForm={setAanvraagForm}
                                setLastCheck={setLastCheck}
                                aanvraag={aanvraag} setAanvraag={setAanvraag}

                                // New
                                setBody={setBody}
                                image={image} setImage={setImage} setImageName={setImageName} imageName={imageName}
                                createObjectURL={createObjectURL} setCreateObjectURL={setCreateObjectURL}
                            />
                        </div>
                    </motion.div>
                )}

                {/* 2. LastCheck */}
                {lastCheck && (
                    <motion.div
                        key="modal1"
                        variants={variants}
                        initial="hidden"
                        animate="enter"
                        exit="exit"
                        transition={{
                            duration: .6,
                            ease: "backInOut"
                        }}
                    >
                        <LastCheck
                            aanvraag={aanvraag}
                            resetForm={resetForm}
                            setLastCheck={setLastCheck}
                            setAanvraagForm={setAanvraagForm}
                            setRoundupPage={setRoundupPage}

                            // New
                            body={body}
                            createObjectURL={createObjectURL}
                        />
                    </motion.div>
                )}

                {/* 3. RoundupPage */}
                {roundupPage && (
                    <motion.div
                        key='modal2'
                        variants={variants}
                        initial="hidden"
                        animate="enter"
                        exit="exit"
                        transition={{
                            duration: .6,
                            ease: "backInOut"
                        }}
                    >
                        <RoundupPage
                            setAanvraag={setAanvraag}
                            resetForm={resetForm}
                            aanvraag={aanvraag}
                            setLastCheck={setLastCheck}
                            setAanvraagForm={setAanvraagForm}
                            setRoundupPage={setRoundupPage}
                            createObjectURL={createObjectURL}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </Layout >
    </>)
}