import { Link, useNavigate } from "react-router-dom";
import { useStoreContext } from "../../contextApi/ContextApi"
import { useEffect, useState } from "react";
import api from "../../api/api";
import { FaExternalLinkAlt, FaRegCalendarAlt } from "react-icons/fa";
import dayjs from "dayjs";
import CopyToClipboard from "react-copy-to-clipboard";
import {IoCopy} from "react-icons/io5";
import {LiaCheckSolid} from "react-icons/lia";
import {MdAnalytics, MdOutlineAdsClick} from "react-icons/md";
import { Hourglass } from "react-loader-spinner";
import Graph from "./Graph";


const ShortenItem = ({
    originalUrl,
    shortUrl,
    clickCount,
    createdDate,
}) => {
    const {token} = useStoreContext();
    const navigate = useNavigate();

    const [isCopied, setIsCopied] = useState(false);
    const [showAnalytics, setShowAnalytics] = useState(false);
    const [loading, setLoading] = useState(false);
    const [analyticData, setAnalyticData] = useState([]);

    const shortLink = `${
        import.meta.env.VITE_REACT_FRONT_END_URL
    }/s/${shortUrl}`;

    const subDomain = import.meta.env.VITE_REACT_FRONT_END_URL.replace(
        /^https?:\/\//,
        ""
    );

    const fetchAnalytics = async () => {
        setLoading(true);
        try {
            const {data} = await api.get(
                `/api/urls/analytics/${shortUrl}?startDate=2026-12-01T00:00:00&endDate=2027-12-31T23:59:59`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setAnalyticData(data);
        }
        catch (error) {
            navigate("/error");
        }
        finally {
            setLoading(false);
        }
    };

    const toggleAnalytics = () => {
        setShowAnalytics((prev) => !prev);
    };

    useEffect(() => {
        if(showAnalytics && analyticData.length === 0) {
            fetchAnalytics();
        }
    }, [showAnalytics]);

    useEffect(() => {
        if(isCopied) {
            const timer = setTimeout(() => setIsCopied(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [isCopied]);

    return (
        <div className="bg-surface border border-border rounded-xl p-5 shadow-sm transition">
            <div className="flex flex-col sm:flex-row justify-between gap-6">
                <div className="flex-1 space-y-2 overflow-hidden">
                    <div className="flex items-center gap-2 text-primary font-medium">
                        <Link target="_blank" to={shortLink}>
                            {subDomain + "/s/" + shortUrl}
                        </Link>
                        <FaExternalLinkAlt className="text-sm" />
                    </div>

                    <p className="text-textSecondary text-sm break-all">
                        {originalUrl}
                    </p>

                    <div className="flex flex-wrap items-center gap-6 pt-2 text-sm">
                        <div className="flex items-center gap-1 text-accent font-medium">
                            <MdOutlineAdsClick />
                            <span>{clickCount}</span>
                            <span>
                                {clickCount === 1 ? "Click" : "Clicks"}
                            </span>
                        </div>

                        <div className="flex items-center gap-2 text-textSecondary">
                            <FaRegCalendarAlt />
                            <span>
                                {dayjs(createdDate).format("MMM DD, YYYY")}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex sm:flex-col gap-3 sm:items-end">
                    <CopyToClipboard text={shortLink} onCopy={() => setIsCopied(true)}>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm hover:bg-primary-hover transition">
                            {isCopied ? "Copied" : "Copy"}
                            {isCopied ? <LiaCheckSolid /> : <IoCopy />}
                        </button>
                    </CopyToClipboard>

                    <button
                        onClick={toggleAnalytics}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-textMain hover:bg-background transition text-sm"
                    >
                        Analytics
                        <MdAnalytics />
                    </button>
                </div>
            </div>

            {showAnalytics && (
                <div className="mt-6 border-t border-border pt-4">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-10">
                            <Hourglass
                                visible
                                height="40"
                                width="40"
                                colors={["#2563EB", "#93C5FD"]}
                            />
                            <p className="text-textSecondary text-sm mt-2">
                                Loading analytics...
                            </p>
                        </div>
                    ) : analyticData.length === 0 ? (
                        <div className="text-center py-10">
                            <h3 className="text-textMain font-medium mb-1">
                                No data available.
                            </h3>
                            <p className="text-textSecondary text-sm">
                                Share your link to start seeing analytics.
                            </p>
                        </div>
                    ) : (
                        <div className="h-62.5">
                            <Graph graphData={analyticData} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ShortenItem;