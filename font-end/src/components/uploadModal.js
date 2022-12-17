import "../styles/uploadmodal.scss";
import React, { useState } from "react";
import Button from "@mui/material/Button";

function UploadModal() {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleImageChange = (e) => {
    // console.log(e.target.files[])
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );

      // console.log("filesArray: ", filesArray);

      setSelectedFiles((prevImages) => prevImages.concat(filesArray));
      Array.from(e.target.files).map(
        (file) => URL.revokeObjectURL(file) // avoid memory leak
      );
    }
  };

  const renderPhotos = (source) => {
    console.log("source: ", source);
    return source.map((photo) => {
      return <img className="imgUp" src={photo} alt="" key={photo} />;
    });
  };

  return (
    <div className="upload">
      <form className="form__signup">
        <div className="result">{renderPhotos(selectedFiles)}</div>
        <div className="form__group">
          <textarea
            className="form__field"
            name="caption"
            rows="4"
            cols="50"
          ></textarea>
        </div>
        <div className="form__group">
          <input
            className="form__field"
            id="file"
            type="file"
            name="file"
            multiple
            onChange={handleImageChange}
          />
          <div className="label-holder">
            <label htmlFor="file" className="label">
              <i className="material-icons">add_a_photo</i>
            </label>
          </div>
        </div>
        <form
          action=""
          method=""
          enctype="multipart/form-data"
          id="my-form"
        ></form>

        <Button className="btn-signup">Upload</Button>
      </form>
    </div>
  );
}
export default UploadModal;
