import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import { HiOutlineCloudUpload, HiCheckCircle, HiOutlineTrash } from "react-icons/hi";

export interface FileType {
    name: string;
    file: File;
    url?: string;
}

interface UploadMultipleFilesProps {
    id: string;
    label: string;
    // name: string;
    value?: FileType[];
    onChange?: (files: FileType[]) => void;
    // onBlur?: () => void;
    disabled?: boolean;
    acceptedTypes?: string[];
    maxFiles?: number;
    maxSize?: number;
    setErrors?: (errors: Record<string, string> | ((prev: Record<string, string>) => Record<string, string>)) => void;
}

const UploadMultipleFiles: React.FC<UploadMultipleFilesProps> = ({
    id,
    label,
    // name,
    value = [],
    onChange,
    // onBlur,
    disabled,
    acceptedTypes = [],
    maxFiles,
    maxSize = 5,
    setErrors
}) => {
    const [files, setFiles] = useState<FileType[]>(value);
    const fileInputRef = useRef<HTMLInputElement>(null);


    useEffect(() => {
        if (value) setFiles(value);
    }, [value]);

    const handleAddFileClick = () => {
        fileInputRef.current?.click();
    };

    const inputFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (setErrors) setErrors({});
        let selectedFiles = Array.from(e.target.files || []);
        if (!selectedFiles.length) return;

        if (maxFiles && files.length + selectedFiles.length > maxFiles) {
            if (setErrors) setErrors(prev => ({ ...prev, maxFiles: `حداکثر ${maxFiles} فایل مجاز است.` }));
            return;
        }

        selectedFiles = selectedFiles.filter(file => {
            if (acceptedTypes.length && !acceptedTypes.includes(file.type)) {
                if (setErrors) setErrors(prev => ({ ...prev, [file.name]: `فرمت فایل باید یکی از ${acceptedTypes.join(", ")} باشد.` }));
                return false;
            }
            if (file.size / (1024 * 1024) > maxSize) {
                if (setErrors) setErrors(prev => ({ ...prev, [file.name]: `حجم فایل نباید بیشتر از ${maxSize}MB باشد.` }));
                return false;
            }
            return true;
        });

        const newFileObjects: FileType[] = selectedFiles.map(file => ({
            name: file.name,
            file: file,  // ذخیره خود فایل اصلی
        }));

        setFiles(prev => [...prev, ...newFileObjects]);
        if (onChange) onChange([...files, ...newFileObjects]);
    };

    const handleDeleteFile = (index: number) => {
        const updatedFiles = [...files];
        updatedFiles.splice(index, 1);
        setFiles(updatedFiles);
        if (onChange) onChange(updatedFiles);
    };

    return (
        <div className="flex flex-col">
            <label htmlFor={id} className="mb-2 text-sm font-medium text-foreground/50">{label}</label>
            <div onClick={handleAddFileClick} className={`border p-3 rounded-lg flex flex-col items-center bg-background ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}>
                <input ref={fileInputRef} type="file" multiple hidden onChange={inputFileHandler} disabled={disabled} />
                <div className="flex items-center gap-2 text-tertiary-400 w-full">
                    <HiOutlineCloudUpload size={20} />
                    <span className="text-sm">آپلود فایل</span>
                </div>
                {
                    !!files.length && (
                        <ul className="w-full">
                            {files.map((file, index) => (
                                <li key={index} className="flex items-center justify-between bg-tertiary-200 p-2 mt-2 rounded-lg w-44">
                                    <div className="flex items-center gap-2">
                                        <HiCheckCircle className="text-green-500" />
                                    </div>
                                    <span className="text-xs text-tertiary-600 flex items-center">{file.name}</span>
                                    <HiOutlineTrash className="text-red-500 cursor-pointer" onClick={() => handleDeleteFile(index)} />
                                </li>
                            ))}
                        </ul>
                    )
                }
            </div>
        </div>
    );
};

export default UploadMultipleFiles;
