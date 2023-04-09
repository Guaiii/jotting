import {FC, memo} from "react";
import styles from "@/styles/article.module.css";
import Link from "next/link";


interface Item {
    id: string,
    title: string
    important: boolean
}

interface Props {
    list: {
        results: Item[]
    }
}

const ItemTitle: FC<Props> = (props): JSX.Element => {
    const {list: {results}} = props
    if (!results?.length) {
        return (
            <>
                暂无文章记载
            </>
        )
    }
    return (
        <ul className='list-none'>
            {
                results
                    ?.map(item => <li
                        key={item.id}
                        className={`relative ${item.important ? 'before:content-["✱"] before:absolute before:-left-5' : ''}`}
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
    )
}

export default memo(ItemTitle)