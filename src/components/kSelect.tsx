interface KSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  className?: string;
}

function KSelect({
  value,
  onChange,
  options,
  className = ''
}: KSelectProps) {
  return (
    <select 
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`select-none w-full bg-gray-100 dark:bg-[#121218] border border-gray-300/50 dark:border-gray-700/50 rounded-lg px-4 py-2.5 text-sm text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:focus:ring-purple-500/20 focus:border-purple-500/30 dark:focus:border-purple-500/30 transition-all appearance-none cursor-pointer hover:bg-gray-200/80 dark:hover:bg-[#121218]/80 ${className}`}
    >
      {options.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </select>
  )
}

export default KSelect;