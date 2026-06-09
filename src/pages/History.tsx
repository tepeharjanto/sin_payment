"use client";

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { 
  Search, 
  Download, 
  Filter,
  Calendar as CalendarIcon
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

const History = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data riwayat
  const history = [
    { id: 'TRX-1024', customer: 'Budi Santoso', month: 'Mei 2024', date: '12/05/2024', amount: 'Rp 150.000', method: 'Transfer Bank' },
    { id: 'TRX-1023', customer: 'Siti Aminah', month: 'Mei 2024', date: '10/05/2024', amount: 'Rp 250.000', method: 'Transfer Bank' },
    { id: 'TRX-1022', customer: 'Dewi Lestari', month: 'April 2024', date: '05/04/2024', amount: 'Rp 500.000', method: 'Transfer Bank' },
    { id: 'TRX-1021', customer: 'Budi Santoso', month: 'April 2024', date: '02/04/2024', amount: 'Rp 150.000', method: 'Transfer Bank' },
    { id: 'TRX-1020', customer: 'Agus Setiawan', month: 'Maret 2024', date: '28/03/2024', amount: 'Rp 150.000', method: 'Transfer Bank' },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Riwayat Pembayaran</h1>
            <p className="text-slate-500">Laporan seluruh transaksi pembayaran pelanggan.</p>
          </div>
          <Button variant="outline" className="rounded-xl border-slate-200">
            <Download size={18} className="mr-2" /> Export Laporan
          </Button>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <Input 
                placeholder="Cari nama pelanggan atau ID transaksi..." 
                className="pl-10 bg-slate-50 border-none rounded-xl"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="rounded-xl border-slate-200">
                <CalendarIcon size={18} className="mr-2" /> Pilih Tanggal
              </Button>
              <Button variant="outline" className="rounded-xl border-slate-200">
                <Filter size={18} />
              </Button>
            </div>
          </div>

          <div className="rounded-xl border border-slate-100 overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="font-bold">ID Transaksi</TableHead>
                  <TableHead className="font-bold">Pelanggan</TableHead>
                  <TableHead className="font-bold">Periode</TableHead>
                  <TableHead className="font-bold">Tanggal Bayar</TableHead>
                  <TableHead className="font-bold">Jumlah</TableHead>
                  <TableHead className="font-bold">Metode</TableHead>
                  <TableHead className="text-right font-bold">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.map((item) => (
                  <TableRow key={item.id} className="hover:bg-slate-50/50">
                    <TableCell className="font-medium text-slate-400">{item.id}</TableCell>
                    <TableCell className="font-semibold">{item.customer}</TableCell>
                    <TableCell>{item.month}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell className="font-bold text-slate-900">{item.amount}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="rounded-full font-normal border-slate-200">
                        {item.method}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none">
                        Berhasil
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default History;