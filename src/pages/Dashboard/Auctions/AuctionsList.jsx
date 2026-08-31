
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuctions } from "../../../hooks/useAuctions";
import { supabase } from "../../../lib/supabase";
import Loader from "../../../components/common/Loader";
import AuctionCardAdmin from "../../../components/dashboard/AuctionCardAdmin";
import { useQueryClient } from "@tanstack/react-query";

const AuctionsList = () => {

    const queryClient = useQueryClient();

    const {
        data: auctions = [],
        isLoading,
        error,
    } = useAuctions();

    const [filter, setFilter] = useState("all");

    const filteredAuctions =
        filter === "all"
            ? auctions
            : auctions.filter((auction) => auction.status === filter);

    // Delete auction
    const handleDelete = async (id) => {
        try {
            const { error } = await supabase
                .from("Auctions")
                .delete()
                .eq("id", id);

            if (error) throw error;

            await queryClient.invalidateQueries({
                queryKey: ["auctions"],
            });

        } catch (err) {
            console.error("Error deleting auction:", err.message);
            alert("حدث خطأ أثناء حذف المزاد");
        }
    };

    // Loader
    if (isLoading) return <Loader />;

    return (
        <section className="py-6">
            <div className="max-w-7xl mx-auto px-4">

                {/* Header */}
                <div className="flex md:items-center justify-between flex-col md:flex-row mb-2 md:mb-6 gap-4">

                    {/* Section Title */}
                    <h2 className="text-2xl md:text-3xl font-extrabold text-text">
                        المزادات
                    </h2>

                    <div className="flex flex-row items-center gap-2 md:gap-6">

                        {/* Filter */}
                        <div className="mb-6 flex items-center gap-3">

                            <label className="text-sm font-medium text-gray-600">
                                تصفية
                            </label>

                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="px-4 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                <option value="all">
                                    كل المزادات
                                </option>

                                <option value="available">
                                    المزادات المتاحة
                                </option>

                                <option value="ended">
                                    المزادات المنتهية
                                </option>
                            </select>

                        </div>

                        {/* Add Auction */}
                        <div className="flex justify-end mb-6">

                            <Link
                                to="/dashboard/add-auction"
                                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition"
                            >
                                إضافة مزاد جديد
                            </Link>

                        </div>

                    </div>
                </div>

                {/* Error */}
                {error && (
                    <p className="text-center text-red-500 py-10">
                        حدث خطأ أثناء تحميل المزادات
                    </p>
                )}

                {/* Empty */}
                {!error && filteredAuctions.length === 0 && (
                    <p className="text-center text-gray-500 py-10">
                        لا توجد مزادات
                    </p>
                )}

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                    {filteredAuctions.map((auction) => (
                        <AuctionCardAdmin 
                            key={auction.id} 
                            id={auction.id} 
                            name_ar={auction.name_ar} 
                            name_en={auction.name_en} 
                            city_ar={auction.city_ar} 
                            city_en={auction.city_en} 
                            units_count={auction.units_count} 
                            type_ar={auction.type_ar} 
                            type_en={auction.type_en} 
                            building_type_ar={auction.building_type_ar} 
                            building_type_en={auction.building_type_en} 
                            cover_image={auction.cover_image} 
                            status={auction.status} 
                            onDelete={handleDelete} 
                        />
                    ))}

                </div>

            </div>
        </section>
    );
};

export default AuctionsList;