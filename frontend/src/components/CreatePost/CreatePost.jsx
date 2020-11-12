// app
import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Link, Prompt, useLocation, useHistory, useParams } from 'react-router-dom';
import { useQuery, useMutation, gql } from '@apollo/client';
import Cookies from 'js-cookie';

// styles
import './CreatePost.css';

const CreatePost = () => {
    let { id } = useParams();
    let location = useLocation();
    let history = useHistory();
    !Cookies.get('authorization') && Cookies.get('authorization') !== 'undefined' && history.push('/login');
    const date = new Date();
    const [image, setImage] = useState({ file: null, base64: null });
    const { register, handleSubmit, errors, setValue, setError, formState, reset } = useForm();
    const { isDirty, isSubmitting } = formState;

    const QUERY_POSTS = gql`
        query($limit: Int!, $offset: Int!){
            posts(pagination: {limit: $limit, offset: $offset}){
                id,
                title,
                content,
                image,
                createdAt,
                comments {
                    id,
                    postId,
                    content,
                    createdAt
                }
            }
        }
    `;

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
        mutation($id: Int!, $title: String!, $content: String!, $image: String!) {
            ${id ? 'updatePost' : 'addPost'}(post: {id: $id, title: $title, content: $content, image: $image}) {
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

    const { loading: queryLoading, error: queryError, data: queryData, onCompleted: queryOnCompleted } = useQuery(QUERY, {
        variables: {
            id: id ? parseInt(id) : 0
        },
        onCompleted(data) {
            setValue("title", data.post.title, { shouldDirty: false });
            setImage({ file: data.post.image, base64: data.post.image });
            // setValue("imageinput", "", { shouldDirty: false });
            setValue("content", data.post.content, { shouldDirty: false });
        },
        skip: !id
    });

    const [createPostMutation, { loading: mutationLoading, data: mutationData, onCompleted, onError }] = useMutation(MUTATION, {
        onCompleted(data) {
            let d = data.addPost ? data.addPost : data.updatePost;
            if (data) {
                reset();
                history.push(`/post/${d.id}/${d.title.replaceAll(' ', '-')}`);
            } else {
                // errror
            }
        },
        onError(data) {
            console.error(data);
        },
        refetchQueries: [
            {
                query: QUERY_POSTS,
                variables: {
                    limit: 6,
                    offset: location.pathname === '/' ? 3 : 0
                }
            }
        ]
    });

    const onSubmit = (data) => {
        if (isDirty && image) {
            createPostMutation({
                variables: {
                    id: id ? parseInt(id) : 0,
                    title: data.title,
                    content: data.content,
                    image: image.base64
                }
            });
        } else {
            setError('imageinput', 'Image is required');
        }
    }

    const handleSelectImage = (data) => {
        let files = data.target.files;
        if (files.length) {
            let reader = new FileReader();
            reader.onload = (e) => setImage({ file: e.target.result, base64: reader.result })
            reader.readAsDataURL(files[0]);
        }
    }

    if (queryLoading) return <p>LOADING</p>;
    if (queryError) return queryError;

    return !queryLoading && (
        <div className="wrapper create-post-container">
            <div className="tools">
                <button className="link" onClick={() => handleSubmit(onSubmit)()} type="submit">Save Post</button>
                <Link to="/" className="link">Cancel</Link>
            </div>
            <h1>{`${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`}</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="new-post-form">
                <div className="form-group">
                    <textarea
                        name="title"
                        placeholder="Title"
                        className="new-post-title jp"
                        ref={register({
                            required: {
                                value: true,
                                message: "Title is required"
                            },
                            maxLength: {
                                value: 250,
                                message: "Please enter a value of less than 250 characters"
                            }
                        })}
                        autoFocus
                    ></textarea>
                    {errors.title && <label htmlFor="title" className="error-message">{errors.title.message}</label>}
                </div>
                <div className="form-group">
                    <div className="image-container">
                        <img id="image" src={image.file} />
                        <button type="button" onClick={() => document.getElementById('image-input').click()}>UPLOAD IMAGE</button>
                        <input
                            hidden={true}
                            type="file"
                            id="image-input"
                            name="imageinput"
                            accept="image/jpg, image/jpeg, image/png"
                            ref={register({
                                required: {
                                    value: image ? false : true,
                                    message: "Image is required"
                                }
                            })}
                            onChange={(e) => handleSelectImage(e)} />
                    </div>
                    {errors.imageinput && <label htmlFor="image" className="error-message">{errors.imageinput.message}</label>}
                </div>
                <div className="form-group">
                    <textarea
                        name="content"
                        placeholder="Content"
                        className="jp"
                        ref={register({
                            required: {
                                value: true,
                                message: "Content is required"
                            }
                        })}
                    ></textarea>
                    {errors.content && <label htmlFor="content" className="error-message">{errors.content.message}</label>}
                </div>
            </form>
            <Prompt when={isDirty} message="Discard changes and leave?" />
        </div >
    )
}

export default CreatePost
