import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, addPost,deletePost } from "./postsSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./style.css";

const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postsData.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(3, "Title must be at least 3 characters")
      .required("Title is required"),
    body: Yup.string()
      .min(10, "Body must be at least 10 characters")
      .max(100, "Body must be at most 100 characters")
      .required("Body is required"),
  });

  const handleAddPost = (values, { resetForm }) => {
    dispatch(addPost(values)).then(() => {
      toast.success("Post added successfully");
      resetForm(); // Reset the form after successful submission
    });
  };
  const handleDelete = (id) => {
    dispatch(deletePost(id)).then(() => {
      toast.success("Post deleted successfully");
    });
  };

  return (
    <>
      <div className="posts-container">
        <div className="container">
          <div className="row">
            {}
            <div className="col-lg-8">
              {posts &&
                posts.map((post) => (
                  <div className="card post-item" key={post.id}>
                    <div className="card-body">
                      {}
                      <h5>
                        {post.id} - <Link to={`/post/${post.id}`}style={{ textDecoration: "none" }}>{post.title}</Link>
                      </h5>
                      <p className="card-text">{post.body}</p>
                      <div className="postControlButtons">
                        <button className="btn btn-primary">
                          <FontAwesomeIcon icon={faEdit} /> Update
                        </button>
                        <button className="btn btn-danger"  onClick={() => handleDelete(post.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {}
            <div className="col-lg-4">
              <Formik
                initialValues={{ title: "", body: "" }}
                validationSchema={validationSchema}
                onSubmit={handleAddPost}
              >
                {({ isSubmitting }) => (
                  <Form className="add-post-form">
                    <div className="form-group">
                      <Field
                        type="text"
                        name="title"
                        className="form-control mb-2"
                        placeholder="Title"
                      />
                      <ErrorMessage
                        name="title"
                        component="p"
                        className="text-danger"
                      />
                    </div>

                    <div className="form-group">
                      <Field
                        as="textarea"
                        name="body"
                        className="form-control mb-2"
                        placeholder="Body"
                        rows="4"
                      />
                      <ErrorMessage
                        name="body"
                        component="p"
                        className="text-danger"
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-success"
                      disabled={isSubmitting}
                    >
                      <FontAwesomeIcon icon={faPlus} /> Add Post
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default PostsList;