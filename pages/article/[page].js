import {BASE_URL} from "@/util/api";


export async function getServerSideProps(context) {
    const url = `${BASE_URL}/retrieve?page_id=${context.query?.page}`
    const response = await fetch(url)
    const res = await response.json()
    console.log(res);
    return {
        props:{
            content: res
        }
    }
}

export default function ArticlePage(props) {
    const {content:{title,content,created_time}} = props

    return <>
        <h1>
            {title}
        </h1>
        <article>
            {content}
        </article>
        <footer>写于{(new Date(created_time)).toLocaleString()}</footer>
    </>
}