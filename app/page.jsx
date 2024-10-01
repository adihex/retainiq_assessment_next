"use client"
import React, { useState } from "react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { ReorderingTable } from './components/ReorderingTable';
import { ArrowLeft } from 'lucide-react';

export default function Home() {
  const [products, setProducts] = useState([
    {
      id: 1,
      filter: "Anarkali Kurtas",
      variants: [
        {
          title: "Anniversary Sale",
          imageUrl: "/api/placeholder/300/400",
          isNew: false,
          isOnSale: true,
          discountPercentage: 20
        },
        {
          title: "2 image - zero discount",
          imageUrl: "/api/placeholder/300/400",
          isNew: false,
          isOnSale: false,
          discountPercentage: 0
        },
        {
          title: "Multi Image - fallback",
          imageUrl: "/api/placeholder/300/400",
          isNew: true,
          isOnSale: false,
          discountPercentage: 0
        }
      ]
    },
    {
      id: 2,
      filter: "Anarkali Kurtas",
      variants: [
        {
          title: "Single image product",
          imageUrl: "/api/placeholder/300/400",
          isNew: false,
          isOnSale: false,
          discountPercentage: 0
        },
        {
          title: "4 image - zero discount",
          imageUrl: "/api/placeholder/300/400",
          isNew: false,
          isOnSale: false,
          discountPercentage: 0
        },
        {
          title: "Multi Image - No Tag",
          imageUrl: "/api/placeholder/300/400",
          isNew: false,
          isOnSale: false,
          discountPercentage: 0
        }
      ]
    }
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const addVariant = () => {
    const newVariantName = `Variant ${products[0].variants.length + 1}`;
    setProducts(products.map(row => ({
      ...row,
      variants: [...row.variants, newVariantName]
    })));
  };

  const deleteVariant = (variantIndex) => {
    setProducts(products.map(row => ({
      ...row,
      variants: row.variants.filter((_, idx) => idx !== variantIndex)
    })));
  };

  const addRow = () => {
    const currentVariants = products.length > 0 ? [...products[0].variants] : ["Primary Variant"];
    setProducts([...products, { id: Date.now().toString(), filter: 'Product Collection', variants: currentVariants }]);
  };

  const deleteRow = (rowIndex) => {
    setProducts(products.filter((_, index) => index !== rowIndex));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setProducts((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <ReorderingTable
                  products={products}
                  deleteRow={deleteRow}
                  deleteVariant={deleteVariant}
                  addVariant={addVariant}
                />
              </DndContext>
              <div className="mt-4">
                <button
                  className="bg-white text-gray-700 border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={addRow}
                >
                  + Add Row
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-end">
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            Publish Feed
          </button>
        </div>
      </footer>
    </div>
  );
}
