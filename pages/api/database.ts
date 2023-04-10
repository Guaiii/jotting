import {Client} from "@notionhq/client";

const database_id: string = process.env.NOTION_DATABASE_ID
const notion = new Client({auth: process.env.NOTION_KEY})

export interface Props {
    title: string,
    content: string[]
}


async function create(params: any) {
    console.log(!params, params, 'body')
    const data = JSON.parse(params)
    if (!data || !data.title || !data.content) {
        throw new Error('create参数错误')
    }
    let {title, content, important = false, type} = data

    if (content.length > 2000) {
        let len = content.length, cut = [], i = 0, counter = 2000;
        while (len > 0) {
            cut.push(content.slice(i * counter, ++i * counter))
            len -= counter
        }
        content = cut
    } else {
        content = [content]
    }
    return await notion.pages.create({
        parent: {database_id},
        properties: {
            name: {
                title: [
                    {
                        text: {
                            content: title
                        }
                    }
                ]
            },
            context: {
                type: "rich_text",
                rich_text: content.map(item => ({text: {content: item}}))
            },
            checkbox: {
                type: 'checkbox',
                checkbox: important,
            },
            select: {
                type: 'select',
                select: {
                    name: type
                }
            }
        }
    });
}


async function update() {
}

async function remove() {
}

async function query(page_token, type) {
    return await notion.databases.query({
        database_id, start_cursor: page_token,
        filter: {
            property: 'select',
            select: {
                equals: type
            }
        }
    })
}

async function retrieve(page_id) {
    return await notion.pages.retrieve({page_id})
}

async function createDatabase() {
    return await notion.databases.create({
        parent: {
            page_id: database_id,
        },
        properties: {}
    })
}


export {
    database_id,
    create,
    update,
    remove,
    query,
    retrieve,
    createDatabase
}


export default notion


