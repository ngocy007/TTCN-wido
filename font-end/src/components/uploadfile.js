import React, { useState, useRef } from "react";

const UploadFile = ({ form }) => {
  const formElement = useRef(null);
  const [files, setFiles] = useState("");
  //state for checking file size
  const [fileSize, setFileSize] = useState(true);
  // for file upload progress message
  const [fileUploadProgress, setFileUploadProgress] = useState(false);
  //for displaying response message
  const [fileUploadResponse, setFileUploadResponse] = useState(null);
  //base end point url
  const FILE_UPLOAD_BASE_ENDPOINT = "http://localhost:8000/api/post/create";
  const headers = {
    "x-access-token": localStorage.getItem("token"),
  };
  const uploadFileHandler = (event) => {
    setFiles(event.target.files);
  };

  const fileSubmitHandler = (event) => {
    event.preventDefault();
    setFileSize(true);
    setFileUploadProgress(true);
    setFileUploadResponse(null);
    console.log("VAO?????");
    //const formData = formElement.current;
    const formData = Array.from(formElement.current.elements)
        .filter((input) => input.name)
        .reduce(
          (obj, input) => Object.assign(obj, { [input.name]: input.value }),
          {}
        );


    // for (let i = 0; i < files.length; i++) {
    //   if (files[i].size > 10240000000000000) {
    //     setFileSize(false);
    //     setFileUploadProgress(false);
    //     setFileUploadResponse(null);
    //     return;
    //   }

    //   formData.append(`multiple`, files[i]);
    // }
    console.log("da ta post", formData);
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(formData),
    };
    fetch(FILE_UPLOAD_BASE_ENDPOINT, requestOptions)
      .then(async (response) => {
        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json");
        const data = isJson && (await response.json());

        // check for error response
        if (!response.ok) {
          // get error message
          const error = (data && data.message) || response.status;
          setFileUploadResponse(data.message);
          return Promise.reject(error);
        }

        console.log(data.message);
        setFileUploadResponse(data.message);
      })
      .catch((error) => {
        console.error("Error while uploading file!", error);
        console.log("da ta post", formData);
      });
    setFileUploadProgress(false);
  };

  return (
    <form onSubmit={fileSubmitHandler} ref={formElement}>
      <input type="file" name="multiple" multiple onChange={uploadFileHandler} />
      <button type="submit">Upload</button>
      {!fileSize && <p style={{ color: "red" }}>File size exceeded!!</p>}
      {fileUploadProgress && <p style={{ color: "red" }}>Uploading File(s)</p>}
      {fileUploadResponse != null && (
        <p style={{ color: "green" }}>{fileUploadResponse}</p>
      )}
    </form>
  );
};
export default UploadFile;
