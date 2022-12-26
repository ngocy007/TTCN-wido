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
  useEffect(() => {
    fetch("http://localhost:8000/api/post/",{headers})
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
  }, []);
  const commentsOne = [
    {
      user: "raffagrassetti",
      text: "Woah dude, this is awesome! 🔥",
      id: 1,
    },
    {
      user: "therealadamsavage",
      text: "Like!",
      id: 2,
    },
    {
      user: "mapvault",
      text: "Niceeeee!",
      id: 3,
    },
    {
      user: "mapvault",
      text: "Niceeeee!",
      id: 4,
    },
    {
      user: "mapvault",
      text: "Niceeeee!",
      id: 5,
    },
    {
      user: "mapvault",
      text: "Niceeeee!",
      id: 6,
    },
    {
      user: "mapvault",
      text: "Niceeeee!",
      id: 7,
    },
    {
      user: "mapvault",
      text: "Niceeeee!",
      id: 8,
    },
    {
      user: "mapvault",
      text: "Niceeeee!",
      id: 9,
    },
    {
      user: "mapvault",
      text: "Niceeeee!",
      id: 10,
    },
    {
      user: "mapvault",
      text: "Niceeeee!",
      id: 10,
    },
    {
      user: "mapvault",
      text: "Niceeeee!",
      id: 10,
    },
    {
      user: "mapvault",
      text: "Niceeeee!",
      id: 10,
    },
  ];

  const commentsTwo = [
    {
      user: "mapvault",
      text: "Amazing content, keep it up!",
      id: 4,
    },
  ];

  const commentsThree = [
    {
      user: "dadatlacak",
      text: "Love this!",
      id: 5,
    },
  ];
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
        {items.posts.map((item) => (
        
           <Card
           userName={item.User.name}
           profileIcon={item.User.image}
           storyBorder={true}
           image={item.Photos}
           commentsdummy={commentsOne}
           likedByText="holder"
           likedByNumber={item.countLike}
           hours={16}
           id_post={item.id_post}
           id_user={item.id_user}
           content={item.content}

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
