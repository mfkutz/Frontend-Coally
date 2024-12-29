
type TaskProps = {
    title: string;
    description: string;
    onEdit: () => void;
    onDelete: () => void;
};



export default function Tasks({ title, description, onEdit, onDelete }: TaskProps) {
    return (
        <div className=' relative flex justify-between items-center bg-[#25273c] px-[1.5rem] pl-[3.5rem] lg:pl-[4.4rem] py-[1rem] lg:py-[0.5rem] rounded-[5px] text-[12px] lg:text-[18px] mb-[1.5rem] shadow-sm '>
            <div className={`absolute rounded-full flex w-[1.2rem] h-[1.2rem] lg:w-[1.5rem] lg:h-[1.5rem] items-center justify-center border border-gray-200 top-[0.9rem] left-[1.2rem] lg:top-[22px] lg:left-6 bg-green-500`}></div>
            <div className='text-gray-400'>
                {title}
            </div>
            <div className='flex flex-col gap-2'>
                <div
                    className='  text-gray-500 text-[15px] cursor-pointer hover:text-gray-400 transition-colors duration-300'
                >
                    Edit
                </div>
                <div
                    className='  text-gray-500 text-[15px] cursor-pointer hover:text-gray-400 transition-colors duration-300'
                    onClick={onDelete}
                >
                    Delete
                </div>
            </div>
        </div>
    )
}
