import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <div className="font-fancy">

      {/* ================= HERO ================= */}
      <section className="relative min-h-[60vh] bg-[url('/login.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative max-w-7xl mx-auto px-6 h-full flex items-center">
          <div className="max-w-2xl text-white space-y-5">
            <h1 className="text-5xl font-extrabold">
              About <span className="text-accent">Crystal Beauty</span>
            </h1>
            <p className="text-white/90 text-lg">
              Where elegance meets skincare excellence.
            </p>
          </div>
        </div>
      </section>

      {/* ================= WHO WE ARE ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

          <div>
            <h2 className="text-4xl font-bold text-primary mb-4">
              Who We Are
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Crystal Beauty is a premium cosmetics brand dedicated to enhancing
              natural beauty through high-quality, skin-loving products.
              We combine science, nature, and elegance to create beauty
              solutions you can trust.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Every formula is thoughtfully crafted with safe ingredients
              to deliver visible results while maintaining skin health.
            </p>
          </div>

          <img
            src="/login4.jpg"
            alt="Who we are"
            className="rounded-3xl shadow-xl"
          />
        </div>
      </section>

      {/* ================= VALUES ================= */}
      <section className="bg-secondary py-20">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-primary">
              Our Core Values
            </h2>
            <p className="text-gray-600 mt-3">
              What makes Crystal Beauty truly special
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            {[
              {
                title: "Quality First",
                desc: "Premium ingredients tested for safety and performance.",
              },
              {
                title: "Cruelty Free",
                desc: "Ethically produced with zero animal testing.",
              },
              {
                title: "Customer Care",
                desc: "Your confidence and satisfaction are our priority.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-3xl shadow-md hover:shadow-xl transition"
              >
                <h3 className="text-xl font-bold text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

          <img
            src="/login5.jpg"
            alt="Why choose us"
            className="rounded-3xl shadow-xl"
          />

          <div>
            <h2 className="text-4xl font-bold text-primary mb-4">
              Why Choose Crystal Beauty
            </h2>

            <ul className="space-y-4 text-gray-600">
              <li>✔ Dermatologically tested formulas</li>
              <li>✔ Suitable for all skin types</li>
              <li>✔ Trusted by thousands of happy customers</li>
              <li>✔ Elegant, modern beauty solutions</li>
            </ul>

            <Link
              to="/products"
              className="inline-block mt-8 px-8 py-3 rounded-full
              bg-primary text-white font-semibold
              hover:bg-accent transition"
            >
              Explore Products
            </Link>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-primary py-20">
        <div className="max-w-7xl mx-auto px-6 text-center text-white space-y-6">
          <h2 className="text-4xl font-bold">
            Feel Confident. Feel Beautiful.
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto">
            Join thousands of customers who trust Crystal Beauty to enhance
            their everyday glow.
          </p>

          <Link
            to="/signup"
            className="inline-block px-10 py-3 rounded-full
            bg-white text-primary font-semibold
            hover:bg-secondary hover:scale-105 transition"
          >
            Get Started
          </Link>
        </div>
      </section>

    </div>
  );
}
