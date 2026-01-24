"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Seller = {
  id: string;
  businessName: string;
  contactName: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  createdAt: string;
};

export default function SellerProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const [seller, setSeller] = useState<Seller | null>(null);
  const [id, setId] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    params.then((p) => {
      setId(p.id);
      fetchSeller(p.id);
    });
  }, [params]);

  const fetchSeller = async (sellerId: string) => {
    const res = await fetch(`/api/sellers/${sellerId}`);
    if (res.ok) {
      const data = await res.json();
      setSeller(data);
    }
  };

  if (!seller) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => router.push("/sellers")} className="mb-4 text-blue-600 hover:text-blue-800">
          ← Back to Sellers
        </button>
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold mb-6">{seller.businessName}</h1>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Contact Name</label>
              <p className="text-lg">{seller.contactName || "-"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Email</label>
              <p className="text-lg">{seller.email || "-"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Phone</label>
              <p className="text-lg">{seller.phone || "-"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Address</label>
              <p className="text-lg">{seller.address || "-"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Created</label>
              <p className="text-lg">{new Date(seller.createdAt).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
