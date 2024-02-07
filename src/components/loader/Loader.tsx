import classes from './Loader.module.css';
function Loader() {
  return (
    <div className={classes.loader}>
      <div className={classes.loading}></div>
    </div>
  );
}

export default Loader;
