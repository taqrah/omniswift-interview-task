import { useState } from 'react';
import data from '../assets/data.json';
import { Student } from '../types';

function Filter({
  students,
  setFilteredStudents,
  setNoResults,
}: {
  students: Student[];
  setFilteredStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  setNoResults: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [age, setAge] = useState<string>('default');
  const [state, setState] = useState<string>('default');
  const [gender, setGender] = useState<string>('default');
  const [level, setLevel] = useState<string>('default');

  const filterResults = (event: React.FormEvent) => {
    event.preventDefault();

    const result = students.filter((student) => {
      return (
        (age === 'default' || student.age.toString() === age) &&
        (state === 'default' || student.state === state) &&
        (gender === 'default' || student.gender === gender) &&
        (level === 'default' || student.level === level)
      );
    });

    if (result.length === 0) {
      setNoResults(true);
    } else {
      setNoResults(false);
    }

    setFilteredStudents(result);
  };

  return (
    <div className='filter'>
      <h2 className='filter__heading'>Filter Student Table By:</h2>
      <form className='filter__form' onSubmit={filterResults}>
        <div className='filter__form-group'>
          <select
            id='age'
            name='age'
            className='filter__form-input'
            onChange={(e) => setAge(e.target.value)}
          >
            <option value='default'>Select Age</option>
            {data.age.map((age) => (
              <option value={age.age} key={age.id}>
                {age.age}
              </option>
            ))}
          </select>
          <label htmlFor='age' className='filter__form-label'>
            Age
          </label>
        </div>
        <div className='filter__form-group'>
          <select
            id='state'
            name='state'
            className='filter__form-input'
            onChange={(e) => setState(e.target.value)}
          >
            <option value='default'>Select State</option>
            {data.state.map((state) => (
              <option value={state.name} key={state.id}>
                {state.name}
              </option>
            ))}
          </select>
          <label htmlFor='state' className='filter__form-label'>
            State
          </label>
        </div>
        <div className='filter__form-group'>
          <select
            id='level'
            name='level'
            className='filter__form-input'
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value='default'>Select Level</option>
            {data.level.map((level) => (
              <option value={level.level} key={level.id}>
                {level.level}
              </option>
            ))}
          </select>
          <label htmlFor='level' className='filter__form-label'>
            Level
          </label>
        </div>
        <div className='filter__form-group'>
          <select
            id='gender'
            name='gender'
            className='filter__form-input'
            onChange={(e) => setGender(e.target.value)}
          >
            <option value='default'>Select gender</option>
            {data.gender.map((gender) => (
              <option value={gender.gender} key={gender.id}>
                {gender.gender}
              </option>
            ))}
          </select>
          <label htmlFor='gender' className='filter__form-label'>
            Gender
          </label>
        </div>

        <button type='submit' className='btn filter__form-btn'>
          Search
        </button>
      </form>
    </div>
  );
}

export default Filter;
