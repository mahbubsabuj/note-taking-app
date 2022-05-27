import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { INote } from '../app.component';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  postNote(note: INote) {
    return this.http.post<INote>('http://localhost:3000/noteList/', note);
  }
  getNote() {
    return this.http.get<INote[]>('http://localhost:3000/noteList/');
  }
  putNote(note: INote, id: number) {
    return this.http.put<INote>(
      'http://localhost:3000/noteList/' + id,
      note
    );
  }
  deleteNote(id: number) {
    return this.http.delete<INote>("http://localhost:3000/noteList/" + id);
  }
}
