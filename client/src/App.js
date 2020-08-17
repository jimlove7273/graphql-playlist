import React from 'react';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

import BookList from "./components/BookList"
import AddBook from './components/AddBook'

// -- Apollo Client Setup
const client = new ApolloClient({
  uri: 'http://localhost:4010/graphql'
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Ninja's Reading List</h1>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
