import { useState } from 'react';
import miscService from '../services/miscService';
import toast from 'react-hot-toast';
import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi';

// ─── About ─────────────────────────────────────────────────────────────────
export const About = () => {
  const stats = [
    { label: 'Happy Guests', value: '3,200+' },
    { label: 'Unique Cabins', value: '30+' },
    { label: 'Years of Experience', value: '5+' },
    { label: 'Average Rating', value: '4.8 ★' },
  ];

  const team = [
    { name: 'Emily Watson', role: 'Founder & CEO', avatar: 'https://i.pravatar.cc/150?img=47' },
    { name: 'James Carter', role: 'Head of Operations', avatar: 'https://i.pravatar.cc/150?img=53' },
    { name: 'Sofia Patel', role: 'Customer Experience', avatar: 'https://i.pravatar.cc/150?img=46' },
  ];

  const gallery = [
    'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=600&q=80',
    'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=600&q=80',
    'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=600&q=80',
    'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=600&q=80',
    'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=600&q=80',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80"
          alt="Cabin landscape"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#1f2937]/60" />
        <div className="relative text-center text-white px-6">
          <h1 className="text-5xl font-serif font-bold mb-4">About UnwindCabins</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">Where nature meets comfort</p>
        </div>
      </div>

      {/* Story */}
      <section className="max-w-5xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-serif font-bold text-[#1f2937] mb-4">Our Story</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Founded in 2020, UnwindCabins was born out of a simple belief — everyone deserves a chance to step away from the noise and reconnect with what matters most.
          </p>
          <p className="text-gray-600 leading-relaxed">
            What started as a single restored farmhouse in the Hampshire countryside has grown into a curated collection of over 30 exceptional properties across England, each hand-selected for its character, comfort, and natural surroundings.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800&q=80"
          alt="Our cabin"
          className="rounded-2xl h-72 w-full object-cover shadow-lg"
        />
      </section>

      {/* Stats */}
      <section className="bg-[#375344] py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {stats.map(s => (
            <div key={s.label}>
              <p className="text-4xl font-bold font-serif text-[#e5a452] mb-2">{s.value}</p>
              <p className="text-sm opacity-80">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-serif font-bold text-[#1f2937] mb-6">Our Mission</h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          We exist to make meaningful escapes accessible. Every cabin in our collection is thoughtfully maintained, rigorously vetted, and designed to give you everything you need — and nothing you don't.
        </p>
      </section>

      {/* Gallery */}
      <section className="px-6 pb-16 max-w-7xl mx-auto">
        <h2 className="text-3xl font-serif font-bold text-center text-[#1f2937] mb-8">Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {gallery.map((img, i) => (
            <img key={i} src={img} alt="" className="rounded-xl h-48 md:h-64 w-full object-cover hover:opacity-90 transition-opacity" />
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="bg-[#f4f7f6] py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold text-[#1f2937] mb-12">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {team.map(member => (
              <div key={member.name} className="bg-white rounded-xl p-6 shadow-sm">
                <img src={member.avatar} alt={member.name} className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-4 border-[#e5a452]" />
                <h3 className="text-lg font-bold text-[#1f2937]">{member.name}</h3>
                <p className="text-gray-500 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// ─── Contact ───────────────────────────────────────────────────────────────
export const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      return toast.error('Please fill in all fields');
    }
    setLoading(true);
    try {
      await miscService.submitContact(formData);
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    { icon: FiMapPin, label: 'Address', value: '12 Forest Lane, Winchester, SO23 8RB, England' },
    { icon: FiPhone, label: 'Phone', value: '+44 (0) 1962 123 456' },
    { icon: FiMail, label: 'Email', value: 'hello@unwindcabins.com' },
    { icon: FiClock, label: 'Office Hours', value: 'Mon–Fri: 9am – 6pm · Sat: 10am – 4pm' },
  ];

  return (
    <div className="bg-[#f4f7f6] min-h-screen">
      <div className="bg-[#375344] py-16 px-6 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Contact Us</h1>
        <p className="text-lg max-w-xl mx-auto opacity-90">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Info */}
        <div className="space-y-6">
          <h2 className="text-2xl font-serif font-bold text-[#1f2937]">Get in Touch</h2>
          {contactInfo.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-[#375344]/10 flex items-center justify-center shrink-0">
                <Icon className="text-[#375344]" size={18} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase text-gray-400">{label}</p>
                <p className="text-gray-700">{value}</p>
              </div>
            </div>
          ))}

          {/* Map Placeholder */}
          <div className="mt-6 bg-gray-200 rounded-xl h-48 flex items-center justify-center overflow-hidden">
            <div className="text-center text-gray-400">
              <FiMapPin size={32} className="mx-auto mb-2" />
              <p className="text-sm">Winchester, Hampshire, England</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-serif font-bold text-[#1f2937] mb-6">Send a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input
                  type="text" name="name" value={formData.name}
                  onChange={handleChange} required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#375344]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email" name="email" value={formData.email}
                  onChange={handleChange} required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#375344]"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
              <textarea
                name="message" value={formData.message}
                onChange={handleChange} required rows={6}
                placeholder="How can we help you?"
                className="w-full px-4 py-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#375344] resize-none"
              />
            </div>
            <button
              type="submit" disabled={loading}
              className="bg-[#e5a452] hover:bg-[#d49642] text-white px-8 py-3 rounded-md font-medium transition-colors disabled:opacity-70"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// ─── Gift Card ─────────────────────────────────────────────────────────────
export const GiftCard = () => {
  const [selectedAmount, setSelectedAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const presets = [100, 250, 500];

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = customAmount ? Number(customAmount) : selectedAmount;
    if (amount < 10) return toast.error('Minimum gift card amount is £10');
    if (!recipientName || !recipientEmail) return toast.error('Please fill in recipient details');
    setSubmitted(true);
    toast.success(`🎁 Gift card of £${amount} sent to ${recipientEmail}!`);
  };

  const finalAmount = customAmount ? Number(customAmount) : selectedAmount;

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#f4f7f6] flex items-center justify-center px-6">
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center max-w-lg w-full">
          <div className="text-6xl mb-6">🎁</div>
          <h2 className="text-3xl font-serif font-bold text-[#1f2937] mb-4">Gift Card Sent!</h2>
          <p className="text-gray-600 mb-2">
            A <span className="font-bold text-[#e5a452]">£{finalAmount}</span> gift card has been sent to{' '}
            <strong>{recipientEmail}</strong>.
          </p>
          <p className="text-gray-500 text-sm mt-4">
            {recipientName} will receive an email with their gift card code shortly.
          </p>
          <button
            onClick={() => { setSubmitted(false); setRecipientName(''); setRecipientEmail(''); setMessage(''); }}
            className="mt-8 bg-[#375344] text-white px-8 py-3 rounded-md font-medium hover:bg-[#2c4236] transition-colors"
          >
            Send Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f4f7f6] min-h-screen">
      <div className="bg-[#375344] py-16 px-6 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Gift a Stay</h1>
        <p className="text-lg max-w-xl mx-auto opacity-90">
          The perfect gift for someone who deserves a break. Give the gift of an unforgettable cabin retreat.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Gift Card Preview */}
        <div className="relative bg-gradient-to-br from-[#375344] to-[#1f2937] rounded-2xl p-8 text-white shadow-2xl mb-10 overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#e5a452]/20 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative">
            <p className="text-[#e5a452] font-bold tracking-widest text-sm mb-6">UNWINDCABINS · GIFT CARD</p>
            <p className="text-5xl font-bold font-serif mb-2">£{customAmount || selectedAmount}</p>
            <p className="opacity-70 text-sm">Valid for any cabin stay</p>
            {recipientName && (
              <p className="mt-4 text-sm opacity-80">For: <strong>{recipientName}</strong></p>
            )}
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Amount Selection */}
            <div>
              <h3 className="text-lg font-bold text-[#1f2937] mb-4">Select Amount</h3>
              <div className="grid grid-cols-3 gap-3 mb-3">
                {presets.map(amount => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => { setSelectedAmount(amount); setCustomAmount(''); }}
                    className={`py-3 rounded-lg font-bold border-2 transition-all ${
                      selectedAmount === amount && !customAmount
                        ? 'border-[#375344] bg-[#375344] text-white'
                        : 'border-gray-200 text-gray-700 hover:border-[#375344]'
                    }`}
                  >
                    £{amount}
                  </button>
                ))}
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">£</span>
                <input
                  type="number"
                  min={10}
                  placeholder="Custom amount"
                  value={customAmount}
                  onChange={e => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#375344]"
                />
              </div>
            </div>

            {/* Recipient */}
            <div>
              <h3 className="text-lg font-bold text-[#1f2937] mb-4">Recipient Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Name *</label>
                  <input
                    type="text" value={recipientName}
                    onChange={e => setRecipientName(e.target.value)} required
                    placeholder="Jane Smith"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#375344]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Email *</label>
                  <input
                    type="email" value={recipientEmail}
                    onChange={e => setRecipientEmail(e.target.value)} required
                    placeholder="jane@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#375344]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Personal Message (optional)</label>
                <textarea
                  value={message} onChange={e => setMessage(e.target.value)}
                  rows={3} placeholder="Write a personal note..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#375344] resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#e5a452] hover:bg-[#d49642] text-white py-4 rounded-xl font-bold text-lg transition-colors"
            >
              🎁 Purchase Gift Card · £{customAmount || selectedAmount}
            </button>
            <p className="text-center text-xs text-gray-400">
              Gift cards are delivered instantly by email and never expire.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

// ─── NotFound ──────────────────────────────────────────────────────────────
export const NotFound = () => (
  <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 bg-[#f4f7f6]">
    <p className="text-[120px] font-bold text-[#375344]/10 leading-none select-none">404</p>
    <h1 className="text-3xl font-serif font-bold text-[#1f2937] -mt-8 mb-4">Page Not Found</h1>
    <p className="text-gray-500 mb-8 max-w-md">The page you are looking for doesn't exist or has been moved.</p>
    <a href="/" className="bg-[#375344] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#2c4236] transition-colors">
      Go Home
    </a>
  </div>
);

// ─── StaticPage ────────────────────────────────────────────────────────────
export const StaticPage = ({ title }) => (
  <div className="bg-white py-16 px-6 md:px-12 lg:px-24 min-h-[60vh]">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-serif font-bold mb-6 text-[#1f2937]">{title}</h1>
      <div className="prose max-w-none text-gray-600">
        <p>This page is coming soon. Please check back later.</p>
      </div>
    </div>
  </div>
);
