import { useState, useRef, useEffect } from "react";
import { HiMenu, HiX, HiChevronDown } from "react-icons/hi";
import logoSrc from "../assets/logo.png";

interface DropdownItem {
  name: string;
  href: string;
  external?: boolean;
  download?: boolean;
  downloadFile?: string;
}

interface NavLink {
  name: string;
  href: string;
  dropdown?: DropdownItem[];
}

const links: NavLink[] = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Services",
    href: "#services",
    dropdown: [
      {
        name: "SSB INTERVIEW TRAINING",
        href: "#services"
      },
      {
        name: "PERSONALITY PROFILING & CAREER GUIDANCE (SCHOOLS)",
        href: "#services"
      },
      {
        name: "CORPORATE TRAINING",
        href: "#services"
      },
      {
        name: "Civil Services Interview Preparation",
        href: "#services"
      }
    ]
  },
  {
    name: "Mentors",
    href: "#mentors",
  },
  {
    name: "Projects",
    href: "#projects",
  },
  {
    name: "Brochure",
    href: "#",
    dropdown: [
      {
        name: "SSB ONLINE",
        href: "#",
        download: true,
        downloadFile: "SSB & Life Skills.pdf"
      },
      {
        name: "SSB OFFLINE",
        href: "#",
        download: true,
        downloadFile: "SSB & Life Skills.pdf"
      },
      {
        name: "SCHOOLS",
        href: "https://drive.google.com/file/d/1-lupK053cfP2IIDao9QDpCvejJimffbG/view?usp=sharing",
        external: true
      }
    ]
  },
  {
    name: "Contact",
    href: "#",
    dropdown: [
      {
        name: "SSB INTERVIEW TRAINING",
        href: "https://forms.gle/jcUHXwXKafQp5ChS9",
        external: true
      },
      {
        name: "PERSONALITY PROFILING & CAREER GUIDANCE (SCHOOLS)",
        href: "https://docs.google.com/forms/d/e/1FAIpQLSe-Oo1icYKLPNlitYoHo9B_BRyZzkLHHv4lcpirn-_WUqwIaw/viewform?usp=sharing",
        external: true
      },
      {
        name: "CORPORATE TRAINING",
        href: "https://forms.gle/Y8U7w8xQMWR126eYA",
        external: true
      },
      {
        name: "Civil Services Interview Preparation",
        href: "https://forms.gle/jcUHXwXKafQp5ChS9",
        external: true
      }
    ]
  }
];

interface NavbarProps {
  onServiceSelect: (service: string | null) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onServiceSelect }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const dropdownRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (activeDropdown !== null && 
          dropdownRefs.current[activeDropdown] && 
          !dropdownRefs.current[activeDropdown]?.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeDropdown]);

  const handleDownload = (filename: string) => {
    const link = document.createElement('a');
    link.href = '/SSB & Life Skills.pdf';
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsOpen(false);
    setActiveDropdown(null);
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, external?: boolean, serviceName?: string, download?: boolean, downloadFile?: string) => {
    if (download && downloadFile) {
      e.preventDefault();
      handleDownload(downloadFile);
      return;
    }
    
    if (external) return; // Don't prevent default for external links
    
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (href && href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
        setActiveDropdown(null);
        if (serviceName) {
          onServiceSelect(serviceName);
        }
      }
    }
  };

  const toggleDropdown = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <div className="w-full bg-white/90 shadow-md relative z-50">
      <div className="h-24 max-w-7xl mx-auto flex justify-between items-center px-4">
        <div className="flex items-center gap-4">
          <img src={logoSrc} alt="Logo" className="h-24 w-auto" />
          <div className="flex flex-col">
            <p className="text-base font-bold text-[#2d4b41] tracking-wide">
              #L2L2L
            </p>
            <p className="text-sm text-[#718979] italic">
              learn to live to learn
            </p>
          </div>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex gap-8 items-center">
          {links.map((link, index) => (
            <div 
              key={index} 
              className="relative" 
              ref={el => { dropdownRefs.current[index] = el; }}
            >
              {link.dropdown ? (
                <>
                  <button
                    onClick={(e) => toggleDropdown(index, e)}
                    className="flex items-center gap-1 text-[#2d4b41] font-medium hover:text-[#718979] transition-colors duration-200 text-lg"
                  >
                    {link.name}
                    <HiChevronDown className={`transition-transform duration-200 ${activeDropdown === index ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div className={`absolute top-full left-0 mt-2 w-72 bg-white shadow-lg rounded-md py-2 transition-all duration-200 ${
                    activeDropdown === index ? 'opacity-100 visible' : 'opacity-0 invisible'
                  }`}>
                    {link.dropdown.map((item, idx) => (
                      <a
                        key={idx}
                        href={item.href}
                        onClick={(e) => handleClick(e, item.external, item.name, item.download, item.downloadFile)}
                        target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noopener noreferrer" : undefined}
                        className="block px-4 py-2 text-[#2d4b41] hover:bg-gray-100 hover:text-[#718979] transition-colors duration-200"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </>
              ) : (
                <a
                  href={link.href}
                  onClick={(e) => handleClick(e)}
                  className="relative group text-[#2d4b41] font-medium hover:text-[#718979] transition-colors duration-200 text-lg"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#718979] group-hover:w-full transition-all duration-300"></span>
                </a>
              )}
            </div>
          ))}
          
          
<a 
  href="https://forms.gle/43eTPUHfqsr23o3n9" 
  target="_blank" 
  rel="noopener noreferrer" 
  className="bg-[#2c4d42] hover:bg-[#718979] text-white font-semibold px-6 py-2 rounded-full transition-colors duration-200 whitespace-nowrap flex items-center justify-center"
>
  Get Started
</a>

        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-[#2d4b41] p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden absolute w-full bg-white shadow-lg transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col items-center py-6 space-y-5">
          {links.map((link, index) => (
            <div key={index} className="w-full flex flex-col items-center">
              {link.dropdown ? (
                <>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveDropdown(activeDropdown === index ? null : index);
                    }}
                    className="flex items-center justify-center gap-1 text-[#2d4b41] font-medium hover:text-[#718979] transition-colors duration-200 text-lg"
                  >
                    {link.name}
                    <HiChevronDown className={`transition-transform duration-200 ${activeDropdown === index ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Mobile Dropdown Menu */}
                  <div className={`w-full flex flex-col items-center transition-all duration-200 overflow-hidden ${
                    activeDropdown === index ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'
                  }`}>
                    {link.dropdown.map((item, idx) => (
                      <a
                        key={idx}
                        href={item.href}
                        onClick={(e) => handleClick(e, item.external, item.name, item.download, item.downloadFile)}
                        target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noopener noreferrer" : undefined}
                        className="py-2 text-[#2d4b41] hover:text-[#718979] transition-colors duration-200 text-base"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </>
              ) : (
                <a
                  href={link.href}
                  onClick={(e) => handleClick(e)}
                  className="text-[#2d4b41] font-medium hover:text-[#718979] transition-colors duration-200 text-lg whitespace-nowrap"
                >
                  {link.name}
                </a>
              )}
            </div>
          ))}
          <a href="https://forms.gle/43eTPUHfqsr23o3n9" target="_blank" rel="noopener noreferrer" className="bg-[#2c4d42] hover:bg-[#718979] text-white font-semibold px-7 py-3 rounded-full transition-colors duration-200">
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;