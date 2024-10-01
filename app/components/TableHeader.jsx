"use client"
import React from 'react';
import { VariantColumnHeader } from './VariantColumnHeader';
export const TableHeader = ({ variants, deleteVariant }) => (
    <thead className="bg-gray-50">
        <tr>
            <th className="w-16 px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Filter</th>
            {variants.map((_, index) => (
                <VariantColumnHeader key={index} index={index} deleteVariant={deleteVariant} />
            ))}
        </tr>
    </thead>
);


