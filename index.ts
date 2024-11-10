/**
 * Author by Riky Ripaldo
 * Date 2024-11-09
*/

import "dotenv/config"
import { SigninAkun, SignupAkun } from "./src/secret/login"

const print = console.log

const server = Bun.serve({
    port: process.env.PORT,
    async fetch(req: Request) {
        const url = new URL(req.url)
        const { pathname } = url
        if (pathname === "/api/signup" && req.method === "POST") {
            const { status, message } = await SignupAkun(await req.json())
            return new Response(JSON.stringify({ status, message }), { status: 200 })
        }
        if (pathname === "/api/signin" && req.method === "POST") {
            const { status, message } = await SigninAkun(await req.json())
            return new Response(JSON.stringify({ status, message }), { status: 200 })
        }
        return new Response("Nothing", { status: 404 })
    }
})

print(`Server running on port ${server.port}`)