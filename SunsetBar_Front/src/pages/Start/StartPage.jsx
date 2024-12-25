import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StartCard from "../../components/OrderCard/OrderCard";
import useOrderService from "../../components/hooks/useOrderService";
import Styles from "./StartPage.module.css";

function StartPage() {
  let contentIssue = "";
  const navigateTo = useNavigate();
  const { getAllOrders } = useOrderService();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const ordersData = await getAllOrders();
      setOrders(ordersData);
    } catch (err) {
      setError("Erro ao carregar as ordens.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [getAllOrders]);

  if (isLoading) contentIssue = <p>Carregando pedidos...</p>;
  if (error) contentIssue = <p>{error}</p>;

  function handleStartCard(order) {
    navigateTo("/order", { state: order });
  }

  return (
    <div className={Styles.page}>
      <div className={Styles.background}></div>
      {isLoading || error ? (
        contentIssue
      ) : (
        <ul>
          {orders
            .filter((order) => !order.paid)
            .map((order) => (
              <li className={Styles.content} key={order.id}>
                <StartCard
                  order={order}
                  onClickStartCard={() => handleStartCard(order)}
                />
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

export default StartPage;
