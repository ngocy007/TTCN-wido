import "../styles/cards.scss";
import Stories from "./Stories";
import Card from "./Card";
import { useEffect, useState } from "react";

function Cards() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
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
        (result) => {
          setIsLoaded(true);
          setItems(result);
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
        <Stories />

        {/* <Card
          accountName="rafagrassetti"
          storyBorder={true}
          image="https://picsum.photos/800/900"
          comments={commentsOne}
          likedByText="dadatlacak"
          likedByNumber={89}
          hours={16}
        /> */}
        {items?.posts?.map((item) => (
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
