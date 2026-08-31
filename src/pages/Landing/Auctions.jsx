import { useState } from "react";
import MainHero from "../../components/common/MainHero";
import AuctionsContact from "../../components/landing/AuctionsContact";
import AuctionsContent from "../../components/landing/AuctionsContent";
import AuctionsNotf from "../../components/landing/AuctionsNotf";
import MoveToAuctions from "../../components/landing/MoveToAuctions";
import AuctionCard from "../../components/landing/AuctionCard";
import { useAuctions } from "../../hooks/useAuctions";
import Loader from "../../components/common/Loader";
import AuctionsFilter from "../../components/landing/AuctionsFilter";

const Auctions = () => {

    const [filter, setFilter] = useState("available");

    const {
        data: auctions,
        isLoading,
        error,
    } = useAuctions({
        status: filter,
    });

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);

        setTimeout(() => {
            document.getElementById("auctions")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }, 100);
    };
    

    return (
        <div dir="rtl">

            <MainHero
                title="دَيسم للمزادات"
                description="فرص تُطرح… وقيمة تتحقق"
                bgImage="/images/auctions.png"
                overlayClassName="bg-black/65"
            />

            <MoveToAuctions lable="الانتقال إلى المزادات" />


            {/* Filter */}
            <div className="px-2">
                <AuctionsFilter
                    handleFilterChange={handleFilterChange}
                    filter={filter}
                />
            </div>

            <AuctionsContent />

            <section
                id="auctions"
                className="py-6 md:py-12 max-w-7xl mx-auto px-4"
            >

                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-text mb-3">
                        المزادات
                    </h2>

                    <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                        استكشف المزادات العقارية المتاحة والمنتهية
                        واغتنم الفرص الاستثمارية المميزة.
                    </p>
                </div>

               {/* Filter */}
                <AuctionsFilter
                    handleFilterChange={handleFilterChange}
                    filter={filter}
                />

                {/* Loading */}
                {isLoading && (
                    <div className="text-center">
                        جاري تحميل المزادات...
                    </div>
                )}

                {/* Error */}
                {error && (
                    <div className="text-center py-10 text-red-500">
                        حدث خطأ أثناء تحميل المزادات
                    </div>
                )}

                {/* Empty */}
                {!isLoading && !error && auctions?.length === 0 && (
                    <div className="text-center py-10 text-gray-500">
                        لا توجد مزادات في هذا القسم
                    </div>
                )}

                {/* Auctions */}
                {!isLoading && !error && auctions?.length > 0 && (
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {auctions.map((auction) => (
                            <AuctionCard
                                key={auction.id}
                                {...auction}
                            />
                        ))}
                    </div>
                )}

            </section>

            <AuctionsContact />

            <AuctionsNotf />

        </div>
    );
};

export default Auctions;



