import React from 'react'
import { useTranslation } from 'react-i18next';
import { FaWhatsapp } from 'react-icons/fa'

const WhatsappIcon = () => {
    const { i18n } = useTranslation();
    const isRTL = i18n.language === "ar";


  return (
    <>
        {/* Whatsapp */}
        <a
            href="https://wa.me/920020535"
            aria-label="Whatsapp"
            target="_blank"
            rel="noopener noreferrer"
            className={`fixed 
                bottom-2 md:bottom-6  
                ${isRTL ? 'right-2 md:right-8' : 'left-2 md:left-8' }
                text-5xl bg-green-600 hover:scale-110 transition p-2 md:p-3 rounded-full shadow-md z-50`
        }
        >
            <FaWhatsapp className="w-6 sm:w-8 h-6 md:h-8 text-white" />
        </a>
    </>
  )
}

export default WhatsappIcon