"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InventoryItem } from "@/pages/Inventory";

interface InventoryListProps {
  items: InventoryItem[];
}

export const InventoryList: React.FC<InventoryListProps> = ({ items }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Nama Barang</TableHead>
            <TableHead>Kuantitas</TableHead>
            <TableHead className="text-right">Harga</TableHead>
            <TableHead>Kategori</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                Tidak ada barang dalam persediaan.
              </TableCell>
            </TableRow>
          ) : (
            items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell className="text-right">Rp{item.price.toLocaleString('id-ID')}</TableCell>
                <TableCell>{item.category}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};