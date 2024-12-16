import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { faqData } from "../data/FaqData";

const FAQ = () => {
    const [openFAQ, setOpenFAQ] = useState(null);

    const toggleFAQ = (id) => {
        setOpenFAQ(openFAQ === id ? null : id);
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-cyan-50 to-orange-50">
            <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="text-center mb-6">
                    <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-700 to-cyan-800">
                        Frequently Asked Questions
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl text-orange-500">
                        Find answers to common questions about our services
                    </p>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8">
                    <div className="divide-y divide-orange-200">
                        {faqData.map((item) => (
                            <div
                                key={item.id}
                                className={`border-b border-orange-200 rounded-md mb-4 sm:mb-5 shadow-sm hover:shadow-lg transition-transform duration-300 ${
                                    openFAQ === item.id ? "bg-gradient-to-r from-orange-50 to-cyan-50" : "bg-white"
                                }`}
                            >
                                <button
                                    className="w-full py-6 sm:py-7 text-left flex justify-between items-center focus:outline-none group px-4 sm:px-6"
                                    onClick={() => toggleFAQ(item.id)}
                                >
                                    <span className="text-lg sm:text-xl font-medium text-orange-700 group-hover:text-orange-900 transition-colors duration-300">
                                        {item.question}
                                    </span>
                                    {openFAQ === item.id ? (
                                        <ChevronUp className="h-5 w-5 text-orange-500 group-hover:text-orange-700 transition-all duration-300" />
                                    ) : (
                                        <ChevronDown className="h-5 w-5 text-orange-500 group-hover:text-orange-700 transition-all duration-300" />
                                    )}
                                </button>
                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                        openFAQ === item.id ? "max-h-96 pb-6" : "max-h-0"
                                    }`}
                                >
                                    <p className="text-gray-700 px-6 pb-4 sm:px-8">{item.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQ;
