import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, Plus, Minus, ShieldCheck, ArrowRight, HeartHandshake } from 'lucide-react';
import type { DriveItem } from '../types';

export interface CartItemEntry {
  item: DriveItem;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItemEntry[];
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onRemoveItem: (itemId: string) => void;
  onProceedToCheckout: (items: CartItemEntry[], total: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  const totalAmount = cartItems.reduce((acc, entry) => acc + entry.item.price * entry.quantity, 0);
  const totalUnits = cartItems.reduce((acc, entry) => acc + entry.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-neutral-950/60 backdrop-blur-sm"
          />

          {/* Slide-in Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-neutral-200 z-10"
          >
            {/* Header */}
            <div className="px-5 py-4 bg-[#f8f6f2] border-b border-neutral-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#084c36] text-white flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900 text-sm sm:text-base">
                    Sponsorship Tray ({totalUnits} Units)
                  </h3>
                  <span className="text-[11px] text-emerald-800 font-mono">
                    80G Tax Deductible Cart
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-neutral-400 hover:text-neutral-700 p-1 rounded-full hover:bg-neutral-200/60 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3.5">
              {cartItems.length === 0 ? (
                <div className="text-center py-16 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-3 text-neutral-400">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h4 className="font-bold text-neutral-900 text-sm">Your tray is empty</h4>
                  <p className="text-xs text-neutral-500 mt-1 max-w-xs">
                    Add fresh coconuts, hospital meals, or girl child school bags to your sponsorship tray.
                  </p>
                </div>
              ) : (
                cartItems.map(({ item, quantity }) => (
                  <div
                    key={item.id}
                    className="bg-[#faf9f6] rounded-2xl p-4 border border-neutral-200 flex items-center justify-between gap-3 shadow-xs"
                  >
                    <div className="flex-1">
                      <span className="text-[10px] uppercase font-bold text-[#084c36] tracking-wider block">
                        {item.tagline}
                      </span>
                      <h4 className="font-bold text-neutral-900 text-xs sm:text-sm">
                        {item.name}
                      </h4>
                      <div className="text-xs font-semibold text-neutral-600 mt-0.5">
                        ₹{item.price} × {quantity} = <strong className="text-neutral-950">₹{item.price * quantity}</strong>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 bg-white border border-neutral-300 rounded-lg p-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="w-6 h-6 rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center text-xs font-bold"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-neutral-900">
                          {quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="w-6 h-6 rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center text-xs font-bold"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-neutral-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout Button */}
            {cartItems.length > 0 && (
              <div className="p-5 bg-[#f8f6f2] border-t border-neutral-200 space-y-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-medium text-neutral-600">Total Sponsorship Value:</span>
                  <div className="text-2xl font-extrabold text-[#084c36] font-sans">
                    ₹{totalAmount.toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-neutral-600 bg-white p-2 rounded-xl border border-neutral-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                  <span>50% Tax Exemption (80G) • Direct Jaipur Hospital Delivery</span>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    onProceedToCheckout(cartItems, totalAmount);
                  }}
                  className="w-full bg-[#084c36] hover:bg-[#063b2a] text-white py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <HeartHandshake className="w-4 h-4 text-[#FDB813]" />
                  <span>Proceed to Razorpay / UPI (₹{totalAmount.toLocaleString('en-IN')})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
