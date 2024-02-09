import { useEffect } from 'react';

const Snackbar = ({
  show,
  close,
}: {
  show: boolean;
  close: () => void;
}) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      close();
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [close]);

  return (
    <div className={`snackbar ${show ? 'snackbar--show' : 'snackbar--hide'}`}>
      Failed to download check connection and retry
    </div>
  );
};

export default Snackbar;
