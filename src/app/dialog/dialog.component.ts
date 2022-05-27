import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  noteForm !: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.noteForm = this.formBuilder.group({
      title: ['', Validators.required],
      color: ['', Validators.required],
      date: new Date(),
      description: ['', Validators.required]
    });
  }
  addNote() {
    console.log(this.noteForm.value.date);
    this.noteForm.value.date = new Date();
    console.log(this.noteForm.value.date);
    console.log(this.noteForm.value);
  }
}
