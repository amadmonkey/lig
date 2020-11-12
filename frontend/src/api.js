import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GetNews = () => {
	const QUERY = gql`
		query($limit: Int!, $offset: Int!){
			posts(pagination: {limit: $limit, offset: $offset}){
			  id
			}
		}
	`;

	const { loading, error, data, fetchMore } = useQuery(QUERY, {
		variables: {
			limit: 6,
			offset: 0
		}
	});
  
    if (loading) return <p>Loading...</p>;
    if (error) return error;
  
    return data;
}

const API = {
    GET: {
        NEWS: GetNews
    }
}

export default API;