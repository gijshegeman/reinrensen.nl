import mailIcon from '../icons/mail.svg'
import instagramIcon from '../icons/instagram.svg'
import Link from '../components/NoScrollLink'

import Image from 'next/image'
import Head from 'next/head'

export default function LinkTree() {
    const links = [
        {
            "name": "Webiste",
            "href": "/"
        },
        {
            "name": "Kunstwerken",
            "href": "/"
        },
        {
            "name": "Kunstwerk aanvragen",
            "href": "/aanvraag"
        },
        {
            "name": "Contact",
            "href": "/contact"
        }
    ]

    return (<>
        <Head>
            <title>Rein Rensen | LinkTree</title>
        </Head>

        <div className="flex flex-col gap-10 items-center h-full justify-between">

            <div className="pt-10 text-6xl font-thin tracking-wider text-[#21564e]">Rein Rensen</div>

            <div className="flex flex-col gap-5 items-center text-xl font-thin tracking-widest text-white">
                {links.map(({ href, name }, index) =>
                    <Link key={index} href={href}>
                        <div className='px-4 py-1 bg-[#21564e]/95 hover:bg-[#92aba6] rounded-full shadow-xl hover:shadow-2xl hover:scale-125 transform-gpu animate ease-out duration-300 active:scale-100'>
                            {name}
                        </div>
                    </Link>
                )}
            </div>



            <div className='flex flex-col gap-4 items-center pb-10'>
                <div className='flex items-center gap-2'>
                    <Link href={'/contact'}>
                        <Image
                            src={mailIcon}
                            alt="Mail"
                            width={30}
                            height={30}
                            objectFit="contain"
                            quality={75}
                            className="iconsGreen hover:opacity-70 hover:scale-75 transform-gpu animate ease-out duration-300"
                        />
                    </Link>

                    <Link href={'https://www.instagram.com/schilderein'} >
                        <Image
                            src={instagramIcon}
                            alt="Instagram"
                            width={30}
                            height={30}
                            objectFit="contain"
                            quality={75}
                            className="iconsGreen hover:scale-75 transform-gpu animate ease-out duration-300 hover:opacity-70"
                        />
                    </Link>
                </div>

                <div className='font-thin tracking-wider'>Website by <a className='hover:text-black/60' href="https://gijshegeman.nl/">Gijs Hegeman.</a></div>
            </div>



        </div>
    </>)
}