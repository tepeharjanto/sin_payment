"use client";

import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { 
  Search, 
  Plus, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Phone,
  MapPin,
  Wifi,
  Loader2
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { showSuccess, showError } from '@/utils/toast';

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch('/api/customers');
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      showError('Gagal mengambil data pelanggan');
    } finally {
      setLoading(false);
    }
  };

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.customer_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Data Pelanggan</h1>
            <p className="text-slate-500">Kelola informasi warga yang berlangganan internet.</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 rounded-xl">
            <Plus size={18} className="mr-2" /> Tambah Pelanggan
          </Button>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input 
              placeholder="Cari nama atau ID pelanggan..." 
              className="pl-10 bg-slate-50 border-none rounded-xl focus-visible:ring-blue-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="rounded-xl border border-slate-100 overflow-hidden">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                <Loader2 className="animate-spin mb-2" size={32} />
                <p>Memuat data...</p>
              </div>
            ) : (
              <Table>
                <TableHeader className="bg-slate-50">
                  <TableRow>
                    <TableHead className="font-bold">ID Pelanggan</TableHead>
                    <TableHead className="font-bold">Nama</TableHead>
                    <TableHead className="font-bold">Alamat</TableHead>
                    <TableHead className="font-bold">No. WA</TableHead>
                    <TableHead className="font-bold">Paket</TableHead>
                    <TableHead className="font-bold">Status</TableHead>
                    <TableHead className="text-right font-bold">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.length > 0 ? (
                    filteredCustomers.map((customer) => (
                      <TableRow key={customer.id} className="hover:bg-slate-50/50">
                        <TableCell className="font-medium text-blue-600">{customer.customer_id}</TableCell>
                        <TableCell className="font-semibold">{customer.name}</TableCell>
                        <TableCell className="text-slate-500 max-w-[200px] truncate">
                          <div className="flex items-center gap-1">
                            <MapPin size={14} /> {customer.address}
                          </div>
                        </TableCell>
                        <TableCell>
                          <a href={`https://wa.me/${customer.phone}`} target="_blank" className="flex items-center gap-1 text-emerald-600 hover:underline">
                            <Phone size={14} /> {customer.phone}
                          </a>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Wifi size={14} className="text-blue-500" /> {customer.package}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={customer.status === 'Aktif' ? 'default' : 'secondary'} className={customer.status === 'Aktif' ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100' : ''}>
                            {customer.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical size={18} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="rounded-xl">
                              <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                                <Edit2 size={14} /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center gap-2 text-red-600 cursor-pointer" onClick={() => showSuccess('Pelanggan berhasil dihapus')}>
                                <Trash2 size={14} /> Hapus
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-slate-400">
                        Tidak ada data pelanggan ditemukan.
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

export default Customers;