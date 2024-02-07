function Filter() {
  return (
    <div className='filter'>
      <h2 className='filter__heading'>Filter Student Table By:</h2>
      <form className='filter__form'>
        <div className='filter__form-group'>
          <label htmlFor='age'></label>
          <input
            id='age'
            name='age'
            type='text'
            placeholder='choose age'
            className='filter__form-input'
          />
        </div>
        <div className='filter__form-group'>
          <label htmlFor='state'></label>
          <input
            id='state'
            name='state'
            type='text'
            placeholder='choose state'
            className='filter__form-input'
          />
        </div>
        <div className='filter__form-group'>
          <label htmlFor='level'></label>
          <input
            id='level'
            name='level'
            type='text'
            placeholder='choose level'
            className='filter__form-input'
          />
        </div>
        <div className='filter__form-group'>
          <label htmlFor='gender'></label>
          <input
            id='gender'
            name='gender'
            type='text'
            placeholder='choose gender'
            className='filter__form-input'
          />
        </div>

        <button type='submit' className='btn filter__form-btn'>
          Search
        </button>
      </form>
    </div>
  );
}

export default Filter;
