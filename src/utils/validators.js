/**
 * Buyurtma berish formasi uchun validatsiya funksiyalari
 */

export const validateName = (name) => {
  if (!name || !name.trim()) {
    return "Ismingizni kiritishingiz shart";
  }
  if (name.trim().length < 2) {
    return "Ism kamida 2 ta belgidan iborat bo'lishi kerak";
  }
  return "";
};

export const validatePhone = (phone) => {
  if (!phone || !phone.trim()) {
    return "Telefon raqamingizni kiritishingiz shart";
  }
  // Tozalangan raqamlar
  const cleanPhone = phone.replace(/[\s\-()]/g, '');
  // +998XXXXXXXXX formati
  const regex = /^\+998[0-9]{9}$/;
  if (!regex.test(cleanPhone)) {
    return "Telefon raqami +998 90 123 45 67 formatida bo'lishi kerak";
  }
  return "";
};

export const validateAddress = (address) => {
  if (!address || !address.trim()) {
    return "Yetkazib berish manzilini kiritishingiz shart";
  }
  if (address.trim().length < 5) {
    return "Manzil to'liq kiritilishi kerak (kamida 5 ta belgi)";
  }
  return "";
};
