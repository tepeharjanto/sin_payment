"use client";

import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { 
  Search, 
  Filter, 
  Download, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Loader2,
  Eye
} from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { showError } from '@/utils/toast';

const Billing = () => {
  const [bills, setBills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      const response = await fetch('/api/billing');
      const data = await response.json();
      setBills(data);
    } catch (error) {
      showError('Gagal mengambil data tagihan');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Paid':
        return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 flex items-center gap-1"><CheckCircle2 size={12} /> Lunas</Badge>;
      case 'Pending':
        return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 flex items-center gap-1"><Clock size={12} /> Menunggu</Badge>;
      default:
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 flex items-center gap-1"><AlertCircle size={12} /> Belum Bayar</Badge>;
    }
  };

  const filteredBills = bills.filter(b => 
    b.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.customer_id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Data Tagihan</h1>
            <p className="text-slate-500">Pantau status pembayaran internet warga.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-xl border-slate-200">
              <Download size={18} className="mr-2" /> Export PDF
            </Button>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <Input 
                placeholder="Cari nama atau ID pelanggan..." 
                className="pl-10 bg-slate-50 border-none rounded-xl focus-visible:ring-blue-600"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="rounded-xl border-slate-200">
              <Filter size={18} className="mr-2" /> Filter Bulan
            </Button>
          </div>

          <div className="rounded-xl border border-slate-100 overflow-hidden">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                <Loader2 className="animate-spin mb-2" size={32} />
                <p>Memuat data tagihan...</p>
              </div>
            ) : (
              <Table>
                <TableHeader className="bg-slate-50">
                  <TableRow>
                    <TableHead className="font-bold">Pelanggan</TableHead>
                    <TableHead className="font-bold">Bulan</TableHead>
                    <TableHead className="font-bold">Jumlah</TableHead>
                    <TableHead className="font-bold">Status</TableHead>
                    <TableHead className="font-bold">Tgl Bayar</TableHead>
                    <TableHead className="text-right font-bold">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBills.length > 0 ? (
                    filteredBills.map((bill) => (
                      <TableRow key={bill.id} className="hover:bg-slate-50/50">
                        <TableCell>
                          <div>
                            <p className="font-semibold">{bill.customer_name}</p>
                            <p className="text-xs text-blue-600 font-medium">{bill.customer_id}</p>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{bill.month}</TableCell>
                        <TableCell className="font-bold">
                          {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(bill.amount)}
                        </TableCell>
                        <TableCell>{getStatusBadge(bill.status)}</TableCell>
                        <TableCell className="text-slate-500 text-sm">
                          {bill.payment_date ? new Date(bill.payment_date).toLocaleDateString('id-ID') : '-'}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg">
                            <Eye size={16} className="mr-1" /> Detail
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-slate-400">
                        Tidak ada data tagihan ditemukan.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Billing;