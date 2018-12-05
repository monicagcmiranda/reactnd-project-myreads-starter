import React from 'react'
import BooksGrid from './books-grid'

class BookShelf extends React.PureComponent {
    render() {
        const { booksByID, ids, shelfName, updateStateWithBooks } = this.props;

        return <div className='bookshelf'>
            <h2 className='bookshelf-title'>{shelfName}</h2>
            <div className='bookshelf-books'>
                <BooksGrid booksByID={booksByID} ids={ids} updateStateWithBooks={updateStateWithBooks} />
            </div>
        </div>;
    }
}

export default BookShelf;
