import Layout from "../components/layout"
import { useState } from "react"

export default function Contact() {
    const [formReady, setFormReady] = useState(false)
    const [voltooid, setVoltooid] = useState(false)
    const [submitMessage, setSubmitMessage] = useState('')
    const [naam, setNaam] = useState('')
    const [email, setEmail] = useState('')
    const [tel, setTel] = useState('')
    const [bericht, setBericht] = useState('Beste Rein, \n\n')

    const handleSubmit = (e) => {
        e.preventDefault()

        const data = {
            naam,
            email,
            tel,
            bericht
        }
        if (formReady == false) {
            setVoltooid("")
        }
        if (naam === '') {
            setSubmitMessage("geen naam ingevuld!")
            setFormReady(false)
        } else if (email === '') {
            setSubmitMessage("geen e-mail ingevuld!")
            setFormReady(false)
        } else if (bericht === 'Beste Rein, \n\n') {
            setSubmitMessage("geen bericht achter gelaten!")
            setFormReady(false)
        } else {
            setSubmitMessage("")

            fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then((res) => {
                console.log('Response received')

                if (res.status === 200) {
                    // Reset form
                    setNaam('')
                    setEmail('')
                    setTel('')
                    setBericht('Beste Rein, \n\n')
                    setFormReady(false)

                    // Submit message
                    setSubmitMessage("")
                    setVoltooid("Uw bericht is verzonden! \r\nCheck of u een bevestiging heeft ontvangen. \nZo niet probeer het opnieuw.")
                }

                if (res.status === 404) {
                    setSubmitMessage('ERROR 404 | Er is iets mis gegaan, probeer het opnieuw. Refresh de pagina.')
                }

                if (res.status === 500) {
                    setSubmitMessage('ERROR 500 | Er is iets mis gegaan, probeer het opnieuw. Refresh de pagina.')
                }
            })
        }
    }

    return (<>
        <Layout>
            <div className="md:mx-[10vw] lg:mx-[15vw] xl:mx-[20vw] 2xl:mx-[25vw]">

                <div className="flex flex-col gap-5 text-sm">
                    <div className="text-2xl font-bold">Contact</div>

                    <div>Neem gerust contact met mij op.</div>

                    <form className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1">
                            <div className="flex-none font-bold">Naam</div>
                            <input type="text" id="firstname" name="firstname" placeholder="Naam" className="w-full p-2 rounded-lg bg-[#f7f7f7] shadow-sm hover:shadow-md transform-gpu animate ease-out duration-300 focus:outline-none focus:border-[#21564e] focus:outline-none focus:border-[#21564e] focus:ring-2 focus:ring-[#21564e]" onChange={(e) => setNaam(e.target.value)} value={naam} required />
                        </div>

                        <div className="flex flex-col gap-1 items-baseline">
                            <div className="flex-none font-bold">E-mail</div>
                            <input type="text" id="mail" name="mail" placeholder="voorbeeld@hotmail.com" className="w-full p-2 rounded-lg bg-[#f7f7f7] shadow-sm hover:shadow-md transform-gpu animate ease-out duration-300 focus:outline-none focus:border-[#21564e] focus:ring-2 focus:ring-[#21564e]" onChange={(e) => setEmail(e.target.value)} value={email} required />
                        </div>

                        <div className="flex flex-col gap-1 items-baseline">
                            <div className="flex-none font-bold">Telefoon</div>
                            <input type="tel" id="phone" name="phone" placeholder="+ 31 (0) 6 ..." minLength="9" required className="w-full p-2 rounded-lg bg-[#f7f7f7] shadow-sm hover:shadow-md transform-gpu animate ease-out duration-300 focus:outline-none focus:border-[#21564e] focus:ring-2 focus:ring-[#21564e]" onChange={(e) => setTel(e.target.value)} value={tel} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="font-bold">Bericht</div>
                            <textarea id="berricht" name="berricht" className="w-full h-[20vh] p-2 rounded-lg bg-[#f7f7f7] shadow-sm hover:shadow-md transform-gpu animate ease-out duration-300 focus:outline-none focus:border-[#21564e] focus:ring-2 focus:ring-[#21564e]" onChange={(e) => setBericht(e.target.value)} value={bericht}></textarea>
                        </div>

                        <button type="submit" value="Verstuur aanvraag" className="w-full text-center p-2 rounded-lg bg-[#92aba6] hover:bg-[#21564e] text-xl font-bold text-white shadow-xl hover:shadow-2xl hover:scale-[102%] transform-gpu animate ease-out duration-300 active:scale-100" onClick={handleSubmit} >Verstuur bericht</button>

                    </form>
                    <div className="text-center">
                        {submitMessage && <div className="text-rose-700">Let op: {submitMessage}</div>}
                        {voltooid && <div className="text-lime-700">{voltooid}</div>}
                    </div>
                </div>
            </div>
        </Layout>
    </>)
}