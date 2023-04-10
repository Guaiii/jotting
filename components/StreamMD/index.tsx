import {FC, memo, useCallback, useRef, useState} from "react";
import Markdown from "@/components/Markdown/Markdown";
import {BASE_URL, validValue} from "@/util/api";

interface InitData {
    title: string,
    content: string,
    important: boolean,
    type: 'article' | 'news' | 'luxun' | 'share'
}

const init: InitData = {
    title: '',
    content: '',
    important: false,
    type: 'article'
}

const ReadMD: FC = (): JSX.Element => {
    const ref = useRef<HTMLInputElement | null>(null)
    const [data, setData] = useState<InitData>(init)
    // const [isPending, setTransition] = useTransition()

    const uploadFile = useCallback((event) => {
        const files = event.target?.files || []
        for (const file of files) {
            const reader = new FileReader()
            reader.readAsText(file, 'utf-8')
            let chunk: string = ''
            const handleEvent = (event) => {
                // console.log(event.type, event.loaded)
                const {type} = event

                if(type === 'error'){
                    console.log('上传失败');
                }

                if (type === "load") {
                    chunk = reader.result as string;
                    setData(s => ({...s, content: chunk}))
                }
            }
            reader.addEventListener('load', handleEvent);
            reader.addEventListener('error', handleEvent);
        }
    }, [])

    const remove = useCallback(() => {
        const dom = ref.current
        dom.value = ''
        setData(init)
    }, [])

    const submitMD = useCallback(async () => {
        if (!validValue(data)) {
            return
        }
        const response = await fetch(BASE_URL + '/create', {
            method: 'POST',
            body: JSON.stringify(data)
        })
        await response.json()
    }, [data])

    const gatherValue = useCallback((e) => {
        const {target: {name, value, checked}} = e
        data[name] = value
        if (name === 'title') {
            data.title = value
        }
        if (name === 'important') {
            data.important = checked
        }
        if(name === 'type'){
            data.type = value
        }
        setData({...data})
    }, [data])

    return (
        <>
            <div className='flex justify-between'>
                <label
                    htmlFor="upload"
                    className='rounded-md block text-center py-4 px-8 bg-cyan-500 hover:bg-cyan-600'
                >
                    上传
                </label>

                <button
                    onClick={remove}
                    className='rounded-md block text-center py-4 px-8 bg-cyan-500 hover:bg-cyan-600'
                >删除
                </button>
                <button
                    onClick={submitMD}
                    className='rounded-md block text-center py-4 px-8 bg-cyan-500 hover:bg-cyan-600'
                >提交
                </button>
            </div>
            <input
                ref={ref}
                id='upload'
                name='upload'
                type='file'
                accept='.md,.MD,.markdown'
                className='invisible'
                onChange={uploadFile}
            />
            <br/>
            <input
                name='title'
                onChange={gatherValue}
                value={data.title}
            />
            <br/>
            <select name="type" id="type" onChange={gatherValue} defaultValue={data.type}>
                <option value="article">article</option>
                <option value="news">news</option>
                <option value="luxun">luxun</option>
                <option value="share">share</option>
            </select>
            <br/>
            <input
                type="checkbox"
                name="important"
                id="important"
                onChange={gatherValue}
            />
            <Markdown content={data.content} title=''/>
        </>
    )
}


export default memo(ReadMD)