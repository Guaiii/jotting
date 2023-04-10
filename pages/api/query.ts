import {query} from "@/pages/api/database";


interface ExtractReturn {
    id: string,
    create_time: string,
    title: string,
    content: string
}

export function extract(data, res): ExtractReturn[] {
    const {results} = data
    if (!results.length) {
        res.status(300).send({code: 300, msg: '数据为空'})
    }
    return results.map(item => {
        const {properties: {context, name, checkbox}, id, created_time} = item
        const content = context.rich_text.reduce((pre, cur) => {
            const {text: {content}} = cur
            pre += content
            return pre
        }, '')
        return {
            id, // 当前页id
            created_time, // 创建时间
            title: name.title[0]?.text?.content || '震惊！这篇文章竟然没有数据',
            content,
            important: checkbox.checkbox
        }
    })
}

const articleQuery = async (req, res) => {
    if (req.method !== 'POST') {
        res.status(400).send({code: 400, msg: '请求失败'})
    }
    const {page_token, type} = JSON.parse(req.body)
    const response = await query(page_token, type)
    const result = {...response, results: extract(response, res)}
    res.status(200).json(result)
}

export default articleQuery