import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../store"
import { Order, ordersActions } from "../../store/slices/orders"
import { Loader } from "lucide-react"
import { Pagination } from "../../components/Pagination"

export function Dashboard() {
  const dispatch = useAppDispatch()
  const [currentPage, setCurrentPage] = useState(1)

  const orders = useAppSelector((state) => state.orders.orders)

  useEffect(() => {
    dispatch(ordersActions.loadOrders(currentPage))
  }, [dispatch, currentPage])

  if (!orders) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader className="w-6 h-6 text-zinc-400 animate-spin" />
      </div>
    )
  }

  function handleUpdateStatus(order: Order) {
    if (order.deliveredAt) return;

    const newOrderStatus = order.shippedAt ? "delivered" : "shipped";

    dispatch(ordersActions.updateOrderStatus({
      orderId: order.id,
      status: newOrderStatus
    }))
  }

  return (
    <main className="flex flex-col gap-8 p-8 mt-16">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6 pb-2">
          <h3 className="tracking-tight text-lg font-medium">Recent Deliveries</h3>
        </div>
        <div className="p-6">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="">
                <tr className="border-b transition-colors hover:bg-muted/50">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Order ID
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Customer Name
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Delivery Address
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Update status
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {orders.map((order, index) => (
                  <tr key={index} className="border-b transition-colors hover:bg-muted/50">
                    <td className="p-4 align-middle">{order.id}</td>
                    <td className="p-4 align-middle">{order.clientName}</td>
                    <td className="p-4 align-middle">{order.deliveryAddress}</td>
                    <td className="p-4 align-middle">
                      <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 w-fit text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                        {order.deliveredAt ? "Delivered"
                          : order.shippedAt ? "In transit" : "Pending"}
                      </div>
                    </td>
                    <td className="p-4 align-middle">
                      {
                        !order.deliveredAt && (
                          <button
                            onClick={() => handleUpdateStatus(order)}
                            className="inline-flex items-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-6 px-2 py-1"
                          >
                            Update to {order.shippedAt ? "delivered" : "shipped"}
                          </button>
                        )
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Pagination
        page={currentPage}
        setPage={setCurrentPage}
        listLength={orders.length}
        listLimit={7}
      />
    </main>
  )
}