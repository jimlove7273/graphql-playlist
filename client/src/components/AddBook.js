import React, { useState } from 'react'
import { graphql } from 'react-apollo'
import * as compose from 'lodash.flowright';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries'

const AddBook = props => {
	console.log(props)

	const [name, setName] = useState('')
	const [genre, setGenre] = useState('')
	const [authorId, setAuthorId] = useState('')
	// const [formdata, setFormdata] = useState({
	// 	name: '',
	// 	genre: '',
	// 	authorId: ''
	// })

	const displayAuthors = () => {
		let data = props.getAuthorsQuery
		if ( data.loading ) {
			return (<option disabled>Loading Authors...</option>)
		} else {
			return data.authors.map( author => {
				return (
					<option key={author.id} value={author.id}>{author.name}</option>
				)
			})
		}
	}

	const submitForm = (e) => {
		e.preventDefault()
		//console.log("name", name)
		props.addBookMutation({
			variables: {
				name: name,
				genre: genre,
				authorId: authorId
			},
			refetchQueries: [{ query: getBooksQuery }]
		})
	}

	return (
		<form id="add-book" onSubmit={submitForm}>
			<div className="field">
				<label>Book Name:</label>
				<input type="text" name="name" value={name} onChange={(e)=>setName(e.target.value)} />
			</div>
			<div className="field">
				<label>Genre:</label>
				<input type="text" name="genre" value={genre} onChange={(e)=>setGenre(e.target.value)} />
			</div>
			<div className="field">
				<label>Author:</label>
				<select name="author" value={authorId} onChange={(e)=>setAuthorId(e.target.value)}>
					<option>Select Author</option>
					{ displayAuthors() }
				</select>
			</div>
			<button>+</button>
		</form>
	)
}

export default compose(
	graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
	graphql(addBookMutation, { name: "addBookMutation"})
)(AddBook)