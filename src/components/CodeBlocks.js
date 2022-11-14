import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CodeBlock from "./CodeBlock";
import axios from "axios";

const codeBlocksURL = `${process.env.REACT_APP_API_URL}/api/codeblocks/codelist`;

function CodeBlocks() {
  const navigate = useNavigate();

  const [codeblocks, setCodeBlocks] = useState([]);

  useEffect(() => {
    const accessToken = sessionStorage["accessToken"];

    const fetchData = async () => {
      const { data: codeblocks } = await axios.get(codeBlocksURL, {
        headers: {
          "x-access-token": accessToken,
        },
      });

      setCodeBlocks(codeblocks);
    };

    fetchData();
  }, []);
  

  const codeComp = codeblocks.map((codeblock) => {
    return <CodeBlock key={codeblock._id} codeblock={codeblock} />;
  });

  return (
    <div>

      <div className="" onClick={() => navigate("/home/codeblock/:id")}>
       {codeComp}
      </div>

    <div></div>
    </div>
  );
}

export default CodeBlocks;
