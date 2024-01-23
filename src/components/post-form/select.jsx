import { useId } from "react";


function Select({
    options,
    label,
    className = '',
    ...props
}, ref) {
    const id = useId()
    return (
        <div className="w-full">
            {label && <label htmlFor={id} className=""></label>}
            <select
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-100 duration-300 border border-gray-200 w-full ${className}`}
                id={id}
                ref={ref}
            >
                {options?.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}

//another way to use forwardRef
export default React.forwardRef(Select);