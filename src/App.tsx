import './App.css';
import { useState, useEffect } from 'react';
import { ApiResponse, Student } from './types';

function App() {
  const [students, setstudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const getStudents = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'https://test.omniswift.com.ng/api/viewAllData'
      );
      const responseData: ApiResponse = await response.json();
      if (!response.ok) {
        setError(true);
      }
      setstudents(responseData.data.students);
    } catch (error) {
      console.log(error);
      setError(true)
    }
  };

  useEffect(() => {
    getStudents();

    return () => {};
  }, []);

  return (
    <div id='app'>
      <header className='header'>
        <h1 className='main-heading'>Student Data Table</h1>
      </header>
      <main>
        <table>
          <thead>
            <tr>
              <th>S/N</th>
              <th>Surname</th>
              <th>First Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Level</th>
              <th>State</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td>{student.id}</td>
                <td>{student.firstname}</td>
                <td>{student.surname}</td>
                <td>{student.age}</td>
                <td>{student.gender}</td>
                <td>{student.level}</td>
                <td>{student.state}</td>
                <td><button type='button'>Download Result</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default App;
