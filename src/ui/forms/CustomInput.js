
const CustomInput = ({ inputWidth, value, onChange, type, placeholder, handleFieldChange, FieldShortcode }) => {
    
    const widthStyle = inputWidth ? `calc(${inputWidth} - 6px)` : '100%';
    const handleChange = (e) => {
      const newValue = e.target.value;
      if (handleFieldChange && FieldShortcode) {
        handleFieldChange(FieldShortcode, newValue);
      } else if (onChange) {
        onChange(newValue); 
      }
    };
  
    return (
      <input
        value={value || ''}
        onChange={handleChange}
        type={type || 'text'}
        placeholder={placeholder}
        className={`h-11 leading-[32] text-gray-900 p-4 rounded-2xl focus:outline-none`}
        style={{ width: widthStyle }}
      />
    );
  };
  
  export default CustomInput;
  