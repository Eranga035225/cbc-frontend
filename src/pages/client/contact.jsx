import { useState } from "react";
import { toast } from "react-hot-toast";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill all fields");
      return;
    }

    toast.success("Message sent successfully!");
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <div className="font-fancy relative">

      {/* ================= HERO ================= */}
      <section className="relative min-h-[55vh] bg-[url('/login.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative max-w-7xl mx-auto px-6 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-5xl font-extrabold">
              Contact <span className="text-accent">Us</span>
            </h1>
            <p className="mt-4 text-white/90 text-lg">
              We’d love to hear from you. Let’s stay connected.
            </p>
          </div>
        </div>
      </section>

      {/* ================= INFO CARDS ================= */}
      <section className="bg-secondary py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">

          {[
            {
              icon: <FaEnvelope />,
              title: "Email",
              value: "support@crystalbeauty.com",
            },
            {
              icon: <FaPhoneAlt />,
              title: "Phone",
              value: "+94 77 123 4567",
            },
            {
              icon: <FaMapMarkerAlt />,
              title: "Location",
              value: "Colombo, Sri Lanka",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="
                bg-white p-10 rounded-3xl shadow-md
                hover:shadow-2xl hover:-translate-y-1
                transition-all duration-300 text-center
              "
            >
              <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center
                rounded-full bg-primary/10 text-primary text-2xl">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">
                {item.title}
              </h3>
              <p className="text-gray-700 font-medium">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CONTACT FORM + MAP ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="bg-secondary p-10 rounded-3xl shadow-xl space-y-6"
          >
            <h2 className="text-3xl font-bold text-primary mb-2">
              Send Us a Message
            </h2>

            <div className="relative">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="
                  peer w-full rounded-xl border px-4 pt-5 pb-2
                  text-black bg-white
                  focus:border-primary focus:ring-2 focus:ring-primary/20
                  outline-none transition
                "
                placeholder=" "
              />
              <label className="absolute left-4 top-2 text-xs text-gray-500
                peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm
                peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary transition-all">
                Full Name
              </label>
            </div>

            <div className="relative">
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="
                  peer w-full rounded-xl border px-4 pt-5 pb-2
                  text-black bg-white
                  focus:border-primary focus:ring-2 focus:ring-primary/20
                  outline-none transition
                "
                placeholder=" "
              />
              <label className="absolute left-4 top-2 text-xs text-gray-500
                peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm
                peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary transition-all">
                Email Address
              </label>
            </div>

            <div className="relative">
              <textarea
                name="message"
                rows={4}
                value={form.message}
                onChange={handleChange}
                className="
                  peer w-full rounded-xl border px-4 pt-5 pb-2
                  text-black bg-white resize-none
                  focus:border-primary focus:ring-2 focus:ring-primary/20
                  outline-none transition
                "
                placeholder=" "
              />
              <label className="absolute left-4 top-2 text-xs text-gray-500
                peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm
                peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary transition-all">
                Your Message
              </label>
            </div>

            <button
              type="submit"
              className="
                w-full py-3 rounded-2xl bg-primary text-white
                font-semibold text-lg hover:bg-accent hover:scale-[1.03]
                transition-all shadow-lg
              "
            >
              Send Message
            </button>
          </form>

          {/* GOOGLE MAP */}
          <div className="w-full h-[420px] rounded-3xl overflow-hidden shadow-xl">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps?q=Colombo,Sri%20Lanka&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ================= WHATSAPP FLOAT ================= */}
      <a
        href="https://wa.me/94771234567"
        target="_blank"
        rel="noopener noreferrer"
        className="
          fixed bottom-6 right-6 z-50
          w-14 h-14 rounded-full
          bg-green-500 text-white
          flex items-center justify-center
          text-2xl shadow-xl
          hover:scale-110 transition
        "
      >
        <FaWhatsapp />
      </a>

      {/* ================= FOOTER NOTE ================= */}
      <section className="bg-primary py-12 text-center text-white">
        <p className="text-sm text-white/80">
          💬 We value your feedback • Crystal Beauty Support Team
        </p>
      </section>

    </div>
  );
}
