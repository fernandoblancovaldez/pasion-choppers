import React from "react";
import { useEffect, useRef, useState } from "react";
import { UserAuth } from "../../../context/AuthContext";
import { onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";

import { Carousel } from "@material-tailwind/react";

const Chat = () => {
  /*     const messagesEndRef = useRef();
    const chatBoxRef = useRef(); */
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState([]);

  const { currentUser, signInWithGoogle, logout } = UserAuth();

  console.log(messages, currentUser);

  /*     const scrollToBottom = () => {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(() => {
      const { scrollHeight, scrollTop, clientHeight } = chatBoxRef.current;
      const adicional = clientHeight * 0.5;
      scrollTop + clientHeight + adicional >= scrollHeight
        ? scrollToBottom()
        : null;
    }, [messages]); */

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
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
    <div className="h-1/2 md:w-2/5 md:h-5/6">
      <Carousel className="">
        <img
          src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
          alt="image 1"
          className="h-full w-full object-cover"
        />
        <img
          src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
          alt="image 2"
          className="h-full w-full object-cover"
        />
        <img
          src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
          alt="image 3"
          className="h-full w-full object-cover"
        />
      </Carousel>
    </div>
  );
};

export default Chat;
