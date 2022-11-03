
import Layout from '../components/layout'
import ArtCollection from '../components/artcollection'
import ImgPrevieuw from '../components/imgPrevieuw'

import { useState } from 'react'

// Alternative
import data from '../data/data.json'  // makkelijke optie
// import { server } from '../config' // optie 1, geeft foutmelding
// export async function getStaticProps() {
//     const dev = process.env.NODE_ENV !== 'production'
//     const server = dev ? 'http://localhost:3000' : 'https://reinrensen.nl'

//     const res = await fetch(`${server}/api/arts`)
//     const arts = await res.json()

//     return {
//         props: {
//             arts
//         }
//     }
// }

export default function HomePage() {
    const arts = [...new
        Set([].concat(...data.arts.filter(art => art.publish == true).map(work => work)))
    ]

    const [imgPrevieuwActive, setImgPrevieuwActive] = useState(false)
    const [selectedArt, setSelectedArt] = useState('')

    const artIds = arts.map(art => art.id)
    const highestId = Math.max(...artIds)
    const lowestId = Math.min(...artIds)

    function handleClick(art) {
        setImgPrevieuwActive(true)
        const newSelectedArt = arts.filter(i => i.id === art.id).map(art => art)
        setSelectedArt(newSelectedArt[0])
        // console.log('Selected art:', selectedArt)
    }

    function prevButton(currentArtId) {
        let newArtId = currentArtId - 1

        const newSelectedArt = arts.filter(i => i.id === newArtId).map(art => art)
        setSelectedArt(newSelectedArt[0])

        // Id kleiner dan 0
        if (newArtId === 0) {
            const newSelectedArt = arts.filter(i => i.id === highestId).map(art => art)
            setSelectedArt(newSelectedArt[0])
        }

        // opvolgende ID niet aanwezig
        if (!artIds.includes(newArtId) && newArtId !== 0) {
            let extraNewArtId = newArtId - 1
            const newSelectedArt = arts.filter(i => i.id === extraNewArtId).map(art => art)
            setSelectedArt(newSelectedArt[0])
        }
    }

    function nextButton(currentArtId) {
        let newArtId = currentArtId + 1

        const newSelectedArt = arts.filter(i => i.id === newArtId).map(art => art)
        setSelectedArt(newSelectedArt[0])

        // Id goter dan hoogste ID 
        if (newArtId > highestId) {
            const newSelectedArt = arts.filter(i => i.id === lowestId).map(art => art)
            setSelectedArt(newSelectedArt[0])
        }

        // opvolgende ID niet aanwezig
        if (!artIds.includes(newArtId) && newArtId !== 0) {
            let extraNewArtId = newArtId + 1
            const newSelectedArt = arts.filter(i => i.id === extraNewArtId).map(art => art)
            setSelectedArt(newSelectedArt[0])
        }
    }

    return (<>
        <Layout>
            <ArtCollection arts={arts} handleClick={handleClick} />
            <ImgPrevieuw
                imgPrevieuwActive={imgPrevieuwActive} setImgPrevieuwActive={setImgPrevieuwActive}
                selectedArt={selectedArt} setSelectedArt={setSelectedArt}
                prevButton={prevButton}
                nextButton={nextButton}
                arts={arts}
            />
        </Layout>
    </>)
}