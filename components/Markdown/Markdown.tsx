import React, {
    FC,
    memo,
    useMemo,
} from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import {Blockquote, Code, List, generatorH, aDom} from "@/components/Markdown/type";


interface MDProps {
    title: string,
    content: string,
    scrollTop?:boolean
}

const markdown: string = `
> A
>> B
>>> C
>>>> D

# 在背后支撑的是你
## 在背后支撑的是你
### 在背后支撑的是你
#### 在背后支撑的是你
##### 在背后支撑的是你
###### 在背后支撑的是你

~~~js
 console.log(123)
~~~
`



const SideNav: FC<{ sideNav: any[] }> = function SideNavDOM(props) {

    // const {titleData:sideNav} = useData()
    const {sideNav} = props
    if (!sideNav.length) {
        return null
    }

    return (
        <>
            <div className='sticky top-0 hidden md:block'>
                <div className='absolute -right-52'>
                    <ul className='border-l-2 pl-2'>
                        {
                            sideNav.map((item) => (
                                <li key={item.id}>
                                    <a href={`#${item.id}`}>{item.title}</a>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}

const SideTop:FC<{scrollTop:boolean}> = memo(function SideTop(props) {
    const {scrollTop} = props
    if(!scrollTop){
        return null
    }
    return (
        <>
            <div className='relative'>
                <div className='absolute right-5 md:-right-16'>
                    <a
                        href='#header'
                        className='fixed bottom-2.5 text-3xl bg-green-200 rounded'
                    >
                        🔝
                    </a>
                </div>
            </div>
        </>
    )
})


export default memo(function Markdown(props: MDProps) {

    const {content = markdown,scrollTop=true} = props

    const sideNav = useMemo(() => {
        const template = content.split("\n")
        const head = []
        let flag = false;
        for (let i = 0; i < template.length; i++) {
            let s = template[i]
            if (s.startsWith('```')) {
                flag = !flag
            }
            if (!flag && (template[i - 1] === '' || template[i + 1] === '') && s.startsWith('#')) {
                s = s.replaceAll('#', '')
                s = s.replace(' ','')
                head.push(s)
            }
        }
        return head.map((item,i) => ({
            title:item,
            id: 'user-title-fn' + i
        }))
    }, [content])


    console.log(props, 'MD');
    return (
        <>
            <main className='markdown relative'>
                <SideNav sideNav={sideNav}/>
                <SideTop scrollTop={scrollTop}/>
                <ReactMarkdown
                    rehypePlugins={[rehypeRaw]}
                    remarkPlugins={[remarkGfm]}
                    components={{
                        code: Code,
                        ul: List,
                        ol: List,
                        blockquote: Blockquote,
                        // p: pDom,
                        a: aDom,
                        ...generatorH({sideNav})
                    }}
                >
                    {content}
                </ReactMarkdown>
            </main>

        </>
    )
})