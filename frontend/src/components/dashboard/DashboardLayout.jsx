import React, { useState } from "react";
import Graph from "./Graph";
import { useStoreContext } from "../../contextApi/ContextApi";
import {
  useFetchMyShortUrls,
  useFetchTotalClicks,
} from "../../hooks/useQuery";
import ShortenPopUp from "./ShortenPopUp";
import { FaLink } from "react-icons/fa";
import ShortenUrlList from "./ShortenUrlList";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";


const DashboardLayout = () => {
    const {token} = useStoreContext();
    const navigate = useNavigate();
    const [shortenPopUp, setShortenPopUp] = useState(false);

    function onError() {
        navigate("/error");
    }

    const {
        isLoading,
        data: myShortUrls = [],
        refetch,
    } = useFetchMyShortUrls(token, onError);

    const {
        isLoading: loader,
        data: totalClicks = [],
    } = useFetchTotalClicks(token, onError);

    if(loader) return <Loader fullScreen />

    return (
        <div className="min-h-[calc(100vh-64px)] bg-background px-5 sm:px-8 lg:px-14 py-10">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <h1 className="text-2xl sm:text-3xl font-semibold text-textMain">
                        DashBoard
                    </h1>

                    <button
                        onClick={() => setShortenPopUp(true)}
                        className="bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-lg transition shadow-sm hover:shadow-md"
                        >
                            + Create Short Link
                        </button>
                </div>

                <div className="bg-surface border border-border rounded-xl p-5 shadow-sm mb-8">
                    <h2 className="text-lg font-semibold text-textMain mb-4">
                        Click Analytics
                    </h2>

                    <div className="h-75 relative">
                        {totalClicks.length === 0 && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                                <h3 className="text-textMain font-medium mb-1">
                                No data available
                                </h3>
                                <p className="text-textSecondary text-sm">
                                Start sharing your links to see analytics here.
                                </p>
                            </div>
                        )}

                        <Graph graphData={totalClicks} />
                    </div>
                </div>

                <div className="bg-surface border border-border rounded-xl p-5 shadow-sm">
                    <h2 className="text-lg font-semibold text-textMain mb-4">
                        Your Short Links
                    </h2>

                    {isLoading ? (
                        <Loader />
                    ) : myShortUrls.length === 0 ? (
                        <div className="flex items-center justify-center py-10 text-center">
                            <div className="flex items-center gap-2 text-textSecondary">
                                <FaLink className="text-primary text-lg" />
                                <p className="text-sm">
                                    You haven't created any short links yet.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <ShortenUrlList data={myShortUrls}/>
                    )}
                </div>
            </div>

            <ShortenPopUp
                refetch={refetch}
                open={shortenPopUp}
                setOpen={setShortenPopUp}
            />
        </div>
    );
};

export default DashboardLayout;