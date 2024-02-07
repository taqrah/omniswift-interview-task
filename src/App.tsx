import './App.css';
import { useState, useEffect } from 'react';
import { ApiResponse, Student } from './types';
import Filter from './components/Filter';
import Loader from './components/loader/Loader';
import ErrorUi from './components/ErrorUi';

function App() {
  const [students, setstudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const getStudents = async () => {
    setLoading(true);
    setError(false); // improve error handling (ill change this later)
    try {
      const response = await fetch(
        'https://test.omniswift.com.ng/api/viewAllData'
      );
      const responseData: ApiResponse = await response.json();
      if (!response.ok) {
        setError(true);
      }
      setstudents(responseData.data.students);
      console.log(responseData.data.students);
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStudents();

    return () => {};
  }, []);

  return (
    <>
      <header className='header'>
        <h1 className='main-heading'>Student Data Table</h1>
      </header>
      {loading && (
        <div className='grid'>
          <Loader />
        </div>
      )}
      {error && !loading && (
        <div className='grid'>
          <ErrorUi getStudents={getStudents} />
        </div>
      )}
      {!loading && !error && (
        <main>
          <Filter />
          <div className='container'>
            <table className='table'>
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
                  <tr key={index} className='table-row'>
                    <td>{student.id}</td>
                    <td>{student.firstname}</td>
                    <td>{student.surname}</td>
                    <td>{student.age}</td>
                    <td>{student.gender}</td>
                    <td>{student.level}</td>
                    <td>
                      {student.state !== 'Abuja'
                        ? `${student.state} state`
                        : student.state}
                      {/* simple check to avoid adding 'state' to Abuja */}
                    </td>
                    <td>
                      <button type='button' className='btn download-btn'>
                        Download Result
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      )}
    </>
  );
}

export default App;
