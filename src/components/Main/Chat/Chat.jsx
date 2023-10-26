import React from "react";
import { useEffect, useRef, useState } from "react";
import { UserAuth } from "../../../context/AuthContext";
import { onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";

const Chat = () => {
  const messagesEndRef = useRef();
  const chatBoxRef = useRef();
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState([]);

  const { currentUser, signInWithGoogle, logout } = UserAuth();

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    const { scrollHeight, scrollTop, clientHeight } = chatBoxRef.current;
    const adicional = clientHeight * 0.5;
    scrollTop + clientHeight + adicional >= scrollHeight
      ? scrollToBottom()
      : null;
  }, [messages]);

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (value.trim() === "") {
      alert("Ingrese un mensaje válido !");
      return;
    }

    try {
      const { uid, displayName, photoURL } = currentUser;
      const newMsg = {
        id: new Date(),
        uid: uid,
        createdAt: new Date(),
        avatar: photoURL,
        name: displayName,
        text: value,
      };

      const refDoc = doc(db, `app/chat`);
      await updateDoc(refDoc, { messages: [...messages, newMsg] });
    } catch (error) {
      console.log(error);
    }

    document.querySelector("#input-text").value = null;
    setValue("");
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, `app/chat`), (querySnapshot) => {
      const messages = querySnapshot.data().messages;
      setMessages(messages);
    });
    return () => unsubscribe;
  }, []);
  return (
    <div className="h-1/2 w-full md:w-2/5 md:h-5/6 2xl:h-4/6 flex flex-col backdrop-blur rounded-3xl gap-1">
      <div className="flex-1 overflow-y-auto" ref={chatBoxRef}>
        {messages.map((msg) => (
          <div
            className={`chat chat-${
              currentUser && msg.uid === currentUser.uid ? "end" : "start"
            } mx-2`}
            key={msg.id}
          >
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img src={msg.avatar} alt={msg.name} />
              </div>
            </div>
            <div className="chat-header text-xs lg:text-sm">
              {msg.name}
              {/* <time className="text-xs opacity-50">12:45</time> */}
            </div>
            <div
              className={`chat-bubble text-xs md:text-sm lg:text-base flex items-center py-0 px-3 ${
                currentUser && msg.uid === currentUser.uid
                  ? "text-end"
                  : "text-start"
              }`}
            >
              <p>{msg.text}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>
      {currentUser ? (
        <>
          <form
            className="rounded-full join flex-none m-2"
            onSubmit={handleSendMessage}
          >
            <input
              id="input-text"
              className="input input-ghost input-sm rounded-full pe-0 grow shrink"
              type="text"
              placeholder="Escribe tu mensaje"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <button
              type="submit"
              className="border-0 text-base-200 mx-2 transition ease-in-out hover:scale-125 active:translate-x-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 25 25"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
            </button>
            <button
              className="btn btn-circle transition ease-in-out hover:scale-125 active:scale-100  btn-sm px-1"
              onClick={handleLogout}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </form>
        </>
      ) : (
        <div
          className="m-auto tooltip tooltip-open tooltip-right"
          data-tip="Ingresar al Chat"
        >
          <div
            className="btn btn-circle transition ease-in-out hover:scale-125 active:scale-100 m-1 btn-sm "
            onClick={handleLogin}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
