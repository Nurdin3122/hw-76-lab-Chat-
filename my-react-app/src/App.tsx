import './App.css'
import MsgForm from "./components/MsgFrom/MsgForm.tsx";
import {useEffect, useState} from "react";
import {Message} from "./type.ts";
import ShowMsg from "./components/ShowMsg/ShowMsg.tsx";
const App = () => {
        const [messages, setMessages] = useState<Message[]>([]);
        const [timeMsg, setTimeMsg] = useState<string>("");
    const getMessages = async (time = "") => {
        try {
            const response = await fetch(`http://localhost:8020/messages${time ? `?time=${time}` : ''}`);
            if (response.ok) {
                const posts = await response.json();
                if (posts.length > 0) {
                    setMessages(posts)
                    setTimeMsg(posts[posts.length - 1].time);
                }
            } else {
                console.error("Ошибка", response.status);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    useEffect(() => {
        getMessages();
        const interval = setInterval(() => getMessages(timeMsg), 3000);
        return () => clearInterval(interval);
    }, [timeMsg]);

       const sendMessage = () => {
           getMessages();
       }

    return (
        <>
            <MsgForm onSend={sendMessage}></MsgForm>
            <div className="block-Msg">
                {messages.map((message, index) => (
                    <ShowMsg
                        author={message.author}
                        message={message.message}
                        key={`${message.id}-${index}`}
                        dataTime={message.time}
                    />
                ))}
            </div>
        </>
    )
};


export default App
