import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from '../BooksAPI'

class Book extends Component {
    handleOnChange(event) {
        const newShelf = event.target.value
        const currentShelf = this.props.currentShelf

        if (newShelf && newShelf !== currentShelf) {
            BooksAPI
                .update({ id: this.props.id }, newShelf)
                .then(this.props.updateStateWithBooks)
        }
    }

    render() {
        const { authors, title, backgroundImage } = this.props;

        const currentShelf = this.props.currentShelf || 'none';

        return (
            <li>
                <div className='book'>
                    <div className='book-top'>
                        <div className='book-cover' style={{ backgroundImage: `url("${backgroundImage}")` }} />
                        <div className='book-shelf-changer'>
                            <select value={currentShelf} onChange={this.handleOnChange.bind(this)}>
                                <option disabled>Move to...</option>
                                <option value='currentlyReading'>Currently Reading</option>
                                <option value='wantToRead'>Want to Read</option>
                                <option value='read'>Read</option>
                                <option value='none'>None</option>
                            </select>
                        </div>
                    </div>
                    <div className='book-title'>{title}</div>
                    <div className='book-authors'>{authors && authors.join(', ')}</div>
                </div>
            </li>
        )
    }
}

Book.propTypes = {
    id: PropTypes.string,
    currentShelf: PropTypes.string,
    updateStateWithBooks: PropTypes.func,
    authors: PropTypes.array,
    title: PropTypes.string,
    backgroundImage: PropTypes.string
}

export default Book