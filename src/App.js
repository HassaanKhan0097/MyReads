import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'

import BookList from './components/BookList';
import Search from './components/Search';
import { Route } from 'react-router-dom';

class BooksApp extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
        books: [
          {
              id: 1,
              title: "To Kill a Mockingbird",
              imageLinks: {thumbnail: "http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api" },     
              authors: ["Harper Lee"],
              shelf: "currentlyReading"
          },
          {
              id: 2,
              title: "React",
              imageLinks: {thumbnail: "http://books.google.com/books/content?id=IOejDAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api" },         
              authors: ["Nils Hartmann", "Oliver Zeigermann"],
              shelf: "wantToRead"
          },
          {
            id: 3,
            title: "Satire TV",
            imageLinks: {thumbnail: "http://books.google.com/books/content?id=1wy49i-gQjIC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api" },      
            authors: ["Jonathan Gray", "Jeffrey P. Jones", "Ethan Thompson"],
            shelf: "wantToRead"
        }
      ]
    }

  }

  componentDidMount() {
    // get books on load
    BooksAPI.getAll().then(books => this.setState({ books }));
  }

  changeBookShelf = (book, newShelf) => {

    console.log(book, newShelf)

    BooksAPI.update(book, newShelf)
    .then((res)=>{

      let changedBookShelf = book;
      changedBookShelf.shelf = newShelf;
      this.setState((currState)=>({
        books: currState.books.filter( book => book.id !== changedBookShelf.id).concat(changedBookShelf)
      }))

    })

    

  }
  

  render() {

    const { books } = this.state;
    console.log(books)

    return (
      <div className="app">

        <Route exact path='/' render={() => (
          <BookList
            books={books}
            // contacts={this.state.contacts}
            onChangeBookShelf={this.changeBookShelf}
          />
        )} />

        <Route exact path='/search' render={() => (
          <Search
            books={books}
            onChangeBookShelf={this.changeBookShelf}
          />
        )} />

      </div>
    )
  }
}

export default BooksApp
