import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  title: string = 'note-taking-app';
  constructor(private dialog: MatDialog, private api: ApiService) {}
  openDialog() {
    this.dialog.open(DialogComponent, {
      height: '50%',
      width: '50%',
      position: {
        top: '15%',
      },
    });
  }
  ngOnInit(): void {
    this.getAllNote();
  }
  getAllNote() {
    this.api.getNote().subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
