import { useEffect, useState } from 'react';
import { FaCheck, FaMinus } from 'react-icons/fa';

export type CheckBoxValue = true | false | 'indeterminate'
interface CheckBoxProps {
    value: CheckBoxValue;
    label: string
    onChange: (value: CheckBoxValue) => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({ value, onChange, label }) => {
    const [state, setState] = useState(value);

    useEffect(() => {
        setState(value)
    }, [value])

    const handleChange = () => {
        const newState = !state;
        setState(newState);
        onChange(newState);
    };

    return (
        <div className='flex items-center'>
            <div
                onClick={handleChange}
                className={`${state === true ? 'bg-[#16A34A]' : state === 'indeterminate' ? 'bg-[#16A34A]' : 'bg-gray-200'} 
                  relative inline-flex h-5 w-5 items-center justify-center rounded cursor-pointer`}
            >
                {/* <span className="sr-only">Enable option</span> */}
                <div className='w-full h-full fcc p-1'>
                    {state === true && <FaCheck className="text-white" />}
                    {state === 'indeterminate' && <FaMinus className="text-white" />}
                </div>
            </div>
            <span className='mr-3'>{label}</span>
        </div>
    );
};

export default CheckBox;
