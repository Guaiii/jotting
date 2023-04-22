import {BASE_URL} from "@/util/api";
import dynamic from "next/dynamic";
import {useCallback, useState} from "react";

let type, page_token;
const getData = async (start_cursor?: string) => {
    const url = BASE_URL + '/query'
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            page_token,
            type,
            start_cursor
        })
    })
    return await response.json()
}

// const fetchData = async (current?:number) => {
//     const data = new Array(100).fill(0).map((el, i) => {
//         const id = Date.now() + i + ''
//         return {
//             id,
//             important: Math.random() > 0.5,
//             title: id,
//         }
//     })
//     const obj = {
//         results: data,
//         has_more: true,
//         next_cursor: ++next
//     }
//     return await new Promise((resolve, reject) => {
//         setTimeout(() => resolve(obj), 1000)
//     })
// }

export async function getServerSideProps(context) {
    const {page_token: token} = context.query
    page_token = token
    type = context.resolvedUrl.slice(1)
    const list = await getData()
    // const list = await fetchData()
    if (!list) {
        return {
            notFount: true
        }
    }
    return {
        props: {
            list,
        }
    }
}


const Title = dynamic(() => import('./components/index'), {
    loading: () => <>loading...</>,
    // ssr:false
})

export default function Index(props) {
    const {list: {results, has_more, next_cursor}} = props
    const [loading, setLoading] = useState('')
    const [articles, setArticles] = useState(results)

    const handleScroll = useCallback(async (event) => {
        const {target: {scrollTop, clientHeight, scrollHeight}} = event
        const bottom = scrollTop + clientHeight === scrollHeight
        if (!bottom) {
            return
        }
        setLoading('loading...')
        if (has_more) {
            try {
                const list = await getData(next_cursor)
                // const list = await fetchData(next)
                const {results} = list
                if (results.length) {
                    setLoading('')
                    setArticles(s => [...s, ...results])
                }
            } catch (e) {
                setLoading(e.message)
            }
        }
    }, [has_more, next_cursor]);

    return (
        <>
            <Title articles={articles} handleScroll={handleScroll}/>
            {loading}
        </>
    )
}





