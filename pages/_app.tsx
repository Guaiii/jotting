import 'tailwindcss/tailwind.css'
import '@/styles/globals.css'
import dynamic from "next/dynamic";

const Layout = dynamic(() => import('./Layout'),{
    loading: () => <>Loading...</>
})


export default function App({Component, pageProps}) {

    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>

    )
}
