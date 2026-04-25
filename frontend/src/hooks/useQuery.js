import { Await } from "react-router-dom";
import api from "../api/api";
import { useQuery } from "@tanstack/react-query";

const getAuthHeaders = (token) => ({
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

export const useFetchMyShortUrls = (token, onError) => {
    return useQuery({
        queryKey: ["my-short-urls", token],

        queryFn: async () => {
            const response = await api.get(
                "/api/urls/myurls",
                getAuthHeaders(token)
            );
            return response.data;
        },
            enabled: !!token,

            select: (data) => {
                return data.sort(
                    (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
                );
            },

            onError,
            staleTime: 5000,
        }
    );
};

export const useFetchTotalClicks = (token, onError) => {
    return useQuery({
        queryKey: ["total-clicks", token],
        queryFn: async () => {
            const response = await api.get(
                "/api/urls/totalClicks?startDate=2026-01-01&endDate=2027-12-31",
                getAuthHeaders(token)
            );
            return response.data;
        },
            enabled: !!token,

            select: (data) => {
                return Object.entries(data).map(([key, value]) => ({
                    clickDate: key,
                    count: value,
                }));
            },

            onError,
            staleTime: 5000,
        }
    );
};