"use client";

import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { 
  Upload, 
  CheckCircle, 
  AlertCircle, 
  Calendar,
  FileText,
  ExternalLink,
  Loader2
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { showSuccess, showError } from '@/utils/toast';

const Billing = () => {
  const [month, setMonth] = useState('Mei 2024');
  const [bills, setBills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Tagihan & Approval</h1>
            <p className="text-slate-500">Kelola pembayaran dan konfirmasi bukti transfer.</p>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-slate-400" />
            <Select value={month} onValueChange={setMonth}>
              <SelectTrigger className="w-[180px] bg-white rounded-xl border-slate-200">
                <SelectValue placeholder="Pilih Bulan" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="Mei 2024">Mei 2024</SelectItem>
                <SelectItem value="April 2024">April 2024</SelectItem>
                <SelectItem value="Maret 2024">Maret 2024</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 text-slate-400">
              <Loader2 className="animate-spin mb-2" size={32} />
              <p>Memuat data tagihan...</p>
            </div>
          ) : bills.length > 0 ? (
            bills.map((bill) => (
              <Card key={bill.id} className="border-none shadow-sm overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row md:items-center p-6 gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">ID: {bill.id}</span>
                        <Badge variant={bill.status === 'Paid' ? 'default' : bill.status === 'Pending' ? 'secondary' : 'destructive'} 
                          className={cn(
                            "rounded-full px-3",
                            bill.status === 'Paid' && "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
                            bill.status === 'Pending' && "bg-amber-100 text-amber-700 hover:bg-amber-100"
                          )}>
                          {bill.status === 'Paid' ? 'Lunas' : bill.status === 'Pending' ? 'Menunggu Approval' : 'Belum Bayar'}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">{bill.customer_name}</h3>
                      <p className="text-slate-500 font-medium">
                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(bill.amount)}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      {bill.proof_url ? (
                        <Button variant="outline" className="rounded-xl border-slate-200 flex items-center gap-2">
                          <FileText size={16} /> Lihat Bukti <ExternalLink size={14} />
                        </Button>
                      ) : (
                        <Button variant="outline" className="rounded-xl border-dashed border-slate-300 text-slate-400 flex items-center gap-2">
                          <Upload size={16} /> Upload Bukti
                        </Button>
                      )}

                      {bill.status === 'Pending' && (
                        <Button 
                          className="bg-emerald-600 hover:bg-emerald-700 rounded-xl flex items-center gap-2"
                          onClick={() => showSuccess(`Pembayaran ${bill.customer_name} berhasil disetujui`)}
                        >
                          <CheckCircle size={16} /> Approve
                        </Button>
                      )}

                      {bill.status === 'Unpaid' && (
                        <div className="flex items-center gap-2 text-red-500 text-sm font-medium">
                          <AlertCircle size={16} /> Belum ada konfirmasi
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200 text-slate-400">
              Tidak ada data tagihan untuk periode ini.
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Billing;