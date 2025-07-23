import { useEffect, useState, useCallback, useRef } from "react";

export default function useOrders({ filter = "", page = 1, pageSize = 5 }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [rawOrders, setRawOrders] = useState([]);
  const shouldFetch = useRef(true);

  const fetchOrders = useCallback(() => {
    setLoading(true);
    setError(null);
    fetch(`/api/orders`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch orders");
        return res.json();
      })
      .then((data) => {
        setRawOrders(data);
        shouldFetch.current = false;
      })
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  // Only fetch from backend when explicitly refreshed
  useEffect(() => {
    if (shouldFetch.current) {
      fetchOrders();
    }
  }, [fetchOrders]);

  // Filtering and pagination are done on the client side
  useEffect(() => {
    let filtered = rawOrders;
    if (filter) {
      filtered = filtered.filter((o) =>
        o.product.toLowerCase().includes(filter.toLowerCase())
      );
    }
    setTotal(filtered.length);
    const start = (page - 1) * pageSize;
    setOrders(filtered.slice(start, start + pageSize));
  }, [rawOrders, filter, page, pageSize]);

  // Expose refresh to allow explicit backend fetch (e.g. after add)
  const refresh = useCallback(() => {
    shouldFetch.current = true;
    fetchOrders();
  }, [fetchOrders]);

  return { orders, loading, error, total, refresh };
}
