"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { InventoryList } from "@/components/InventoryList";
import { InventoryForm } from "@/components/InventoryForm";
import { MadeWithDyad } from "@/components/made-with-dyad";

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  category: string;
}

const Inventory = () => {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleAddItem = (item: InventoryItem) => {
    setInventoryItems((prevItems) => [...prevItems, { ...item, id: String(prevItems.length + 1) }]);
    setIsFormOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manajemen Persediaan</h1>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button>Tambah Barang Baru</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Tambah Barang</DialogTitle>
            </DialogHeader>
            <InventoryForm onSubmit={handleAddItem} />
          </DialogContent>
        </Dialog>
      </div>
      <InventoryList items={inventoryItems} />
      <MadeWithDyad />
    </div>
  );
};

export default Inventory;