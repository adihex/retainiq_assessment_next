"use client"
import React from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { TableHeader } from './TableHeader';
import { SortableRow } from './SortableRow';

export const ReorderingTable = ({ products, deleteRow, deleteVariant, addVariant }) => (
  <div className="overflow-x-auto">
    <div className="inline-block min-w-full align-middle">
      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <TableHeader variants={products[0]?.variants || []} deleteVariant={deleteVariant} />
          <tbody className="bg-white divide-y divide-gray-200">
            <SortableContext items={products.map(row => row.id)} strategy={verticalListSortingStrategy}>
              {products.map((row, rowIndex) => (
                <SortableRow 
                  key={row.id} 
                  row={row} 
                  rowIndex={rowIndex} 
                  deleteRow={deleteRow} 
                  addVariant={addVariant}
                />
              ))}
            </SortableContext>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
