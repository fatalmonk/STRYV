'use client';

import { Banknote, Building, CreditCard, Smartphone, X } from 'lucide-react';
import React, { useState } from 'react';
import { useCart } from '../../../context/CartContext';
import { beginCheckout } from '@/lib/commerce/checkout';

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
    const { cartTotal, clearCart, items } = useCart();
    const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
    const [paymentMethod, setPaymentMethod] = useState<string>('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: 'Dhaka',
        postcode: '1000',
        country: 'Bangladesh',
    });

    if (!isOpen) return null;

    const handlePayment = async () => {
        if (paymentMethod === 'card') {
            // Handle SSLCommerz checkout
            setIsProcessing(true);
            setError(null);
            try {
                await beginCheckout(items, customerInfo);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to initiate checkout');
                setIsProcessing(false);
            }
        } else {
            // Simulate processing for other payment methods
            setTimeout(() => {
                setStep('success');
                clearCart();
            }, 1500);
        }
    };

    const handleSSLCommerzCheckout = async () => {
        setIsProcessing(true);
        setError(null);
        try {
            await beginCheckout(items, customerInfo);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to initiate checkout');
            setIsProcessing(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
                <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
                    <h2 className="text-xl font-black uppercase tracking-tight">Checkout</h2>
                    <button onClick={onClose} className="p-2 hover:bg-zinc-100 rounded-full transition" aria-label="Close checkout">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    {step === 'details' && (
                        <div className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <h3 className="font-bold text-black uppercase text-xs tracking-widest">Shipping Details</h3>
                                    <input 
                                        type="text" 
                                        placeholder="Full Name" 
                                        value={customerInfo.name}
                                        onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                                        className="w-full bg-zinc-50 border border-zinc-200 p-3 rounded-sm focus:border-black outline-none transition" 
                                    />
                                    <input 
                                        type="email" 
                                        placeholder="Email Address" 
                                        value={customerInfo.email}
                                        onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                                        className="w-full bg-zinc-50 border border-zinc-200 p-3 rounded-sm focus:border-black outline-none transition" 
                                    />
                                    <input 
                                        type="tel" 
                                        placeholder="Phone Number" 
                                        value={customerInfo.phone}
                                        onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                                        className="w-full bg-zinc-50 border border-zinc-200 p-3 rounded-sm focus:border-black outline-none transition" 
                                    />
                                    <textarea 
                                        placeholder="Address" 
                                        rows={3} 
                                        value={customerInfo.address}
                                        onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                                        className="w-full bg-zinc-50 border border-zinc-200 p-3 rounded-sm focus:border-black outline-none transition"
                                    ></textarea>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="font-bold text-black uppercase text-xs tracking-widest">Order Summary</h3>
                                    <div className="bg-zinc-50 p-6 rounded-sm space-y-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-zinc-500">Subtotal</span>
                                            <span className="font-medium">৳{cartTotal.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-zinc-500">Shipping</span>
                                            <span className="font-medium">৳120</span>
                                        </div>
                                        <div className="pt-3 border-t border-zinc-200 flex justify-between font-bold text-lg">
                                            <span>Total</span>
                                            <span>৳{(cartTotal + 120).toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setStep('payment')}
                                className="w-full bg-black text-white font-bold uppercase py-4 hover:bg-zinc-800 transition tracking-widest"
                            >
                                Continue to Payment
                            </button>
                        </div>
                    )}

                    {step === 'payment' && (
                        <div className="space-y-6">
                            <h3 className="font-bold text-black uppercase text-xs tracking-widest">Select Payment Method</h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    { id: 'cod', name: 'Cash on Delivery', icon: Banknote },
                                    { id: 'bkash', name: 'Bkash', icon: Smartphone },
                                    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
                                    { id: 'bank', name: 'Bank Transfer', icon: Building },
                                ].map((method) => (
                                    <button
                                        key={method.id}
                                        onClick={() => setPaymentMethod(method.id)}
                                        className={`p-4 rounded-sm border flex items-center gap-4 transition ${paymentMethod === method.id
                                            ? 'bg-black text-white border-black'
                                            : 'bg-white border-zinc-200 hover:border-black text-zinc-600'
                                            }`}
                                    >
                                        <method.icon className="w-6 h-6" />
                                        <span className="font-bold text-sm">{method.name}</span>
                                    </button>
                                ))}
                            </div>

                            {paymentMethod === 'card' && (
                                <>
                                    <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-sm text-sm text-zinc-500 flex gap-2 justify-center">
                                        <span>VISA</span> • <span>Mastercard</span> • <span>AMEX</span>
                                    </div>
                                    <button
                                        onClick={handleSSLCommerzCheckout}
                                        disabled={isProcessing || items.length === 0}
                                        className="w-full bg-black text-white font-bold uppercase py-4 hover:bg-zinc-800 transition disabled:opacity-50 disabled:cursor-not-allowed tracking-widest"
                                    >
                                        {isProcessing ? 'Processing...' : 'Proceed to Secure Checkout'}
                                    </button>
                                    {error && (
                                        <div className="p-3 bg-red-50 border border-red-200 rounded-sm text-sm text-red-600">
                                            {error}
                                        </div>
                                    )}
                                </>
                            )}

                            {paymentMethod !== 'card' && (
                                <button
                                    onClick={handlePayment}
                                    disabled={!paymentMethod || isProcessing}
                                    className="w-full bg-black text-white font-bold uppercase py-4 hover:bg-zinc-800 transition disabled:opacity-50 disabled:cursor-not-allowed tracking-widest"
                                >
                                    Complete Order (৳{(cartTotal + 120).toLocaleString()})
                                </button>
                            )}
                        </div>
                    )}

                    {step === 'success' && (
                        <div className="text-center space-y-6 py-12">
                            <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center mx-auto">
                                <div className="w-10 h-10 bg-white rounded-full animate-ping opacity-20" />
                            </div>
                            <h2 className="text-3xl font-black uppercase tracking-tight">Order Confirmed!</h2>
                            <p className="text-zinc-500 max-w-md mx-auto">
                                Thank you for shopping with STRYV. Your order has been received and is being processed. You will receive an email confirmation shortly.
                            </p>
                            <button
                                onClick={onClose}
                                className="bg-zinc-100 text-black font-bold uppercase px-8 py-3 hover:bg-zinc-200 transition tracking-wide"
                            >
                                Back to Shop
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CheckoutModal;
