import React, { useState, useRef, useEffect } from "react";
import {
  Home,
  Users,
  Settings,
  Menu,
  X,
  BarChart2,
  ChevronDown,
  Folder,
  FileText,
  LogOut,
} from "lucide-react";

const navItems = [
  { icon: Home, label: "Register Database", action: "register" },
  { icon: FileText, label: "Backup", action: "backup" },
];

const projectItems = [
  { label: "Active Projects", href: "#" },
  { label: "Project Timeline", href: "#" },
  { label: "Project Goals", href: "#" },
];

const reportItems = [
  { label: "Performance", href: "#" },
  { label: "Statistics", href: "#" },
  { label: "Monthly Review", href: "#" },
];

export default function Sidebar({
  onRegisterDb,
  onBackupDb,
  onBackupDatabases,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);

  const handleLogout = () => {
    console.log("Logging out...");
    // Add your logout logic here
  };

  const DropdownItem = ({ label, href }) => (
    <a
      href={href}
      className="flex items-center pl-12 py-2 text-sm text-gray-300 hover:bg-gray-800 rounded-md transition-colors"
    >
      {label}
    </a>
  );

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
            <h1 className="text-2xl font-bold">MyApp</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4">
            <ul className="space-y-2">
              {/* Regular Menu Items */}
              {navItems.map((item) => (
                <li key={item.label}>
                  {item.action === "register" ? (
                    <button
                      onClick={onRegisterDb}
                      className="w-full flex items-center gap-4 px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-md transition-colors"
                    >
                      <item.icon size={20} />
                      <span className="text-sm font-medium">{item.label}</span>
                    </button>
                  ) : item.action === "backup" ? (
                    <button
                      onClick={onBackupDb}
                      className="w-full flex items-center gap-4 px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-md transition-colors"
                    >
                      <item.icon size={20} />
                      <span className="text-sm font-medium">{item.label}</span>
                    </button>
                  ) : (
                    <a
                      href={item.href}
                      className="flex items-center gap-4 px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-md transition-colors"
                    >
                      <item.icon size={20} />
                      <span className="text-sm font-medium">{item.label}</span>
                    </a>
                  )}
                </li>
              ))}

              {/* Projects Dropdown */}
              <li>
                <button
                  onClick={() => {
                    onBackupDatabases();
                  }}
                  className="w-full flex items-center justify-between gap-4 px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-md transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <Folder size={20} />
                    <span className="text-sm font-medium">Databases</span>
                  </div>
                  {/* <ChevronDown
                    size={16}
                    className={`transform transition-transform duration-200 ${
                      projectsOpen ? "rotate-180" : ""
                    }`}
                  /> */}
                </button>
                <div
                  className={`mt-1 overflow-hidden transition-all duration-200 ease-in-out ${
                    projectsOpen ? "max-h-48" : "max-h-0"
                  }`}
                >
                  {projectItems.map((item) => (
                    <DropdownItem key={item.label} {...item} />
                  ))}
                </div>
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

              {/* Profile Menu */}
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
