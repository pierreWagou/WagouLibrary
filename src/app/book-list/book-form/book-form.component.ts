import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms'
import {Router} from '@angular/router'

import {BooksService} from '../../services/books.service'
import {Book} from '../../models/book.model'

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {

  bookForm: FormGroup
  fileIsUploading = false
  fileUrl: string
  fileUploaded = false

  constructor(private booksService: BooksService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm()
  }

  initForm() {
    this.bookForm = this.formBuilder.group({
      title: ["", Validators.required],
      author: ["", Validators.required],
      synopsis: ""
    })
  }

  onSaveBook() {
    const title = this.bookForm.get("title").value
    const author = this.bookForm.get("author").value
    const synopsis = this.bookForm.get("synopsis").value
    const newBook = new Book(title, author)
    newBook.synopsis = synopsis
    if(this.fileUrl && this.fileUrl!="") {
      newBook.photo = this.fileUrl
    }
    this.booksService.createNewBook(newBook)
    this.router.navigate(["/books"])
  }

  onUploadFile(file: File) {
    this.fileIsUploading = true
    this.booksService.uploadFile(file).then((url: string) => {
      this.fileUrl = url
      this.fileIsUploading = false
      this.fileUploaded = true
    })
  }

  detectFile(event) {
    this.onUploadFile(event.target.files[0])
  }

}
