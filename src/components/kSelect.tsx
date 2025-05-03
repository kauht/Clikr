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
      className={`select-none w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-2.5 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-transparent focus:border-gray-600/50 transition-all appearance-none cursor-pointer ${className}`}
    >
      {options.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </select>
  )
}

export default KSelect;