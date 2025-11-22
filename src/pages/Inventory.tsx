"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { InventoryList } from "@/components/InventoryList";
import { InventoryForm } from "@/components/InventoryForm";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { toast } from "sonner";

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
  const [editingItem, setEditingItem] = useState<InventoryItem | undefined>(undefined);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [itemToDeleteId, setItemToDeleteId] = useState<string | undefined>(undefined);

  const handleSaveItem = (item: Omit<InventoryItem, "id"> & { id?: string }) => {
    if (item.id) {
      // Update existing item
      setInventoryItems((prevItems) =>
        prevItems.map((existingItem) =>
          existingItem.id === item.id ? { ...existingItem, ...item } : existingItem
        )
      );
      toast.success("Barang berhasil diperbarui!");
    } else {
      // Add new item
      const newItem: InventoryItem = {
        ...item,
        id: String(inventoryItems.length > 0 ? Math.max(...inventoryItems.map(i => parseInt(i.id))) + 1 : 1),
      };
      setInventoryItems((prevItems) => [...prevItems, newItem]);
      toast.success("Barang baru berhasil ditambahkan!");
    }
    setIsFormOpen(false);
    setEditingItem(undefined);
  };

  const handleEditClick = (item: InventoryItem) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setItemToDeleteId(id);
    setIsAlertDialogOpen(true);
  };

  const confirmDeleteItem = () => {
    if (itemToDeleteId) {
      setInventoryItems((prevItems) => prevItems.filter((item) => item.id !== itemToDeleteId));
      toast.success("Barang berhasil dihapus!");
      setItemToDeleteId(undefined);
      setIsAlertDialogOpen(false);
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingItem(undefined);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manajemen Persediaan</h1>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingItem(undefined); setIsFormOpen(true); }}>Tambah Barang Baru</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit Barang" : "Tambah Barang"}</DialogTitle>
            </DialogHeader>
            <InventoryForm initialData={editingItem} onSave={handleSaveItem} onClose={handleCloseForm} />
          </DialogContent>
        </Dialog>
      </div>
      <InventoryList items={inventoryItems} onEdit={handleEditClick} onDelete={handleDeleteClick} />
      <MadeWithDyad />

      <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Ini akan menghapus barang secara permanen dari persediaan Anda.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setItemToDeleteId(undefined)}>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteItem}>Hapus</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Inventory;