import {FC, memo, UIEventHandler} from "react";
import styles from "@/styles/article.module.css";
import Link from "next/link";

interface Item {
    id: string,
    title: string
    important: boolean,
}

interface Props {
    articles: Item[]
    handleScroll: UIEventHandler<HTMLElement>
}

const ItemTitle: FC<Props> = (props): JSX.Element => {
    const {articles, handleScroll} = props
    if (!articles?.length) {
        return (
            <>
                暂无文章记载
            </>
        )
    }

    // return (
    //     <>
    //         <div className={`overflow-auto h-[calc(100%-280px)] ${styles['scrollbar-hidden']}`} onScroll={handleScroll}>
    //             <ul>
    //                 {
    //                     Array(100).fill(0).map((el, i) => <li key={i}>{i}</li>)
    //                 }
    //             </ul>
    //         </div>
    //     </>
    // )


    return (
        <ul className={`list-none h-[calc(100%-280px)] ${styles['scrollbar-hidden']}`} onScroll={handleScroll}>
            {
                articles
                    ?.map(item => <li
                        key={item.id}
                        className={`relative active:bg-green-200 visited:bg-green-200 overflow-x-hidden text-ellipsis ${item.important ? 'before:content-["✱"] before:mr-1' : 'before:content-[""] before:pl-4'}`}
                    >
                        <Link href={`/article/${item.id}`}>
                            {item.title}
                        </Link>
                    </li>)
            }
        </ul>
    )
}

export default memo(ItemTitle)