export default function Footer({ navigate }) {
  return (
    <footer className="bg-slate-900 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Logo + Description */}
        <div>
          <h3 className="text-2xl font-bold text-green-500">
            Placify<span className="text-amber-400">.</span>
          </h3>
          <p className="text-slate-400 mt-2 text-sm">
            Your one-stop platform for cracking placement exams. Learn,
            practice, and succeed.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <p
            className="cursor-pointer hover:text-amber-400"
            onClick={() => navigate("about")}
          >
            About Us
          </p>
          <p
            className="cursor-pointer hover:text-amber-400"
            onClick={() => navigate("contact")}
          >
            Contact Us
          </p>
          <p
            className="cursor-pointer hover:text-amber-400"
            onClick={() => navigate("privacy-policy")}
          >
            Privacy Policy
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-slate-500 border-t border-slate-700 mt-8 pt-4 text-sm">
        © {new Date().getFullYear()} Placify. All Rights Reserved.
      </div>
    </footer>
  );
}
