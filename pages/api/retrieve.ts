import {retrieve} from "@/pages/api/database";
import {extract} from "@/pages/api/query";

async function articleRetrieve(req, res) {
    const response = await retrieve(req.query.page_id)
    if (!response) {
        res.status(400).send({code: 400, msg: '获取不到当前数据'})
    }
    res.status(200).json(extract({results: [response]}, res)?.[0])
}

export default articleRetrieve