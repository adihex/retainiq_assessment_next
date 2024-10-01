"use client"
import React, { useState } from 'react';
import { MoreVertical } from 'lucide-react';

export const VariantColumnHeader = ({ index, deleteVariant }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      <div className="flex justify-between items-center">
        <span>{index === 0 ? 'Primary Variant' : `Variant ${index + 1}`}</span>
        <div className="relative">
          <MoreVertical
            size={16}
            className="text-gray-400 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          />
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <button
                  onClick={() => {
                    deleteVariant(index);
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  Delete Variant
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </th>
  );
};
