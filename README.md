# Bozorcha — Zamonaviy Online Do'kon Frontend Loyihasi 🛍️

GitHub portfolio uchun mo'ljallangan, zamonaviy va to'liq funksional **E-Commerce (Online do'kon)** veb-ilovasi. Ushbu loyiha React va Tailwind CSS yordamida yaratilgan bo'lib, mobil va kompyuter qurilmalariga to'liq moslashuvchan (mobile-first), o'zbek tilidagi qulay interfeysga ega.

---

## 🌟 Asosiy imkoniyatlar va funksiyalar

1. **Bosh sahifa (Home):**
   - Zamonaviy Hero banner va chaqiruv tugmalari (Call-to-Action);
   - Xizmat afzalliklari (24/7 yordam, bepul yetkazish, 100% kafolat);
   - Interaktiv toifalar ro'yxati (Elektronika, Zargarlik, Erkaklar va Ayollar kiyimlari);
   - Eng yuqori reytingga ega bo'lgan **Top 8 ta mahsulot**.

2. **Mahsulotlar katalogi (Products):**
   - Tezkor qidiruv (mahsulot nomi, toifasi yoki tavsifi bo'yicha);
   - Toifalar bo'yicha saralash;
   - Narx oralig'i filtri (Min va Max narxlar);
   - Saralash: Narx bo'yicha (arzon-qimmat, qimmat-arzon), reyting va nom bo'yicha (A–Z);
   - Yuklanish paytida chiroyli **Skeleton loader**;
   - Internet uzilganda yoki xato yuz berganda xatolik xabari va qayta urinish tugmasi.

3. **Mahsulot batafsil sahifasi (`/product/:id`):**
   - Katta va sifatli mahsulot surati;
   - Yulduzchali reyting va sharhlar soni;
   - To'liq tavsif va kafolat ma'lumotlari;
   - Miqdor tanlash (+ / -) va narxni dinamik hisoblash;
   - "Savatga qo'shish", "Hozir sotib olish" va "Sevimlilarga saqlash" tugmalari.

4. **Xarid savati (Cart):**
   - Har bir tovar miqdorini oshirish, kamaytirish yoki butunlay o'chirish;
   - Jami tovarlar soni va umumiy summa hisob-kitobi;
   - Bo'sh savat holati (Empty state) va katalogga o'tish;
   - Barcha ma'lumotlar brauzerning `localStorage` xotirasida doimiy saqlanadi.

5. **Buyurtmani rasmiylashtirish (Checkout):**
   - Buyurtmachi ismi, telefon raqami (`+998` formati bilan) va yetkazib berish manzili;
   - Qat'iy maydonlar validatsiyasi va xatolik matnlari;
   - O'ng panelda buyurtma tarkibi va jami summa xulosasi;
   - Muvaffaqiyatli buyurtmadan so'ng **Rahmat** sahifasi, bayramona confetti effekti va savatni avtomatik tozalash.

6. **Sevimlilar ro'yxati (Favorites):**
   - Mahsulotlarni bir tugma bilan sevimlilarga qo'shish yoki olib tashlash;
   - Barcha sevimlilarni bittada savatga o'tkazish;
   - `localStorage` bilan sinxronlashgan xotira.

7. **Qo'shimcha qulayliklar:**
   - 🌙 **Dark / Light mode** (Qorong'i va yorug' rejim, foydalanuvchi tanlovi `localStorage`da saqlanadi);
   - 🇺🇿 **O'zbek so'mida narxlar**: API'dagi narxlar 12 500 ga ko'paytirilib, `"1 250 000 so'm"` formatida ko'rsatiladi;
   - 🔔 **Toast xabarnomalar**: "Savatga qo'shildi", "Sevimlilardan o'chirildi" kabi interaktiv pop-up xabarlar;
   - 🛡️ **Zaxira API (Fallback)**: [FakeStoreAPI](https://fakestoreapi.com) ishlamasa, avtomatik [DummyJSON](https://dummyjson.com)ga o'tadi;
   - 📱 **100% Responsive**: Mobil, planshet va katta ekranlarga moslashuvchan.

---

## 🛠️ Texnologiyalar steki

- **React 18** — Komponentlar va reaktiv interfeys
- **Vite** — Yuqori tezlikdagi loyiha yig'uvchisi
- **Tailwind CSS** — Zamonaviy utility-first CSS kutubxonasi
- **React Router v6** — Sahifalararo SPA marshrutlash
- **React Context + useReducer** — Savat, Sevimlilar va Rejimlar holati boshqaruvi
- **Lucide React** — Chiroyli va yengil SVG ikonalar
- **Canvas Confetti** — Buyurtma muvaffaqiyati uchun vizual effekt
- **LocalStorage API** — Foydalanuvchi ma'lumotlarini brauzerda saqlash

---

## 📁 Kod tuzilmasi

```text
online-dokon/
├── public/
│   └── favicon.svg              # Loyiha ikonasi
├── src/
│   ├── components/
│   │   ├── cart/                # CartItem.jsx, CartSummary.jsx
│   │   ├── common/              # Header.jsx, Footer.jsx, Toast.jsx, Loader.jsx, Skeleton.jsx
│   │   └── product/             # ProductCard.jsx, ProductGrid.jsx, ProductFilter.jsx, ProductSort.jsx
│   ├── context/
│   │   ├── CartContext.jsx       # Savat reduceri va global holati
│   │   ├── FavoritesContext.jsx  # Sevimlilar reduceri va global holati
│   │   ├── ThemeContext.jsx      # Tungi/kunduzgi rejim boshqaruvi
│   │   └── ToastContext.jsx      # Bildirishnomalar holati
│   ├── hooks/
│   │   ├── useFetch.jsx          # Dual API (FakeStore + DummyJSON fallback)
│   │   └── useLocalStorage.jsx   # LocalStorage bilan bog'lovchi hook
│   ├── pages/
│   │   ├── Home.jsx              # Bosh sahifa
│   │   ├── Products.jsx          # Katalog (filtr, qidiruv, saralash)
│   │   ├── ProductDetail.jsx     # Mahsulot haqida batafsil
│   │   ├── Cart.jsx              # Savat
│   │   ├── Checkout.jsx          # Buyurtma formasi
│   │   ├── OrderSuccess.jsx      # Buyurtma qabul qilinganligi sahifasi
│   │   ├── Favorites.jsx         # Sevimlilar sahifasi
│   │   └── NotFound.jsx          # 404 xatolik sahifasi
│   ├── utils/
│   │   ├── formatPrice.js        # So'm formatlovchi (USD * 12 500)
│   │   └── validators.js         # Ism, telefon (+998), manzil tekshiruvlari
│   ├── App.jsx                   # Asosiy router va provayderlar
│   ├── index.css                 # Tailwind direktivalari
│   └── main.jsx                  # Kirish nuqtasi
├── vercel.json                   # Vercel SPA rewrites konfiguratsiyasi
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## 🚀 Ishga tushirish (Local Setup)

Loyihani o'z kompyuteringizda ishga tushirish uchun quyidagi qadamlarni bajaring:

1. **Repozitoriyani klonlash:**
   ```bash
   git clone https://github.com/foydalanuvchi-nomi/online-dokon.git
   cd online-dokon
   ```

2. **Paketlarni o'rnatish:**
   ```bash
   npm install
   ```

3. **Lokal serverni ishga tushirish:**
   ```bash
   npm run dev
   ```

   Brauzeringizda [http://localhost:3000](http://localhost:3000) manzilini oching.

4. **Production uchun yig'ish (Build):**
   ```bash
   npm run build
   ```

---

## 🌐 Vercel'ga Deploy qilish qadamlari

Loyihani 2 daqiqa ichida internetga (Vercel) chiqarish:

1. Loyihani GitHub hisobingizga yuklang (`git push origin main`);
2. [Vercel.com](https://vercel.com) saytiga kiring va GitHub profilingiz orqali tizimga kiring;
3. **"Add New Project"** tugmasini bosing va ushbu repozitoriyani tanlang;
4. Sozlamalar:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. **"Deploy"** tugmasini bosing! Loyiha bir necha soniyada jonli efirga chiqadi. Loyihadagi `vercel.json` fayli sahifalar yangilanganda (refresh) 404 xatosi chiqmasligini to'liq ta'minlaydi.

---

## 👨‍💻 Muallif

- Dasturchi: [Portfolio loyihasi]
- Litsenziya: MIT
