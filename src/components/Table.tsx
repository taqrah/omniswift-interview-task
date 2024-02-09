import { useEffect, useState } from 'react';
import { Student, ResultResponse } from '../types';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import Result from './Result';
import Snackbar from './Snackbar';

function Table({ filteredStudents }: { filteredStudents: Student[] }) {
  const [loading, setLoading] = useState<{ [id: number]: boolean }>({});
  const [error, setError] = useState<boolean>(false);
  const [resultData, setResultData] = useState<ResultResponse>();
  const [processing, setProcessing] = useState(false);
  const [renderSnackbar, setRenderSnackbar] = useState(false)

  const downloadResult = async () => {
    const capture = document.getElementById('paper');
    setProcessing(true);

    if (capture !== null) {
      await html2canvas(capture).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const doc = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
        });
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        doc.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);
        setProcessing(false);

        doc.save('Result.pdf');
      });
    }
  };

  const getResult = async (id: number) => {
    setLoading({ ...loading, [id]: true });
    setRenderSnackbar(true);
    try {
      const response = await fetch(
        `https://test.omniswift.com.ng/api/viewResult/${id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const responseData: ResultResponse = await response.json();
      if (!response.ok) {
        setError(true);
      }
      // console.log(responseData);
      setResultData(responseData);
      // delay function call to ensure result markup is in the dom
      setTimeout(() => {
        downloadResult();
      }, 200);
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading({ ...loading, [id]: false });
    }
  };

  // remove result markup from the dom once pdf has been generated
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!processing) {
        setResultData(undefined);
      }
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [processing]);

  const hideSnackbar = () => {
   setError(false);

   setTimeout(() => {
     setRenderSnackbar(false);
   }, 600);
 };
  return (
    <>
      {renderSnackbar && <Snackbar show={error} close={hideSnackbar}/>}
      {resultData && <Result data={resultData} />}
      <div className='container'>
        <div className='container-inner'>
          <table className='table'>
            <thead className='table-head'>
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
              {filteredStudents.map((student, index) => (
                <tr key={index} className='table-row'>
                  <td>{student.id}</td>
                  <td>{student.firstname}</td>
                  <td>{student.surname}</td>
                  <td>{student.age}</td>
                  <td>{student.gender}</td>
                  <td>
                    {student.level.toString().length === 1
                      ? `${student.level}00 level`
                      : student.level}
                  </td>{' '}
                  {/* Api returns 3 for one of the student levels this check is to fix that */}
                  <td>
                    {student.state !== 'Abuja'
                      ? `${student.state} state`
                      : student.state}
                    {/* simple check to avoid adding 'state' to Abuja */}
                  </td>
                  <td>
                    <button
                      type='button'
                      className='btn download-btn'
                      onClick={() => getResult(student.id)}
                      disabled={loading[student.id]}
                    >
                      {loading[student.id]
                        ? 'Downloading...'
                        : 'Download Result'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Table;
