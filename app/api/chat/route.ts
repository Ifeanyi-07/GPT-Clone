import { Configuration, OpenAIApi } from "openai-edge";
// import { OpenAIStream, StreamingTextResponse } from "ai";

// export const runtime = 'edge'; // Provide optimal infrastructure for our API route (https://edge-runtime.vercel.app/)

// const config = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY
// })
// const openai = new OpenAIApi(config);


// // POST localhost:3000/api/chat
// export async function POST(request: Request) {
//     const { messages } = await request.json(); // { messages: [] }

//     // messages [{ user and he says "hello there" }]
//     console.log(messages);

//     // GPT-4 system message
//     // system message tells GPT-4 how to act
//     // it should always be at the front of your array

//     // createChatCompletion (get response from GPT-4)
//     const response = await openai.createChatCompletion({
//         model: 'gpt-4o-mini',
//         // stream: true,
//         messages: [
//             { role: "system", content: "You are a helpful assistant. You explain software concepts simply to intermediate programmers."},
//             // ...messages
//             {
//                 role: "user",
//                 content: "Write a haiku about recursion in programming.",
//             },
//         ]
//     })

//     // create a stream of data from OpenAI (stream data to the frontend)
//     const stream = await OpenAIStream(response);



// import { OpenAIStreamCallbacks, StreamingTextResponse } from "ai";
import { OpenAIStream, StreamingTextResponse} from "ai";
import { ProcessEnvOptions } from "child_process";

export const runtime= 'edge';

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config);



export async function POST(request: Request) {
    const {messages}= await request.json();

    // GPT-4 system message
    // system message tells GPT-4 how to act
    // it should always be at the front of your array

    // createChatCompletion to get response from chat GPT
    const response = await openai.createChatCompletion({
        model: 'gpt-4o-mini',
        stream: true,
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            // ...messages
            {
                role: "user",
                content: "Write a haiku about recursion in programming.",
            },
        ]
    })

    // create a stream of data from openAI to stream data to the frontend
    const stream = await OpenAIStream(response);

    // send the stream as a response to our client/frontend
    return new StreamingTextResponse(stream);


    
}