import {BASE_URL} from "@/util/api";
import React, {memo, useMemo} from "react";
import Markdown from "@/components/Markdown/Markdown";


export async function getServerSideProps(context) {
    const url = `${BASE_URL}/retrieve?page_id=${context.query?.page}`
    const response = await fetch(url)
    const res = await response.json()
    return {
        props: {
            content: res
        }
    }
}

export default memo(function ArticlePage(props) {
    const {content: {title, content, created_time}} = props
    const date = useMemo(() => (new Date(created_time)).toLocaleString(),[created_time])
    return (
        <>
            {/*<h1>*/}
            {/*    {title}*/}
            {/*</h1>*/}
            <Markdown title={title} content={content}/>
            <footer className='pt-10' suppressHydrationWarning>更新于{date}</footer>
        </>
    )
})