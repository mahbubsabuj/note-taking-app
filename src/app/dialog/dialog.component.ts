import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { INote } from '../app.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  noteForm!: FormGroup;
  buttonName: string = 'Save';
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private matDialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: INote,
    private toast: HotToastService,
  ) {}

  ngOnInit(): void {
    this.noteForm = this.formBuilder.group({
      title: ['', Validators.required],
      color: ['', Validators.required],
      date: new Date(),
      description: ['', Validators.required],
    });
    if (this.editData) {
      this.buttonName = 'Update';
    }
    this.noteForm.controls['title'].setValue(this.editData.title);
    this.noteForm.controls['color'].setValue(this.editData.color);
    this.noteForm.controls['date'].setValue(new Date());
    this.noteForm.controls['description'].setValue(this.editData.description);
  }
  updateNote() {
    this.api.putNote(this.noteForm.value, this.editData.id).subscribe({
      next: (response) => {
        this.toast.success("Note updated sucessfully!");
        this.noteForm.reset();
        this.matDialogRef.close();
      },
      error: (error) => {
        this.toast.error("Error occured while updating a note!");
        console.log(error);
      },
    });
  }
  addEditNote() {
    if (this.editData) {
      if (this.noteForm.valid) {
        this.updateNote();
      }
    } else {
      if (this.noteForm.valid) {
        this.noteForm.controls['date'].setValue(new Date());
        this.api.postNote(this.noteForm.value).subscribe({
          next: (response) => {
            this.noteForm.reset();
            this.matDialogRef.close();
            this.toast.success("Note Added sucessfully!");

          },
          error: (error) => {
            this.toast.error("Error occured while adding a note!");
          },
        });
      }
    }
  }
}
