import React, { useEffect, useState } from 'react'

const Chat = ({ socket, username, room }) => {

    const [curretMessage, setCurrentMessage] = useState('')
    const [messageList, setMessageList] = useState([])

    const sendMessage = async () => {
        if (curretMessage !== '') {
            const messageData = {
                room: room,
                author: username,
                message: curretMessage,
                time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
            }
            await socket.emit('send_message', messageData)
            setMessageList((list) => [...list, messageData])
            setCurrentMessage('')
        }
    }

    useEffect(() => {
        socket.on('receive_message', (data) => {
            setMessageList((list) => [...list, data])
        })
    }, [socket])

    return (
        <div>
            <div className='header'>
                <h6>Live Chat</h6>
            </div>
            <div className='body'>
                {
                    messageList.map((msg) => {
                        return (
                            <div id={username === msg.author ? 'you' : 'others'}>

                                <div>
                                    <div>
                                        <p>{msg.message}</p>
                                    </div>
                                    <div>
                                        <p>{msg.time} {msg.author}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className='footer'>
                <input value={curretMessage} placeholder='Hey...' onChange={(e) => { setCurrentMessage(e.target.value) }} onKeyUp={(e) => { e.key === 'Enter' && sendMessage() }} />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    )
}

export default Chat
