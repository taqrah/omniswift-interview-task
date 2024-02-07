function ErrorUi({ getStudents }: { getStudents: () => void }) {
  return (
    <div className='error'>
      <h1 className='error__heading'>Oops! Something went wrong</h1>
      <p className='error__text'>
        Sorry, we could not load the data. Please Check your connection then
        click the button below to try again.
      </p>
      <button type='button' className='btn error__btn' onClick={() => getStudents()}>
        Reload
      </button>
    </div>
  );
}

export default ErrorUi;
