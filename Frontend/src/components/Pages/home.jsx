import React, { useState } from 'react';
import Navbar from '../Navbar/navbar'
import LandingPage from './LandingPage';
import { motion } from 'framer-motion';
import logo from '../../components/images/Logo.png'

function home() {
  const [ImgSize, setImgSize] = useState(false)
  return (
    <>
      <div style={{marginBottom:"1rem"}} className="min-h-screen w-full flex flex-col items-center justify-center bg-white">
        
        {/* Hero Section */}
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-20 grid lg:grid-cols-2 gap-15 items-center">
            {/* Left Column */}
            <div className="space-y-8  ">
              <div style={{ overflow: "hidden" }}>
                <h1
                  style={{ marginTop: "6vh" }}
                  className="text-5xl font-bold text-gray-900 leading-tight flex flex-col"
                >
                  The Best Online
                  <span className="flex items-center gap-2">
                    {/* Motion Box */}
                    <motion.span
                      initial={{ width: "0vw" }}
                      animate={{ width: "6vw" }}
                      transition={{ ease: [0.76, 0, 0.24, 1], duration: 2.5 }}
                      style={{
                        marginTop: "1.5vh",
                        height: "4vw",
                        borderRadius: "0.375rem",
                        backgroundColor: 'green',
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "0",
                      }}
                    ><img className='h-[7vw] w-8xl' src={logo} alt="" /> </motion.span>

                    {/* Text next to motion box */}
                    Resume Analyzer
                  </span>
                </h1>
              </div>
              <p style={{ marginTop: "15px", marginBottom: "15px" }} className="text-xl text-gray-600">
                Easily create a resume for any job using our best-in-class resume analyzer platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button style={{ paddingInline: "4vw", paddingBlock: "2vh" }} className="bg-orange-500 text-white rounded-full px-8 py-4 font-semibold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20">
                  Create My Resume Now
                </button>
                <button style={{ paddingInline: "4vw", paddingBlock: "2vh" }} className="bg-white text-orange-500 border-2 border-orange-500 rounded-full px-8 py-4 font-semibold hover:bg-purple-500 hover:text-white transition-colors">
                  Import Resume
                </button>
              </div>

              {/* Stats */}
              <div style={{ marginBlock: "6vh" }} className="grid grid-cols-2 gap-8 pt-8">
                <div>
                  <div className="flex flex-col items-center text-purple-600  justify-center">
                    <span className="text-4xl font-bold">↑ 38%</span>
                    <p style={{ marginBlock: "1vh" }} className="text-gray-600 mt-2">more interviews</p>
                  </div>

                </div>
                <div>
                  <div className="flex flex-col items-center text-purple-600  justify-center">
                    <span className="text-4xl font-bold">↑ 23%</span>
                    <p style={{ marginBlock: "1vh" }} className="text-gray-600 mt-2">more likely to<br />get a job offer</p>
                  </div>

                </div>
              </div>

              {/* Companies */}
              <div className="pt-8">
                <p style={{ marginBlock: "2vh" }} className="text-sm text-gray-500 mb-6">Subscribers have been hired by: *</p>
                <div className="grid grid-cols-5 gap-8 items-center opacity-75">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png" alt="Google" className="h-7 object-contain" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png" alt="Amazon" className="h-7 object-contain" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Deloitte.svg/2560px-Deloitte.svg.png" alt="Deloitte" className="h-7 object-contain" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/JPMorgan_Chase_logo_2008.svg/2560px-JPMorgan_Chase_logo_2008.svg.png" alt="JP Morgan" className="h-7 object-contain" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/2560px-Meta_Platforms_Inc._logo.svg.png" alt="Meta" className="h-7 object-contain" />
                </div>
              </div>
            </div>

            {/* Right Column - Resume Preview */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-pink-200 rounded-3xl transform rotate-6"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
                <img onMouseEnter={() => setImgSize(true)} onMouseLeave={() => setImgSize(false)}
                  style={{ transform: `scale(${ImgSize ? 1.1 : 1.0})`, transition: "transform 0.2s ease-in 0.2s" }}
                  src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80"
                  alt="Resume Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <LandingPage/>
    </>

  );
}

export default home;