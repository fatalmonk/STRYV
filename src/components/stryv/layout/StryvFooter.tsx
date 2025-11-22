// components/stryv/layout/StryvFooter.tsx
const StryvFooter = () => {
  return (
    <footer className="bg-black text-white py-20 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2 space-y-6">
          <h2 className="text-3xl font-black uppercase tracking-tighter">STRYV</h2>
          <p className="text-zinc-400 max-w-sm leading-relaxed">
            Connecting fans through the beautiful game. Authentic, passionate, and crafted for the legends of tomorrow.
          </p>
          <div className="pt-4">
            <form className="flex border-b border-zinc-700 pb-2 max-w-xs">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-transparent focus:outline-none text-white placeholder-zinc-500"
              />
              <button className="font-bold uppercase text-xs hover:text-zinc-300 transition" type="submit">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="font-bold uppercase tracking-widest text-xs text-zinc-500">Shop</h4>
          <ul className="space-y-3 text-sm text-zinc-300">
            <li><a href="#vintage" className="hover:text-white transition">Vintage Collection</a></li>
            <li><a href="#moments" className="hover:text-white transition">Iconic Moments</a></li>
            <li><a href="#" className="hover:text-white transition">New Arrivals</a></li>
            <li><a href="#" className="hover:text-white transition">Best Sellers</a></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="font-bold uppercase tracking-widest text-xs text-zinc-500">Support</h4>
          <ul className="space-y-3 text-sm text-zinc-300">
            <li><a href="#" className="hover:text-white transition">FAQ</a></li>
            <li><a href="#" className="hover:text-white transition">Shipping</a></li>
            <li><a href="#" className="hover:text-white transition">Returns</a></li>
            <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-zinc-900 text-zinc-500 text-xs flex justify-between items-center">
        <p>© 2024 STRYV. All rights reserved.</p>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-white transition">Privacy Policy</a>
          <a href="#" className="hover:text-white transition">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default StryvFooter;