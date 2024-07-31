import Image from "next/image"

export const metadata = {
    title: 'Rein Rensen - bio',
    description: 'Ik ben Rein Rensen, geboren in Doetinchem op 21 november 1997. Inmiddels woon ik in Zwolle, de stad waar ik bezig ben mijn studie geneeskunde af te ronden. In 2020 ben ik naast mijn studie begonnen met schilderen om mijn creatieve kant beter te kunnen uiten. Ik heb meerdere portretten en schilderijen van vrienden, kennissen en onbekenden gemaakt. Van hen krijg ik vaak te horen dat het karakter en de gelijkenis van de geschilderde goed overkomt. Dit is voor mij het allerbelangrijkst. Verder probeer ik mijn schilderijen kleurrijk en levendig te maken, zonder dat daarbij de balans in het werk verloren gaat. Het liefst schilder ik close-up portretten of mensen in hun omgeving aan de hand van toegestuurde foto’s die ik met mijn eigen stijl uitwerk tot schilderijen. Wilt u uzelf, vriend, buurvrouw of huisdier verrassen met een schilderij van een foto naar eigen keuze? Ga dan naar aanvraag of neem gerust contact met mij op via het mailicoontje onderaan de site. Ik maak met alle plezier een authentiek schilderein voor u!',
    icons: {
        icon: "/favicon.ico",
    },
}
export default function About() {
    return (
        <div className="
                flex flex-col 
                gap-2

                lg:flex-row
                lg:gap-5
            "
        >
                <div className='w-full lg:w-2/5'>
                    <Image
                        src='/img/profile/profile.png'
                        className="w-full shadow-md"
                        alt='Portret Rein Rensen'
                        width={500}
                        height={500}
                    />
                </div>

                <div className='
                        flex flex-col
                        gap-3   
                        w-full 
                        
                        lg:w-3/5
                        lg:max-w-[25vw]
                        text-sm 
                        font-light 
                        leading-relaxed
                        text-gray-600
                    '>
                    <p>Ik ben Rein Rensen, geboren in Doetinchem op 21 november 1997. Inmiddels woon ik in Zwolle, de stad waar ik bezig ben mijn studie geneeskunde af te ronden. In 2020 ben ik naast mijn studie begonnen met schilderen om mijn creatieve kant beter te kunnen uiten.</p>
                    <p>Ik heb meerdere portretten en schilderijen van vrienden, kennissen en onbekenden gemaakt. Van hen krijg ik vaak te horen dat het karakter en de gelijkenis van de geschilderde goed overkomt. Dit is voor mij het allerbelangrijkst. Verder probeer ik mijn schilderijen kleurrijk en levendig te maken, zonder dat daarbij de balans in het werk verloren gaat. Het liefst schilder ik close-up portretten of mensen in hun omgeving aan de hand van toegestuurde foto’s die ik met mijn eigen stijl uitwerk tot schilderijen.
                        Wilt u uzelf, vriend, buurvrouw of huisdier verrassen met een schilderij van een foto naar eigen keuze? Ga dan naar aanvraag of neem gerust contact met mij op via het mailicoontje onderaan de site.
                        Ik maak met alle plezier een authentiek schilderein voor u!</p>
                </div>

        </div>
    )
}