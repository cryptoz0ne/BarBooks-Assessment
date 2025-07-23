import React, { useState } from "react";
import useSummary from "./hooks/useSummary";
import useOrders from "./hooks/useOrders";
import Summary from "./components/Summary";
import OrderList from "./components/OrderList";
import NewOrderForm from "./components/NewOrderForm";

export default function App() {
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const {
    data: summary,
    loading: summaryLoading,
    error: summaryError,
    refresh: refreshSummary,
  } = useSummary();

  const {
    orders,
    loading: ordersLoading,
    error: ordersError,
    total,
    refresh: refreshOrders,
  } = useOrders({ filter, page, pageSize });

  function handleOrderAdded() {
    refreshSummary();
    refreshOrders();
  }

  return (
    <div
      style={{ maxWidth: 600, margin: "40px auto", fontFamily: "sans-serif" }}
    >
      <h1>BarBooks Orders</h1>
      <Summary data={summary} loading={summaryLoading} error={summaryError} />
      <NewOrderForm onSuccess={handleOrderAdded} />
      <OrderList
        orders={orders}
        loading={ordersLoading}
        error={ordersError}
        filter={filter}
        setFilter={setFilter}
        page={page}
        setPage={setPage}
        total={total}
        pageSize={pageSize}
      />
    </div>
  );
}
