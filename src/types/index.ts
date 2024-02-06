export type Student = {
  id: number;
  surname: string;
  firstname: string;
  age: number;
  gender: string;
  level: string;
  state: string;
};

export type ApiResponse = {
  message: string;
  data: {
    students: Student[];
  };
};

export type StudentData = Student[];

