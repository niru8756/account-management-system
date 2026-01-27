"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AppLayout } from "@/components/app-layout";

type Seller = {
  id: string;
  businessName: string;
  contactName: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  accountManagerName: string | null;
  accountManagerMobile: string | null;
  accountManagerEmail: string | null;
  serviceNote: string | null;
  createdAt: string;
};

export default function SellersPage() {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    address: "",
    accountManagerName: "",
    accountManagerMobile: "",
    accountManagerEmail: "",
    serviceNote: "",
  });
  const router = useRouter();

  useEffect(() => {
    fetchSellers();
  }, []);

  const fetchSellers = async () => {
    const res = await fetch("/api/sellers");
    if (res.ok) {
      const data = await res.json();
      setSellers(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/sellers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      setShowForm(false);
      setFormData({ businessName: "", contactName: "", email: "", phone: "", address: "", accountManagerName: "", accountManagerMobile: "", accountManagerEmail: "", serviceNote: "" });
      fetchSellers();
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold">Sellers</h1>
          <Button onClick={() => setShowForm(!showForm)} variant={showForm ? "outline" : "default"}>
            {showForm ? "Cancel" : "Add Seller"}
          </Button>
        </div>

        {showForm && (
          <Card>
            <CardHeader>
              <CardTitle>Add New Seller</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name *</Label>
                  <Input
                    id="businessName"
                    required
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactName">Contact Name</Label>
                  <Input
                    id="contactName"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="border-t pt-6 space-y-4">
                  <h4 className="text-sm font-semibold">Account Manager <span className="text-muted-foreground font-normal">(Optional)</span></h4>
                  <div className="space-y-2">
                    <Label htmlFor="amName">Name</Label>
                    <Input
                      id="amName"
                      value={formData.accountManagerName}
                      onChange={(e) => setFormData({ ...formData, accountManagerName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amMobile">Mobile Number</Label>
                    <Input
                      id="amMobile"
                      value={formData.accountManagerMobile}
                      onChange={(e) => setFormData({ ...formData, accountManagerMobile: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amEmail">Email Address</Label>
                    <Input
                      id="amEmail"
                      type="email"
                      value={formData.accountManagerEmail}
                      onChange={(e) => setFormData({ ...formData, accountManagerEmail: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="serviceNote">Service Note</Label>
                  <Textarea
                    id="serviceNote"
                    value={formData.serviceNote}
                    onChange={(e) => setFormData({ ...formData, serviceNote: e.target.value })}
                    rows={3}
                  />
                </div>
                <Button type="submit">Save Seller</Button>
              </form>
            </CardContent>
          </Card>
        )}

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Business Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sellers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                    No sellers yet. Click "Add Seller" to create one.
                  </TableCell>
                </TableRow>
              ) : (
                sellers.map((seller) => (
                  <TableRow key={seller.id}>
                    <TableCell className="font-medium">{seller.businessName}</TableCell>
                    <TableCell>{seller.contactName || "-"}</TableCell>
                    <TableCell>{seller.email || "-"}</TableCell>
                    <TableCell>{seller.phone || "-"}</TableCell>
                    <TableCell>
                      <Button variant="link" onClick={() => router.push(`/sellers/${seller.id}`)} className="p-0 h-auto">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
    </AppLayout>
  );
}
