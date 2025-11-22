"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InventoryItem } from "@/pages/Inventory";

const formSchema = z.object({
  id: z.string().optional(), // Add id for editing existing items
  name: z.string().min(2, {
    message: "Nama barang harus memiliki setidaknya 2 karakter.",
  }),
  quantity: z.coerce.number().min(0, {
    message: "Kuantitas tidak boleh negatif.",
  }),
  price: z.coerce.number().min(0, {
    message: "Harga tidak boleh negatif.",
  }),
  category: z.string().optional(),
});

interface InventoryFormProps {
  initialData?: InventoryItem;
  onSave: (item: Omit<InventoryItem, "id"> & { id?: string }) => void;
  onClose: () => void; // Added to close the dialog after saving
}

export const InventoryForm: React.FC<InventoryFormProps> = ({ initialData, onSave, onClose }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      quantity: 0,
      price: 0,
      category: "",
    },
  });

  // Reset form with initialData when it changes (for editing)
  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    } else {
      form.reset({ name: "", quantity: 0, price: 0, category: "" });
    }
  }, [initialData, form]);

  function handleSubmit(values: z.infer<typeof formSchema>) {
    onSave(values);
    form.reset();
    onClose(); // Close the dialog after saving
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Barang</FormLabel>
              <FormControl>
                <Input placeholder="Nama barang" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kuantitas</FormLabel>
              <FormControl>
                <Input type="number" placeholder="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Harga</FormLabel>
              <FormControl>
                <Input type="number" placeholder="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kategori (Opsional)</FormLabel>
              <FormControl>
                <Input placeholder="Elektronik, Pakaian, dll." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {initialData ? "Simpan Perubahan" : "Tambah Barang"}
        </Button>
      </form>
    </Form>
  );
};