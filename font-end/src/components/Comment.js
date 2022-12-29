import "../styles/comment.scss";
import ProfileIcon from "./ProfileIcon";
function Comment(props) {
  const { accountName, comment , image, id_user } = props;

  return (
    <div className="commentContainer">
      {/* <div className="">HOLDER</div>
      <div className="comment">
        <div className="accountName">{accountName}</div>
        <p>{comment}</p>
      </div> */}
      <div className="profile">
        <div style={{marginBottom:"auto"}}><ProfileIcon iconSize="small" storyBorder={true} image={image} id_user={id_user} /></div>
        
        <div className="textContainer">
          <div className="comment" style={{display: "flex",justifyContent: "space-between" }}>
            <div className="accountName">{accountName}</div>
            <span>&nbsp;&nbsp;</span>
            <div style={{wordWrap: "break-word", width:"200px"}}><p>{comment}</p></div>
            
          </div>
          <span className={`caption small`}>111111111</span>
        </div>
      </div>
    </div>
  );
}

export default Comment;
