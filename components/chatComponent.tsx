"use client"

import { useChat, Message } from "ai/react"


export default function chatComponent() {

    const{ input, handleInputChange, handleSubmit, isLoading, messages }= useChat(); 

    // console.log(messages)
    console.log(input)

    return(
        <div>
            {messages.map((message : Message) =>{
                return(
                    <div key={message.id}>
                        {
                            message.role === "assistant"
                            ?
                            <h3 className="text-lg font-semibold mt-2">Chat GPT</h3>
                            :
                            <h3 className="text-lg font-semibold mt-2">User</h3>
                        }

                        {message.content.split("\n").map((currentTextBlock: string, index : number) => {
                            if(currentTextBlock === "") {
                                return<p key={message.id + index}>&nbsp;</p>
                            }else{
                                return <p key={message.id + index}>{currentTextBlock}</p>
                            }
                        })

                        }

                    </div>
                )

            })}


            {/* <div>
                <h3 className="text-lg font-semibold mt-2">Chat GPT</h3>
                <p>I am chat gpt</p>
            </div>

            <div>
                <h3 className="text-lg font-semibold mt-2">User</h3>
                <p>I am the user</p>
            </div> */}


            
            <form action="" className="mt-12" onSubmit={handleSubmit}>
                <p>User Message</p>
                <textarea  
                    className="mt-2 w-full bg-slate-500 p-2" 
                    placeholder={"What are data structures"}
                    value={input}
                    onChange={handleInputChange}
                />

                <button className="rounded-md bg-blue-500 p-2 mt-2">Send message</button>
            </form>
        </div>
    )
}