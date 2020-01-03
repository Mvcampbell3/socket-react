import React, { useState, useEffect, useRef } from 'react';
import './Landing.css'

const Landing = (props) => {

  const [newRoom, setNewRoom] = useState('');

  const testing = true;
  let socket = useRef(null);

  let { selectedRoom, joinRoom, appSocket } = props

  useEffect(() => {
    if (selectedRoom) {
      console.log('room has been changed', selectedRoom);
      joinRoom()
    }
  }, [selectedRoom, joinRoom])

  useEffect(() => {
    if (appSocket) {
      socket.current = appSocket

      socket.current.emit('testing')

      socket.current.on('test back', (message) => {
        console.log(message)
      })
    }
  }, [appSocket])

  const handleNewRoomInput = (e) => {
    setNewRoom(e.target.value)
  }

  const createRoom = () => {
    console.log(newRoom);
    props.setSelectedRoom(newRoom);
  }

  const testRoom = () => {
    props.setSelectedRoom('testing');
  }

  const landingGameSet = () => {
    props.setLanding(!props.landing)
  }

  return (
    <div className="wrapper">
      <h3>This is the landing page</h3>

      {testing ?
        <div className='test-area'>
          <h4 className='text-center'>Testing Area</h4>
          <div className="testing-box">
            <button onClick={() => { props.getRooms() }}>Get Rooms</button>
            <button onClick={testRoom}>Test Room</button>
            <button onClick={props.deleteRooms}>Delete Rooms</button>
            <button onClick={landingGameSet}>Game Page</button>
          </div>
        </div>
        : null
      }

      <div className="landing-container">
        <div className="left-side">
          <div className="form-container">
            <div className="input-group">
              <input type="text" placeholder='Room Name...' value={newRoom} onChange={(e) => { handleNewRoomInput(e) }} />
            </div>
            <div className="input-group">
              <button onClick={createRoom}>Create Room</button>
            </div>
          </div>
        </div>
        <div className="right-side">
          {props.rooms.length > 0 ?
            <>
              {props.rooms.map((room, i) => (
                <div className="room" key={i}>{room.name}</div>
              ))}
            </>
            : <h4 className='text-center'>There are no rooms yet</h4>
          }
        </div>
      </div>


    </div>
  );
}

export default Landing;