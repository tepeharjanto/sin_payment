"use client";

import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { 
  Users, 
  Receipt, 
  TrendingUp, 
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Loader2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Index = () => {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalRevenue: 0,
    pendingBills: 0,
    activePackages: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulasi pengambilan data statistik
    const timer = setTimeout(() => {
      setStats({
        totalCustomers: 124,
        totalRevenue: 18500000,
        pendingBills: 12,
        activePackages: 3
      });
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const statCards = [
    {
      title: "Total Pelanggan",
      value: stats.totalCustomers,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
      trend: "+12% dari bulan lalu",
      trendUp: true
    },
    {
      title: "Pendapatan Bulan Ini",
      value: formatCurrency(stats.totalRevenue),
      icon: TrendingUp,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      trend: "+8% dari bulan lalu",
      trendUp: true
    },
    {
      title: "Tagihan Tertunda",
      value: stats.pendingBills,
      icon: AlertCircle,
      color: "text-orange-600",
      bg: "bg-orange-50",
      trend: "-2 dari kemarin",
      trendUp: false
    },
    {
      title: "Paket Aktif",
      value: stats.activePackages,
      icon: Receipt,
      color: "text-purple-600",
      bg: "bg-purple-50",
      trend: "Stabil",
      trendUp: true
    }
  ];

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Beranda</h1>
          <p className="text-slate-500">Selamat datang kembali, Admin SIN. Berikut ringkasan hari ini.</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="animate-spin text-blue-600" size={40} />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {statCards.map((card, index) => (
                <Card key={index} className="border-none shadow-sm rounded-2xl overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`${card.bg} p-3 rounded-xl`}>
                        <card.icon className={card.color} size={24} />
                      </div>
                      <div className={`flex items-center gap-1 text-xs font-medium ${card.trendUp ? 'text-emerald-600' : 'text-orange-600'}`}>
                        {card.trendUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                        {card.trend}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 font-medium">{card.title}</p>
                      <h3 className="text-2xl font-bold text-slate-900 mt-1">{card.value}</h3>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className="lg:col-span-2 border-none shadow-sm rounded-2xl">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg font-bold">Aktivitas Terbaru</CardTitle>
                  <Button variant="ghost" size="sm" className="text-blue-600" asChild>
                    <Link to="/billing">Lihat Semua</Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center justify-between group cursor-pointer">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                            <Users size={18} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900">Pembayaran dari Budi Santoso</p>
                            <p className="text-xs text-slate-500">Tagihan Mei 2024 • Berhasil</p>
                          </div>
                        </div>
                        <p className="text-sm font-bold text-emerald-600">+Rp 150.000</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm rounded-2xl bg-blue-600 text-white">
                <CardContent className="p-8 flex flex-col h-full justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Butuh Bantuan?</h3>
                    <p className="text-blue-100 text-sm leading-relaxed">
                      Jika Anda mengalami kendala dalam pengelolaan tagihan atau data pelanggan, silakan hubungi tim teknis.
                    </p>
                  </div>
                  <Button className="bg-white text-blue-600 hover:bg-blue-50 mt-8 rounded-xl font-bold">
                    Hubungi Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Index;