// import {methodMiddleware, middleware} from "@/pages/middleware";
import {create} from "@/pages/api/database";
export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb',
        },
    },
}
const articleCreate = async (req, res) => {
    if(req.method !== 'POST'){
        res.status(400).send({msg:'请求方式错误'})
    }
    const response = await create(req.body)
    if(!response.id){
        res.status(400).send({code:400,msg:'请求失败'})
    }
    res.status(200).json(response)
}

export default articleCreate