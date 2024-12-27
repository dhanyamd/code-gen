import { getDefaultMode, getModelClient, LLMConfig } from "@/app/models";
import { LLMModel } from "@/app/models";
import { CoreMessage, LanguageModel, streamObject } from "ai";
import { NextRequest } from "next/server";
import ratelimit from "@/lib/ratelimit";
import { Duration } from "@/lib/types";
import { toPrompt } from "@/lib/prompt";
import { Templates } from "@/lib/templates";
import { CapsuleSchema as schema } from "@/app/lib/schema"

const ratelimitMaxRequests = process.env.RATE_LIMIT_MAX_REQUESTS
  ? parseInt(process.env.RATE_LIMIT_MAX_REQUESTS)
  : 100;

const ratelimitWindow = process.env.RATE_LIMIT_WINDOW
  ? (process.env.RATE_LIMIT_WINDOW as Duration)
  : "1d";

export async function POST(req : NextRequest) {
    const { messages, userID, template, model, config} : {
        messages : CoreMessage[],
        userID : string,
        template : Templates,
        model : LLMModel,
        config : LLMConfig
    } = await req.json()
   
    const limit = !config.apiKey
    ? await ratelimit(userID, ratelimitMaxRequests, ratelimitWindow)
    : false;        

    if (limit) {
        return new Response("You have reached your request limit for the day.", {
          status: 429,
          headers: {
            "X-Ratelimit-Limit": limit.amount.toString(),
            "X-RateLimit-Remaining": limit.remaining.toString(),
            "X-RateLimit-Reset": limit.reset.toString(),
          },
        });
      }
      const {
        model: modelNameString,
        apiKey: modelApiKey,
        ...modelParams
      } = config;
    
      const modelClient = getModelClient(model, config)

      const stream = await streamObject({
        model : modelClient as LanguageModel,
        schema,
        system: toPrompt(template),
        messages,
        mode: getDefaultMode(model),
        ...modelParams,
      })
      return stream.toTextStreamResponse();
}
