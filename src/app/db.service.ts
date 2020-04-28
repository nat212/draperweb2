import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  QueryFn,
  Action,
  DocumentSnapshot,
  DocumentChangeAction,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export type CollectionPredicate<T> = string | AngularFirestoreCollection<T>;
export type DocPredicate<T> = string | AngularFirestoreDocument<T>;

export interface DwDoc<T> {
  id: string;
  data: T;
}

@Injectable({
  providedIn: 'root',
})
export class DbService {
  constructor(private afs: AngularFirestore) {}

  private snapshotToDoc<T>(action: Action<DocumentSnapshot<T>>): DwDoc<T> {
    return { id: action.payload.id, data: action.payload.data() };
  }

  private changeActionToDoc<T>(action: DocumentChangeAction<T>): DwDoc<T> {
    return { id: action.payload.doc.id, data: action.payload.doc.data() };
  }

  col<T>(
    ref: CollectionPredicate<T>,
    queryFn?: QueryFn
  ): AngularFirestoreCollection<T> {
    return typeof ref === 'string' ? this.afs.collection<T>(ref, queryFn) : ref;
  }

  doc<T>(ref: DocPredicate<T>): AngularFirestoreDocument<T> {
    return typeof ref === 'string' ? this.afs.doc<T>(ref) : ref;
  }

  collection$<T>(
    ref: CollectionPredicate<T>,
    queryFn?: QueryFn
  ): Observable<DwDoc<T>[]> {
    return this.col<T>(ref, queryFn)
      .snapshotChanges()
      .pipe(map(actions => actions.map(a => this.changeActionToDoc(a))));
  }

  document$<T>(ref: DocPredicate<T>): Observable<DwDoc<T>> {
    return this.doc<T>(ref)
      .snapshotChanges()
      .pipe(map(a => this.snapshotToDoc(a)));
  }
}
