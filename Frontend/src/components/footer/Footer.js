// import React from 'react';
// import { Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';
// import logo from '../../assets/HosLogo.jpeg';
// import { Link } from 'react-router-dom';

// function Footer({ className }) {
//     const sections = [
//         {
//             title: 'Services',
//             links: [
//                 { text: 'Book Appointment', href: '/book-appointment', target: '_blank' },
//                 { text: 'Find Doctors', href: '/find-doctors', target: '_blank' },
//                 { text: 'Hospital Directory', href: '/hospital-directory', target: '_blank' },
//                 { text: 'Patient Support', href: '/patient-support', target: '_blank' },
//             ],
//         },
//         {
//             title: 'Resources',
//             links: [
//                 { text: 'Health Tips', href: '/health-tips', target: '_blank' },
//                 { text: 'FAQs', href: '/faq', target: '_blank' },
//                 { text: 'Insurance Partners', href: '/insurance-partners', target: '_blank' },
//                 { text: 'Feedback', href: '/feedback', target: '_blank' },
//             ],
//         },
//         {
//             title: 'Support',
//             links: [
//                 { text: 'Contact Us', href: '/contact', target: '_blank' },
//                 { text: 'Privacy Policy', href: '/privacy-policy', target: '_blank' },
//                 { text: 'Terms of Service', href: '/terms-of-service', target: '_blank' },
//                 { text: 'Help Center', href: '/help-center', target: '_blank' },
//             ],
//         },
//     ];

//     return (
//         <footer className={`bg-gray-900 text-white ${className}`}>
//             <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
//                 <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//                     <div className="space-y-8">
//                         <div className="flex items-center space-x-2">
//                             <Link to='/' className='flex items-center'>
//                                 <img src={logo} alt="HAMS Logo" className='rounded-3xl max-h-12 max-w-20' />
//                                 <span className="text-4xl font-bold pl-3 text-transparent bg-gradient-to-r from-[#ffad4f] to-[#03e2f6] bg-clip-text">HAMS</span>
//                             </Link>
//                         </div>
//                         <p className="text-gray-400">
//                             Simplifying hospital appointments and providing seamless healthcare management solutions for everyone.
//                         </p>
//                         <SocialLinks />
//                     </div>

//                     {sections.map((section) => (
//                         <FooterSection
//                             key={section.title}
//                             title={section.title}
//                             links={section.links}
//                         />
//                     ))}
//                 </div>

//                 <div className="mt-12 pt-8 border-t border-gray-800">
//                     <p className="text-center text-gray-400">
//                         © {new Date().getFullYear()} HAMS. All rights reserved.
//                     </p>
//                 </div>
//             </div>
//         </footer>
//     );
// }

// function FooterSection({ title, links }) {
//     return (
//         <div className="flex flex-col space-y-4">
//             <h3 className="text-lg font-semibold text-white">{title}</h3>
//             <ul className="space-y-2">
//                 {links.map((link) => (
//                     <li key={link.text}>
//                         <a
//                             href={link.href}
//                             className="text-gray-300 hover:text-white transition-colors"
//                             target={link.target}
//                         >
//                             {link.text}
//                         </a>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// function SocialLinks() {
//     const socialLinks = [
//         { Icon: Facebook, href: '#', label: 'Facebook' },
//         { Icon: Twitter, href: '#', label: 'Twitter' },
//         { Icon: Linkedin, href: '#', label: 'LinkedIn' },
//         { Icon: Instagram, href: '#', label: 'Instagram' },
//         { Icon: Youtube, href: '#', label: 'YouTube' },
//     ];

//     return (
//         <div className="flex space-x-4">
//             {socialLinks.map(({ Icon, href, label }) => (
//                 <a
//                     key={label}
//                     href={href}
//                     className="text-gray-400 hover:text-white transition-colors"
//                     aria-label={label}
//                 >
//                     <Icon className="w-5 h-5" />
//                 </a>
//             ))}
//         </div>
//     );
// }

// export default Footer;


import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';
import logo from '../../assets/HosLogo.jpeg';
import { Link } from 'react-router-dom';

function Footer({ className }) {
    const sections = [
        {
            title: 'Services',
            links: [
                { text: 'Book Appointment', href: '/book-appointment', target: '_blank' },
                { text: 'Find Doctors', href: '/find-doctors', target: '_blank' },
                { text: 'Hospital Directory', href: '/hospital-directory', target: '_blank' },
                { text: 'Patient Support', href: '/patient-support', target: '_blank' },
            ],
        },
        {
            title: 'Resources',
            links: [
                { text: 'Health Tips', href: '/health-tips', target: '_blank' },
                { text: 'FAQs', href: '/faq', target: '_blank' },
                { text: 'Insurance Partners', href: '/insurance-partners', target: '_blank' },
                { text: 'Feedback', href: '/feedback', target: '_blank' },
            ],
        },
        {
            title: 'Support',
            links: [
                { text: 'Contact Us', href: '/contact', target: '_blank' },
                { text: 'Privacy Policy', href: '/privacy-policy', target: '_blank' },
                { text: 'Terms of Service', href: '/terms-of-service', target: '_blank' },
                { text: 'Help Center', href: '/help-center', target: '_blank' },
            ],
        },
    ];

    return (
        <footer className={`bg-gray-900 text-white ${className}`}>
            <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4  gap-8">
                    {/* Logo and Description Section */}
                    <div className="space-y-8">
                        <div className="flex items-center space-x-2">
                            <Link to='/' className='flex items-center'>
                                <img src={logo} alt="HAMS Logo" className='rounded-3xl max-h-12 max-w-20' />
                                <span className="text-4xl font-bold pl-3 text-transparent bg-gradient-to-r from-[#ffad4f] to-[#03e2f6] bg-clip-text">HAMS</span>
                            </Link>
                        </div>
                        <p className="text-gray-400 text-sm md:text-base">
                            Simplifying hospital appointments and providing seamless healthcare management solutions for everyone.
                        </p>
                        <SocialLinks />
                    </div>

                    {/* Sections for Services, Resources, and Support */}
                    {sections.map((section) => (
                        <FooterSection
                            key={section.title}
                            title={section.title}
                            links={section.links}
                        />
                    ))}
                </div>

                {/* Bottom Copyright Section */}
                <div className="mt-12 pt-8 border-t border-gray-800">
                    <p className="text-center text-gray-400 text-sm md:text-base">
                        © {new Date().getFullYear()} HAMS. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

function FooterSection({ title, links }) {
    return (
        <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <ul className="space-y-2">
                {links.map((link) => (
                    <li key={link.text}>
                        <a
                            href={link.href}
                            className="text-gray-300 hover:text-white transition-colors text-sm md:text-base"
                            target={link.target}
                            rel="noopener noreferrer"
                        >
                            {link.text}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function SocialLinks() {
    const socialLinks = [
        { Icon: Facebook, href: '#', label: 'Facebook' },
        { Icon: Twitter, href: '#', label: 'Twitter' },
        { Icon: Linkedin, href: '#', label: 'LinkedIn' },
        { Icon: Instagram, href: '#', label: 'Instagram' },
        { Icon: Youtube, href: '#', label: 'YouTube' },
    ];

    return (
        <div className="flex space-x-4">
            {socialLinks.map(({ Icon, href, label }) => (
                <a
                    key={label}
                    href={href}
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label={label}
                >
                    <Icon className="w-5 h-5" />
                </a>
            ))}
        </div>
    );
}

export default Footer;
