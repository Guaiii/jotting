import React, {useEffect, useState} from 'react'
import dynamic from 'next/dynamic'

import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(import('react-quill'), {ssr: false, loading: () => <p>Loading ...</p>});


const container = [
    ['bold', 'italic', 'underline', 'strike'], // 加粗，斜体，下划线，删除线
    ['blockquote', 'code-block'], // 引用，代码块
    ['link', 'image' /**'video' */], // 上传链接、图片、上传视频
    [{header: 1}, {header: 2}], // 标题，键值对的形式；1、2表示字体大小
    [{list: 'ordered'}, {list: 'bullet'}], // 列表
    [{script: 'sub'}, {script: 'super'}], // 上下标
    [{indent: '-1'}, {indent: '+1'}], // 缩进
    [{direction: 'rtl'}], // 文本方向
    [{size: ['small', false, 'large', 'huge']}], // 字体大小
    [{header: [1, 2, 3, 4, 5, 6, false]}], // 几级标题
    [{color: []}, {background: []}], // 字体颜色，字体背景颜色
    [{font: []}], // 字体
    [{align: []}], // 对齐方式
    ['clean'], // 清除字体样式,
]

export default function EditorComponent() {
    const [value, setValue] = useState('have two down son 有两下子（:');
    const [isEdit] = useState(true)
    useEffect(() => {
        if (!document) {
            return
        }
        const ReactQuill = require('react-quill');
        const {Quill} = ReactQuill;
        const dom = document.querySelector('.quill')
        console.log(dom)
        if (!dom) {
            return;
        }
        new Quill(dom, {
            modules: {
                toolbar: {
                    container,
                    handlers: {
                        image() {
                            const url = window.prompt()
                            if (!url) {
                                return
                            }
                            const quill = this.quill
                            const cursorPosition = quill.getSelection().index; //获取当前光标位置
                            quill.insertEmbed(cursorPosition, 'image', url); //插入图片
                            quill.setSelection(cursorPosition + 1); //光标位置加1
                        }
                    }
                }
            },
            theme: 'snow',
        })

    }, [])

    useEffect(() => {
        console.log({value});
        if (value.length > 2000) {
            const cut = [];
            let i = 0, len = value.length;
            while (len) {
                const snippet = value.slice(i * 1000, (i + 2) * 1000)
                cut.push(snippet)
                len -= 2000
                i += 2
            }
        }
    }, [value])


    return <>
        <ReactQuill
            readOnly={!isEdit}
            modules={isEdit ? {toolbar: container} : {}}
            theme={isEdit ? 'snow' : 'bubble'}
            value={value}
            onChange={setValue}
        />
    </>
}
