import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, Mail, Phone, User, MessageSquare, IndianRupee } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import toast from 'react-hot-toast';
import api from '../utils/api';
import { EVENT_TYPES, TIME_SLOTS } from '../utils/constants';

const bookingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  eventType: z.string().min(1, 'Please select an event type'),
  timeSlot: z.string().min(1, 'Please select a time slot'),
  guests: z.number().min(1, 'Number of guests is required').max(500, 'Maximum 500 guests allowed'),
  specialRequests: z.string().optional(),
});

const BookingForm = ({ prefilledData = {} }) => {
  const [selectedDate, setSelectedDate] = useState(prefilledData.date ? new Date(prefilledData.date) : null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      eventType: prefilledData.eventType || '',
      timeSlot: prefilledData.timeSlot || '',
      guests: prefilledData.guests ? parseInt(prefilledData.guests) : '',
      ...prefilledData
    }
  });

  const watchedTimeSlot = watch('timeSlot');
  const watchedGuests = watch('guests');

  // Calculate estimated price
  useEffect(() => {
    if (watchedTimeSlot && watchedGuests) {
      const timeSlotData = TIME_SLOTS.find(slot => slot.value === watchedTimeSlot);
      if (timeSlotData) {
        let basePrice = timeSlotData.price;
        
        // Add extra charges for more than 200 guests
        if (watchedGuests > 200) {
          const extraGuests = watchedGuests - 200;
          basePrice += extraGuests * 100; // ₹100 per extra guest
        }
        
        setEstimatedPrice(basePrice);
      }
    }
  }, [watchedTimeSlot, watchedGuests]);

  const onSubmit = async (data) => {
    if (!selectedDate) {
      toast.error('Please select a date');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const bookingData = {
        ...data,
        date: selectedDate.toISOString().split('T')[0],
        estimatedPrice
      };

      const response = await api.post('/bookings', bookingData);
      
      if (response.data.success) {
        toast.success('Booking request submitted successfully! We will contact you soon.');
        // Reset form
        setSelectedDate(null);
        setValue('name', '');
        setValue('email', '');
        setValue('phone', '');
        setValue('eventType', '');
        setValue('timeSlot', '');
        setValue('guests', '');
        setValue('specialRequests', '');
      }
    } catch (error) {
      console.error('Booking error:', error);
      toast.error(error.response?.data?.message || 'Failed to submit booking request');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if date is available (disable past dates and already booked dates)
  const isDateDisabled = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="card p-8 max-w-4xl mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Book Your Event</h2>
        <p className="text-gray-600">Fill in the details below and we'll get back to you with confirmation</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center">
              <User className="w-5 h-5 mr-2 text-primary-600" />
              Personal Information
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                {...register('name')}
                type="text"
                className="input-field"
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                {...register('email')}
                type="email"
                className="input-field"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                {...register('phone')}
                type="tel"
                className="input-field"
                placeholder="Enter your phone number"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>
          </div>

          {/* Event Details */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-primary-600" />
              Event Details
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Date *
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={setSelectedDate}
                filterDate={(date) => !isDateDisabled(date)}
                minDate={new Date()}
                className="input-field"
                placeholderText="Select event date"
                dateFormat="dd/MM/yyyy"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Type *
              </label>
              <select
                {...register('eventType')}
                className="input-field"
              >
                <option value="">Select event type</option>
                {EVENT_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              {errors.eventType && (
                <p className="text-red-500 text-sm mt-1">{errors.eventType.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time Slot *
              </label>
              <select
                {...register('timeSlot')}
                className="input-field"
              >
                <option value="">Select time slot</option>
                {TIME_SLOTS.map((slot) => (
                  <option key={slot.value} value={slot.value}>
                    {slot.label} - ₹{slot.price.toLocaleString()}
                  </option>
                ))}
              </select>
              {errors.timeSlot && (
                <p className="text-red-500 text-sm mt-1">{errors.timeSlot.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Guests *
              </label>
              <input
                {...register('guests', { valueAsNumber: true })}
                type="number"
                min="1"
                max="500"
                className="input-field"
                placeholder="Enter number of guests"
              />
              {errors.guests && (
                <p className="text-red-500 text-sm mt-1">{errors.guests.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Special Requests */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Special Requests
          </label>
          <textarea
            {...register('specialRequests')}
            rows={4}
            className="input-field"
            placeholder="Any special requirements or requests for your event..."
          />
        </div>

        {/* Price Estimation */}
        {estimatedPrice > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-primary-50 border border-primary-200 rounded-lg p-6"
          >
            <h4 className="text-lg font-semibold text-primary-800 flex items-center mb-2">
              <IndianRupee className="w-5 h-5 mr-2" />
              Estimated Price
            </h4>
            <div className="text-2xl font-bold text-primary-600">
              ₹{estimatedPrice.toLocaleString()}
            </div>
            <p className="text-sm text-primary-700 mt-2">
              *Final price may vary based on additional services and requirements
            </p>
          </motion.div>
        )}

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary text-lg px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-2">
                <div className="loading-spinner"></div>
                <span>Submitting...</span>
              </div>
            ) : (
              'Submit Booking Request'
            )}
          </button>
        </div>

        <div className="text-center text-sm text-gray-600">
          <p>
            By submitting this form, you agree to our terms and conditions. 
            We will contact you within 24 hours to confirm your booking.
          </p>
        </div>
      </form>
    </motion.div>
  );
};

export default BookingForm;