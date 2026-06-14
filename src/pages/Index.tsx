"use client";

import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { 
  Users, 
  CheckCircle2, 
  Clock, 
  Wallet,
  PlusCircle,
  ArrowRight,
  Receipt,
  Loader2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Index = () => {
  const [statsData, setStatsData] = useState({
    totalCustomers: 0,
    paidBills: 0,
    unpaidBills: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats');
        const data = await response.json();
        setStatsData(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const stats = [
    { title: 'Total Pelanggan', value: statsData.totalCustomers.toString(), icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Sudah Bayar', value: statsData.paidBills.toString(), icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Belum Bayar', value: statsData.unpaidBills.toString(), icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
    { 
      title: 'Pemasukan Lunas', 
      value: new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(statsData.totalRevenue), 
      icon: Wallet, 
      color: 'text-indigo-600', 
      bg: 'bg-indigo-50' 
    },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Beranda</h1>
          <p className="text-slate-500">Selamat datang kembali, Admin. Berikut ringkasan data dari database Neon.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {loading ? (
            Array(4).fill(0).map((_, i) => (
              <Card key={i} className="border-none shadow-sm animate-pulse">
                <CardContent className="p-6 h-24 bg-slate-100 rounded-xl" />
              </Card>
            ))
          ) : (
            stats.map((stat, index) => (
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
            ))
          )}
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