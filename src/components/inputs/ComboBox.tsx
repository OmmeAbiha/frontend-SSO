import { useEffect, useState } from 'react';
// Headless Ui
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';
// react-icons
import { HiOutlineChevronDown } from "react-icons/hi2";
import { IconType } from 'react-icons';
// clsx
import clsx from 'clsx';

interface listDataType {
    id: number;
    title: string;
    icon?: IconType;
    uniqueKey: string; // اضافه کردن uniqueKey به نوع داده
}

interface ComboBoxProps {
    id: string;
    label?: string;
    listData: listDataType[];
    className?: string
    width?: number
    height?: number
    placeholder?: string;
    name: string;
    error?: string;
    touched?: boolean;
    disableArrow?: boolean;
    onChange?: (event: { target: { name: string; value: string } }) => void;
    value?: listDataType | null;
    [key: number]: unknown;
}

export default function ComboBox({
    id,
    label,
    name,
    listData,
    className,
    width,
    height = 40,
    placeholder,
    error,
    touched,
    onChange,
    disableArrow,
    value: externalValue, // external value (Formik)
    ...props
}: ComboBoxProps) {
    const [query, setQuery] = useState('');
    const [internalValue, setInternalValue] = useState<listDataType | null>(null);
    // const [isOpen, setIsOpen] = useState<boolean>(false);

    // Sync internal state with external value if provided
    useEffect(() => {
        if (externalValue) {
            setInternalValue(externalValue);
        }
    }, [externalValue]);

    // useEffect(() => {
    //     const header = document.getElementById("header_dashboard");
    //     const scrollBarWidth = getScrollbarWidth();

    //     const updateScrollbar = () => {
    //         if (isOpen) {
    //             if (header) {
    //                 header.style.paddingRight = `${scrollBarWidth}px`;
    //             }
    //         } else {
    //             if (header) {
    //                 header.style.paddingRight = "";
    //             }
    //         }
    //     };

    //     if (isOpen) {
    //         updateScrollbar();
    //         window.addEventListener("resize", updateScrollbar);
    //     } else {
    //         if (header) {
    //             header.style.paddingRight = ""
    //         }
    //     }

    //     return () => {

    //         if (header) {
    //             header.style.paddingRight = ""
    //         }
    //         window.removeEventListener("resize", updateScrollbar);
    //     };

    // }, [isOpen]);


    const filteredListData = query
        ? listData.filter(item => item.title.toLowerCase().includes(query.toLowerCase()))
        : listData;

    const handleChange = (selectedValue: listDataType) => {
        setInternalValue(selectedValue);
        if (onChange) {
            const { ...rest } = selectedValue; // Exclude icon property
            onChange({ target: { name, value: JSON.stringify(rest) } });
        }
    };


    return (
        <div className={`flex flex-col w-full ${className} bg-transparent`}>
            {label && <label htmlFor={id} className="mb-2 text-sm font-medium text-foreground/50">{label}</label>}
            <div style={{ width: width, height: height }} >
                <Combobox
                    value={externalValue ?? internalValue}
                    onChange={handleChange}
                    onClose={() => setQuery('')}
                    {...props}
                >
                    {({ open }) => {
                        return (
                            <div className='h-full relative'>
                                <ComboboxButton
                                    // onClick={() => setIsOpen((prev) => !prev)}
                                    className="relative w-full h-full"
                                >
                                    <ComboboxInput
                                        placeholder={placeholder || "Select an option"}
                                        readOnly
                                        className={`w-full rounded-lg cursor-pointer h-full border py-2 ${!disableArrow ? 'pl-8' : 'pl-3'} pr-3 text-sm text-tertiary-800 focus:outline-none ${className} ${error && touched ? 'border-danger-400' : 'border-border-cta-natural focus:border-primary-main'
                                            }`}
                                        displayValue={(item: listDataType | null) => item?.title || ''}
                                        onChange={(e) => setQuery(e.target.value)}
                                    />
                                    {!disableArrow &&
                                        <div className="group absolute inset-y-0 left-0 px-2.5 h-full fcc">
                                            <HiOutlineChevronDown className={clsx("size-4 text-tertiary-500 transition-all duration-300", { 'rotate-180': open })} />
                                        </div>
                                    }
                                </ComboboxButton>
                                <ComboboxOptions
                                    modal={false}
                                    className="absolute z-20 w-full mt-1 flex flex-col bg-background gap-y-1 shadow-md rounded-lg border border-tertiary-300 p-1 overflow-y-auto max-h-44 scroll_custom"
                                >
                                    {filteredListData.map((item) => (
                                        <ComboboxOption
                                            key={item.id} // استفاده از uniqueKey به عنوان کلید
                                            style={{ height: height }}
                                            value={item}
                                            className={clsx(
                                                "group flex items-center gap-2 rounded-lg py-1.5 px-3 cursor-pointer h-full text-tertiary-800 hover:bg-tertiary-200 transition-all duration-300",
                                                { "bg-tertiary-300": item.id === internalValue?.id }
                                            )}
                                        >
                                            {item.icon && <item.icon className='text-xl text-tertiary-800' />}
                                            <div className="text-sm text-tertiary-800">{item.title}</div>
                                        </ComboboxOption>
                                    ))}
                                </ComboboxOptions>
                            </div>
                        );
                    }}
                </Combobox>
            </div>

            {error && touched ? (
                <div className='mt-1'>
                    <span className='text-danger-400 font-bold text-[10px] p-0.5 px-2 bg-danger-300/20 rounded-[4px]'>{error}</span>
                </div>
            ) : null}
        </div>
    );
}