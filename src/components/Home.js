import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { socketManager } from "../SocketManager";
import { getAll } from "../utils";
import { Modal, Button } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";

const codeblocksURL = `${process.env.REACT_APP_API_URL}/api/codeblocks/codelist`;
const usersUrl = `${process.env.REACT_APP_API_URL}/api/user/list`;

function Home() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState([]);
  const [codeblocks, setCodeBlocks] = useState([]);
  const [codeId, setCodeId] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClick = (id) => {
    setCodeId(id);
    handleShow();
  };

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    const authHeader = { Authorization: token };

    // console.log(user);
    if (user && user.mentor) {
      const fetchData = async () => {
        const { data: codeblocks } = await getAll(codeblocksURL);
        console.log("data>>", codeblocks);
        if (codeblocks) {
          setCodeBlocks(codeblocks);
          setIsAdmin(true);

          const { data: getUsers } = await getAll(usersUrl, authHeader);
          setUsers(getUsers);
          console.log("users>>", getUsers);
        }
      };

      fetchData();
    } else {
      alert("You are not a Mentor and not allowed to view this page!");

      setIsAdmin(false);
    }
  }, []);

  const codeBlockTitle = codeblocks.map((codeblock) => {
    return (
      <div className="codeblock" onClick={() => handleClick(codeblock._id)}>
        <ListGroup>
          <ListGroup.Item as="li" active>
            <h3 key={codeblock._id}>{codeblock.Title}</h3>
          </ListGroup.Item>
        </ListGroup>
      </div>
    );
  });

  return (
    <div>
      {isAdmin && (
        <div>
          <div>
            <div
              style={{
                color: "black",
                "font-size": "18px",
                "font-weight": "700",
                lineHeight: "1.1",
              }}
            >
              {codeBlockTitle}
            </div>
          </div>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                {users &&
                  users.map((user) => {
                    const { _id, Username } = user;
                    return (
                      <p className="user" key={_id} onClick={true}>
                        <Link to={`/socket/${codeId}`}>{Username}</Link>
                      </p>
                    );
                  })}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Submit
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </div>
  );
}

export default Home;
