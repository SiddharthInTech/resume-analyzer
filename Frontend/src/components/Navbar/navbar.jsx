import React,{useEffect,useRef} from 'react'
import {gsap} from 'gsap';

const Navbar = () => {
    const gsapref = useRef(null);
 
    useEffect(() => {
      gsap.from(gsapref.current,{
        y:50,
        opacity:0.5,
        duration:1,
        delay:1
      })
    
    }, [])
    
    

    return (
        <div style={{display:"flex"}} className='min-w-full h-30 flex items-center justify-center fixed top-0 left-0 shadow-lg bg-white'>
            <nav style={{ marginInline: "3vw" }} className="flex min-w-[calc(100%-1vw)] items-center justify-between px-8 py-4 h-25 shadow-m bg-white">
                {/* Logo Section */}
                <div style={{position:"relative"}} className="flex items-center space-x-4 logo position-relative">
                    <div style={{ marginInline: "1vw" }} className="w-10 h-10 mx-10 bg-gradient-to-r m-3 from-purple-500 to-pink-500 rounded-md"></div>
                    <span  className="text-2xl font-bold text-purple-600">Resume Analyzer</span>
                </div>

                {/* Navigation Links */}
                <div style={{ marginInline: "4vw" }} className="flex space-x-6 h-6 gap-[2vw] text-gray-700 font-medium"  >
                    <a style={{ marginInline: "1vw" }} href="#" className="hover:text-purple-500" >Resume Analyzer App</a>
                    <a style={{ marginInline: "1vw" }} href="#" className="hover:text-purple-500">Resume Examples</a>
                    <a style={{ marginInline: "1vw" }} href="#" className="hover:text-purple-500">Resume Templates</a>
                    <a style={{ marginInline: "1vw" }} href="#" className="hover:text-purple-500">Resume Suggestions</a>
                </div>

                {/* Button */}
                <button style={{
                    padding: "1vw",
                    paddingInline: "2vw",
                    marginInline: "2vw"

                }} className="px-10 py-4 border-2 border-orange-400 text-orange-500 font-semibold rounded-lg hover:bg-purple-500 hover:text-white transition">
                     My Resume
                </button>
            </nav>
        </div>
    );
}



export default Navbar
