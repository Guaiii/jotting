import { NextResponse, userAgent } from 'next/server'
// import {NextApiRequest,NextApiResponse} from 'next'

export const config = {
   api: {
      bodyParser: {
         sizeLimit: '10mb',
      },
   },
}
export async function fetchDataMiddleware(req) {
   // console.log(req.body,req.bodyParams,req.bodyUsed,req.bodyParser,'fetchData');
   const {title,content} = req.body
   console.log(title,content);
   // return NextResponse.next()
}

export async function methodMiddleware (req,res){
   const method = (req.method || '').toLocaleLowerCase()
   console.log(method);
   switch (method) {
      case 'post':
         await fetchDataMiddleware(req,res);
         return
      case 'get':
         await middleware(req,res)
           return;
   }
   return NextResponse.next()
}



export function middleware(request) {
   const url = request.nextUrl
   const { device } = userAgent(request)
   const viewport = device.type === 'mobile' ? 'mobile' : 'desktop'
   url.searchParams.set('viewport', viewport)
   return NextResponse.rewrite(url)
}

// See "Matching Paths" below to learn more
// export const config = {
//     matcher: '/api',
// }
