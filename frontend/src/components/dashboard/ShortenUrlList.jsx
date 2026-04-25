import ShortenItem from "./ShortenItem";


const ShortenUrlList = ({data = []}) => {
    if(!data.length) return null;

    return (
        <div className="space-y-4 max-h-125 overflow-y-auto pr-2">
            {data.map((item) => (
                <ShortenItem key={item.id || item.shortUrl} {...item} />
            ))}
        </div>
    );
};

export default ShortenUrlList;