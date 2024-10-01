"use client"
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from "@dnd-kit/utilities";
import { Grip, Trash2, MoreVertical, Plus } from 'lucide-react';

export const SortableRow = ({ row, rowIndex, deleteRow, addVariant }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: row.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    backgroundColor: isDragging ? '#f3f4f6' : 'white',
  };

  return (
    <tr ref={setNodeRef} style={style} className="hover:bg-gray-50">
      <td className="w-16 px-2 py-4 relative">
        <div className="absolute top-0 right-0 mt-1 mr-1">
          <button onClick={() => deleteRow(rowIndex)} className="text-red-500 hover:text-red-700">
            <Trash2 size={16} />
          </button>
        </div>
        <div className="flex items-center space-x-2 mt-6">
          <div {...listeners} {...attributes} className="cursor-move p-1 rounded hover:bg-gray-200">
            <Grip className="text-gray-400" size={16} />
          </div>
          <span className="font-semibold text-gray-700">{rowIndex + 1}</span>
        </div>
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center space-x-2">
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">contains</span>
          <span className="text-gray-700">{row.filter}</span>
        </div>
      </td>
      {row.variants.map((variant, colIndex) => (
        <td key={colIndex} className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <img src={variant.imageUrl} alt={variant.title} className="w-16 h-16 object-cover mb-2" />
              <span className="text-gray-700">{variant.title}</span>
              {variant.isNew && <span className="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded text-xs">New</span>}
              {variant.isOnSale && <span className="ml-2 bg-red-100 text-red-800 px-2 py-1 rounded text-xs">Sale</span>}
              {variant.discountPercentage > 0 && <span className="ml-2 text-red-600 text-xs">{variant.discountPercentage}% off</span>}
            </div>
          </div>
        </td>
      ))}
      <td className="px-4 py-4">
        <button
          onClick={addVariant}
          className="flex items-center justify-center w-full h-full border-2 border-dashed border-gray-300 text-gray-500 hover:text-gray-700 hover:border-gray-400 rounded-lg"
        >
          <Plus size={20} />
        </button>
      </td>
    </tr>
  );
};
