import React from 'react'
import * as BooksAPI from '../BooksAPI'
import '../App.css'

import { Link } from 'react-router-dom';
import Book from './Book';

class Search extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      searchedBooks: [],
      query: "",
      searchError: false
    }

  }

  getSearchedBooks = (ev) => {
    const query = ev.target.value;
    this.setState({ query });

    BooksAPI.search(query)
    .then((books)=>{

      books && 
      books.length > 0 
      ? this.setState({ searchedBooks: books, searchError: false }) 
      : this.setState({ searchedBooks: [], searchError: true })
    
    })


  }


    render() {

      const { books, onChangeBookShelf } = this.props;
      const { searchedBooks, searchError } = this.state;

        return (
            <div className="search-books">
            <div className="search-books-bar">
              <Link
                className='close-search'
                to='/'>
                Close
              </Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" name="query" value={this.state.query} onChange={this.getSearchedBooks} placeholder="Search by title or author"/>

              </div>
            </div>
            {
              searchedBooks.length > 0 &&
                (<div className="search-books-results">
                  <h3>Showings {searchedBooks.length} books </h3>
                  <ol className="books-grid">
                    {console.log("before render -->",searchedBooks)}
    
                    {
                        searchedBooks.map((book, ind)=>(
                          <Book key={ind} book={book} myBooks={books} onChangeBookShelf={onChangeBookShelf} />
                        ))
                    }
    
                  </ol>
                </div>)
            }

            {
              this.state.query !== "" && searchError && (<div className="search-books-results">
              <h3>No books found! Please try with a different keyword.</h3>
              </div>)
            }

                {/* <div className="search-books-results">
                  {
                    searchedBooks.length > 0 && !searchError
                    ? <div>
                        <h3>Showings {searchedBooks.length} books </h3>
                        <ol className="books-grid">
                        {console.log("before render -->",searchedBooks)}
        
                        {
                            searchedBooks.map((book, ind)=>(
                              <Book key={ind} book={book} onChangeBookShelf={onChangeBookShelf} />
                            ))
                        }
        
                        </ol>
                      </div>
                    : <h3>No books found! Please try with a different keyword.</h3>
                  }
                </div> */}
            

          </div>
      )
    }

}


export default Search