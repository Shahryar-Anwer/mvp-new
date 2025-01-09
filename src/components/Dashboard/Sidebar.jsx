import React, { useState } from "react";
import {
  Home,
  Users,
  Settings,
  Menu,
  X,
  BarChart2,
  Mail,
  ChevronDown,
  Folder,
  FileText,
  PieChart,
  TrendingUp,
  Calendar,
  Target,
} from "lucide-react";

const navItems = [{ icon: FileText, label: "Backups", href: "#" }];

const projectItems = [
  { label: "Database 1", href: "#" },
  { label: "Database 2", href: "#" },
  { label: "Database 3", href: "#" },
];

const reportItems = [
  { label: "Performance", href: "#" },
  { label: "Statistics", href: "#" },
  { label: "Monthly Review", href: "#" },
];
export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [reportsOpen, setReportsOpen] = useState(false);

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
                  <a
                    href={item.href}
                    className="flex items-center gap-4 px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-md transition-colors"
                  >
                    <item.icon size={20} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </a>
                </li>
              ))}

              {/* Projects Dropdown */}
              <li>
                <button
                  onClick={() => setProjectsOpen(!projectsOpen)}
                  className="w-full flex items-center justify-between gap-4 px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-md transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <Folder size={20} />
                    <span className="text-sm font-medium">Databases</span>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`transform transition-transform duration-200 ${
                      projectsOpen ? "rotate-180" : ""
                    }`}
                  />
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
          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="User"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-gray-400">john@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
