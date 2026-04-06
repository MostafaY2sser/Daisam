import React from 'react'
import { useTranslation } from 'react-i18next';
import { FiX } from 'react-icons/fi';
import { NavLink, Outlet } from 'react-router-dom'

export const Sidebar = ( { sidebarOpen, setSidebarOpen } ) => {

    const { i18n, t } = useTranslation();
    const isRTL = i18n.language === "ar";

    return (
        <>
            {/* Sidebar for desktop */}
            <aside className={`hidden sm:block w-64 bg-white shadow-lg fixed top-0 ${isRTL? 'right-0' : 'left-0'} h-full z-10 mt-24`}>
                <nav className="p-4 space-y-2">
                    <NavLink
                        to="/dashboard"
                        end
                        className={({ isActive }) =>
                            `block p-2 rounded hover:bg-gray-400 hover:text-white ${isActive ? 'bg-primary text-white' : ''}`
                        }
                        >
                        {t('home')}
                    </NavLink>
                    <NavLink
                        to="/dashboard/projects-dashboard"
                        end
                        className={({ isActive }) =>
                            `block p-2 rounded hover:bg-gray-400 hover:text-white ${isActive ? 'bg-primary text-white' : ''}`
                        }
                        >
                        {t('projects')}
                    </NavLink>

                </nav>
            </aside>

            {/* Sidebar overlay for mobile */}
            <div
                className={`fixed inset-0 z-50 bg-black bg-opacity-40 transition-opacity duration-300 sm:hidden ${sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setSidebarOpen(false)}
            ></div>

            {/* Mobile Sidebar from RIGHT */}
            <aside
                className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 sm:hidden
                ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
            <div className="flex items-center justify-between p-4 border-b">
                <span className="font-bold text-lg">Menu</span>
                <button onClick={() => setSidebarOpen(false)} className="text-2xl">
                <FiX />
                </button>
            </div>
            <nav className="p-4 space-y-2">
                <NavLink
                to="/dashboard"
                end
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                    `block p-2 rounded hover:bg-gray-200 ${isActive ? 'bg-primary text-text' : ''}`
                }
                >
                {t('home')}
                </NavLink>

                <NavLink
                to="/dashboard/projects-dashboard"
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                    `block p-2 rounded hover:bg-gray-300 hover:text-primary ${isActive ? 'bg-primary text-text' : ''}`
                }
                >
                {t('المشاريع')}
                </NavLink>

            </nav>
            </aside>
        </>
            
    )
}
