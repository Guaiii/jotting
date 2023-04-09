import React, {createElement} from "react";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
export const Code = ({node, inline, className, children, ...props}) => {
    const match = /language-(\w+)/.exec(className || '')
    if (!inline && match) {
        return (
            <SyntaxHighlighter
                language={match[1]}
                PreTag="div"
                {...props}
            >
                {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
        )
    }

    return (
        <code
            className='bg-[#eef0f1] p-1 underline hover:decoration-2 underline-offset-4 rounded text-[--code-text-color]' {...props}>
            {children}
        </code>
    )
}

export const Blockquote = (props) => {
    const {children} = props
    return <div className='-mx-5 pl-4 pr-5 border-l-4 border-sky-400 bg-sky-300/[0.15] indent-0'>
        {children}
    </div>
}

export const List = (props) => {
    const { ordered, className, children, depth} = props
    if (className) {
        return (
            <ul>
                {children}
            </ul>
        )
    }
    const ulType: string = depth > 1
        ? "list-square"
        : depth === 1
            ? 'list-circle'
            : 'list-disc'
    const olType: string = ordered && !depth
        ? 'list-[decimal]'
        : depth === 1
            ? 'list-[lower-roman]'
            : 'list-[lower-greek]'
    const pl: string = depth > 0 ? 'pl-4' : ''
    const type = ordered ? olType : ulType
    return (
        <ul className={`${pl} ${type} quote:target:bg-green-200`}>
            {children}
        </ul>
    )
}


export const Title = (props) => {
    const {children, node, sideNav} = props
    const current = children[0]
    if(current === 'Footnotes'){
        children[0] = '注释&脂批'
    }
    const id = sideNav.find(item => current === item.title)?.id || ''
    return (
        <>
            {
                createElement(node.tagName,
                    {
                        style: {
                            fontSize: 'revert',
                            textIndent: 0
                        },
                        id
                    },
                    ...children)
            }
        </>
    )
}


export const generatorH = ({sideNav}) => {
    const h = Array(6).fill(0).map((el, i) => String(i + 1))
    const title = {}
    for (const v of h) {
        title[`h${v}`] = (props) => <Title {...props} sideNav={sideNav}/>
    }
    return title
}

export const aDom = (props) => {
    const {children, href, node, ...rest} = props
    const isSelf = href.startsWith('#') ? '_self' : '_blank'
    const styles = 'underline hover:decoration-2 underline-offset-4'
    if (!href) {
        return (
            <>
                <span className={styles}>{children}</span>
            </>
        )
    }
    return (
        <a
            href={href}
            target={isSelf}
            rel="noreferrer"
            className={styles}
            {...rest}
        >
            {children}
        </a>
    )
}

// export const pDom = (props) => {
//     const {children} = props
//     return (
//         <>
//             <p>
//                 {children}
//             </p>
//         </>
//     )
// }
