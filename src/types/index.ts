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

export type ResultResponse = {
  message: string;
  data: {
    id: number;
    surname: string;
    firstname: string;
    age: number;
    gender: string;
    level: string;
    state: string;
    reg_no: string;
    session: string;
    result: [
      {
        coursecode: string;
        title: string;
        credit_unit: number;
        grade: string;
        total_point: number;
      },
      {
        coursecode: string;
        title: string;
        credit_unit: number;
        grade: string;
        total_point: number;
      },
      {
        coursecode: string;
        title: string;
        credit_unit: number;
        grade: string;
        total_point: number;
      },
      {
        coursecode: string;
        title: string;
        credit_unit: number;
        grade: string;
        total_point: number;
      }
    ];
    cummulative: {
      unts: number;
      untd: number;
      gpts: number;
      gptd: number;
      gpats: number;
      gpatd: number;
      remarks: string;
    };
  };
  logo: string;
  profile_picture: string;
};

export type StudentData = Student[];
