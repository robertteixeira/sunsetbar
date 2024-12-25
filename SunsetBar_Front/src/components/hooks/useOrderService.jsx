import axios from "axios";
import { useCallback, useState } from "react";

const axiosInstance = axios.create({
  baseURL: "http://192.168.0.13:5000",
});

const useOrderService = () => {
  // Carrega todas as ordens
  const getAllItems = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/items");
      return response.data;
    } catch (error) {
      setError("Erro ao carregar os itens do pedido:" + error);
      throw error;
    }
  }, []);

  // Carrega todas as ordens
  const getAllOrders = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/orders");
      return response.data;
    } catch (error) {
      setError("Erro ao carregar os pedidos:" + error);
      throw error;
    }
  }, []);

  // Cria uma nova ordem
  const createOrder = useCallback(async (orderData) => {
    try {
      const response = await axiosInstance.post("/orders", orderData);
      return response.data;
    } catch (error) {
      setError("Erro ao criar um pedido:" + error);
      throw error;
    }
  }, []);

  // Atualiza uma ordem existente
  const updateOrder = useCallback(async (orderId, orderData) => {
    try {
      const response = await axiosInstance.put(
        `${"/orders"}/${orderId}`,
        orderData
      );
      return response.data;
    } catch (error) {
      console.log("Erro ao atualizar o pedido:" + error);
      throw error;
    }
  }, []);

  return { createOrder, updateOrder, getAllOrders, getAllItems };
};

export default useOrderService;
