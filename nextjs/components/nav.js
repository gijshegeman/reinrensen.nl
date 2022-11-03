import Link from './NoScrollLink'
import { useRouter } from 'next/router'
import { isActiveLink } from '../lib/utils'
import { motion } from 'framer-motion'

export default function Nav() {
    const links = [
        {
            "name": "kunstwerken",
            "href": "/"
        },
        {
            "name": "aanvraag",
            "href": "/aanvraag"
        },
        {
            "name": "bio",
            "href": "/bio"
        }
    ]

    const router = useRouter()

    return (<>

        <div>

            {/* Navbar */}
            <div className="
                flex justify-between
                items-baseline
                text-sm
                p-[20px]
                pb-[40px]
                
                font-PlexSans
                text-[#21564e]  
                md:mx-[10vw] lg:mx-[15vw] xl:mx-[20vw] 2xl:mx-[25vw]              
            ">
                <div className="text-xl sm:text-2xl font-bold"><Link href={"/"} passHref>Rein Rensen</Link></div>
                <div className="flex gap-5">
                    {links.map(({ name, href }) =>
                        <Link key={name} href={href} passHref>
                            <div className='hover:text-[#92aba6] hover:border-[#92aba6] animate ease-out duration-300'>
                                {name}
                                {isActiveLink(href, router.pathname) && (
                                    <motion.div
                                        layoutId="navigation-underline"
                                        className="w-full border border-[#21564e] rounded-full"
                                        animate
                                    />
                                )}
                            </div>
                        </Link>

                    )}
                </div>

            </div>

        </div>

    </>
    )
}