import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import placeholder from '../../images/AdobeStock_212232853@2x.png';
import placeholder2 from '../../images/matheus-ferrero-159633-unsplash@2x.png';
import './Carousel.css';
import { ReactComponent as Up } from '../../images/up.svg';

const Carousel = () => {
    let posts = [];
    const bulletCursor = useRef(null);
    const [activePost, setActivePost] = useState(0);

    const move = (next) => {
        let newIndex = next ? ((activePost + 1) <= 2 ? (activePost + 1) : 0) : ((activePost - 1) >= 0 ? (activePost - 1) : 2);
        bulletCursor.current.style.left = `${newIndex * 25}px`;
        setActivePost(newIndex);
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            move(true);
        }, 10000);
        return () => clearTimeout(timer);
    }, [activePost])

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

    const { loading, error, data } = useQuery(QUERY, {
        variables: {
            limit: 3,
            offset: 0
        }
    });

    const parseTitle = (title) => {
        const titleArray = title.split(' ');
        let titleGroup = [], titleMix = titleArray[0];

        for (let x = 1; x < titleArray.length; x++) {
            if ((titleMix + ' ' + titleArray[x]).length >= 15) {
                titleGroup = [...titleGroup, <span key={x}>{titleMix}</span>];
                titleMix = titleArray[x];
            } else {
                titleMix = titleMix + ' ' + titleArray[x];
            }
            if (x === (titleArray.length - 1)) {
                titleGroup = [...titleGroup, <span key={x}>{titleMix}</span>];
            }
        }
        return titleGroup;
    }

    if (loading) return <p>LOADING</p>;
    if (error) return error;

    posts = data.posts;

    return (
        <div className="carousel-container">
            {posts &&
                <React.Fragment>
                    {posts.map((obj, i) => {
                        return (
                            <article key={i} className={`carousel-item ${i === activePost ? 'active' : ''}`}>
                                <img loading="lazy" src={posts[activePost].image} alt="placeholder" />
                            </article>
                        )
                    })}
                    <footer className="indicator" style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                        <button onClick={() => move(false)} style={{ flexGrow: 1 }}><Up /></button>
                        <div style={{ flexGrow: 11 }}>
                            <div className="description">
                                <Link to={`/post/${posts[activePost].id}/${posts[activePost].title.replaceAll(' ', '-')}`}>
                                    <h1 className="title">{parseTitle(posts[activePost].title)}</h1>
                                </Link>
                                <span className="date">{posts[activePost].createdAt.split(' ')[0].replaceAll('-', '.')}</span>
                            </div>
                            <ul className="bullets">
                                <li ref={bulletCursor} className="bullet-cursor"></li>
                                {posts.map((value, i) => {
                                    return <li key={i}></li>
                                })}
                            </ul>
                        </div>
                        <button onClick={() => move(true)} style={{ flexGrow: 1 }}><Up /></button>
                    </footer>
                </React.Fragment>
            }
        </div >
    )
}

export default Carousel
