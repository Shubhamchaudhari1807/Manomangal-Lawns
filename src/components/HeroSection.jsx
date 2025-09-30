import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, ArrowRight } from 'lucide-react';
import { EVENT_TYPES } from '../utils/constants';

const HeroSection = () => {
  const navigate = useNavigate();
  const [searchForm, setSearchForm] = useState({
    date: '',
    timeSlot: '',
    eventType: '',
    guests: ''
  });

  const handleInputChange = (e) => {
    setSearchForm({
      ...searchForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Navigate to booking page with pre-filled data
    const queryParams = new URLSearchParams(searchForm).toString();
    navigate(`/booking?${queryParams}`);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
          alt="Wedding Venue"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Your Dream Event
            <span className="block text-primary-400">Starts Here</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed">
            Experience the perfect blend of elegance and tradition at Manomangal Lawns. 
            Where every celebration becomes a cherished memory.
          </p>

          {/* Quick Search Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-2xl max-w-4xl mx-auto"
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Check Availability</h3>
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="flex items-center text-gray-700 font-medium">
                  <Calendar className="w-4 h-4 mr-2" />
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={searchForm.date}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="input-field text-gray-800"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center text-gray-700 font-medium">
                  <Clock className="w-4 h-4 mr-2" />
                  Time Slot
                </label>
                <select
                  name="timeSlot"
                  value={searchForm.timeSlot}
                  onChange={handleInputChange}
                  className="input-field text-gray-800"
                  required
                >
                  <option value="">Select Time</option>
                  <option value="morning">Morning</option>
                  <option value="afternoon">Afternoon</option>
                  <option value="evening">Evening</option>
                  <option value="fullday">Full Day</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="flex items-center text-gray-700 font-medium">
                  <Users className="w-4 h-4 mr-2" />
                  Event Type
                </label>
                <select
                  name="eventType"
                  value={searchForm.eventType}
                  onChange={handleInputChange}
                  className="input-field text-gray-800"
                  required
                >
                  <option value="">Select Event</option>
                  {EVENT_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="flex items-center text-gray-700 font-medium">
                  <Users className="w-4 h-4 mr-2" />
                  Guests
                </label>
                <input
                  type="number"
                  name="guests"
                  value={searchForm.guests}
                  onChange={handleInputChange}
                  placeholder="Number of guests"
                  min="1"
                  max="500"
                  className="input-field text-gray-800"
                  required
                />
              </div>

              <div className="md:col-span-4 mt-4">
                <button
                  type="submit"
                  className="w-full md:w-auto btn-primary text-lg px-8 py-4 flex items-center justify-center space-x-2"
                >
                  <span>Check Availability</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </form>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
          >
            <button
              onClick={() => navigate('/gallery')}
              className="btn-secondary text-lg px-8 py-4"
            >
              View Gallery
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="btn-primary text-lg px-8 py-4"
            >
              Contact Us
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;