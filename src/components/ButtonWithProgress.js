import Spinner from './Spinner';

const ButtonWithProgress = (props) => {
  const { disabled, apiProgress, onClick } = props;
  return (
    <button
      className="btn btn-primary"
      disabled={disabled || apiProgress}
      onClick={onClick}
    >
      {apiProgress && <Spinner />}
      {props.children}
    </button>
  );
};

export default ButtonWithProgress;
