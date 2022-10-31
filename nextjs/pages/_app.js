//_app.js
import '../styles/globals.css'
import Header from '../components/header'
import { AnimatePresence } from 'framer-motion'
import Script from "next/script"
import { server } from '../config'

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
const customPaths = [
    "/linktree"
]

function App({ Component, pageProps, router, links }) {
    const dev = process.env.NODE_ENV !== 'production'
    const url = `https://reinrensen.nl${router.route}`

    if (customPaths.includes(router.pathname))
        return (<>
            {!dev && (
                <div>
                    <Script
                        strategy="lazyOnload"
                        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
                    />

                    <Script id="google-analytics" strategy="lazyOnload">
                        {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                    page_path: window.location.pathname,
                    });
                `}
                    </Script>
                </div>
            )}

            <div className="
                min-h-screen
                bg-[#ececec]
            ">
                <AnimatePresence
                    mode='wait'
                    onExitComplete={() => window.scrollTo(0, 0)}
                >
                    <Component {...pageProps} key={url} />
                </AnimatePresence>
            </div>
        </>)

    return (<>
        {!dev && (
            <div>
                <Script
                    strategy="lazyOnload"
                    src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
                />

                <Script id="google-analytics" strategy="lazyOnload">
                    {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                    page_path: window.location.pathname,
                    });
                `}
                </Script>
            </div>
        )}

        <div className="
            min-h-screen
            bg-[#ececec] 
        ">
            <Header links={links} />
            <AnimatePresence
                mode='wait'
                initial={false}
                onExitComplete={() => window.scrollTo(0, 0)}
            >
                <Component {...pageProps} key={url} />
            </AnimatePresence>
        </div>
    </>

    )
}

export default App