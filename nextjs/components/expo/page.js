'use client'
import { useState, useEffect } from 'react'
import ArtCol from './artCol'

export default function Expo() {
    const [arts, setArts] = useState([]);
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/arts')
            .then((res) => res.json())
            .then((data) => {
                setArts(data)
                setLoading(false)
            });
    }, []);


    if (isLoading) return <div className='flex flex-col items-center'>Loading...</div>
    if (!arts) return <div>Something went wrong with fetching the data</div>

    const ascendingSortedArts = [...arts].sort((a, b) => b.volgorde - a.volgorde)

    // Prioritize highest images
    const artsVolgorde = arts.map(art => art.volgorde)
    const highestVolgorde = Math.max(...artsVolgorde)

    return (
        <div>
            {/* Large */}
            <div className='hidden md:block'>
                <div className='grid grid-cols-3 gap-[30px]'>
                    <div className='flex flex-col gap-[30px]'>
                        {ascendingSortedArts
                            .filter((e, a) => a % 3 === 0)
                            .map(art =>
                                <ArtCol art={art} highestVolgorde={highestVolgorde} />
                            )}
                    </div>

                    <div className='flex flex-col gap-[30px]'>
                        {ascendingSortedArts
                            .filter((e, a) => a % 3 === 1)
                            .map(art =>
                                <ArtCol art={art} highestVolgorde={highestVolgorde} />
                            )}
                    </div>

                    <div className='flex flex-col gap-[30px]'>
                        {ascendingSortedArts
                            .filter((e, a) => a % 3 === 2)
                            .map(art =>
                                <ArtCol art={art} highestVolgorde={highestVolgorde} />
                            )}
                    </div>
                </div>
            </div>

            {/* Mobile */}
            <div className='block md:hidden'>
                <div className="flex flex-col gap-5">
                    {ascendingSortedArts.map(art => (
                        <ArtCol art={art} highestVolgorde={highestVolgorde} />
                    ))}
                </div>
            </div>
        </div>
    )
}