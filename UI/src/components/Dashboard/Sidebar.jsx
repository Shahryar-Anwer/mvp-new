import React, { useState, useRef } from "react";
import { Home, FileText, Folder, Menu, X, LogOut } from "lucide-react";

const navItems = [
  { icon: Home, label: "Register Database", action: "register" },
  { icon: FileText, label: "Backup", action: "backup", status: "coming-soon" },
];

export default function Sidebar({
  onRegisterDb,
  onBackupDb,
  onBackupDatabases,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);

  const handleLogout = () => {
    console.log("Logging out...");
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-800 text-white"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white transition-all duration-300 ease-in-out ${
          isOpen ? "w-64" : "w-0 lg:w-64"
        } overflow-y-auto`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6">
            <h1 className="text-2xl font-bold">BackupHub </h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={
                      item.action === "register"
                        ? onRegisterDb
                        : item.action === "backup"
                        ? onBackupDb
                        : undefined
                    }
                    className="w-full flex items-center gap-4 px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-md transition-colors"
                  >
                    <item.icon size={20} />
                    <span className="text-sm font-medium">{item.label}</span>
                    {item.status === "coming-soon" && (
                      <span className="ml-2 text-xs font-semibold text-red-500">
                        Coming Soon
                      </span>
                    )}
                  </button>
                </li>
              ))}

              {/* Databases */}
              <li>
                <button
                  onClick={onBackupDatabases}
                  className="w-full flex items-center justify-between gap-4 px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-md transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <Folder size={20} />
                    <span className="text-sm font-medium">Databases</span>
                  </div>
                </button>
              </li>
            </ul>
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-800" ref={profileMenuRef}>
            <div className="relative">
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center gap-4 w-full hover:bg-gray-800 p-2 rounded-lg transition-colors"
              >
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="User"
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-gray-400">john@example.com</p>
                </div>
              </button>

              {profileMenuOpen && (
                <div className="absolute bottom-full left-0 w-full mb-2 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-gray-700 transition-colors"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
