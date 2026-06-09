"use client";

import React from 'react';
import Layout from '@/components/Layout';
import { 
  Users, 
  CheckCircle2, 
  Clock, 
  Wallet,
  PlusCircle,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Index = () => {
  // Mock data untuk statistik
  const stats = [
    { title: 'Total Pelanggan', value: '124', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Sudah Bayar', value: '86', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Belum Bayar', value: '38', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
    { title: 'Pemasukan Bulan Ini', value: 'Rp 12.900.000', icon: Wallet, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Beranda</h1>
          <p className="text-slate-500">Selamat datang kembali, Admin. Berikut ringkasan bulan ini.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                    <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                  </div>
                  <div className={`${stat.bg} p-3 rounded-2xl`}>
                    <stat.icon className={stat.color} size={24} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-none shadow-sm bg-blue-600 text-white overflow-hidden relative group">
            <div className="absolute right-[-20px] top-[-20px] opacity-10 group-hover:scale-110 transition-transform duration-500">
              <PlusCircle size={160} />
            </div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PlusCircle size={20} />
                Tambah Warga
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-100 mb-6">Daftarkan pelanggan baru ke dalam sistem jaringan Salam Indah.</p>
              <Button asChild variant="secondary" className="w-full sm:w-auto bg-white text-blue-600 hover:bg-blue-50">
                <Link to="/customers" className="flex items-center gap-2">
                  Buka Menu Pelanggan <ArrowRight size={16} />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-slate-900 text-white overflow-hidden relative group">
            <div className="absolute right-[-20px] top-[-20px] opacity-10 group-hover:scale-110 transition-transform duration-500">
              <Receipt size={160} />
            </div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Receipt size={20} />
                Tagihan Bulan Ini
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-400 mb-6">Lihat dan kelola status pembayaran pelanggan untuk periode berjalan.</p>
              <Button asChild variant="secondary" className="w-full sm:w-auto bg-blue-600 text-white border-none hover:bg-blue-700">
                <Link to="/billing" className="flex items-center gap-2">
                  Lihat Tagihan <ArrowRight size={16} />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Index;