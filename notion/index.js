const {Client} = require("@notionhq/client")
const Koa = require('koa')
const Router = require('@koa/router')
const app = new Koa()
const router = new Router()
require('dotenv').config({path: '../.env'})
const notion = new Client({auth: process.env.NOTION_KEY})
const database_id = process.env.NOTION_DATABASE_ID
console.log(database_id);
router.post('/create', (ctx, next) => {
    console.log(ctx.url, ctx.body, '/create')
})

router.get('/list', (ctx, next) => {
    console.log(ctx.url, ctx.body, '/list')
})

async function create() {
    const response = await notion.pages.create({
        parent: {database_id},
        properties: {
            name: {
                title: [
                    {
                        text: {
                            content: '鲁班'
                        }
                    }
                ]
            },
            context: {
                type: "rich_text",
                rich_text: [
                    {text: {content: '电玩小子'}},
                    {text: {content: '电玩小子'}}
                ]
            }
        }
    });
    return response
}

async function extractCtx() {
    const response = await notion.databases.query({database_id})
    const {results,next_cursor,has_more} = response ?? {}
    results.map(item => {
        const {properties} = item
        
    })
}

router.get('/', async (ctx, next) => {
//    const res = await notion.users.list({})
//    const response = await create()
//    for (let i = 0; i < 300; i++) {
//        const response = await create()
//    }
    const response = await notion.databases.query({database_id})
    console.log(response);

    ctx.body = JSON.stringify(response)
})

app.use(router.routes())


app.listen(8000)
