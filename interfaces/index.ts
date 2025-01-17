export interface Challenge {
  id: string;
  studentId: string;
  googleDriveFolder: string;
  gradingStatus?: "UNSUBMITTED" | "SUBMITTED" | "GRADE_PASSED" | "GRADE_FAILED";
  grade?: number;
  reviewerId?: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
}

export interface Paging {
  currentPage: number;
  pageLimit: number;
  totalData: number;
  nextPage(): void;
  previousPage():void;
  role: string;
}

export interface AuthModal {
  modalOpen: boolean;
  onClose(): void;
}
