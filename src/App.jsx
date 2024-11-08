<<<<<<< HEAD
import React, { useEffect, useRef, useState } from 'react';
=======
<<<<<<< HEAD
import React, { useEffect, useRef, useState } from 'react';
=======
import React, { useEffect, useRef, useState } from "react";
>>>>>>> 12410de (second)
>>>>>>> 9b79618 (sencodn)
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
  const [winner, setWinner] = useState("");
>>>>>>> 12410de (second)
>>>>>>> 9b79618 (sencodn)

  useEffect(() => {
    // on joined message
    client.on("joined-message", ({ message, rName }) => {
      setRoomName(rName);
    });

    // getting opponent name
<<<<<<< HEAD
    client.on('oponent-name', ({ name, role }) => {
=======
<<<<<<< HEAD
    client.on('oponent-name', ({ name, role }) => {
=======
    client.on("oponent-name", ({ name, role }) => {
>>>>>>> 12410de (second)
>>>>>>> 9b79618 (sencodn)
      setOName(name);
      setMyRole(role);
    });

    client.on("mark-move", ({ move, nextTurn, mark }) => {
      setBoxes((prevBoxes) => {
        const newBoxes = [...prevBoxes];
        newBoxes[move] = mark;
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 9b79618 (sencodn)
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
    
    
<<<<<<< HEAD
=======
=======

        // Check winner after updating boxes
        const winner = checkWinner(newBoxes);

        if (winner) {
          setWinner(`${winner} wins 🥳`);
        }

        return newBoxes;
      });
      setTurn(nextTurn);
    });
>>>>>>> 12410de (second)
>>>>>>> 9b79618 (sencodn)
  }, [client]);

  // JOINING THE ROOM
  const handleJoin = () => {
<<<<<<< HEAD
    setCreated(true);
    client.emit('join-room', { name: nameRef.current.value, id: client.id });
    setName(nameRef.current.value);
=======
<<<<<<< HEAD
    setCreated(true);
    client.emit('join-room', { name: nameRef.current.value, id: client.id });
    setName(nameRef.current.value);
=======
    if (nameRef.current.value) {
      setCreated(true);
      client.emit("join-room", { name: nameRef.current.value, id: client.id });
      setName(nameRef.current.value);
    }
>>>>>>> 12410de (second)
>>>>>>> 9b79618 (sencodn)
  };

  // MARKING THE BOX
  const handleMark = (index) => {
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 9b79618 (sencodn)
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
<<<<<<< HEAD
=======
=======
    if (winner) return;
    if (boxes[index]) return; // If already marked, do nothing

    if (turn === myRole) {
      client.emit("move", {
        move: index,
        roomName,
        turn,
      });
    }
  };
  const checkWinner = (boxes) => {
>>>>>>> 12410de (second)
>>>>>>> 9b79618 (sencodn)
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
<<<<<<< HEAD
  
=======
<<<<<<< HEAD
  
=======

>>>>>>> 12410de (second)
>>>>>>> 9b79618 (sencodn)
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
<<<<<<< HEAD
  
=======
<<<<<<< HEAD
  
=======

>>>>>>> 12410de (second)
>>>>>>> 9b79618 (sencodn)
    // Check diagonals
    if (boxes[0] && boxes[0] === boxes[4] && boxes[4] === boxes[8]) {
      return boxes[0]; // Winner is either 'X' or 'O' in the first diagonal
    }
    if (boxes[2] && boxes[2] === boxes[4] && boxes[4] === boxes[6]) {
      return boxes[2]; // Winner is either 'X' or 'O' in the second diagonal
    }
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 9b79618 (sencodn)
  
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
<<<<<<< HEAD
=======
=======

    // No winner found
    return null;
  };

  return (
    <main
      className="h-screen w-full bg-gray-800 flex
    flex-col
    items-center justify-center"
    >
      {created ? (
        <>
          {/* GAMEBOARD */}
          <div className="w-[80%] h-[60px] flex items-center justify-between py-2 lg:w-[40%] md:w-[60%]">
            <h1
              className={`h-full w-[40%] rounded-md ${
                turn === myRole ? " bg-purple-500" : "bg-purple-300"
              }  text-slate-100 flex items-center justify-center`}
            >
              {name}
            </h1>
            <h1
              className={`h-full w-[40%] rounded-md ${
                turn !== myRole ? " bg-purple-500" : "bg-purple-300"
              }  text-slate-100 flex items-center justify-center`}
            >
              {Oname ? Oname : "waiting..."}
            </h1>
          </div>
          {myRole && winner === "" && (
            <h1 className="text-2xl text-slate-100 py-3">
              {turn === myRole ? "Your" : `${Oname}'s`} turn
            </h1>
          )}

          <div className="h-[40vh] w-[50%] lg:w-[20%] p-2 flex flex-wrap items-center justify-evenly md:w-[40%]">
>>>>>>> 12410de (second)
>>>>>>> 9b79618 (sencodn)
            {boxes.map((box, index) => (
              <button
                key={index}
                onClick={() => handleMark(index)}
<<<<<<< HEAD
                className='h-[30%] w-[30%] bg-white'
=======
<<<<<<< HEAD
                className='h-[30%] w-[30%] bg-white'
=======
                className="h-[30%] w-[30%] text-4xl bg-slate-300 rounded-md shadow-md flex items-center justify-center"
>>>>>>> 12410de (second)
>>>>>>> 9b79618 (sencodn)
              >
                {box}
              </button>
            ))}
          </div>
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 9b79618 (sencodn)
        </>
      ) : (
        // IF NOT JOINED
        <div className=''>
          <input type="text" placeholder='Enter your name' ref={nameRef} />
          <button onClick={handleJoin}>JOIN</button>
<<<<<<< HEAD
=======
=======

          {/* WHOS TURN */}
          <p className="text-2xl text-slate-100">{winner}</p>
        
        {/* RESTART BUTTON */}

        </>
      ) : (
        // IF NOT JOINED
        <div className="w-full flex flex-col items-center justify-between">
          <input
            type="text"
            placeholder="Enter your name"
            ref={nameRef}
            className="w-[60%] px-3 h-[40px] rounded-md shadow-sm"
          />
          <button
            onClick={handleJoin}
            className="bg-blue-600 text-white h-[40px] w-[120px] font-semibold rounded-md m-3"
          >
            PLAY
          </button>
>>>>>>> 12410de (second)
>>>>>>> 9b79618 (sencodn)
        </div>
      )}
    </main>
  );
};

export default App;
