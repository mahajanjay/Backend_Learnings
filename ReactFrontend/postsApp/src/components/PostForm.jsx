import React, { useEffect, useState } from "react";
import "./PostForm.css";
import { ErrorMessage, Field, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

// const postSchema = Yup.object().shape({
//     userId: Yup.string().required().min(1, 'user Id is required').max(2, 'user Id is maximum of 2 digits'),
//     title: Yup.string().required(),
//     body: Yup.string().required(),
// })

function PostForm() {
  // const navigate = useNavigate();

  // return (
  //   <div className='postForm'>
  //     <Formik
  //     initialValues={{userId: '', title: '', body: ''}}
  //     validationSchema={postSchema}
  //     onSubmit={(values) => {

  //       console.log('values');
  //     }}
  //     >
  //       {() => {
  //         return (
  //           <form>
  //               <div>
  //                   <label>User Id</label>
  //                   <Field type='text' name='userId' />
  //                   <ErrorMessage className='errMsg' name='userId' component="div" />
  //               </div>
  //               <div>
  //                   <label>Title</label>
  //                   <Field type='text' name='title' />
  //                   <ErrorMessage className='errMsg' name='title' component="div" />
  //               </div>
  //               <div>
  //                   <label>Body</label>
  //                   <Field type='text' name='body' />
  //                   <ErrorMessage className='errMsg' name='body' component="div" />
  //               </div>
  //               <button type='submit'>Submit</button>
  //           </form>
  //         )
  //       }}
  //     </Formik>
  //   </div>
  // )

  //*****With normal react form*******

  let [formData, setFormData] = useState({
    userId: "",
    title: "",
    body: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [id, setId] = useState(null);
  const location = useLocation();
  useEffect(() => {
    // const currentLocation = location.pathname;

    const queryParams = new URLSearchParams(location.search);
    // id = queryParams.get("id");
    setId(queryParams.get("id"))
    const userId = queryParams.get("userId");
    const title = queryParams.get("title");
    const body = queryParams.get("body");
    if (id) {
      setIsEdit(true);
      setFormData({ userId: userId, title: title, body: body });
    }
  }, [id]);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    const validationErrors = {};
    if (!formData.userId) {
      validationErrors.userId = "User Id is required";
    } else if (formData.userId.length > 2) {
      validationErrors.userId = "User Id has a maximum of 2 digits";
    }
    if (!formData.title) {
      validationErrors.title = "Title is required";
    }
    if (!formData.body) {
      validationErrors.body = "Body is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Submit the form
    axios
      .post("http://localhost:3000/api/v1/posts", formData) // Replace <API_URL> with the actual endpoint
      .then((res) => {
        console.log(res);
        // Handle successful submission, e.g., redirect
        // navigate('/success');
      })
      .catch((error) => {
        // Handle submission error
        console.error("Error:", error);
      });
  };

  const handleEdit = (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!formData.userId) {
      validationErrors.userId = "User Id is required";
    } else if (formData.userId.length > 2) {
      validationErrors.userId = "User Id has a maximum of 2 digits";
    }
    if (!formData.title) {
      validationErrors.title = "Title is required";
    }
    if (!formData.body) {
      validationErrors.body = "Body is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    console.log(id);

    axios
      .put(`http://localhost:3000/api/v1/posts/${id}`, formData)
      .then((res) => console.log(res))
      .catch((err) => console.log("Error", err));
  };

  return (
    <div className="postForm">
      <form onSubmit={!isEdit ? handleSubmit : handleEdit}>
        <div>
          <label>User Id</label>
          <input
            type="text"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
          />
          {errors.userId && <div className="errMsg">{errors.userId}</div>}
        </div>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title && <div className="errMsg">{errors.title}</div>}
        </div>
        <div>
          <label>Body</label>
          <input
            type="text"
            name="body"
            value={formData.body}
            onChange={handleChange}
          />
          {errors.body && <div className="errMsg">{errors.body}</div>}
        </div>
        {!isEdit ? (
          <button type="submit">Submit</button>
        ) : (
          <button type="submit">Edit</button>
        )}
      </form>
    </div>
  );
}

export default PostForm;
