import { useState } from "react";

function useForm({ form, additionalData, endpointUrl, callbackfield }) {
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const headers = {
    "x-access-token": localStorage.getItem("token"),
  };

  const handleSubmit = (e) => {
    if (form) {
      e.preventDefault();
      setStatus("loading");
      setMessage("");

      const finalFormEndpoint =
        "http://localhost:8000/api/comment/create" || form.action;
      const data = Array.from(form.elements)
        .filter((input) => input.name)
        .reduce(
          (obj, input) => Object.assign(obj, { [input.name]: input.value }),
          {}
        );

      if (additionalData) {
        Object.assign(data, additionalData);
      }

      fetch(finalFormEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token")
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.status !== 200) {
            throw new Error(response.statusText);
          }

          return response.json();
        })
        .then(() => {
          setMessage("We'll be in touch soon.");
          setStatus("success");
          console.log("thanh cong????");
          callbackfield();
        })
        .catch((err) => {
          setMessage(err.toString());
          setStatus("error");
          console.log("loi create comment");
        });
    }
  };

  return { handleSubmit, status, message };
}

export default useForm;
