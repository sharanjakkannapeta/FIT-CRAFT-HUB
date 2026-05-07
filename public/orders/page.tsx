"use client"

import { useState } from "react"
import { ChevronDown, Eye, X } from "lucide-react"
import { useStore } from "@/lib/store-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import type { Order } from "@/lib/types"

const statusOptions: Order["status"][] = ["placed", "shipped", "out-for-delivery", "delivered"]

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus } = useStore()
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const handleStatusChange = (orderId: string, status: Order["status"]) => {
    updateOrderStatus(orderId, status)
    toast.success(`Order status updated to ${status.replace("-", " ")}`)
  }

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "delivered":
        return "bg-primary/20 text-primary"
      case "out-for-delivery":
        return "bg-yellow-500/20 text-yellow-500"
      case "shipped":
        return "bg-blue-500/20 text-blue-500"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Orders</h1>
        <p className="mt-1 text-muted-foreground">
          Manage and track customer orders
        </p>
      </div>

      {/* Orders Table */}
      <Card className="border-border/50 bg-card">
        <CardHeader>
          <CardTitle className="text-lg">All Orders ({orders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {orders.length === 0 ? (
            <p className="py-12 text-center text-muted-foreground">No orders yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border text-left text-sm text-muted-foreground">
                    <th className="pb-3 font-medium">Order ID</th>
                    <th className="pb-3 font-medium">Customer</th>
                    <th className="pb-3 font-medium">Phone</th>
                    <th className="pb-3 font-medium">Amount</th>
                    <th className="pb-3 font-medium">Payment</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {orders.map((order) => (
                    <tr key={order.id} className="text-sm">
                      <td className="py-4 font-mono font-medium text-foreground">
                        {order.id}
                      </td>
                      <td className="py-4">
                        <div>
                          <p className="font-medium text-foreground">{order.customerName}</p>
                          <p className="text-xs text-muted-foreground line-clamp-1 max-w-[200px]">
                            {order.address}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 text-foreground">{order.phone}</td>
                      <td className="py-4 font-medium text-foreground">
                        ${order.total.toFixed(2)}
                      </td>
                      <td className="py-4">
                        <Badge variant="outline" className="capitalize">
                          {order.paymentMethod === "cod" ? "COD" : "Online"}
                        </Badge>
                      </td>
                      <td className="py-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className={cn(
                                "h-8 gap-1 rounded-full px-3 text-xs font-medium capitalize",
                                getStatusColor(order.status)
                              )}
                            >
                              {order.status.replace("-", " ")}
                              <ChevronDown className="h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start" className="border-border bg-card">
                            {statusOptions.map((status) => (
                              <DropdownMenuItem
                                key={status}
                                onClick={() => handleStatusChange(order.id, status)}
                                className={cn(
                                  "capitalize",
                                  order.status === status && "bg-secondary"
                                )}
                              >
                                {status.replace("-", " ")}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                      <td className="py-4">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setSelectedOrder(order)}
                          className="h-8 w-8"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Order Details Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-lg border-border bg-card">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6">
              {/* Order Info */}
              <div className="grid gap-4 text-sm sm:grid-cols-2">
                <div>
                  <p className="text-muted-foreground">Order ID</p>
                  <p className="font-mono font-medium text-foreground">{selectedOrder.id}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Date</p>
                  <p className="font-medium text-foreground">
                    {new Date(selectedOrder.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Customer</p>
                  <p className="font-medium text-foreground">{selectedOrder.customerName}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Phone</p>
                  <p className="font-medium text-foreground">{selectedOrder.phone}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-muted-foreground">Address</p>
                  <p className="font-medium text-foreground">{selectedOrder.address}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Payment Method</p>
                  <p className="font-medium capitalize text-foreground">
                    {selectedOrder.paymentMethod === "cod" ? "Cash on Delivery" : "Online Payment"}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Status</p>
                  <Badge className={cn("capitalize", getStatusColor(selectedOrder.status))}>
                    {selectedOrder.status.replace("-", " ")}
                  </Badge>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <p className="mb-3 text-sm font-medium text-muted-foreground">Order Items</p>
                <div className="space-y-2 rounded-lg bg-secondary/30 p-4">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-sm">
                      <div>
                        <p className="font-medium text-foreground">{item.name}</p>
                        <p className="text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium text-foreground">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                  <div className="mt-3 flex justify-between border-t border-border pt-3">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="text-lg font-bold text-primary">
                      ${selectedOrder.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
