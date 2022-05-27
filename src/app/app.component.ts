import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import { HotToastService } from '@ngneat/hot-toast';

export interface INote {
  id: number;
  title: string;
  description: string;
  color: string;
  date: Date;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title: string = 'note-taking-app';
  noteList: INote[] = [];
  constructor(private dialog: MatDialog, private api: ApiService, private toast: HotToastService) {}

  ngOnInit(): void {
    this.getAllNote();
  }
  openDialog() {
    this.dialog
      .open(DialogComponent, {
        height: '50%',
        width: '50%',
        position: {
          top: '15%',
        },
      })
      .afterClosed()
      .subscribe(() => {
        this.getAllNote();
      });
  }
  getAllNote(): void {
    this.api.getNote().subscribe({
      next: (response) => {
        this.noteList = response;
        console.log(this.noteList);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  editNote(note: INote): void {
    console.log(note);
    this.dialog
      .open(DialogComponent, {
        height: '50%',
        width: '50%',
        position: {
          top: '15%',
        },
        data: note,
      })
      .afterClosed()
      .subscribe(() => {
        this.getAllNote();
      });
  }
  deleteNote(id: number) {
    this.api.deleteNote(id).subscribe({
      next: (response) => {
        this.toast.success("Note deleted sucessfully!");
        this.getAllNote();
      },
      error: (error) => {
        this.toast.error("Error Occured while removing a note!");
      }
    });
  }
}
