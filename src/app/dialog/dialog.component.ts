import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  noteForm !: FormGroup;
  constructor(private formBuilder: FormBuilder, private api: ApiService, private matDialogRef: MatDialogRef<DialogComponent>) {}

  ngOnInit(): void {
    this.noteForm = this.formBuilder.group({
      title: ['', Validators.required],
      color: ['', Validators.required],
      date: new Date(),
      description: ['', Validators.required]
    });
  }
  addNote() {
    if (this.noteForm.valid) {
      this.noteForm.value.date = new Date();
      this.api.postNote(this.noteForm.value).subscribe({
        next: (response) => {
          this.noteForm.reset();
          this.matDialogRef.close();
          alert("Note Added!")
        },
        error: (error) => {
          alert(`${error} occured!`)
        }
      })
    }
  }
}
