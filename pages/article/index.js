import styles from '@/styles/article.module.css'
import Link from "next/link";
import {BASE_URL} from "@/util/api";

export async function getServerSideProps(context) {
    const {page_token} = context.query
    let url = BASE_URL + '/query'
    if (page_token) {
        url += `?page_token=${page_token}`
    }
    const response = await fetch(url)
    const list = await response.json()
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

export default function Index(props) {
    const {list} = props

    return <>
        <ul className={styles.rank}>
            {
                list
                    .results
                    .map(item => <li
                        key={item.id}
                    >
                        <span
                            className={styles.prefix}
                        >
                            <Link href={`/article/${item.id}`}>
                                {item.title}
                            </Link>
                        </span>
                    </li>)
            }
        </ul>
        <Paging
            hasMore={list.has_more}
            pageToken={list.next_cursor}
        />
    </>
}





