import Link from "next/link";
import {BASE_URL} from "@/util/api";
import dynamic from "next/dynamic";

export async function getServerSideProps(context) {
    const {page_token} = context.query
    console.log(context.req);
    const url = BASE_URL + '/query'
    const type = context.resolvedUrl.slice(1)
    const response = await fetch(url,{
        method:'POST',
        body:JSON.stringify({
            page_token,
            type
        })
    })
    const list = await response.json()
    console.log({list,type});
    if (!list) {
        return {
            notFount: true
        }
    }
    return {
        props: {
            list
        }
    }
}


function Paging(props) {
    const {pageToken, hasMore} = props
    if (!hasMore) {
        return null
    }
    return <Link href={`/article?page_token=${pageToken}`}>下一页</Link>
}


const Title = dynamic(() => import('./components/index'),{
    loading:() => <>loading...</>,
    // ssr:false
})

export default function Index(props) {
    const {list} = props

    return (
        <>
            <Title {...props}/>
            <br/>
            <Paging
                hasMore={list.has_more}
                pageToken={list.next_cursor}
            />
        </>
    )
}





