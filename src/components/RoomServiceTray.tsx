import React, { useState } from 'react';
import { CartItem, RestaurantSettings, OrderRecord } from '../types/index.ts';
import { DietaryIcon } from './DietaryIcon';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Send, 
  MessageCircle, 
  CheckCircle, 
  Clock, 
  Building2, 
  User, 
  Phone, 
  FileText,
  AlertTriangle
} from 'lucide-react';
import { submitOrder } from '../services/api';

interface RoomServiceTrayProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (itemIndex: number, delta: number) => void;
  onRemoveItem: (itemIndex: number) => void;
  onClearCart: () => void;
  settings: RestaurantSettings;
}

export const RoomServiceTray: React.FC<RoomServiceTrayProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  settings
}) => {
  if (!isOpen) return null;

  const [guestName, setGuestName] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderRecord | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Calculations
  const subtotal = cart.reduce((acc, curr) => {
    const itemPrice = curr.selectedVariant ? curr.selectedVariant.price : curr.item.price;
    return acc + (itemPrice * curr.quantity);
  }, 0);

  const gstPercentage = settings.gstPercentage || 18;
  const gstAmount = Math.round(subtotal * (gstPercentage / 100));
  const grandTotal = subtotal + gstAmount;

  // Format WhatsApp message
  const generateWhatsAppMessage = () => {
    let msg = `*ROOM SERVICE ORDER - LE BOULEVARD*\n`;
    msg += `*Hotel Atithi - TGI Grand, Puducherry*\n`;
    msg += `--------------------------------------\n`;
    if (roomNumber) msg += `*Room / Suite:* ${roomNumber}\n`;
    if (guestName) msg += `*Guest Name:* ${guestName}\n`;
    if (phoneNumber) msg += `*Contact:* ${phoneNumber}\n`;
    msg += `--------------------------------------\n`;
    msg += `*ORDER ITEMS:*\n`;

    cart.forEach((c, idx) => {
      const price = c.selectedVariant ? c.selectedVariant.price : c.item.price;
      const variantStr = c.selectedVariant ? ` (${c.selectedVariant.name})` : '';
      const choiceStr = c.selectedChoice ? ` [${c.selectedChoice}]` : '';
      msg += `${idx + 1}. ${c.quantity}x ${c.item.name}${variantStr}${choiceStr} - ₹${price * c.quantity}\n`;
      if (c.notes) msg += `   _Note: ${c.notes}_\n`;
    });

    msg += `--------------------------------------\n`;
    msg += `*Subtotal:* ₹${subtotal}\n`;
    msg += `*GST (${gstPercentage}%):* ₹${gstAmount}\n`;
    msg += `*Grand Total:* ₹${grandTotal}\n`;
    if (specialInstructions) msg += `*Special Instructions:* ${specialInstructions}\n`;
    msg += `--------------------------------------\n`;
    msg += `_Please confirm order preparation and deliver to room._`;

    return encodeURIComponent(msg);
  };

  // Submit order to backend
  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomNumber) {
      setErrorMessage('Please enter your Room Number or Table Number');
      return;
    }
    if (!guestName) {
      setErrorMessage('Please enter Guest Name');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const orderData = {
        guestName,
        roomNumber,
        phone: phoneNumber || 'N/A',
        orderType: 'room-service' as const,
        items: cart.map(c => ({
          name: c.item.name,
          variantName: c.selectedVariant?.name,
          choice: c.selectedChoice,
          quantity: c.quantity,
          unitPrice: c.selectedVariant ? c.selectedVariant.price : c.item.price,
          totalPrice: (c.selectedVariant ? c.selectedVariant.price : c.item.price) * c.quantity,
          notes: c.notes
        })),
        subtotal,
        gstAmount,
        grandTotal,
        specialInstructions
      };

      const result = await submitOrder(orderData);
      setConfirmedOrder(result);
      onClearCart();
    } catch (err) {
      setErrorMessage('Unable to connect to hotel kitchen. Please use WhatsApp or call reception.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in">
      <div 
        className="relative w-full max-w-md h-full bg-white flex flex-col shadow-2xl overflow-hidden border-l border-[#C5A059]/40"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tray Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#0B192C] to-[#152A4A] text-white flex items-center justify-between border-b border-[#C5A059]/30">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#C5A059] flex items-center justify-center text-[#0B192C]">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-white">
                Room Service Tray
              </h3>
              <p className="text-[11px] text-[#E6C280]">
                Le Boulevard • In-Room Dining Concierge
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Confirmation Screen */}
        {confirmedOrder ? (
          <div className="flex-1 p-6 flex flex-col items-center justify-center text-center overflow-y-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h4 className="font-serif text-2xl font-bold text-[#0B192C] mb-1">
              Order Received!
            </h4>
            <p className="text-xs text-slate-500 mb-4">
              KOT Ticket Reference: <strong className="text-[#0B192C]">{confirmedOrder.id}</strong>
            </p>
            <div className="w-full p-4 rounded-2xl bg-[#FAF8F5] border border-[#E2D7C3] text-left text-xs mb-6 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Destination:</span>
                <span className="font-bold text-[#0B192C]">Room {confirmedOrder.roomNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Guest:</span>
                <span className="font-medium">{confirmedOrder.guestName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Estimated Delivery:</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> 25 – 35 mins
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200">
                <span className="text-slate-700 font-semibold">Total to Room Folio:</span>
                <span className="font-bold text-base text-[#0B192C]">₹{confirmedOrder.grandTotal}</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 mb-6">
              Our kitchen team has been alerted. Your order will be served hot with sanitized hotel tableware.
            </p>
            <div className="flex flex-col gap-2 w-full">
              <a
                href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello Le Boulevard, checking status for Room ${confirmedOrder.roomNumber} order ${confirmedOrder.id}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Track via WhatsApp Concierge</span>
              </a>
              <button
                onClick={() => { setConfirmedOrder(null); onClose(); }}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-[#0B192C] hover:bg-[#152A4A]"
              >
                Close Tray
              </button>
            </div>
          </div>
        ) : cart.length === 0 ? (
          /* Empty State */
          <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#FAF6EE] text-[#C5A059] flex items-center justify-center mb-4">
              <ShoppingBag className="w-8 h-8 opacity-60" />
            </div>
            <h4 className="font-serif text-xl font-bold text-[#0B192C] mb-1">
              Your Tray is Empty
            </h4>
            <p className="text-xs text-slate-500 max-w-xs mb-6">
              Browse our all-day menu or specials and add your preferred dishes to order direct to your hotel suite.
            </p>
            <button
              onClick={onClose}
              className="py-2.5 px-6 rounded-xl text-xs font-bold text-white bg-[#0B192C] hover:bg-[#152A4A] transition-colors"
            >
              Explore Menu
            </button>
          </div>
        ) : (
          /* Cart Items & Order Form */
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cart.map((cartItem, idx) => {
                const itemPrice = cartItem.selectedVariant ? cartItem.selectedVariant.price : cartItem.item.price;
                return (
                  <div 
                    key={idx}
                    className="p-3 rounded-xl bg-[#FAF8F5] border border-[#EFE9DF] flex items-start justify-between gap-3"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5">
                        <DietaryIcon isVeg={cartItem.selectedVariant?.isVeg ?? cartItem.item.isVeg} size="sm" />
                        <h5 className="font-serif font-bold text-xs text-[#0B192C]">
                          {cartItem.item.name}
                        </h5>
                      </div>
                      {cartItem.selectedVariant && (
                        <span className="text-[10px] text-slate-500 font-medium block ml-5">
                          Variant: {cartItem.selectedVariant.name}
                        </span>
                      )}
                      {cartItem.selectedChoice && (
                        <span className="text-[10px] text-slate-500 font-medium block ml-5">
                          Style: {cartItem.selectedChoice}
                        </span>
                      )}
                      {cartItem.notes && (
                        <span className="text-[10px] text-amber-700 italic block ml-5">
                          Note: {cartItem.notes}
                        </span>
                      )}
                      <div className="text-xs font-bold text-[#0B192C] ml-5 mt-1">
                        ₹{itemPrice} × {cartItem.quantity} = ₹{itemPrice * cartItem.quantity}
                      </div>
                    </div>

                    {/* Stepper & Remove */}
                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => onRemoveItem(idx)}
                        className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <div className="flex items-center rounded-lg border border-slate-300 bg-white p-0.5 text-xs">
                        <button
                          onClick={() => onUpdateQuantity(idx, -1)}
                          className="w-6 h-6 flex items-center justify-center hover:bg-slate-100 text-slate-600"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center font-bold text-xs">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(idx, 1)}
                          className="w-6 h-6 flex items-center justify-center hover:bg-slate-100 text-slate-600"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Guest Details Form */}
              <form onSubmit={handleSubmitOrder} className="pt-3 border-t border-slate-200 space-y-3">
                <span className="text-xs uppercase font-bold tracking-wider text-[#0B192C] block">
                  Delivery Destination
                </span>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                      Room / Suite # *
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. 204"
                        value={roomNumber}
                        onChange={(e) => setRoomNumber(e.target.value)}
                        className="w-full pl-8 pr-2.5 py-1.5 rounded-lg text-xs border border-slate-300 focus:border-[#C5A059] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                      Guest Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Mr. Sharma"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="w-full pl-8 pr-2.5 py-1.5 rounded-lg text-xs border border-slate-300 focus:border-[#C5A059] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    Mobile Number (Optional)
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="tel"
                      placeholder="e.g. +91 98765 43210"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full pl-8 pr-2.5 py-1.5 rounded-lg text-xs border border-slate-300 focus:border-[#C5A059] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    Dietary Notes / Special Instructions
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g., Deliver in 30 minutes, extra cutlery, less spicy"
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg text-xs border border-slate-300 focus:border-[#C5A059] focus:outline-none"
                  ></textarea>
                </div>

                {errorMessage && (
                  <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}
              </form>
            </div>

            {/* Bill Summary Footer */}
            <div className="p-4 bg-[#FAF8F5] border-t border-[#E2D7C3] flex flex-col gap-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Menu Subtotal:</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>GST ({gstPercentage}%):</span>
                  <span>₹{gstAmount}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#0B192C] pt-1.5 border-t border-slate-200">
                  <span>Grand Total (Billed to Room):</span>
                  <span className="font-serif text-lg text-[#0B192C]">₹{grandTotal}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                {/* 1-Click WhatsApp Concierge Order */}
                <a
                  href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=${generateWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Send via WhatsApp</span>
                </a>

                {/* Submit to Kitchen System */}
                <button
                  onClick={handleSubmitOrder}
                  disabled={isSubmitting}
                  className="py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#0B192C] to-[#152A4A] hover:from-[#152A4A] hover:to-[#0B192C] border border-[#C5A059] flex items-center justify-center gap-1.5 shadow-md cursor-pointer transition-all"
                >
                  <Send className="w-3.5 h-3.5 text-[#E6C280]" />
                  <span>{isSubmitting ? 'Sending...' : 'Place Order'}</span>
                </button>
              </div>

              <p className="text-[10px] text-center text-slate-400">
                All prices are subject to 18% GST • Charged directly to room bill
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
