import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, ShoppingCart, IndianRupee } from 'lucide-react';
import { MENU_CATEGORIES } from '../utils/constants';
import toast from 'react-hot-toast';

const MenuSection = () => {
  const [selectedCategory, setSelectedCategory] = useState(MENU_CATEGORIES[0].id);
  const [cart, setCart] = useState({});
  const [showCart, setShowCart] = useState(false);

  const addToCart = (item) => {
    setCart(prev => ({
      ...prev,
      [item.name]: {
        ...item,
        quantity: (prev[item.name]?.quantity || 0) + 1
      }
    }));
    toast.success(`${item.name} added to cart`);
  };

  const removeFromCart = (itemName) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[itemName].quantity > 1) {
        newCart[itemName].quantity -= 1;
      } else {
        delete newCart[itemName];
      }
      return newCart;
    });
  };

  const getTotalPrice = () => {
    return Object.values(cart).reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((total, item) => total + item.quantity, 0);
  };

  const selectedCategoryData = MENU_CATEGORIES.find(cat => cat.id === selectedCategory);

  return (
    <div className="section-padding bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Our Menu Selection
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our delicious menu options for your special event. All dishes are prepared with fresh ingredients and authentic flavors.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Category Sidebar */}
          <div className="lg:w-1/4">
            <div className="card p-6 sticky top-24">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Categories</h3>
              <div className="space-y-2">
                {MENU_CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                      selectedCategory === category.id
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>

              {/* Cart Summary */}
              {getTotalItems() > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setShowCart(!showCart)}
                    className="w-full btn-primary flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>Cart ({getTotalItems()})</span>
                  </button>
                  <div className="mt-2 text-center text-lg font-semibold text-primary-600">
                    Total: ₹{getTotalPrice().toLocaleString()}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Menu Items */}
          <div className="lg:w-3/4">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                {selectedCategoryData?.name}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedCategoryData?.items.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="card p-6 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-lg font-semibold text-gray-800">
                        {item.name}
                      </h4>
                      <div className="flex items-center text-primary-600 font-bold">
                        <IndianRupee className="w-4 h-4" />
                        <span>{item.price}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4 text-sm">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between">
                      {cart[item.name] ? (
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => removeFromCart(item.name)}
                            className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 text-red-600 flex items-center justify-center transition-colors duration-200"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-semibold text-gray-800">
                            {cart[item.name].quantity}
                          </span>
                          <button
                            onClick={() => addToCart(item)}
                            className="w-8 h-8 rounded-full bg-primary-100 hover:bg-primary-200 text-primary-600 flex items-center justify-center transition-colors duration-200"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(item)}
                          className="btn-primary text-sm px-4 py-2"
                        >
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Cart Modal */}
        {showCart && getTotalItems() > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowCart(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">Your Cart</h3>
              
              <div className="space-y-4 mb-6">
                {Object.values(cart).map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-800">{item.name}</h4>
                      <p className="text-sm text-gray-600">₹{item.price} each</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => removeFromCart(item.name)}
                        className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-medium">{item.quantity}</span>
                      <button
                        onClick={() => addToCart(item)}
                        className="w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center text-lg font-bold text-gray-800 mb-4">
                  <span>Total:</span>
                  <span>₹{getTotalPrice().toLocaleString()}</span>
                </div>
                
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      toast.success('Menu selection saved! This will be included in your booking.');
                      setShowCart(false);
                    }}
                    className="w-full btn-primary"
                  >
                    Add to Booking
                  </button>
                  <button
                    onClick={() => setShowCart(false)}
                    className="w-full btn-secondary"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MenuSection;