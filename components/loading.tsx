import {memo} from "react";
import styles from '@/styles/article.module.css'

export default memo(function Loading() {
    return (
        <>
            <div className='w-full h-[calc(100%-280px)] flex flex-row gap-1'>
                <div className={styles['typing-effect']}>
                    逝者如斯夫，不舍昼夜
                </div>
                <div className={`text-xl ${styles['loading-wait-effect']}`}>
                    __
                </div>
            </div>
        </>
    )
})