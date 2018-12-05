import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BooksGrid from './books-grid'
import BookShelf from './book-shelf'

class ListBooks extends Component {
  render() {
    const { currentlyReading, wantToRead, read } = this.props.shelves;
    const { booksByID, updateStateWithBooks } = this.props;

    return (
      <div className='list-books'>
        <div className='list-books-title'>
          <h1>MyReads</h1>
        </div>
        <div className='list-books-content'>
          <div>
            <div className='bookshelf'>
              <h2 className='bookshelf-title'>Currently Reading</h2>
              <div className='bookshelf-books'>
                <BooksGrid booksByID={booksByID} ids={currentlyReading} updateStateWithBooks={updateStateWithBooks} />
              </div>
            </div>
            <div className='bookshelf'>
              <h2 className='bookshelf-title'>Want to Read</h2>
              <div className='bookshelf-books'>
                <BooksGrid booksByID={booksByID} ids={wantToRead} updateStateWithBooks={updateStateWithBooks} />
              </div>
            </div>
            <div className='bookshelf'>
              <h2 className='bookshelf-title'>Read</h2>
              <div className='bookshelf-books'>
                <BooksGrid booksByID={booksByID} ids={read} updateStateWithBooks={updateStateWithBooks} />
              </div>
            </div>
          </div>
        </div>
        <div className='open-search'>
          <Link to='/search' className="button">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks