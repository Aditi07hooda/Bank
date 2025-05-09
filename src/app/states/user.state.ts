export interface UserStructure {
  account: {
    id: number;
    name: string;
    age: number;
    balance: number;
  };
  token?: string;
  error?: any;
}

export const user: UserStructure = {
  account: {
    id: 0,
    name: '',
    age: 0,
    balance: 0,
  },
  token: '',
  error: null,
};
