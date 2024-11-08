import React, { useEffect, useRef, useState } from 'react';
import { io } from "socket.io-client";

const App = () => {
  const [client] = useState(() => io("http://localhost:1111/")); // Only initialize once
  const [boxes, setBoxes] = useState(Array(9).fill(null));
  const [created, setCreated] = useState(false);
  const nameRef = useRef(null);
  const [name, setName] = useState("");
  const [Oname, setOName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [myRole, setMyRole] = useState("");
  const [turn, setTurn] = useState("x");

  useEffect(() => {
    // on joined message
    client.on("joined-message", ({ message, rName }) => {
      setRoomName(rName);
    });

    // getting opponent name
    client.on('oponent-name', ({ name, role }) => {
      setOName(name);
      setMyRole(role);
    });

    client.on("mark-move", ({ move, nextTurn, mark }) => {
      setBoxes((prevBoxes) => {
        const newBoxes = [...prevBoxes];
        newBoxes[move] = mark;
        return newBoxes;
      });
    
      // Check winner after updating boxes
      const winner = checkWinner();
      if (winner) {
      client.emit('winner-detail',{
        roomName,
        winner
      })
      }
    
      setTurn(nextTurn);
    });
    
    
  }, [client]);

  // JOINING THE ROOM
  const handleJoin = () => {
    setCreated(true);
    client.emit('join-room', { name: nameRef.current.value, id: client.id });
    setName(nameRef.current.value);
  };

  // MARKING THE BOX
  const handleMark = (index) => {
    if (boxes[index]) return; // If already marked, do nothing

    if (turn === myRole) {
      client.emit('move', {
        move: index,
        roomName,
        turn
      });
    }
  };
  const checkWinner = () => {
    // Check rows
    if (boxes[0] && boxes[0] === boxes[1] && boxes[1] === boxes[2]) {
      return boxes[0]; // Winner is either 'X' or 'O' in the first row
    }
    if (boxes[3] && boxes[3] === boxes[4] && boxes[4] === boxes[5]) {
      return boxes[3]; // Winner is either 'X' or 'O' in the second row
    }
    if (boxes[6] && boxes[6] === boxes[7] && boxes[7] === boxes[8]) {
      return boxes[6]; // Winner is either 'X' or 'O' in the third row
    }
  
    // Check columns
    if (boxes[0] && boxes[0] === boxes[3] && boxes[3] === boxes[6]) {
      return boxes[0]; // Winner is either 'X' or 'O' in the first column
    }
    if (boxes[1] && boxes[1] === boxes[4] && boxes[4] === boxes[7]) {
      return boxes[1]; // Winner is either 'X' or 'O' in the second column
    }
    if (boxes[2] && boxes[2] === boxes[5] && boxes[5] === boxes[8]) {
      return boxes[2]; // Winner is either 'X' or 'O' in the third column
    }
  
    // Check diagonals
    if (boxes[0] && boxes[0] === boxes[4] && boxes[4] === boxes[8]) {
      return boxes[0]; // Winner is either 'X' or 'O' in the first diagonal
    }
    if (boxes[2] && boxes[2] === boxes[4] && boxes[4] === boxes[6]) {
      return boxes[2]; // Winner is either 'X' or 'O' in the second diagonal
    }
  
    // No winner found
    return null;
  };
  
  
  

  return (
    <main className='h-screen w-full bg-slate-200 flex 
    flex-col
    items-center justify-center'>
      {created ? (
        <>
          {/* GAMEBOARD */}
          <div className='w-[80%] h-[60px] flex items-center justify-between py-2 lg:w-[40%]'>
            <h1 className='h-full w-[40%] rounded-md bg-gray-800 text-slate-100 flex items-center justify-center'>{name}</h1>
            <h1 className='h-full w-[40%] rounded-md bg-gray-600 text-slate-100 flex items-center justify-center'>{Oname}</h1>
          </div>

          <div className='h-[40vh] w-[50%] lg:w-[20%] p-2 flex flex-wrap items-center justify-evenly'>
            {boxes.map((box, index) => (
              <button
                key={index}
                onClick={() => handleMark(index)}
                className='h-[30%] w-[30%] bg-white'
              >
                {box}
              </button>
            ))}
          </div>
        </>
      ) : (
        // IF NOT JOINED
        <div className=''>
          <input type="text" placeholder='Enter your name' ref={nameRef} />
          <button onClick={handleJoin}>JOIN</button>
        </div>
      )}
    </main>
  );
};

export default App;
