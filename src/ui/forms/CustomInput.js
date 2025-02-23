
const CustomInput = ({ inputWidth, value, onChange, placeholder }) => {

    const widthStyle = inputWidth ? `calc(${inputWidth} - 6px)` : '100%';

    return (
        <input
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            type="text"
            placeholder={placeholder}
            className={`h-11 leading-[32] text-gray-900 p-4 rounded-2xl focus:outline-none`}
            style={{ width: widthStyle }}
        />
    );
};

export default CustomInput;