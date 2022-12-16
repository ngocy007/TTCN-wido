import "../styles/cards.scss";
import Stories from "./Stories";
import Card from "./Card";

function Cards() {
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
    },{
      user: "mapvault",
      text: "Niceeeee!",
      id: 5,
    },{
      user: "mapvault",
      text: "Niceeeee!",
      id: 6,
    },{
      user: "mapvault",
      text: "Niceeeee!",
      id: 7,
    },{
      user: "mapvault",
      text: "Niceeeee!",
      id: 8,
    },{
      user: "mapvault",
      text: "Niceeeee!",
      id: 9,
    },{
      user: "mapvault",
      text: "Niceeeee!",
      id: 10,
    },{
      user: "mapvault",
      text: "Niceeeee!",
      id: 11,
    },{
      user: "mapvault",
      text: "Niceeeee!",
      id: 12,
    },{
      user: "mapvault",
      text: "Niceeeee!",
      id: 13,
    },{
      user: "mapvault",
      text: "Niceeeee!",
      id: 14,
    },{
      user: "mapvault",
      text: "Niceeeee!",
      id: 15,
    },
    {
      user: "mapvault",
      text: "Niceeeee!",
      id: 16,
    },
    {
      user: "mapvault",
      text: "Niceeeee!",
      id: 17,
    },
    {
      user: "mapvault",
      text: "Niceeeee!",
      id: 18,
    },
    {
      user: "mapvault",
      text: "Niceeeee!",
      id: 19,
    },
    {
      user: "mapvault",
      text: "Niceeeee!",
      id: 20,
    },
    {
      user: "mapvault",
      text: "Niceeeee!",
      id: 21,
    },
    {
      user: "mapvault",
      text: "Niceeeee!",
      id: 22,
    },
    {
      user: "mapvault",
      text: "Niceeeee!",
      id: 23,
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

  return (
    <div className="cards">
      <Stories />

      <Card
        accountName="rafagrassetti"
        storyBorder={true}
        image="https://picsum.photos/800/900"
        comments={commentsOne}
        likedByText="dadatlacak"
        likedByNumber={89}
        hours={16}
      />
      <Card
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
      />
    </div>
  );
}

export default Cards;
