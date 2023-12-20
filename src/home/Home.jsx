import React from 'react';
import { Link } from 'react-router-dom';
import backimg from '../city-bus-concept-illustration_114360-11574.avif'
const Home = () => {
      return (
            <div className='relative bg-cover bg-center h-screen' style={{backgroundImage: `url(${backimg})`}}>
            <div className='absolute inset-0 bg-black opacity-50'></div>
            <div className='absolute inset-0 flex flex-col items-center justify-center'>
                <h1 className='text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold text-white text-center'>
                    Welcome to Eco-Travels
                </h1>
                <br />
                <Link to='/signin' className='text-white'>Before book sign in first</Link>
                <div className='mt-8'>
                   
                    <Link to='/bookings' className='btn btn-outline bg-purple-300 text-white'>
                        Book a Ticket
                    </Link>
                </div>
            </div>
        </div>
        
      );
};

export default Home;