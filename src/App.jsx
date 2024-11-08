import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const App = () => {
  const [client] = useState(() => io("http://localhost:1111/"));
  const [boxes, setBoxes] = useState(Array(9).fill(null));
  const [created, setCreated] = useState(false);
  const nameRef = useRef(null);
  const [name, setName] = useState("");
  const [Oname, setOName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [myRole, setMyRole] = useState("");
  const [turn, setTurn] = useState("x");
  const [winner, setWinner] = useState("");

  useEffect(() => {
    client.on("joined-message", ({ message, rName }) => {
      setRoomName(rName);
    });

    client.on("oponent-name", ({ name, role }) => {
      setOName(name);
      setMyRole(role);
    });

    client.on("mark-move", ({ move, nextTurn, mark }) => {
      setBoxes((prevBoxes) => {
        const newBoxes = [...prevBoxes];
        newBoxes[move] = mark;

        const winner = checkWinner(newBoxes);
        if (winner) {
          setWinner(`${winner} wins 🥳`);
        }

        return newBoxes;
      });
      setTurn(nextTurn);
    });
  }, [client]);

  const handleJoin = () => {
    if (nameRef.current.value) {
      setCreated(true);
      client.emit("join-room", { name: nameRef.current.value, id: client.id });
      setName(nameRef.current.value);
    }
  };

  const handleMark = (index) => {
    if (winner || boxes[index]) return;
    if (turn === myRole) {
      client.emit("move", { move: index, roomName, turn });
    }
  };

  const checkWinner = (boxes) => {
    // Check rows, columns, and diagonals for a winner
    // Similar to the logic you already have
  };

  return (
    <main className="h-screen w-full bg-gray-800 flex flex-col items-center justify-center">
      {created ? (
        <>
          <div className="w-[80%] h-[60px] flex items-center justify-between py-2 lg:w-[40%] md:w-[60%]">
            <h1 className="h-full w-[40%] rounded-md bg-purple-500 text-slate-100 flex items-center justify-center">
              {name}
            </h1>
            <h1 className="h-full w-[40%] rounded-md bg-purple-300 text-slate-100 flex items-center justify-center">
              {Oname ? Oname : "waiting..."}
            </h1>
          </div>
          {myRole && winner === "" && (
            <h1 className="text-2xl text-slate-100 py-3">
              {turn === myRole ? "Your" : `${Oname}'s`} turn
            </h1>
          )}

          <div className="h-[40vh] w-[50%] lg:w-[20%] p-2 flex flex-wrap items-center justify-evenly md:w-[40%]">
            {boxes.map((box, index) => (
              <button
                key={index}
                onClick={() => handleMark(index)}
                className="h-[30%] w-[30%] text-4xl bg-slate-300 rounded-md shadow-md flex items-center justify-center"
              >
                {box}
              </button>
            ))}
          </div>

          <p className="text-2xl text-slate-100">{winner}</p>
        </>
      ) : (
        <div className="w-full flex flex-col items-center justify-between">
          <input
            type="text"
            placeholder="Enter your name"
            ref={nameRef}
            className="w-[60%] px-3 h-[40px] rounded-md shadow-sm md:w-[25%]"
          />
          <button
            onClick={handleJoin}
            className="bg-blue-600 text-white h-[40px] w-[120px] font-semibold rounded-md m-3"
          >
            PLAY
          </button>
        </div>
      )}
    </main>
  );
};

export default App;
