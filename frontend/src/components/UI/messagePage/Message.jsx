import React, { useState } from "react";

export function Message({message}) {
  return (
    <div>
      <li>
            <ul>
                {
                    Object.entries(message).map(input =>{
                      if (input[0] !== 'id'){
                        return (<li key={input[0]}>
                            {input[0]} : {input[1]}
                        </li>)}
                        })
                      
                }
            </ul>     
        </li>
    </div>
  );
}
