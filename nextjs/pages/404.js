import Link from 'next/link'
import Head from 'next/head'

export default function error404() {

    return (<>
        <Head>
            <title>Rein Rensen | Error 404</title>
        </Head>
        <div className="flex flex-col gap-10 items-center">

            <div className="font-thin text-2xl">HTTP 404 | Page not found.</div>

            <div className="flex flex-col gap-2 items-center">
                <div>Hey, de pagina die u probeert te bezoeken lijkt niet te bestaat!</div>
                <Link href='/' className="text-[#21564e] hover:text-[#92aba6] animate ease-out duration-300">&larr; terug naar home</Link>
            </div>

        </div>
    </>)
}