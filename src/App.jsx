// src/App.jsx
import { useState } from "react";
import "./index.css";

const initialProducts = [
  {
    id: 1,
    category: "Jaket",
    title: "Jaket Denim",
    price: "Rp250.000",
    img: "https://en.natalys.com/phototheque/natalys.com/8500/large/01W008436A.jpg",
    wa: "https://wa.me/6281234567890",
    shopee: "https://shopee.co.id",
  },
  {
    id: 2,
    category: "Rok",
    title: "Rok H&M",
    price: "Rp250.000",
    img: "https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/zoom/d61c5e139d71455e2bdf6af3bf26bded2fd058de_xxl-1.jpg",
    wa: "https://wa.me/6281234567890",
    shopee: "https://shopee.co.id",
  },
];

function Header({ cartCount, openUser }) {
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <a href="#" className="text-xl font-bold text-emerald-600">
          RachaEndless
        </a>
        <div className="flex items-center gap-4 text-gray-600 relative">
          <a href="#" className="hover:text-emerald-600 relative">
            <i className="fa-regular fa-heart text-xl"></i>
            <span className="absolute -top-2 -right-3 bg-emerald-600 text-white text-xs px-1.5 py-0.5 rounded-full">
              {cartCount}
            </span>
          </a>

          <button
            onClick={openUser}
            className="hover:text-emerald-600 relative"
            aria-label="open user"
          >
            <i className="fa-regular fa-user text-xl"></i>
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-3 sm:px-4 mt-6">
      <div className="relative overflow-hidden rounded-2xl h-40 sm:h-52 md:h-64 flex items-center justify-center text-center shadow-lg">
        <img
          src="https://img.freepik.com/premium-photo/rack-thrift-store-clothing-background_641503-105273.jpg"
          alt="Fashion Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-white px-2">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight">
            🛍️ RachaEndless — for the endlessly fashionable you
          </h2>
        </div>
      </div>
    </section>
  );
}

function CategoryBar({ active, onChange }) {
  const categories = ["all", "Sepatu", "Aksesoris", "Jaket", "Rok"];
  return (
    <section className="mx-auto max-w-7xl px-3 sm:px-4 mt-4">
      <div className="flex gap-2 overflow-x-auto pb-2 text-sm">
        {categories.map((cat) => {
          const cls =
            cat === active
              ? "px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 font-medium"
              : "px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200";
          return (
            <button
              key={cat}
              data-category={cat}
              className={cls}
              onClick={() => onChange(cat)}
            >
              {cat === "all" ? "Semua" : cat}
            </button>
          );
        })}
      </div>
    </section>
  );
}

function ProductCard({ p, onAdd }) {
  return (
    <div data-category={p.category} className="product card-shadow">
      <img
        src={p.img}
        alt={p.title}
        className="w-full aspect-square object-cover"
        loading="lazy"
      />
      <div className="p-3">
        <h3 className="text-sm font-semibold line-clamp-1">{p.title}</h3>
        <div className="flex items-center justify-between mt-1">
          <p className="text-sm text-gray-600">{p.price}</p>
          <button
            onClick={() => onAdd(p)}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-emerald-500 text-white hover:bg-emerald-600 transition text-xs"
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
        <div className="flex gap-2 mt-3">
          <a
            href={p.wa}
            target="_blank"
            rel="noreferrer"
            className="flex-1 text-center px-2 py-1 bg-emerald-500 text-white rounded text-xs truncate hover:bg-emerald-600 transition"
          >
            <i className="fab fa-whatsapp"></i> WhatsApp
          </a>
          <a
            href={p.shopee}
            target="_blank"
            rel="noreferrer"
            className="flex-1 text-center px-2 py-1 bg-orange-500 text-white rounded text-xs truncate hover:bg-orange-600 transition"
          >
            <i className="fa-solid fa-bag-shopping"></i> Shopee
          </a>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [products] = useState(initialProducts);
  const [filter, setFilter] = useState("all");
  const [cartCount, setCartCount] = useState(0);
  const [userOpen, setUserOpen] = useState(false);

  function handleAddToCart() {
    setCartCount((c) => c + 1);
  }

  const visible = products.filter(
    (p) => filter === "all" || p.category === filter
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header cartCount={cartCount} openUser={() => setUserOpen(true)} />
      <main>
        <CategoryBar active={filter} onChange={setFilter} />
        <Hero />

        <section className="mx-auto max-w-7xl px-3 sm:px-4 mt-6">
          <h2 className="text-lg font-bold mb-4">Katalog Produk</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {visible.map((p) => (
              <ProductCard key={p.id} p={p} onAdd={() => handleAddToCart()} />
            ))}
          </div>
        </section>

        {/* Footer (ringkas) */}
        <footer className="border-t border-gray-200 bg-white mt-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <i className="fa-solid fa-bag-shopping text-emerald-600 text-xl"></i>
                <span className="text-lg font-bold text-gray-800">
                  RachaEndless
                </span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Temukan fashion preloved favoritmu dengan harga ramah kantong
                dan kualitas terbaik. 🌿✨
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-gray-800">Kategori</h4>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <a href="#" className="hover:text-emerald-600">
                    👕 Pakaian
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-600">
                    🧥 Jaket
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-600">
                    👖 Celana
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-600">
                    👟 Sepatu
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-gray-800">Bantuan</h4>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <a href="#" className="hover:text-emerald-600">
                    📦 Cara Belanja
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-600">
                    ❓ FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-600">
                    📞 Kontak Kami
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-emerald-600">
                    🔒 Kebijakan Privasi
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h4 className="font-semibold mb-3 text-gray-800">
                Stay Connected
              </h4>
              <p className="text-gray-600 text-sm mb-3">
                Dapatkan update fashion terbaru langsung ke email kamu.
              </p>
              <form
                className="flex gap-2 mb-4"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  placeholder="Email kamu..."
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                >
                  <i className="fa-solid fa-paper-plane"></i>
                </button>
              </form>
              <div className="flex gap-4 text-gray-600 text-lg">
                <a href="#" className="hover:text-emerald-600">
                  <i className="fa-brands fa-instagram"></i>
                </a>
                <a href="#" className="hover:text-emerald-600">
                  <i className="fa-brands fa-facebook"></i>
                </a>
                <a href="#" className="hover:text-emerald-600">
                  <i className="fa-brands fa-x-twitter"></i>
                </a>
                <a href="#" className="hover:text-emerald-600">
                  <i className="fa-brands fa-tiktok"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="text-center text-xs text-gray-500 py-4 border-t border-gray-200">
            © 2025{" "}
            <span className="font-semibold text-gray-700">RachaEndless</span>.
            All rights reserved.
          </div>
        </footer>
      </main>

      {/* User popup */}
      {userOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl shadow-2xl w-11/12 max-w-md p-6">
            <h2 className="text-2xl font-extrabold text-emerald-600 mb-4 text-center">
              💌 Pesan Spesial
            </h2>
            <p className="text-gray-700 text-center text-sm sm:text-base">
              I love you, Ana 💖
            </p>
            <button
              onClick={() => setUserOpen(false)}
              className="mt-6 w-full py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-xl shadow-lg"
            >
              <i className="fa-solid fa-xmark"></i> Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
