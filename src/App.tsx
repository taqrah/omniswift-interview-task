import './App.css';
import { useState, useEffect } from 'react';
import { ApiResponse, Student } from './types';
import Filter from './components/Filter';
import Loader from './components/loader/Loader';
import ErrorUI from './components/error/ErrorUI';
import Table from './components/Table';

function App() {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [noResults, setNoResults] = useState<boolean>(false);

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
      setStudents(responseData.data.students);
      setFilteredStudents(responseData.data.students);
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
          <ErrorUI getStudents={getStudents} />
        </div>
      )}
      {!loading && !error && (
        <main>
          <Filter
            students={students}
            setFilteredStudents={setFilteredStudents}
            setNoResults={setNoResults}
          />
          {noResults ? (
            <div className='container'>
              <h3 className='no-results'>No Results found for your search</h3>
            </div>
          ) : (
            <Table filteredStudents={filteredStudents} />
          )}
        </main>
      )}
    </>
  );
}

export default App;
