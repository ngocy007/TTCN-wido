import "../styles/cards.scss";
//import Stories from "./Stories";
import Card from "./Card";
import { useEffect, useState } from "react";
import "../styles/stories.scss";
import HorizontalScroll from "react-horizontal-scrolling";
import Button from "@mui/material/Button";

function Cards() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [itemss, setItemss] = useState([]);
  const headers = {
    "x-access-token": localStorage.getItem("token"),
  };
  //call back
  const [isCall, setCall] = useState([]);
  const handleCallBack = () => setCall(!isCall);
  useEffect(() => {
    fetch("http://localhost:8000/api/post/home?_limit=5&_page=0", { headers })
      .then((res) => res.json())
      .then(
        (data) => {
          setIsLoaded(true);
          setItems(data.posts);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [isCall]);

  //Handle thêm bài
  const [cPage, setCPage] = useState(1);
  const [isEnd, setIsEnd] = useState(false);
  const HandleShowMore = () => {
    fetch("http://localhost:8000/api/post/home?_limit=5&_page="+ cPage , { headers })
      .then((res) => res.json())
      .then((data) => {
        if(data.posts.length)
        {
          console.log("danh sach truco khi noi",items)
          setItemss(data.posts);
          console.log("danh sach fetch",data.posts)
          setItems([...items, ...data.posts]);
          setCPage(cPage+1);
          console.log("danh sach da noi",items)
        }
        else{
          setIsEnd(true);
        }
      })
      .catch((err) => console.log("hey"));
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    // return (
    //   <ul>
    //     {items.map(item => (
    //       <li key={item.id}>
    //         {item.name} {item.price}
    //       </li>
    //     ))}
    //   </ul>
    // );
    return (
      <div className="cards">
        {/* <Stories /> */}

        {/* <Card
          accountName="rafagrassetti"
          storyBorder={true}
          image="https://picsum.photos/800/900"
          comments={commentsOne}
          likedByText="dadatlacak"
          likedByNumber={89}
          hours={16}
        /> */}
        {items?.map((item) => (
          <Card
            userName={item.User.name}
            profileIcon={item.User.image}
            storyBorder={true}
            image={item.Photos}
            likedByText="holder"
            likedByNumber={item.countLike}
            hours={16}
            id_post={item.id_post}
            id_user={item.id_user}
            content={item.content}
            parentCallBack={handleCallBack}
          />
        ))}
        <div className="storiesBut">
          <HorizontalScroll className="scroll" reverseScroll={true}>
            {isEnd ? "Bạn Đã xem hết bài viết" : <Button onClick={HandleShowMore}>Xem thêm</Button>}
          </HorizontalScroll>
        </div>

        {/* <Card
          accountName="mapvault"
          image="https://picsum.photos/800"
          comments={commentsTwo}
          likedByText="therealadamsavage"
          likedByNumber={47}
          hours={12}
        />
        <Card
          accountName="dadatlacak"
          storyBorder={true}
          image="https://picsum.photos/800/1000"
          comments={commentsThree}
          likedByText="mapvault"
          likedByNumber={90}
          hours={4}
        />
         <Card
          accountName="dadatlacak"
          storyBorder={true}
          image="https://picsum.photos/800/1000"
          comments={commentsThree}
          likedByText="mapvault"
          likedByNumber={90}
          hours={4}
        />
         <Card
          accountName="dadatlacak"
          storyBorder={true}
          image="https://picsum.photos/800/1000"
          comments={commentsThree}
          likedByText="mapvault"
          likedByNumber={90}
          hours={4}
        />
         <Card
          accountName="dadatlacak"
          storyBorder={true}
          image="https://picsum.photos/800/1000"
          comments={commentsThree}
          likedByText="mapvault"
          likedByNumber={90}
          hours={4}
        />
         <Card
          accountName="dadatlacak"
          storyBorder={true}
          image="https://picsum.photos/800/1000"
          comments={commentsThree}
          likedByText="mapvault"
          likedByNumber={90}
          hours={4}
        />
         <Card
          accountName="dadatlacak"
          storyBorder={true}
          image="https://picsum.photos/800/1000"
          comments={commentsThree}
          likedByText="mapvault"
          likedByNumber={90}
          hours={4}
        />
         <Card
          accountName="dadatlacak"
          storyBorder={true}
          image="https://picsum.photos/800/1000"
          comments={commentsThree}
          likedByText="mapvault"
          likedByNumber={90}
          hours={4}
        /> */}
      </div>
    );
  }
}

export default Cards;
