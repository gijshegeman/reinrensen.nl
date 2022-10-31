import Image from 'next/image'
import Link from './NoScrollLink'
import instagramIcon from '../icons/instagram.svg'
import mailIcon from '../icons/mail.svg'

export default function Footer() {
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

    return (<>


        <div className="-mx-[20px] mt-7 pt-10 pb-14 text-sm bg-[#21564e] text-white z-10">

            <div className="md:mx-[10vw] lg:mx-[15vw] xl:mx-[20vw] 2xl:mx-[25vw]">

                <div className='flex flex-col items-center gap-5 content-center'>

                    <div className='flex gap-20 justify-between md:text-base'>
                        <div className='text-base md:text-lg'><Link href={"/"}>Rein Rensen</Link></div>
                        <div>
                            {links.map(({ name, href }) => {
                                return (
                                    <div className='hover:text-[#92aba6]' key={name}>
                                        <Link href={href}>{name}</Link>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div>© 2019-2021 All Rights Reserved.</div>

                    <div>Website by <a className='hover:text-[#92aba6]' href="https://gijshegeman.nl/">Gijs Hegeman</a></div>



                    <div className='flex gap-2 items-center z-10'>
                        {/* Mail */}
                        <div className='hover:scale-[110%] active:scale-100'>
                            <Link href='/contact'>
                                <Image
                                    src={mailIcon}
                                    alt="Mail"
                                    width={25}
                                    height={25}
                                    objectFit="contain"
                                    quality={75}
                                    className="opacity-80 hover:opacity-100"
                                />
                            </Link>
                        </div>

                        {/* Insta */}
                        <div className='hover:color-black hover:scale-[110%] active:scale-100'>
                            <Link href='https://www.instagram.com/schilderein'>
                                <Image
                                    src={instagramIcon}
                                    alt="Instagram"
                                    width={22}
                                    height={24}
                                    objectFit="contain"
                                    quality={75}
                                    className="opacity-80 hover:opacity-100"
                                />
                            </Link>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    </>)
}