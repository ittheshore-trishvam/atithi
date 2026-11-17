import React, { useState } from 'react';
import { OrderRecord } from '../../types/index.ts';
import { 
  ShoppingBag, 
  Clock, 
  Printer, 
  CheckCircle, 
  AlertCircle, 
  RefreshCw,
  Search,
  Building2,
  User,
  Phone
} from 'lucide-react';
import { updateOrderStatus } from '../../services/api';

interface OrdersManagerProps {
  orders: OrderRecord[];
  onRefresh: () => void;
}

export const OrdersManager: React.FC<OrdersManagerProps> = ({ orders, onRefresh }) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filtered = orders.filter(o => {
    const matchesStatus = filterStatus === 'all' || o.status === filterStatus;
    const matchesSearch = o.roomNumber.toLowerCase().includes(search.toLowerCase()) ||
                          o.guestName.toLowerCase().includes(search.toLowerCase()) ||
                          o.id.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = async (orderId: string, status: OrderRecord['status']) => {
    await updateOrderStatus(orderId, status);
    onRefresh();
  };

  const printKot = (order: OrderRecord) => {
    const printWindow = window.open('', '', 'width=400,height=600');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>KOT - ${order.id}</title>
          <style>
            body { font-family: monospace; padding: 20px; font-size: 13px; line-height: 1.4; }
            h2, h3 { text-align: center; margin: 4px 0; }
            hr { border: none; border-top: 1px dashed black; margin: 10px 0; }
            .flex { display: flex; justify-content: space-between; }
            .item-row { margin: 6px 0; }
            .bold { font-weight: bold; }
          </style>
        </head>
        <body>
          <h2>LE BOULEVARD</h2>
          <h3>HOTEL ATITHI - TGI GRAND</h3>
          <p style="text-align: center;">KITCHEN ORDER TICKET (KOT)</p>
          <hr />
          <div class="flex"><span>TICKET: ${order.id}</span><span>DATE: ${new Date(order.createdAt).toLocaleTimeString()}</span></div>
          <div class="flex"><span>DESTINATION: ROOM ${order.roomNumber}</span><span>TYPE: ${order.orderType.toUpperCase()}</span></div>
          <div class="flex"><span>GUEST: ${order.guestName}</span><span>TEL: ${order.phone}</span></div>
          <hr />
          <div class="bold flex"><span>ITEM</span><span>QTY</span></div>
          <hr />
          ${order.items.map(it => `
            <div class="item-row flex">
              <span>${it.name} ${it.variantName ? `(${it.variantName})` : ''} ${it.choice ? `[${it.choice}]` : ''}</span>
              <span class="bold">x${it.quantity}</span>
            </div>
            ${it.notes ? `<div style="font-size: 11px; font-style: italic;">Note: ${it.notes}</div>` : ''}
          `).join('')}
          <hr />
          ${order.specialInstructions ? `<p><strong>INSTRUCTIONS:</strong> ${order.specialInstructions}</p><hr />` : ''}
          <div class="flex"><span>SUBTOTAL:</span><span>INR ${order.subtotal}</span></div>
          <div class="flex"><span>GST (18%):</span><span>INR ${order.gstAmount}</span></div>
          <div class="flex bold" style="font-size: 15px;"><span>GRAND TOTAL:</span><span>INR ${order.grandTotal}</span></div>
          <hr />
          <p style="text-align:center;">BILLED DIRECTLY TO GUEST ROOM FOLIO</p>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Filter by Room # or Guest..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl text-xs border border-slate-300 focus:outline-none focus:border-[#C5A059]"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 rounded-xl text-xs border border-slate-300 bg-white focus:outline-none focus:border-[#C5A059]"
          >
            <option value="all">All Orders ({orders.length})</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="preparing">Preparing in Kitchen</option>
            <option value="delivered">Delivered to Room</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <button
          onClick={onRefresh}
          className="p-2 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-100 transition-colors flex items-center gap-1.5 text-xs font-semibold"
          title="Refresh orders list"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Orders List */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white border border-slate-200">
          <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h4 className="font-serif text-lg font-bold text-slate-700">No Orders Found</h4>
          <p className="text-xs text-slate-400">Incoming room service tickets will populate here in real-time.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((order) => (
            <div
              key={order.id}
              className="p-5 rounded-3xl bg-white border border-[#E2D7C3] shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-xl bg-[#0B192C] text-[#E6C280] font-bold text-xs flex items-center justify-center">
                      {order.roomNumber.slice(0, 3)}
                    </span>
                    <div>
                      <h4 className="font-bold text-sm text-[#0B192C]">
                        Room {order.roomNumber}
                      </h4>
                      <p className="text-[10px] text-slate-400">
                        {order.id} • {new Date(order.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>

                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value as any)}
                    className={`px-2.5 py-1 rounded-full text-xs font-bold border focus:outline-none ${
                      order.status === 'pending'
                        ? 'bg-amber-50 text-amber-800 border-amber-300'
                        : order.status === 'preparing'
                        ? 'bg-blue-50 text-blue-800 border-blue-300'
                        : order.status === 'delivered'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        : 'bg-slate-100 text-slate-700 border-slate-300'
                    }`}
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="preparing">Preparing</option>
                    <option value="delivered">Delivered</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-600 mb-3">
                  <span className="flex items-center gap-1 font-medium">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    {order.guestName}
                  </span>
                  {order.phone && order.phone !== 'N/A' && (
                    <span className="flex items-center gap-1 text-slate-500">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      {order.phone}
                    </span>
                  )}
                </div>

                {/* Items */}
                <div className="space-y-1.5 p-3 rounded-xl bg-[#FAF8F5] border border-[#EFE9DF] text-xs mb-3">
                  {order.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between items-center text-slate-800">
                      <span>
                        <strong>{it.quantity}x</strong> {it.name}
                        {it.variantName && ` (${it.variantName})`}
                        {it.choice && ` [${it.choice}]`}
                      </span>
                      <span className="font-semibold">₹{it.totalPrice}</span>
                    </div>
                  ))}
                  {order.specialInstructions && (
                    <p className="pt-2 border-t border-slate-200 text-[11px] text-amber-800 italic">
                      Special Note: {order.specialInstructions}
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">Total Folio Charge:</span>
                  <span className="font-bold text-base text-[#0B192C]">₹{order.grandTotal}</span>
                  <span className="text-[9px] text-slate-400 ml-1">(inc. 18% GST)</span>
                </div>

                <button
                  onClick={() => printKot(order)}
                  className="py-1.5 px-3 rounded-xl text-xs font-bold text-[#0B192C] bg-slate-100 hover:bg-slate-200 border border-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Print KOT</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
