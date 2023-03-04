import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";

function MessagePage(props) {
    const data = useLoaderData();
    const ref = useRef();
    const [messages, setMessages] = useState(Array(...data['results']).reverse());
    const [nextPage, setNextPage] = useState(data['next']);
    const [isFetching, setIsFetching] = useState(false);

    const scrollHandler = function (e){
        if (e.target.documentElement.scrollTop < 100 && nextPage){
            setIsFetching(true);
        }
    }
    
    useEffect(() => {
        if (isFetching){
            const responce = axios.post(nextPage)
            .then((responce) =>{
                responce = responce.data;
                setNextPage(responce['next']);
                ref.current.scrollIntoView();
                setMessages([...responce['results'].reverse(), ...messages]);
            })
            .catch(() => setNextPage(null))
            .finally(() => setIsFetching(false))
        }
    }, [isFetching])
    
    useEffect(() => {
        ref.current.scrollIntoView();
        document.addEventListener('scroll', scrollHandler);
        return (() => document.removeEventListener('scroll', scrollHandler))
    }, [])
    
  return (
    <div>
        <ul>
        {
        messages.map(function (message, ind, arr){
            
        const elem = (<li>
            <ul>
                {
                    Object.entries(message).map(input =>{
                        return (<li>
                            {input[0]} : {input[1]}
                        </li>)})
                }
            </ul>     
        </li>)

        if (ind == 25){
            return <div ref={ref}>{elem}</div>
                
        } 

        return elem
        })
        }
        
        </ul>
        <div ref={ref} style={{ float:"left", clear: "both" }}>
        </div>
    </div>
  );
}

export default MessagePage;
