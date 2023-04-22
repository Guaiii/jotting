import { createDatabase} from "@/pages/api/database";


async function database(req,res) {
    const response = await createDatabase()
    // console.log(response);
    if(!response.id){
        res.status(400).send({code:400,msg:'请求失败'})
    }
    res.status(200).json(response)
}

export default database