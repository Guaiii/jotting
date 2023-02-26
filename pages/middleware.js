//import {NextRequest, NextResponse, userAgent} from 'next/server'
//
//export function middleware(request) {
//    const url = request.nextUrl
//    console.log(url);
//    const {device} = userAgent(request)
//    console.log(device);
//    const viewport = device.type === 'mobile' ? 'mobile' : 'desktop'
//    url.searchParams.set('viewport', viewport)
//    return NextResponse.rewrite(url)
//}


import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request) {
    console.log(request);
    return NextResponse.redirect(new URL('/about-2', request.url))
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/api',
}
