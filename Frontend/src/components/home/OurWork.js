import React from 'react';
import { UserPlus, Building2, CalendarCheck, MessageSquare, Check } from 'lucide-react';

const OurWork = () => {
  const steps = [
    {
      icon: <UserPlus className="w-8 h-8" />,
      title: "Register/Login",
      subtitle: "रजिस्टर/लॉगिन",
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "Select Hospital And Doctor",
      subtitle: "अस्पताल और डॉक्टर का चयन करें",
    },
    {
      icon: <CalendarCheck className="w-8 h-8" />,
      title: "Fill Appointment Form",
      subtitle: "अपॉइंटमेंट फॉर्म भरें",
    },
    {
      icon: <Check className="w-8 h-8" />,
      title: "Get Primary Treatment from AI  ",
      subtitle: "AI के माध्यम से प्राथमिक उपचार प्राप्त करें",
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Wait for Confirmation",
      subtitle: "पुष्टिकरण का इंतजार करें",
    },
  ];

  return (
    <section className="py-16 px-8 bg-gray-50">
      <h2 className="text-5xl font-semibold text-center mb-12">
        How We Works
      </h2>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 gap-8">
          {/* First row - 3 cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
            {steps.slice(0, 3).map((step, index) => (
              <div key={index} className="relative">
                <div className="p-6 bg-white shadow-lg text-center rounded-xl hover:shadow-xl transition-shadow duration-300">
                  <div className="text-orange-500 mb-4 flex justify-center">{step.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.subtitle}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-12 transform -translate-y-1/2">
                    <div className="text-blue-600  text-5xl">→</div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Vertical arrow */}
          <div className="hidden md:flex justify-center">
            <div className="text-blue-600 text-5xl">↓</div>
          </div>
          
          {/* Second row - 2 cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:w-2/3 mx-auto relative">
            {steps.slice(3).map((step, index) => (
              <div key={index} className="relative">
                <div className="p-6 bg-white shadow-lg text-center rounded-xl hover:shadow-xl transition-shadow duration-300">
                  <div className="text-orange-500 mb-4 flex justify-center ">{step.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 ">{step.title}{index === 0 ? <span className='text-red-600'>(If You Want)</span> : ''} </h3>
                  <p className="text-gray-600">{step.subtitle}</p>
                </div>
                {index === 0 && (
                  <div className="hidden md:block absolute top-1/2 -right-16 transform -translate-y-1/2">
                    <div className="text-blue-600 text-5xl">→</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurWork;
