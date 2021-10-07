const Input = (props) => {
  const { id, label, onChange, help } = props;
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input id={id} className="form-control" onChange={onChange} />
      <span>{help}</span>
    </div>
  );
};

export default Input;
