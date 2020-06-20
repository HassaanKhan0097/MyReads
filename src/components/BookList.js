import React from 'react'
// import * as BooksAPI from './BooksAPI'
import '../App.css'

import { Link } from 'react-router-dom';
import BookShelf from './BookShelf';

class BookList extends React.Component {

    render() {

      const { books, onChangeBookShelf } = this.props;
      const shelfTypes = [
        { type: 'currentlyReading', title: 'Currently Reading' },
        { type: 'wantToRead', title: 'Want to Read' },
        { type: 'read', title: 'Read' }
      ];

        return (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
            <div>
              {
                shelfTypes.map((shelf, ind)=>{
                  const shelfBooks = books.filter(book => book.shelf == shelf.type)
                  return (
                    <BookShelf key={ind} shelf={shelf} books={shelfBooks} onChangeBookShelf={onChangeBookShelf}/>
                  )
                })
              }
            </div>
          </div>
          <div className="open-search">
              <Link to="/search">Search</Link>
            </div>
          </div>
      )
    }

}


export default BookList