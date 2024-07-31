'use client'
import Link from "next/link"
import InstaIcon from "./instaIcon"

export default function Footer() {

    return (
        <div className="
            bg-[#c0b7b0]
            mt-10
            pt-14
            pb-5
            px-7
            md:px-12
            w-full
            flex flex-col gap-4
            flex-none 
            items-center
            self-end
            
        ">
            {/* Links */}
            <div className=" 
                w-full
                flex flex-col gap-3
                md:w-2/3
                md:columns-2
            ">

                <div className="flex flex-col">
                    <div className="text-lg font-bold">Location</div>
                    <div className="text-sm font-IBMPlexSansLight">Zwolle, Overijssel, Nederland</div>
                </div>



                <div className="flex flex-col gap-4 md:gap-5">
                    <div className="flex flex-col">
                        <div className="text-lg font-bold">Website</div>
                        <div className="flex flex-col text-xs font-IBMPlexSansLight uppercase tracking-widest">
                            <Link href={'/'}>Home</Link>
                            <Link href={'/bio'}>Bio</Link>
                        </div>
                    </div>

                    <div className="place-self-center md:place-self-auto"><InstaIcon /></div>
                </div>
            </div>

            <div className="flex flex-col items-center text-xs font-IBMPlexSansLight">
                <div>Rein Rensen</div>
                <div>© 2019-2021 All Rights Reserved.</div>
            </div>

            <div className="items-center text-sm font-IBMPlexSansLight py-5">Designed by <Link href={'https://gijshegeman.vercel.app/'} rel="noopener noreferrer">Gijs Hegeman.</Link></div>
        </div >
    )
}