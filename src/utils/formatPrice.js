/**
 * Valyuta kursi: 1 USD = 12 500 UZS
 */
export const USD_TO_UZS_RATE = 12500;

/**
 * Dollardagi narxni so'mga o'girib, chiroyli formatlaydi.
 * Masalan: 100 -> "1 250 000 so'm"
 *
 * @param {number} usdPrice - Dollardagi narx
 * @returns {string} Formatlangan so'm qiymati
 */
export const formatPrice = (usdPrice) => {
  if (usdPrice === null || usdPrice === undefined || isNaN(usdPrice)) {
    return "0 so'm";
  }

  const uzs = Math.round(Number(usdPrice) * USD_TO_UZS_RATE);

  // Raqamlarni probel bilan ajratish (masalan: 1 250 000)
  const formatted = uzs.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  return `${formatted} so'm`;
};

/**
 * Faqat so'm sonini hisoblash (arifmetika uchun)
 * @param {number} usdPrice
 * @returns {number}
 */
export const toUzsNumber = (usdPrice) => {
  if (!usdPrice || isNaN(usdPrice)) return 0;
  return Math.round(Number(usdPrice) * USD_TO_UZS_RATE);
};
