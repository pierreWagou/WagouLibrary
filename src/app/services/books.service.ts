import { Injectable } from '@angular/core';
import {Subject} from 'rxjs'
import * as firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'

import {Book} from '../models/book.model'

@Injectable()

export class BooksService {

  books: Book[] = []
  booksSubject = new Subject<Book[]>()

  constructor() {
    this.getBooks()
  }

  emitBooks() {
    this.booksSubject.next(this.books)
  }

  saveBooks() {
    firebase.database().ref('/books').set(this.books)
  }

  getBooks() {
    firebase.database().ref('/books').on('value', (data: firebase.database.DataSnapshot) => {
      this.books = data.val() ? data.val() : []
      this.emitBooks()
    })
  }

  getSingleBook(id: number) {
    return new Promise((resolve, reject) => {
      firebase.database().ref('/books/'+id).once('value').then(
        (data: firebase.database.DataSnapshot) => {resolve(data.val())},
        (error) => {reject(error)}
      )
    })
  }

  createNewBook(newBook: Book) {
    this.books.push(newBook)
    this.saveBooks()
    this.emitBooks()
  }

  removeBook(book: Book) {
    if(book.photo) {
      const storageRef = firebase.storage().refFromURL(book.photo)
      storageRef.delete().then(
        () => {},
        (error) => {console.log(error)}
      )
    }
    const index = this.books.findIndex((bookItem) => {
      if(bookItem===book) {
        return true
      }
    })
    this.books.splice(index, 1)
    this.saveBooks()
    this.emitBooks()
  }

  uploadFile(file: File) {
    return new Promise((resolve, reject) => {
      const fileName =  Date.now().toString()
      const upload = firebase.storage().ref().child("images/"+fileName+file.name).put(file)
      upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
        () => {},
        (error) => {reject(error)},
        () => {resolve(upload.snapshot.ref.getDownloadURL())}
      )
    })
  }
}
