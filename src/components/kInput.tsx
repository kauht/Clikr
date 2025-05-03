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
      className={`select-none w-full bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-2.5 text-sm text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600/50 focus:border-transparent transition-all ${className}`}
      placeholder={placeholder}
    />
  )
}

export default KInput;
