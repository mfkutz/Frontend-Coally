import { formatDate } from "../utils/utils";

type TaskProps = {
    title: string;
    created: string;
    status: boolean;
    description: string
    onEdit: () => void;
    onDelete: () => void;
    onStatusChange: (status: boolean) => void
};

export default function Tasks({ title, created, status, onEdit, onDelete, onStatusChange }: TaskProps) {
    return (
        <div className=' relative flex justify-between items-center bg-[#25273c] px-[1.5rem] pl-[3.5rem] md:pl-[4.4rem] py-[1rem] md:py-[0.5rem] rounded-[5px] text-[12px] md:text-[18px] mb-[1.5rem] shadow-sm '>
            <div className={`absolute rounded-full flex w-[1.2rem] h-[1.2rem] cursor-pointer md:w-[1.5rem] md:h-[1.5rem] items-center justify-center border border-gray-200 top-[27px] left-[1.2rem] md:top-[22px] md:left-6 ${status ? 'bg-green-500' : 'bg-gray-400'}`}
                onClick={() => onStatusChange(!status)}
            ></div>
            <div className='text-gray-400'>
                <div>
                    {title}
                </div>
                <div className="text-[12px]">
                    Created: {formatDate(created)}
                </div>
            </div>
            <div className='flex flex-col md:gap-2 gap-0'>
                <div
                    className='  text-gray-500 text-[13px] md:text-[15px] cursor-pointer hover:text-gray-400 transition-colors duration-300'
                    onClick={onEdit}
                >
                    Edit
                </div>
                <div
                    className='  text-gray-500 text-[13px] md:text-[15px] cursor-pointer hover:text-gray-400 transition-colors duration-300'
                    onClick={onDelete}
                >
                    Delete
                </div>
            </div>
        </div>
    )
}
