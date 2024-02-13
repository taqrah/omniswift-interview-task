import logo from '../assets/Logo.png';
import passport from '../assets/Passport.png';
import { ResultResponse } from '../types';

function Result({ data }: { data: ResultResponse }) {
  
  return (
    <section id='paper' className='paper visually-hidden'>
      <header className='paper__header'>
        <img src={logo} alt='Fremont college logo' />
        <article className='paper__header-content'>
          <div className='text-block'>
            <h1 className='school-name'>fremont college of education</h1>
            <p className='address'>
              No.5 Raymond Osuman Street, PMB 2191 Maitama, Abuja, Nigeria.
            </p>
          </div>
          <div className='text-block'>
            <h2 className='program-title'>
              post graduate diploma in education
            </h2>
            <p className='doc-title'>
              student first semester statement of result
            </p>
          </div>
        </article>
        <img src={passport} alt='Sudents passport photograph' />
      </header>
      <div className='student-details'>
        <div className='detail'>
          <p className='detail-text'>
            <span className='detail-text__title'>Name:</span>
            <span className='detail-text__content'>{`${data.data.firstname} ${data.data.surname} `}</span>
          </p>
          <p className='detail-text'>
            <span className='detail-text__title'>Level:</span>
            <span className='detail-text__content'>{data.data.level}</span>
          </p>
        </div>
        <div className='detail'>
          <p className='detail-text'>
            <span className='detail-text__title'>Reg No:</span>
            <span className='detail-text__content'>{data.data.reg_no}</span>
          </p>
          <p className='detail-text'>
            <span className='detail-text__title'>Session:</span>
            <span className='detail-text__content'>{data.data.session}</span>
          </p>
        </div>
      </div>

      <div className='table-container'>
        <table className='result-table'>
          <thead>
            <tr>
              <th>S/N</th>
              <th>Course Code</th>
              <th>Course Title</th>
              <th>Unit</th>
              <th>Grade</th>
              <th>Total Point</th>
            </tr>
          </thead>
          <tbody>
            {data.data.result.map((course, index) => (
              <tr key={index}>
                <td>{`${index + 1}.`}</td>
                <td>{course.coursecode}</td>
                <td>{course.title}</td>
                <td>{course.credit_unit}</td>
                <td>{course.grade}</td>
                <td>{course.total_point}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='summary-table__container'>
        <table className='summary-table'>
          <thead>
            <tr>
              <td>UNTS</td>
              <td>UNTD</td>
              <td>GPTS</td>
              <td>GPTD</td>
              <td>GPATS</td>
              <td>GPATD</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{data.data.cummulative.unts}</td>
              <td>{data.data.cummulative.untd}</td>
              <td>{data.data.cummulative.gpts}</td>
              <td>{data.data.cummulative.gptd}</td>
              <td>{data.data.cummulative.gpats}</td>
              <td>{data.data.cummulative.gpatd}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className='remark'>
        <p>
          <span>Remarks:</span>
          <span> Pass</span>
        </p>
      </div>

      <div className='signature'>
        <p>Registrar</p>
      </div>
    </section>
  );
}

export default Result;
