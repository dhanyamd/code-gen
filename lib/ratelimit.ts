import { Duration } from "./types"
import {Ratelimit} from "@upstash/ratelimit"
import { kv } from "@vercel/kv"
export default async function rateLimit(key : string, maxRequests : number, window : Duration) {
   if(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
        const rateLimit = new Ratelimit({
            redis : kv,
            limiter : Ratelimit.slidingWindow(maxRequests, window)
        })
        const { success, limit, remaining, reset } = await rateLimit.limit(`ratelimit:${key}`)
        if(!success) {
            return {
                amount : limit,
                remaining : remaining,
                reset : reset
        }
        }
}
}