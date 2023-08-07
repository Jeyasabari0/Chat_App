import './App.css';
import io from "socket.io-client"
import { useState } from 'react'
import Chat from './Chat';
const socket = io.connect("http://localhost:3001")

function App() {

  const [username, setUsername] = useState('')
  const [room, setRoom] = useState('')
  const [showChat, setShowChat] = useState(false)

  const joinRoom = () => {
    if (username !== '' && room !== '') {
      socket.emit('join_room', room)
      setShowChat(true)
    }
  }

  return (
    <div className="App">
      {!showChat ?
        <div>
          <h3>Let's Chat</h3>
          <input type='text' placeholder='Name' onChange={(e) => { setUsername(e.target.value) }} />
          <input type='text' placeholder='Room Id' onChange={(e) => { setRoom(e.target.value) }} />
          <button onClick={joinRoom}>Join Chat</button>
        </div>
        :
        <Chat socket={socket} username={username} room={room} />
      }
    </div>
  );
}

export default App;
