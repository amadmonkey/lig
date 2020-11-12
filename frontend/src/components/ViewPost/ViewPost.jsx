// app
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useQuery, useMutation, gql } from '@apollo/client';
import Cookies from 'js-cookie';
import Moment from 'react-moment';

// style
import './ViewPost.css';

const ViewPost = () => {
    let { id, title } = useParams();
    const { register, handleSubmit, watch, errors } = useForm();

    const QUERY = gql`
        query($id: Int!) {
            post(id: $id) {
                id
                title
                content
                image
                createdAt
                comments {
                    id
                    postId
                    content
                    createdAt
                }
            }
        }
    `;

    const MUTATION = gql`
        mutation($postId: Int!, $content: String!) {
            addComment(postId: $postId, content: $content) {
                id
                postId
                content
                createdAt
            }
        }
    `;

    const { loading, error, data } = useQuery(QUERY, {
        variables: {
            id: parseInt(id)
        }
    });

    const [createCommentMutation, { loading: mutationLoading, data: mutationData, onCompleted, onError }] = useMutation(MUTATION, {
        onCompleted(data) {
            if (data.addComment) {

            } else {
                console.error(data);
            }
        },
        onError(data) {
            console.error(data);
        }
    });

    const onSubmit = (data) => {
        createCommentMutation({
            variables: {
                postId: parseInt(id),
                content: data.comment
            },
            refetchQueries: [
                { query: QUERY, variables: { id: parseInt(id) } }
            ]
        });
    }

    if (loading) return <p>LOADING</p>;
    if (error) return error;

    let post = data.post;

    return (
        <div className="wrapper view-post-container">
            <div className="tools">
                {
                    Cookies.get('authorization') &&
                    <Link to={`/post/${id}/${title}/edit`} className="link">Edit Post</Link>
                }
            </div>
            <span className="post-date">{post.createdAt && post.createdAt.split(' ')[0].replaceAll('-', '.')}</span>
            <h1 className="post-title">{post.title}</h1>
            <div className="post-image-container">
                <img src={post.image} />
            </div>
            <p className="post-content">{post.content}</p>
            <div className="post-comments-container">
                <h1>COMMENT</h1>
                {
                    data.post.comments.map((obj, i) => {
                        return (
                            <div key={i} className="comment-item">
                                <p>{obj.content}</p>
                                {/* <span className="comment-date">{obj.createdAt}</span> */}
                                <Moment fromNow>{obj.createdAt}</Moment>
                            </div>
                        )
                    })
                }
                <form onSubmit={handleSubmit(onSubmit)} className="new-comment-form">
                    <div className="form-group" style={{ textAlign: "left" }}>
                        <textarea
                            name="comment"
                            className="comment-box"
                            placeholder="Write comment"
                            ref={register({
                                required: {
                                    value: true,
                                    message: "Please enter a message"
                                },
                                maxLength: {
                                    value: 250,
                                    message: "Please enter a value of less than 250 characters"
                                }
                            })}
                        ></textarea>
                        {errors.comment && <label htmlFor="comment" className="error-message">{errors.comment.message}</label>}
                    </div>
                    <button type="submit">SUBMIT</button>
                </form>
            </div>
        </div>
    )
}

export default ViewPost
