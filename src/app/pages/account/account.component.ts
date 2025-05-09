import { Component, Inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Account } from './account.interface';
import { AccountService } from '../../services/account/account.service';
import { LocalStorageToken } from '../../../app_config/localstorage.token';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProfileEditModalComponent } from '../../Components/profile-edit-modal/profile-edit-modal.component';
import { Store } from '@ngrx/store';
import {
  loginUser,
  createUser,
  loginUserSuccess,
  loginUserFailure,
  createUserSuccess,
  createUserFailure,
} from '../../actions/user.actions';
import { UserStructure } from '../../states/user.state';
import { filter, take, Subscription, Observable } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  standalone: true,
  selector: 'app-account',
  imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent implements OnDestroy {
  constructor(
    private accs: AccountService,
    @Inject(LocalStorageToken) private localstorage: Storage,
    private store: Store<{ user: UserStructure }>,
    private actions$: Actions
  ) {}

  dialog = new MatDialog();

  myAcc$!: Observable<UserStructure | null>;
  loginName: string = '';
  password: string = '';
  userPresent: boolean = localStorage.getItem('UserPresent') ? true : false;

  data: Account = {
    name: '',
    age: 0,
    balance: 0,
    password: '',
  };

  editData: Account = {
    name: '',
    age: 0,
  };

  error: string = '';
  success: string = '';

  private subscriptions = new Subscription();

  ngOnInit(): void {
    if (this.localstorage.getItem('Name')) {
      this.loginName = this.localstorage.getItem('Name') || '';
      this.getAccount(false);
    }
  }

  getAccount(login: boolean = true) {
    this.error = '';
    this.success = '';

    const formData = new FormData();
    formData.append('name', this.loginName);
    if (login) {
      formData.append('password', this.password);
    }

    this.store.dispatch(loginUser({ data: formData }));
    this.localstorage.setItem('Name', this.loginName);

    const loginSuccessSub = this.actions$.pipe(ofType(loginUserSuccess), take(1)).subscribe(() => {
      this.loadUserData();
      this.userPresent = true;
      this.success = 'Login successful!';
    });

    const loginFailureSub = this.actions$.pipe(ofType(loginUserFailure), take(1)).subscribe(() => {
      this.error = 'Login failed. Please check your credentials.';
      this.userPresent = false;
    });

    this.subscriptions.add(loginSuccessSub);
    this.subscriptions.add(loginFailureSub);
  }

  createAccount() {
    this.error = '';
    this.success = '';

    const formData = new FormData();
    formData.append('name', this.data.name);
    formData.append('age', this.data.age.toString());
    formData.append('password', this.data.password || '');
    formData.append('balance', (this.data.balance ?? 0).toString());

    this.store.dispatch(createUser({ data: formData }));
    this.localstorage.setItem('Name', this.data.name);
    this.loginName = this.data.name;

    const createSuccessSub = this.actions$.pipe(ofType(createUserSuccess), take(1)).subscribe(() => {
      this.getAccount(false);
      this.success = 'Account created successfully!';
    });

    const createFailureSub = this.actions$.pipe(ofType(createUserFailure), take(1)).subscribe(() => {
      this.error = 'Account creation failed. Please try again.';
      this.userPresent = false;
    });

    this.subscriptions.add(createSuccessSub);
    this.subscriptions.add(createFailureSub);
  }

  loadUserData() {
    this.myAcc$ = this.store.select('user').pipe(
      filter((account) => !!account && !!account.account.name)
    );

    const dataSub = this.myAcc$.pipe(take(1)).subscribe((data) => {
      if (data) {
        this.editData.name = data.account.name;
        this.editData.age = data.account.age;
      }
    });

    this.subscriptions.add(dataSub);
  }

  beginEditing() {
    this.dialog.open(ProfileEditModalComponent, {
      height: 'fit-content',
      width: 'fit-content',
      data: {
        updatedName: this.editData.name,
        age: this.editData.age,
      },
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe(); // Clean up
  }
}
