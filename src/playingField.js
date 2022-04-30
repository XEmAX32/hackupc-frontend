import React, { useEffect, useState } from "react";

function playingField() {
  const [status, setStatus] = useState("not-logged-in");
  const [response, setResponse] = useState();
  const [data, setData] = useState('No result');

  const forwardUser = (userId) => {
    console.log(userId)
    socket.emit("register", {id: userId})
  }

  return (
    <div>

    </div>
  );
}

export default playingField;
