import React from 'react'
// import * as BooksAPI from './BooksAPI'
import '../App.css'

import { Link } from 'react-router-dom';
import { render } from 'react-dom';
import Book from './Book';

class BookShelf extends React.Component {

    constructor(props) {
        super(props)

    }

    render() {

        const { shelf, books, onChangeBookShelf }  = this.props;

        return (
            <div className="bookshelf">
            <h2 className="bookshelf-title">{shelf.title}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                
                {
                    books.map((book, ind)=>(
                        <Book key={ind} book={book} onChangeBookShelf={onChangeBookShelf} />
                    ))
                }

              </ol>
            </div>
          </div>
      )
    }

}


export default BookShelf;