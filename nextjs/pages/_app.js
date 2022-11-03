import { useRouter } from 'next/router'
import '../scss/layout.scss'
import Layout from '../components/layout'
import { AnimatePresence } from 'framer-motion'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  
  return (
  <Layout>
      <AnimatePresence
        exitBeforeEnter
        initial={false}
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <Component {...pageProps} key={router.route}/>

        </AnimatePresence>
    </Layout>
  )
}

export default MyApp
