'use client';

import { ICON_LIST } from '@/lib/icon-map';

interface IconPickerProps {
  value: string | null;
  onChange: (iconName: string) => void;
}

export function IconPicker({ value, onChange }: IconPickerProps) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
      {ICON_LIST.map(({ key, label, icon: Icon }) => {
        const isSelected = value === key;
        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            className={`
              flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200
              ${
                isSelected
                  ? 'border-[#00A86B] bg-[#00A86B]/10 shadow-sm'
                  : 'border-gray-200 hover:border-[#00A86B]/50 hover:bg-gray-50'
              }
            `}
          >
            <Icon
              className={`w-7 h-7 ${
                isSelected ? 'text-[#00A86B]' : 'text-gray-500'
              }`}
            />
            <span
              className={`text-xs font-medium text-center leading-tight ${
                isSelected ? 'text-[#00A86B]' : 'text-gray-500'
              }`}
            >
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
