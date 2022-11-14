import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCodeById } from "../utils";

import Highlight from "react-highlight";
// import "highlight.js/styles/default.css";
import TextArea from "./TextArea";

const codeblockURL = `${process.env.REACT_APP_API_URL}/api/codeblocks/codelist`;

function Socket() {
  const params = useParams();
  const [codeblock, setCodeblock] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const authHeader = { Authorization: token };

    const fetchData = async () => {
      const { data: getCodeblock } = await getCodeById(
        `${codeblockURL}/${params.id}`,
        authHeader
      );

      setCodeblock(getCodeblock);

      console.log("codee", getCodeblock);
    };

    fetchData();
  }, []);

  return (
    <div>
      {codeblock.Code}
      {/* <Highlight className="javascript">{codeblock.Code}</Highlight> */}
      <TextArea></TextArea>
    </div>
  );
}

export default Socket;
