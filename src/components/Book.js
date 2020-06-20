import React from 'react'
// import * as BooksAPI from './BooksAPI'
import '../App.css'

import { Link } from 'react-router-dom';
import { render } from 'react-dom';
import CoverImage from '../images/no-image.png';
import StarRatings from 'react-star-ratings';

class Book extends React.Component {

    constructor(props){
        super(props);
        
    }

        

    // changeBookShelf = (ev) => {
    //     let changedShelfBook = this.props.book;
    //     changedShelfBook.shelf = ev.target.value;
    //     this.props.onChangeBookShelf(changedShelfBook)
    // }

    changeBookShelf = (ev) => {
        let newShelf = ev.target.value;
        this.props.onChangeBookShelf(this.props.book, newShelf)
    }

    render(){

        const { book }  = this.props;

        //handling shelves
        let defaultShelf = "none";
        if(this.props.hasOwnProperty("myBooks")){

            this.props.myBooks.forEach(myBook => {
                if(myBook.id === book.id){
                    defaultShelf = myBook.shelf
                }
            });

        } else {
            defaultShelf = book.shelf
        }

        //handling missing thumbnail
        let coverImage = CoverImage;
        if(book.hasOwnProperty("imageLinks")){
            coverImage = book.imageLinks.thumbnail
        }


        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${coverImage})` }}></div>
                        <div className="book-shelf-changer">
                        <select onChange={ this.changeBookShelf } value={defaultShelf}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">
                        {
                            book.authors &&
                            book.authors.map((author)=>(
                                `${author}`
                            ))
                        }
                    </div>
                    <StarRatings
                        rating={book.averageRating}
                        starRatedColor="blue"
                        numberOfStars={5}
                        starRatedColor="rgb(255,215,0)"
                        starEmptyColor="rgb(221,221,221)"
                        starDimension="20px"
                        starSpacing="1px"
                    />
                </div>
            </li>
        )
    }

}


export default Book;