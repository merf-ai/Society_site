import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import classes from "../../UI/registration_page/reg_form.css";
import { Message } from "../../UI/messagePage/Message";

function MessagePage(props) {
  const data = useLoaderData();
  const ref = useRef();
  const textareaReg = useRef();
  const params = useParams();
  const [messages, setMessages] = useState(Array(...data["results"]).reverse());
  const [nextPage, setNextPage] = useState(data["next"]);
  const [isFetching, setIsFetching] = useState(false);

  const scrollHandler = function (e) {
    if (e.target.documentElement.scrollTop < 100 && nextPage) {
      setIsFetching(true);
    }
  };


  function messageCheck(message, ind, arr) {
    const elem = <Message message={message} />;

    if (ind === 25) {
      return <div ref={ref}>{elem}</div>;
    }

    return elem;
  }

  const sendMessage = function (e) {
    e.preventDefault();
    console.log();
    
    const textMessage = textareaReg.current.value;

    axios.post(`http://127.0.0.1:8000/users/create_message/${params.username}`, 
    {
        message: textMessage,
    }
    )
    .then((responce) => {
        const new_message = responce.data;
        console.log(new_message);
        setMessages([
            ...messages,
            new_message
        ]);
    })
    
    textareaReg.current.value = '';
  };

  useEffect(() => {
    if (isFetching) {
      const responce = axios
        .post(nextPage)
        .then((responce) => {
          responce = responce.data;
          setNextPage(responce["next"]);
          ref.current.scrollIntoView();
          setMessages([...responce["results"].reverse(), ...messages]);
        })
        .catch(() => setNextPage(null))
        .finally(() => setIsFetching(false));
    }
  }, [isFetching]);

  useEffect(() => {
    ref.current.scrollIntoView();
    document.addEventListener("scroll", scrollHandler);
    return () => document.removeEventListener("scroll", scrollHandler);
  }, []);

  return (
    <div>
      <ul>
        {messages.map((message, ind, arr) => messageCheck(message, ind, arr))}
      </ul>

      <div>
        <textarea
          ref={textareaReg}
          autoFocus={true}
          style={{ resize: "none", width: "100%", height: "100px" }}
        ></textarea>

        <div className="flex-containter-center-elements">
          <button
            onClick={sendMessage}
            className="reg_button message-send-button"
          >
            Отправить сообщение
          </button>
        </div>
      </div>

      <div ref={ref} style={{ float: "left", clear: "both" }}></div>
    </div>
  );
}

export default MessagePage;
