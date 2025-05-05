import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Button from '../components/ui/Button';
import { ChevronDown, Code, Zap, Mic, Video, Brain, Star } from 'lucide-react';

const useCases = [
  {
    title: 'Virtual Assistants',
    description: 'Create emotionally intelligent HR bots and customer support avatars',
    image: 'https://images.pexels.com/photos/8438950/pexels-photo-8438950.jpeg',
    color: 'purple'
  },
  {
    title: 'Gaming & Entertainment',
    description: 'Build immersive NPCs and AI-driven characters',
    image: 'https://images.pexels.com/photos/7915357/pexels-photo-7915357.jpeg',
    color: 'blue'
  },
  {
    title: 'Education',
    description: 'Develop AI tutors and multilingual teachers',
    image: 'https://images.pexels.com/photos/5905700/pexels-photo-5905700.jpeg',
    color: 'green'
  },
  {
    title: 'Content Creation',
    description: 'Generate explainer videos and virtual influencers',
    image: 'https://images.pexels.com/photos/7606074/pexels-photo-7606074.jpeg',
    color: 'orange'
  }
];

const plans = [
  {
    name: 'Standard',
    price: 29,
    credits: 50,
    features: [
      'Up to 50 avatar generations/month',
      'Basic emotions and expressions',
      '720p video quality',
      'Email support'
    ]
  },
  {
    name: 'Professional',
    price: 79,
    credits: 200,
    features: [
      'Up to 200 avatar generations/month',
      'Advanced emotions and expressions',
      '1080p video quality',
      'Priority support',
      'Custom backgrounds',
      'Commercial usage rights'
    ]
  },
  {
    name: 'Enterprise',
    price: 299,
    credits: 1000,
    features: [
      'Unlimited avatar generations',
      'Ultra-realistic emotions',
      '4K video quality',
      '24/7 dedicated support',
      'API access',
      'Custom model training',
      'White-label solution'
    ]
  }
];

const HomePage: React.FC = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  
  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    document.title = 'NeuroVatar - AI-Powered Emotional Avatars';
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/10 dark:to-indigo-900/10 z-0"></div>
        
        {/* Animated background blobs */}
        <motion.div 
          className="absolute top-20 left-1/4 w-72 h-72 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 30, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-40 right-1/4 w-72 h-72 bg-indigo-300 dark:bg-indigo-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30"
          animate={{
            scale: [1, 0.9, 1],
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 mb-6">
              Next-Gen AI Avatars with Real Emotions
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
              NeuroVatar combines neural speech synthesis with state-of-the-art diffusion models to create avatars that truly express emotions.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/signup">
                  <Button size="lg">
                    Start Creating
                  </Button>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/login">
                  <Button variant="outline" size="lg">
                    View Demo
                  </Button>
                </Link>
              </motion.div>
            </div>
            
            <div className="relative mx-auto max-w-4xl overflow-hidden rounded-xl shadow-2xl">
              <div className="bg-gray-800 h-10 rounded-t-xl flex items-center px-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>
              <motion.div 
                className="aspect-video bg-gray-900 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <video 
                  className="w-full h-full object-cover"
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  poster="https://images.pexels.com/photos/7563687/pexels-photo-7563687.jpeg"
                >
                  <source src="https://player.vimeo.com/external/573204775.hd.mp4?s=7aee80922afdf01c5fd4d0f03e1f79f89fdefad5&profile_id=174" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </motion.div>
            </div>
            
            <motion.button 
              onClick={scrollToFeatures}
              className="mt-12 inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors"
              whileHover={{ y: 5 }}
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Learn more
              <ChevronDown className="ml-1" size={20} />
            </motion.button>
          </motion.div>
        </div>
      </section>
      
      {/* Use Cases Section */}
      <section ref={featuresRef} className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Transform Your Ideas into Reality
            </h2>
            <p className="max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
              Discover how NeuroVatar is revolutionizing digital interaction across industries
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                className="relative group overflow-hidden rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={useCase.image} 
                    alt={useCase.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6 flex flex-col justify-end">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {useCase.title}
                  </h3>
                  <p className="text-gray-200 text-sm">
                    {useCase.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Choose Your Plan
            </h2>
            <p className="max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
              Flexible plans for every need, from individual creators to enterprise solutions
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden ${
                  plan.name === 'Professional' ? 'border-2 border-purple-500' : 'border border-gray-200 dark:border-gray-700'
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                {plan.name === 'Professional' && (
                  <div className="bg-purple-500 text-white text-center py-1 text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline mb-4">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      ${plan.price}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 ml-1">/month</span>
                  </div>
                  <p className="text-sm text-purple-600 dark:text-purple-400 mb-6">
                    {plan.credits} credits included
                  </p>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-600 dark:text-gray-300">
                        <Star size={16} className="text-purple-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link to="/signup">
                    <Button 
                      fullWidth
                      variant={plan.name === 'Professional' ? 'primary' : 'outline'}
                    >
                      Get Started
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} NeuroVatar. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;