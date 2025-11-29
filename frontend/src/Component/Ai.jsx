import React, { useContext, useState, useRef, useEffect, useCallback } from "react";
import { FaMicrophoneAlt } from "react-icons/fa";
import { ShopDataContext } from "../Context/ShopContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import open from "../assets/open.mp3";
import { motion } from "framer-motion"; 



function Ai() {
  const { showSearch, setShowSearch } = useContext(ShopDataContext);
  const navigate = useNavigate();
  const [activeAi, setActiveAi] = useState(false);
  const openingSoundRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => { openingSoundRef.current = new Audio(open); }, []);

  const speak = useCallback((message) => {
    try {
      const utter = new SpeechSynthesisUtterance(message);
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utter);
    } catch (error) { console.log("Speech error", error); }
  }, []);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN"; 
    recognitionRef.current = recognition;

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript.toLowerCase().trim();
      console.log("Voice:", transcript);
      if (transcript.includes("home")) { speak("Going home"); navigate("/"); }
      else if (transcript.includes("cart")) { speak("Opening cart"); navigate("/cart");    
       }
          else if (transcript.includes("collection")) { speak("Opening collection"); navigate("/collection");
        
       }
      else if (transcript.includes("shop")) { speak("Opening shop"); navigate("/collection"); }
      else if (transcript.includes("contact")) { speak("Opening contact"); navigate("/contact"); }
      else if (transcript.includes("about")) { speak("Opening about"); navigate("/about"); }
      else if (transcript.includes("order")) { speak("Opening order"); navigate("/order");


       }
      else { speak("Didn't catch that."); }
    };
    recognition.onend = () => setActiveAi(false);
  }, [navigate, speak]); 

  const startRecognition = async () => {
    try { openingSoundRef.current.play().catch(()=>{}); } catch (err) {}
    if (recognitionRef.current) { setActiveAi(true); recognitionRef.current.start(); } 
    else { toast.error("Voice not supported."); }
  };

  return (
    // ✅ FIX: Mobile pe bottom-40 (High enough), Desktop pe bottom-24
    // ✅ DRAG ENABLED
    <motion.div
      drag
      dragMomentum={false}
      className="fixed bottom-[160px] md:bottom-24 right-6 z-[90]"
    >
      <div
        onClick={startRecognition}
        className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center cursor-pointer shadow-lg border border-gray-100 transition-all duration-300 relative
          ${activeAi ? "bg-teal-50 scale-110 ring-4 ring-teal-200" : "bg-white hover:bg-gray-50 hover:-translate-y-1"}
        `}
      >
        {activeAi && <span className="absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-20 animate-ping"></span>}
        <FaMicrophoneAlt className={`text-xl sm:text-2xl transition-colors duration-300 ${activeAi ? 'text-teal-600 animate-pulse' : 'text-gray-600'}`} />
      </div>
    </motion.div>
  );
}

export default Ai;