import { useEffect, useState } from 'react';
import { Airdrop, Minus } from 'iconsax-reactjs';

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
                <div className='w-full h-full fcc p-1'>
                    {state === true && <Airdrop size={14} color="#fff" />}
                    {state === 'indeterminate' && <Minus size={14} color="#fff" />}
                </div>
            </div>
            <span className='mr-3'>{label}</span>
        </div>
    );
};

export default CheckBox;