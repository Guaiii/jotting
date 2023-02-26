import React, {useState, useEffect} from 'react'
import {useRouter} from "next/router";

import MyComponent from "@/component/rich";

//    w-60% md:contianer md:px-30 sm:px-20 lg:px-40 flex justify-center
//const DynamicComp = () => dynamic(() => import('../component/rich',{
//    loading: () => 'loading...',
//    ssr: false
//}))

export default function Main() {
    const router = useRouter()
    console.log(router);

    return <MyComponent/>;
}

function Demo({chilren}) {
    return (
        <div className='max-w-prose mx-auto'>
            <header className='pt-20 pb-10 m-auto'>
                <h1 className='text-3xl font-bold pb-5'>太虚幻境</h1>
                <nav className='flex gap-5 underline'>
                    <a href='#'>杂谈</a>
                    <a href='#'>朝花夕拾</a>
                    <a href='#'>分享</a>
                </nav>
            </header>
            <main className='pb-20'>

            </main>
            <footer className='text-center'>2023-2-18</footer>
        </div>
    )
}


import Head from 'next/head'
import Image from 'next/image'
import {Inter} from '@next/font/google'
//import styles from '@/styles/Home.module.css'

const inter = Inter({subsets: ['latin']})

function Text({children}) {
    return <p className={`${inter.className}py-3 indent-10`}>
        {children}
    </p>
}

function Home() {
    return (
        <article>
            <Text>
                总会有闲的蛋疼的时候，在这些日子里面，有颓废，有空虚，有无趣，总不能一直散发恶臭，总要谋计一些事情做的，
                现在就把那些点滴给记录，整理。
            </Text>
            <Text>
                希望伙计们不需要被生活的情绪给影响，历史不会留名于你，放心去做。可以沉沦于钱权酒色，到临暮，回想自己一生，只要不曾悔过，我认为都是精彩。
            </Text>
            <Text>
                《红楼梦》告诉你，一切都是虚妄，大起大落只在一瞬间，经历过，体验了其中美好足矣。
            </Text>
            <Text>
                《金瓶梅》告诉你，人生的高度都是自己“不择手段”来的
            </Text>
            <Text>
                我想告诉你的是，当下，做点事，记录着，哪怕只是鸡皮蒜毛，至少证明存在过。
            </Text>
        </article>
    )
}
