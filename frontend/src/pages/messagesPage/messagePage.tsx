import axios, { AxiosResponse } from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { Message } from "../../entities/message/oneMessage/Message";
import { TypeDefaultPagination } from "../../types/Pagination";
import { TypeMessage } from "../../types/modelTypes/message";

function MessagePage() {
  const data = useLoaderData() as TypeDefaultPagination;
  const ref = useRef() as any;
  const textareaReg = useRef(null) as any;
  const params = useParams();
  const [messages, setMessages] = useState(Array(...data["results"]).reverse());
  const [nextPage, setNextPage] = useState(data["next"]);
  const [isFetching, setIsFetching] = useState(false);

  const scrollHandler = function (e: any) {
    if (e.target.documentElement.scrollTop < 100 && nextPage) {
      setIsFetching(true);
    }
  };


  function messageCheck(message: TypeMessage, ind: number) {
    const elem = <Message key={message.id} message={message} />;

    delete message.id

    if (ind === 25) {
      return <div ref={ref}>{elem}</div>;
    }

    return elem;
  }

  const sendMessage = function (e: React.MouseEvent) {
    e.preventDefault();
    
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

    if (textareaReg.current.value) {
      textareaReg.current.value = '';
    }
  };

  useEffect(() => {
    if (isFetching) {
      if (nextPage) {
        const responce = axios
        .post(nextPage)
        .then((responce) => {
          let response = responce.data;
          setNextPage(response["next"]);
          ref.current.scrollIntoView();
          setMessages([...response["results"].reverse(), ...messages]);
        })
        .catch(() => setNextPage(null))
        .finally(() => setIsFetching(false));

      }
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
        {messages.map((message, ind, arr) => messageCheck(message, ind))}
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
