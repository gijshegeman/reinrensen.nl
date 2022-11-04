import Image from 'next/image'
import Layout from '../components/layout'
import profilePic from '../public/img/profile.png'
import Head from 'next/head'

function Bio() {
    return (<>
        <Head>
            <title>Rein Rensen | Bio</title>
        </Head>
        <Layout>
            <div className="md:mx-[10vw] lg:mx-[15vw] xl:mx-[20vw] 2xl:mx-[25vw]">
                <div className='flex flex-col 2xl:flex-row 2xl:gap-10'>
                    <div className='2xl:w-3/5'>
                        <Image
                            src={profilePic}
                            className="relative w-full shadow-md"
                            alt='Portret Rein Rensen'
                        />
                    </div>

                    <div className='
                        flex flex-col gap-3
                        mt-10
                        text-sm 
                        font-light leading-relaxed
                        text-gray-600
                        
                        2xl:mt-0
                        2xl:w-2/5
                        pb-10
                    '>
                        <p>Ik ben Rein Rensen, geboren in Doetinchem op 21 november 1997. Inmiddels woon ik in Zwolle, de stad waar ik bezig ben mijn studie geneeskunde af te ronden. In 2020 ben ik naast mijn studie begonnen met schilderen om mijn creatieve kant beter te kunnen uiten.</p>
                        <p>Ik heb meerdere portretten en schilderijen van vrienden, kennissen en onbekenden gemaakt. Van hen krijg ik vaak te horen dat het karakter en de gelijkenis van de geschilderde goed overkomt. Dit is voor mij het allerbelangrijkst. Verder probeer ik mijn schilderijen kleurrijk en levendig te maken, zonder dat daarbij de balans in het werk verloren gaat. Het liefst schilder ik close-up portretten of mensen in hun omgeving aan de hand van toegestuurde foto’s die ik met mijn eigen stijl uitwerk tot schilderijen.
                            Wilt u uzelf, vriend, buurvrouw of huisdier verrassen met een schilderij van een foto naar eigen keuze? Ga dan naar aanvraag of neem gerust contact met mij op via het mailicoontje onderaan de site.
                            Ik maak met alle plezier een authentiek schilderein voor u!</p>
                    </div>
                </div>
            </div>
        </Layout>
    </>)
}
export default Bio