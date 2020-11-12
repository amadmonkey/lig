import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link, useLocation, useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

import './News.css';

const News = (props) => {
    console.log(props);
    const location = useLocation();
    const history = useHistory();
    let posts = [];
    let isLoggedIn = Cookies.get('authorization') && Cookies.get('authorization') !== 'undefined';

    const QUERY = gql`
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

    const { loading, error, data, fetchMore } = useQuery(QUERY, {
        variables: {
            limit: 6,
            offset: location.pathname === '/' ? 3 : 0
        }
    });

    if (loading) return <p>LOADING</p>;
    if (error) return error;

    posts = data.posts;
    console.log(posts);

    return (
        <div className="news-container">
            <h1>NEWS</h1>
            {isLoggedIn &&
                <Link className="link create-post" to={{
                    pathname: '/create-post',
                    state: { authenticated: true }
                }}>Create New Post</Link>
            }
            <ul className="news-list">
                {
                    posts.map((obj, i) => {
                        return (
                            <Link key={i} to={`/post/${obj.id}/${obj.title.replaceAll(' ', '-')}`}>
                                <li key={i}>
                                    <div className="frame">
                                        <img src={obj.image ? obj.image : null} alt={obj.title} />
                                    </div>
                                    <span>{obj.createdAt ? obj.createdAt.split(' ')[0].replaceAll('-', '.') : "NA"}</span>
                                    <h1>{obj.title}</h1>
                                </li>
                            </Link>
                        )
                    })
                }
            </ul>
            <button type="button" onClick={() =>
                fetchMore({
                    variables: { offset: posts.length },
                    updateQuery: (prev, { fetchMoreResult }) => {
                        console.log(fetchMoreResult);
                        if (!fetchMoreResult) {
                            return prev;
                        }
                        return Object.assign({}, prev, {
                            posts: [...prev.posts, ...fetchMoreResult.posts]
                        });
                    }
                })
            }>Load More</button>
        </div>
    )
}

export default News
