import { api } from "../../api/axios";
import toast, { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import Card from "./Card";
import { Loader } from "@mantine/core";
// import { MessagesTable } from "./MessagesTable";

type dashboardDataType = {
  data: {
    users: number;
    bookings: number;
    subscribers: number;
    messages: number,
  }
}

const Overview = () => {
  const [dashboardData, setDashboardData] = useState<dashboardDataType>({ data: { messages: 0, bookings: 0, subscribers: 0, users: 0 } });
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const messagesResponse = await api.get("/messages");
        const dashboardDataResponse = await api.get("/requests");
        setDashboardData({
          data: {
            users: dashboardDataResponse?.data?.users || 0,
            messages: dashboardDataResponse?.data?.messages || 0,
            bookings: dashboardDataResponse?.data?.bookings || 0,
            subscribers: dashboardDataResponse?.data?.subscribers || 0,
          }
        });
        setMessages(messagesResponse?.data)
      } catch (error: any) {
        if (error.response) {
          toast.error(error?.response?.data?.message || 'Failed to fetch dashboard data');
        } else {
          toast.error("Please check your internet connection");
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="p-5">
      <Toaster />
      <div
        id="tradingview-widget-container"
        className="tradingview-widget-container"
      ></div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        <Card title="Total Users" text={isLoading ? "..." : dashboardData?.data.users as number} />
        <Card title="Total Bookings" text={isLoading ? "..." : dashboardData?.data.bookings as number} />
        <Card title="Total Subscribers" text={isLoading ? "..." : dashboardData?.data.subscribers as number} />
        <Card title="Total Messages" text={isLoading ? "..." : dashboardData?.data.messages as number} />
      </div>

      {isLoading ? (
        <div className="grid place-items-center min-h-screen">
          <Loader color="blue" />
        </div>
      ) : (
        // <MessagesTable data={messages} />
        <div></div>
      )}
    </div>
  );
}

export default Overview;