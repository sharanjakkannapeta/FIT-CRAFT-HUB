"use client"

import { useState } from "react"
import Image from "next/image"
import { Plus, Pencil, Trash2, X } from "lucide-react"
import { useStore } from "@/lib/store-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { toast } from "sonner"
import type { Product } from "@/lib/types"

const defaultProduct: Omit<Product, "id"> = {
  name: "",
  price: 0,
  image: "",
  description: "",
  category: "",
}

export default function AdminProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useStore()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState(defaultProduct)

  const openAddDialog = () => {
    setEditingProduct(null)
    setFormData(defaultProduct)
    setIsDialogOpen(true)
  }

  const openEditDialog = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      category: product.category,
    })
    setIsDialogOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.price || !formData.category) {
      toast.error("Please fill in all required fields")
      return
    }

    if (editingProduct) {
      updateProduct({ ...editingProduct, ...formData })
      toast.success("Product updated successfully")
    } else {
      const newProduct: Product = {
        id: `prod-${Date.now()}`,
        ...formData,
        image: formData.image || "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=400&fit=crop",
      }
      addProduct(newProduct)
      toast.success("Product added successfully")
    }

    setIsDialogOpen(false)
    setFormData(defaultProduct)
  }

  const handleDelete = (productId: string) => {
    deleteProduct(productId)
    toast.success("Product deleted successfully")
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Products</h1>
          <p className="mt-1 text-muted-foreground">
            Manage your product catalog
          </p>
        </div>
        <Button onClick={openAddDialog} className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* Products Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <Card key={product.id} className="group overflow-hidden border-border/50 bg-card">
            <div className="relative aspect-square overflow-hidden bg-secondary/30">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 flex items-center justify-center gap-2 bg-background/80 opacity-0 transition-opacity group-hover:opacity-100">
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => openEditDialog(product)}
                  className="h-10 w-10"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDelete(product.id)}
                  className="h-10 w-10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">{product.category}</p>
              <h3 className="mt-1 line-clamp-1 font-semibold text-foreground">
                {product.name}
              </h3>
              <p className="mt-2 text-lg font-bold text-primary">
                ${product.price.toFixed(2)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md border-border bg-card">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? "Edit Product" : "Add New Product"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <FieldGroup className="py-4">
              <Field>
                <FieldLabel>Product Name *</FieldLabel>
                <Input
                  placeholder="e.g., Premium Yoga Mat"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-secondary/50"
                />
              </Field>
              <Field>
                <FieldLabel>Price *</FieldLabel>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={formData.price || ""}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                  className="bg-secondary/50"
                />
              </Field>
              <Field>
                <FieldLabel>Category *</FieldLabel>
                <Input
                  placeholder="e.g., Equipment, Supplements"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="bg-secondary/50"
                />
              </Field>
              <Field>
                <FieldLabel>Image URL</FieldLabel>
                <Input
                  placeholder="https://..."
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="bg-secondary/50"
                />
              </Field>
              <Field>
                <FieldLabel>Description</FieldLabel>
                <Textarea
                  placeholder="Product description..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="bg-secondary/50"
                  rows={3}
                />
              </Field>
            </FieldGroup>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
                {editingProduct ? "Update" : "Add"} Product
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
