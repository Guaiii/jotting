import {Client} from "@notionhq/client";
const database_id = process.env.NOTION_DATABASE_ID
const notion = new Client({auth: process.env.NOTION_KEY})
console.log('DB 文件被加载')
async function create(data = {}) {
    if(!data || !data.title || !data.content){
        throw new Error('create参数错误')
    }
    let {title,content} = data
    if(typeof content === "string"){
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
                rich_text: content.map(item => ({text:{content:item}}))
            }
        }
    });
}


async function update(){}
async function remove(){}
async function query(page_token){
    return await notion.databases.query({database_id,start_cursor:page_token})
}

async function retrieve(page_id){
    return await notion.pages.retrieve({page_id})
}


export {
    database_id,
    create,
    update,
    remove,
    query,
    retrieve
}


export default notion


