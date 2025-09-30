import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import BookingForm from '../components/BookingForm';
import { Calendar, Clock, Users, MapPin, Phone, Mail } from 'lucide-react';
import { BUSINESS_INFO, TIME_SLOTS } from '../utils/constants';

const Booking = () => {
  const location = useLocation();
  const [prefilledData, setPrefilledData] = useState({});

  useEffect(() => {
    // Get query parameters from URL
    const searchParams = new URLSearchParams(location.search);
    const data = {};
    
    for (const [key, value] of searchParams.entries()) {
      data[key] = value;
    }
    
    setPrefilledData(data);
  }, [location.search]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Book Your Event
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              Reserve your date at Manomangal Lawns and let us make your special day unforgettable
            </p>
          </motion.div>
        </div>
      </section>

      {/* Booking Information */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Quick Info Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="card p-6 text-center"
            >
              <Calendar className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Easy Booking</h3>
              <p className="text-gray-600">Simple online booking process with instant confirmation</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="card p-6 text-center"
            >
              <Clock className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Flexible Timing</h3>
              <p className="text-gray-600">Multiple time slots available to suit your schedule</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="card p-6 text-center"
            >
              <Users className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Any Size Event</h3>
              <p className="text-gray-600">Accommodate events from 50 to 500 guests</p>
            </motion.div>
          </div>

          {/* Main Booking Form */}
          <BookingForm prefilledData={prefilledData} />
        </div>
      </section>

      {/* Pricing Information */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Pricing & Packages
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Transparent pricing with no hidden costs. Choose the package that best fits your event needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TIME_SLOTS.map((slot, index) => (
              <motion.div
                key={slot.value}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  ₹{slot.price.toLocaleString()}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {slot.label.split(' (')[0]}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {slot.label.split(' (')[1]?.replace(')', '')}
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Venue rental included</li>
                  <li>• Basic decoration</li>
                  <li>• Sound system</li>
                  <li>• Parking facility</li>
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <p className="text-gray-600 mb-4">
              * Additional charges apply for guests above 200. Extra services like premium catering, 
              decoration, and photography are available at additional cost.
            </p>
            <p className="text-sm text-gray-500">
              All prices are inclusive of basic amenities. Final pricing may vary based on specific requirements.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Need Help with Booking?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our team is here to assist you with any questions or special requirements
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="card p-6 text-center"
            >
              <Phone className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Call Us</h3>
              <p className="text-gray-600 mb-3">Speak directly with our team</p>
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                {BUSINESS_INFO.phone}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="card p-6 text-center"
            >
              <Mail className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Email Us</h3>
              <p className="text-gray-600 mb-3">Send us your requirements</p>
              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                {BUSINESS_INFO.email}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="card p-6 text-center"
            >
              <MapPin className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Visit Us</h3>
              <p className="text-gray-600 mb-3">Come see our venue in person</p>
              <p className="text-primary-600 font-medium text-sm">
                {BUSINESS_INFO.address}
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;