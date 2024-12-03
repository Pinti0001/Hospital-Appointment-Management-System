import React from 'react'
import image1 from '../../assets/who.svg';
import image2 from '../../assets/aims.png';
import image3 from '../../assets/gdpr.svg';
import image4 from '../../assets/hippa.svg';
import image5 from '../../assets/ministryofhealth.svg';
import image6 from '../../assets/natinalhm.jpg';
import image7 from '../../assets/aadhar.png';
import image8 from '../../assets/soc.svg';
import image9 from '../../assets/sii.jpeg';

const CollabAndSupport = () => {
    return (
        <div className='container mx-auto my-5 mt-12 py-2'>
            <div className="text-center mb-8">
                <h2 className='text-4xl font-bold'>Collaboration and Supporter</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-9 p-6">
            <img className='lazyloaded h-32' src={image1} alt="who" width="170px" height="63px" />
            <img className='lazyloaded h-32' src={image2} alt="who" width="140px" height="63px" />
            <img className='lazyloaded h-32' src={image3} alt="who" width="190px" height="63px" />
            <img className='lazyloaded h-32' src={image4} alt="who" width="190px" height="63px" />
            <img className='lazyloaded h-32' src={image7} alt="who" width="190px" height="63px" />
            <img className='lazyloaded h-32' src={image5} alt="who" width="190px" height="63px" />
            <img className='lazyloaded h-32' src={image8} alt="who" width="190px" height="63px" />
            <img className='lazyloaded h-32' src={image9} alt="who" width="140px" height="63px" />
            <img className='lazyloaded h-32' src={image6} alt="who" width="190px" height="63px" />
            </div>
        </div>
    )
}

export default CollabAndSupport
