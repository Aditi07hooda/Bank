export interface ILoanRequest {
  id: number;
  userId: number;
  typeOfLoans: number;
  amount: number;
  terms: number;
  purpose: string;
  status: number;
  courseName?: string | null;
  instituteName?: string | null;
  instituteCountry?: string | null;
  proofOfAdmission?: string | null;
  propertyName?: string | null;
  propertyAddress?: string | null;
  proofOfProperty?: string | null;
  annualIncome?: string | null;
  workingOrganisation?: string | null;
  proofOfWork?: string | null;
}

export interface LoanRequestResponse {
  value: {
    requests: ILoanRequest[];
  };
}

export interface GetAllNumbersResponse {
  value: {
    acceptedLoans: 0;
    rejectedLoans: 0;
    requestedLoans: 0;
    totalUsers: 0;
  };
}

export interface ILoanHistory {
  value: ILoanRequest[];
}

export interface ILoanHistoryResponse {
  value: {
    accountBalance:0;
    loanPayment: any[];
    totalAmount:0;
  }
}
