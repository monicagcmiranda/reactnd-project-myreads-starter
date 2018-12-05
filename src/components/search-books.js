import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import BooksGrid from './books-grid'
import * as BooksAPI from '../BooksAPI'

class SearchBooks extends Component {
  constructor (props) {
    super(props)
    this.state = {
      search: '',
      searchResults: []
    }
  }

  isDuplicate (book, existingIDs) {
    if (existingIDs[book.id]) {
      return true
    }
    existingIDs[book.id] = true
    return false
  }

  getDedupedIds (results) {
    const existingIDs = {}
    const ids = []

    results.forEach && results.forEach(book => {
      if (!this.isDuplicate(book, existingIDs)) {
        ids.push(book.id)
      }
    })

    this.setState({searchResults: ids})
  }

  handleChange (event) {
    const search = event.target.value.trim();
    this.setState({search});

    if (!search) {
      this.setState({searchResults: []});
      return
    }

    BooksAPI.search(search).then((results) => {
      if (search === this.state.search) {
        this.props.updateBooksWith(results);
        this.getDedupedIds(results);
      }
    });
  };

  render () {
    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <Link className='close-search' to='/'>Close</Link>
          <div className='search-books-input-wrapper'>
            <input type='text' onChange={this.handleChange.bind(this)} value={this.state.value} placeholder='Search by title or author' />
          </div>
        </div>
        <div className='search-books-results'>
          <BooksGrid booksByID={this.props.booksByID} ids={this.state.searchResults} updateStateWithBooks={this.props.updateStateWithBooks} />
        </div>
      </div>
    )
  }
}

SearchBooks.propTypes = {
  booksByID: PropTypes.object,
  updateStateWithBooks: PropTypes.func
}

export default SearchBooks