import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
// import "./styles.css";

function Third() {
  const [books, setBooks] = useState(null);
  const [ok, setOk] = useState(false);

  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get("https://api.gadjahsocietynft.com/whitelist").then((response) => {
      setPost(response.data.reponse);
      console.log(response.data.reponse)
    });
  }, []);

  // const fetchData = () => {
  //   const response = axios.get(
  //     "https://api.gadjahsocietynft.com/whitelist");

  //   setBooks(response.data);
  //   setOk(true);

  //   { console.log(response) }
  // };
  
  return (
    <div className="Third">
    
      {/* Display data from API */}
      <div>
        {post &&
          post.map((p, index) => {
            // const cleanedDate = new Date(book.released).toDateString();
            // const authors = book.wallet;

            return (
              <h1> {p.wallet} </h1>
            );
          })}
      </div>
    </div>
  );
}

export default Third;
