import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LocalStorageToken } from '../../../app_config/localstorage.token';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState, AppStateInterface } from '../../states/app.state';
import { editUser } from '../../actions/user.actions';
import { filter, take } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-profile-edit-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-edit-modal.component.html',
  styleUrl: './profile-edit-modal.component.css',
})
export class ProfileEditModalComponent {
  constructor(
    private dialogRef: MatDialogRef<ProfileEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(LocalStorageToken) private localstorage: Storage,
    private store : Store<AppStateInterface>
  ) {}

  myAcc: any = localStorage.getItem('Account')
    ? JSON.parse(localStorage.getItem('Account') || '{}')
    : null;

  editData = {
    name: '',
    updatedName: '',
    age: 0,
  };

  ngOnInit(): void {
    this.editData.name = this.data.updatedName;
    this.editData.updatedName = this.data.updatedName;
    this.editData.age = this.data.age;
  }

  editProfile() {
    console.log(this.editData.name, this.editData.updatedName, this.editData.age);
    this.store.dispatch(editUser({name: this.editData.name, data: { updatedName: this.editData.updatedName, age: this.editData.age }}));
    this.dialogRef.close();
  }
}
