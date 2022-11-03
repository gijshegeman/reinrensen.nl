import Link from "next/link"
import Image from 'next/image'
import mailIcon from '../icons/mail.png'
import instagramIcon from '../icons/instagram.png'

function Footer() {
    return(
        <div className="footer">
            <div className="footerText">
                <p>© 2019-2021 All Rights Reserved.</p>
            </div>

            <div className="icons">
                <div className="icon">
                    <Link href="mailto:gijshegeman@hotmail.com">
                        <a alt="Mail">
                            <Image 
                                src={mailIcon}
                                alt="Mail"
                                layout="intrinsic"
                                height={25}
                                width={25}
                                objectFit="contain"
                                object-position="50% 50%"
                            />
                        </a>
                    </Link> 
                </div>
                <div className="icon">
                    <Link href="https://www.instagram.com/gijshegeman/">
                        <a alt="Instagram">
                            <Image 
                                src={instagramIcon}
                                alt="Instagram"
                                layout="intrinsic"
                                width={21}
                                height={21}
                                objectFit="contain"
                            />
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default Footer