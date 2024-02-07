import classes from './error.module.css'

function ErrorUI({ getStudents }: { getStudents: () => void }) {
  return (
    <div className={classes.error}>
      <h1 className={classes.error__heading}>Something went wrong</h1>
      <p className={classes.error__text}>
        Sorry, we could not load the data. Please Check your connection then
        click the button below to try again.
      </p>
      <button type='button' className={classes.error__btn} onClick={() => getStudents()}>
        Reload
      </button>
    </div>
  );
}

export default ErrorUI;
