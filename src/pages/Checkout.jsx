import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, User, Phone, MapPin, CreditCard, ShoppingBag, AlertCircle, CheckCircle2
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { formatPrice } from '../utils/formatPrice';
import { validateName, validatePhone, validateAddress } from '../utils/validators';

/**
 * Buyurtmani rasmiylashtirish (Checkout) sahifasi
 * Forma: ism, telefon (+998), manzil — validatsiya bilan
 */
const Checkout = () => {
  const navigate = useNavigate();
  const { cart, totalPrice, totalItems, clearCart } = useCart();
  const { showToast } = useToast();

  // Forma holatlari
  const [formData, setFormData] = useState({
    name: '',
    phone: '+998 ',
    address: '',
    comment: '',
  });

  // Xato xabarlari
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Input o'zgarganda
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Telefon raqami uchun +998 prefixni saqlash
    if (name === 'phone') {
      if (!value.startsWith('+998')) {
        return;
      }
    }

    setFormData((prev) => ({ ...prev, [name]: value }));

    // Xatoni tozalash (terilayotganda)
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Formani tekshirish
  const validateForm = () => {
    const newErrors = {};
    const nameError = validateName(formData.name);
    const phoneError = validatePhone(formData.phone);
    const addressError = validateAddress(formData.address);

    if (nameError) newErrors.name = nameError;
    if (phoneError) newErrors.phone = phoneError;
    if (addressError) newErrors.address = addressError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Buyurtma berish
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showToast("Iltimos, barcha maydonlarni to'g'ri to'ldiring", 'error');
      return;
    }

    setIsSubmitting(true);

    // Buyurtmani "yuborish" simulyatsiyasi (real backendda API chaqiriladi)
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // Savatni tozalash va "Rahmat" sahifasiga yo'naltirish
    clearCart();
    setIsSubmitting(false);
    navigate('/order-success');
  };

  // Savat bo'sh bo'lsa
  if (cart.length === 0) {
    return (
      <div className="py-16 text-center max-w-lg mx-auto space-y-5">
        <div className="w-16 h-16 mx-auto rounded-full bg-amber-50 dark:bg-amber-950/60 flex items-center justify-center text-amber-500">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Savatingiz bo'sh
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Buyurtma berish uchun avval savatga mahsulot qo'shing.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors shadow-md"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Mahsulotlarni ko'rish</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8 space-y-6">
      {/* Navigatsiya */}
      <Link
        to="/cart"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Savatga qaytish</span>
      </Link>

      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
        Buyurtmani rasmiylashtirish
      </h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Forma */}
        <div className="flex-grow">
          <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200/80 dark:border-slate-700 shadow-sm p-6 sm:p-8 space-y-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <User className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              Yetkazib berish ma'lumotlari
            </h2>

            {/* Ism */}
            <div className="space-y-1.5">
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                To'liq ismingiz *
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Masalan: Alisher Zokirov"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 text-sm rounded-xl border ${
                    errors.name
                      ? 'border-rose-400 dark:border-rose-500 focus:ring-rose-500'
                      : 'border-gray-200 dark:border-slate-700 focus:ring-indigo-500'
                  } bg-gray-50 dark:bg-slate-900/50 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all`}
                />
              </div>
              {errors.name && (
                <p className="flex items-center gap-1.5 text-xs text-rose-500 font-medium">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  {errors.name}
                </p>
              )}
            </div>

            {/* Telefon */}
            <div className="space-y-1.5">
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                Telefon raqamingiz *
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+998 90 123 45 67"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 text-sm rounded-xl border ${
                    errors.phone
                      ? 'border-rose-400 dark:border-rose-500 focus:ring-rose-500'
                      : 'border-gray-200 dark:border-slate-700 focus:ring-indigo-500'
                  } bg-gray-50 dark:bg-slate-900/50 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all`}
                />
              </div>
              {errors.phone && (
                <p className="flex items-center gap-1.5 text-xs text-rose-500 font-medium">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Manzil */}
            <div className="space-y-1.5">
              <label htmlFor="address" className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                Yetkazib berish manzili *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
                <textarea
                  id="address"
                  name="address"
                  rows={3}
                  placeholder="Masalan: Toshkent shahar, Chilonzor tumani, 7-kvartal, 15-uy"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 text-sm rounded-xl border resize-none ${
                    errors.address
                      ? 'border-rose-400 dark:border-rose-500 focus:ring-rose-500'
                      : 'border-gray-200 dark:border-slate-700 focus:ring-indigo-500'
                  } bg-gray-50 dark:bg-slate-900/50 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all`}
                />
              </div>
              {errors.address && (
                <p className="flex items-center gap-1.5 text-xs text-rose-500 font-medium">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  {errors.address}
                </p>
              )}
            </div>

            {/* Izoh (ixtiyoriy) */}
            <div className="space-y-1.5">
              <label htmlFor="comment" className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                Qo'shimcha izoh
                <span className="text-gray-400 dark:text-gray-500 font-normal ml-1">(ixtiyoriy)</span>
              </label>
              <textarea
                id="comment"
                name="comment"
                rows={2}
                placeholder="Buyurtma haqida qo'shimcha ma'lumot..."
                value={formData.comment}
                onChange={handleChange}
                className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/50 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none transition-all"
              />
            </div>

            {/* Yuborish tugmasi */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed text-white font-bold shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all duration-200 text-base"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  <span>Buyurtma yuborilmoqda...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Buyurtmani tasdiqlash</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* O'ng panel — Buyurtma tarkibi */}
        <div className="lg:w-96 flex-shrink-0">
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200/80 dark:border-slate-700 shadow-sm p-6 space-y-5 sticky top-24">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              Buyurtma tarkibi
            </h3>

            <div className="space-y-3 max-h-64 overflow-y-auto">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-3 text-sm">
                  <div className="w-12 h-12 flex-shrink-0 rounded-lg bg-gray-50 dark:bg-slate-900/50 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain p-1"
                    />
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="text-gray-700 dark:text-gray-200 font-medium line-clamp-1">{item.title}</p>
                    <p className="text-xs text-gray-400">{item.quantity} dona</p>
                  </div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white whitespace-nowrap">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <div className="h-px bg-gray-200 dark:bg-slate-700" />

            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Mahsulotlar ({totalItems})</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Yetkazish</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">Bepul</span>
              </div>
              <div className="h-px bg-gray-200 dark:bg-slate-700" />
              <div className="flex justify-between">
                <span className="font-bold text-gray-900 dark:text-white">Jami to'lov</span>
                <span className="text-lg font-black text-indigo-600 dark:text-indigo-400">
                  {formatPrice(totalPrice)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
