import React from 'react'
import { Route } from 'react-router-dom'
import ListBooks from './components/list-books'
import SearchBooks from './components/search-books'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      history: null,
      booksByID: {},
      shelves: {
        currentlyReading: [],
        wantToRead: [],
        read: [],
      },
    };
  }

  updateBooksWith(data, overwrite) {
    this.setState(state => {
      const booksByID = state.booksByID

      if (!data.error) {
        data.forEach(book => {
          if (overwrite || !booksByID[book.id]) booksByID[book.id] = book
        });
      }

      return { booksByID };
    });
  }

  updateShelves(data) {
    const shelves = {
      currentlyReading: [],
      wantToRead: [],
      read: [],
    };

    data.forEach((book) => {
      const {shelf} = book;
      shelves[shelf] && shelves[shelf].push(book.id);
    });

    this.setState({ shelves });
  }

  updateStateWithBooks() {
    BooksAPI.getAll().then((data) => {
      this.updateBooksWith(data, true);
      this.updateShelves(data);
    })
  }

  updateStateWithBooksOnSearch(history) {
    BooksAPI.getAll().then((data) => {
      this.updateBooksWith(data, true);
      this.updateShelves(data);
      history.push('/');
    });
  }

  render() {
    return (
      <div className='app'>
        <Route exact path='/' render={() => (
          <ListBooks
            booksByID={this.state.booksByID}
            shelves={this.state.shelves}
            updateStateWithBooks={this.updateStateWithBooks.bind(this)} />
        )} />
        <Route path='/search' render={({ history }) => (
          <SearchBooks
            booksByID={this.state.booksByID}
            updateBooksWith={this.updateBooksWith.bind(this)}
            updateStateWithBooks={this.updateStateWithBooksOnSearch.bind(this, history)} />
        )} />
      </div>
    )
  }

  componentDidMount() {
    BooksAPI.getAll().then((data) => {
      this.updateBooksWith(data)
      this.updateShelves(data)
    })
  }
}

export default BooksApp
