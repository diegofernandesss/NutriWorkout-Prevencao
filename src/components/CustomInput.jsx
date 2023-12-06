const CustomInput = ({
  id,
  type,
  name,
  placeholder,
  value,
  isFirstInput,
  error,
  onBlur,
  onChange,
}) => {
  return (
    <>
    <div className={`${isFirstInput ? 'mt-8' : ''}`}></div>
      <input 
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        className={`p-3 border rounded-xl focus:outline-none focus:border-violet-700 ${
          error ? 'border-red-600' : ''
        }`}
        required

      />
      {error && (
        <span className="text-sm text-red-500">{error}</span>
      )}
    </>
  );
};

export default CustomInput;
