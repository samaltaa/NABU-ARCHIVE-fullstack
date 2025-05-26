"use client"
import React, { useState, useEffect } from 'react';

const Landing = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scanlinePosition, setScanlinePosition] = useState(0);

  // Animated background elements
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const scanInterval = setInterval(() => {
      setScanlinePosition(prev => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(scanInterval);
  }, []);

  const features = [
    {
      "title": "REAL-TIME BIOMETRIC IDENTIFICATION",
      "subtitle": "Advanced Recognition Systems",
      "description": "High-precision facial recognition and biometric analysis. Capability to process hundreds of subjects in seconds, with reliable and verifiable results.",
      "metrics": ["< 0.5s Response Time", "Precise Facial Biometrics", "Local Processing"]
    },
    {
      "title": "REGISTRATION AND VERIFICATION NETWORK",
      "subtitle": "Integrated Intelligence Platform",
      "description": "Modular monitoring solution that centralizes identity data to facilitate verification operations at checkpoints and sensitive zones.",
      "metrics": ["Segmented Territorial Coverage", "Instant Verification", "Decentralized Management"]
    },
    {
      "title": "SECURE DATA ARCHITECTURE",
      "subtitle": "High-Level Security Protocols",
      "description": "End-to-end encrypted systems with complete traceability. Compliance with data protection standards and institutional control.",
      "metrics": ["AES-256 Encryption", "Zero Trust Model", "Permanent Auditing"]
    }
  ];

  return (
    <div className="relative z-0 bg-white text-gray-900 min-h-screen font-mono overflow-hidden">
      {/* Animated Grid Background */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(75, 85, 99, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(75, 85, 99, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Scanning Line Effect */}
      <div 
        className="fixed inset-0 pointer-events-none z-10"
        style={{
          background: `linear-gradient(180deg, transparent ${scanlinePosition}%, rgba(75, 85, 99, 0.2) ${scanlinePosition + 0.5}%, transparent ${scanlinePosition + 1}%)`
        }}
      />

      {/* Hero Section */}
      <section className="relative z-20 pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-gray-800 text-sm tracking-widest border border-gray-400 px-4 py-2 bg-gray-100">
                CLASSIFIED CONTENT: AUTHORIZED PERSONNEL ONLY
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              <span className="text-gray-900">ADVANCED</span>
              <br />
              <span className="text-gray-700">INTELLIGENT</span>
              <br />
              <span className="text-gray-900">MONITORING</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Advanced biometric identification and behavioral analysis platform for population management and territorial security.
            </p>

            <div className="mt-12 flex flex-col md:flex-row gap-6 justify-center">
              <button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 font-bold tracking-wide transition-all duration-300 transform hover:scale-105 border border-gray-800">
                ACCESS SYSTEM
              </button>
              <button className="border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white px-8 py-4 font-bold tracking-wide transition-all duration-300">
                VIEW DEMO
              </button>
            </div>
          </div>

          {/* Stats Panel */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-20">
            {[
              { label: "REGISTERED SUBJECTS", value: "312", change: "+4 today" },
              { label: "VERIFIED RECORDS", value: "196", status: "INCOMPLETE SYNC" },
              { label: "SYSTEM STATUS", value: "ONLINE", status: "STABLE" },
              { label: "API RESPONSE TIME", value: "0.382s", unit: "AVG" }
            ].map((stat, index) => (
              <div key={index} className="bg-gray-50 border border-gray-300 p-6 backdrop-blur-sm shadow-sm">
                <div className="text-gray-700 text-xs tracking-widest mb-2 font-semibold">{stat.label}</div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                {stat.change && <div className="text-gray-700 text-sm font-semibold">↗ {stat.change}</div>}
                {stat.status && (
                  <div className={`inline-block w-2 h-2 rounded-full mt-2 ${
                    stat.status === 'GREEN' ? 'bg-green-600' : 'bg-yellow-500'
                  }`}></div>
                )}
                {stat.unit && <div className="text-gray-500 text-xs">{stat.unit}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-20 py-24 bg-gradient-to-b from-white to-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">TACTICAL OPERATIONAL CAPABILITIES</h2>
            <div className="w-24 h-1 bg-gray-800 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group bg-white border border-gray-300 p-8 backdrop-blur-sm hover:border-gray-600 transition-all duration-500 transform hover:-translate-y-2 shadow-lg hover:shadow-xl"
              >
                <div className="mb-6">
                  <div className="text-gray-700 text-xs tracking-widest mb-2 font-semibold">{feature.subtitle}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gray-700 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>

                <div className="space-y-3">
                  {feature.metrics.map((metric, idx) => (
                    <div key={idx} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-gray-800 rounded-full mr-3"></div>
                      <span className="text-gray-600">{metric}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="relative z-20 py-24 border-t border-gray-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-gray-700 text-sm tracking-widest mb-4 font-semibold">TECHNICAL OVERVIEW</div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">MILITARY-GRADE ARCHITECTURE</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-6 h-6 border-2 border-gray-800 mr-4 mt-1 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-gray-900 font-semibold mb-2">Distributed Edge Computing</h4>
                    <p className="text-gray-600">Real-time processing at the network edge with sub-second response times for critical threat identification.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-6 h-6 border-2 border-gray-800 mr-4 mt-1 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-gray-900 font-semibold mb-2">Quantum-Resistant Encryption</h4>
                    <p className="text-gray-600">Future-proof security protocols designed to withstand advanced cryptographic attacks.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-6 h-6 border-2 border-gray-800 mr-4 mt-1 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-gray-900 font-semibold mb-2">Multi-Sensor Fusion</h4>
                    <p className="text-gray-600">Integrates biometric, behavioral, and environmental data for comprehensive threat assessment.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gray-50 border border-gray-300 p-8 backdrop-blur-sm shadow-lg">
                <div className="text-gray-700 text-xs tracking-widest mb-4 font-semibold">SYSTEM SPECIFICATIONS</div>
                
                <div className="space-y-4">
                  {[
                    { label: "Processing Capacity", value: "10M+ faces/hour" },
                    { label: "Accuracy Rate", value: "99.73%" },
                    { label: "False Positive Rate", value: "< 0.001%" },
                    { label: "Data Throughput", value: "50TB/day" },
                    { label: "Response Time", value: "< 300ms" },
                    { label: "Uptime SLA", value: "99.99%" }
                  ].map((spec, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">{spec.label}</span>
                      <span className="text-gray-900 font-mono font-semibold">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-20 py-24 bg-gray-100 border-t border-gray-300">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">SECURE YOUR PERIMETER</h2>
          <p className="text-xl text-gray-600 mb-12">
            Contact our defense solutions team to discuss implementation of advanced surveillance capabilities for your facility.
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <button className="bg-gray-900 hover:bg-gray-800 text-white px-12 py-4 font-bold tracking-wide transition-all duration-300 transform hover:scale-105 border border-gray-800">
              REQUEST BRIEFING
            </button>
            <button className="border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white px-12 py-4 font-bold tracking-wide transition-all duration-300">
              DOWNLOAD SPECS
            </button>
          </div>
          
          <div className="mt-12 text-xs text-gray-500 tracking-wide">
            CLASSIFICATION: RESTRICTED • AUTHORIZED PERSONNEL ONLY • EXPORT CONTROLLED
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;