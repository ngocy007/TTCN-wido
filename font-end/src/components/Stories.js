import "../styles/stories.scss";
import Story from "./Story";
import HorizontalScroll from "react-horizontal-scrolling";

function Stories() {
  return (
    <div className="stories">
      <div><p style={{fontSize:"10px", color:"red"}}>*components minh họa (place holder)</p></div>
      <HorizontalScroll className="scroll" reverseScroll={true}>
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
        <Story />
      </HorizontalScroll>
    </div>
  );
}

export default Stories;
