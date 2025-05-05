interface KInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  className?: string;
}

function KInput({
  value,
  onChange,
  placeholder = '0',
  type = 'text',
  className = ''
}: KInputProps) {
  return (
    <input 
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`select-none w-full bg-gray-100 dark:bg-[#121218] border border-gray-300/50 dark:border-gray-700/50 rounded-lg px-4 py-2.5 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:focus:ring-purple-500/20 focus:border-purple-500/30 dark:focus:border-purple-500/30 transition-all hover:bg-gray-200/80 dark:hover:bg-[#121218]/80 ${className}`}
      placeholder={placeholder}
    />
  )
}

export default KInput;
