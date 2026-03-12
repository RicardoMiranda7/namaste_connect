import {NavLink, Outlet, useNavigate} from "react-router";
import {Calendar, LogOut, Menu, Users, X} from "lucide-react"; // Added X icon
import {useState} from "react";
import {api} from "../services/mockApi";
import {Button} from "./ui";
import {ROUTES} from "../constants/routes.ts";

export function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const navigate = useNavigate();

  const closeMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsMobileMenuOpen(false);
      setIsClosing(false);
    }, 300);
  };

  const handleLogout = async () => {
    await api.logout();
    navigate(ROUTES.LOGIN);
  };

  return (
      <div className="flex h-screen w-full bg-muted/20 flex-col md:flex-row">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-border bg-background z-40">
          <span className="font-bold text-lg">Yoga Admin</span>
          <Button variant="outline" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu className="h-5 w-5"/>
          </Button>
        </div>

        {/* Backdrop Overlay */}
        {isMobileMenuOpen && (
            <div
                className={`fixed inset-0 bg-black/20 z-40 md:hidden transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
                onClick={closeMenu}
            />
        )}

        {/* Sidebar - Always in DOM, but hidden on mobile unless open */}
        <aside
            className={`
              ${isMobileMenuOpen ? "fixed inset-0 z-50 w-full h-full bg-background p-4 animate-slide-down" : "hidden"}
              ${isClosing ? "animate-slide-up" : ""}
              md:static md:block md:w-64 md:h-auto md:bg-transparent md:p-4 md:shadow-none border-r border-border bg-background transition-all
            `}>

          <div className="h-full flex flex-col">
            {/* Mobile Close Header (Only visible on mobile) */}
            <div className="md:hidden flex items-center justify-between mb-8">
              <span className="font-bold text-lg">Menu</span>
              <Button variant="outline" onClick={closeMenu}>
                <X className="h-5 w-5"/>
              </Button>
            </div>

            {/* Desktop Title (Only visible on desktop) */}
            <div className="hidden md:block font-bold text-xl mb-8 px-2">Yoga Admin</div>

            <nav className="flex-1 space-y-2">
              <NavLink to={ROUTES.DASHBOARD}
                       end
                       onClick={closeMenu}
                       className={({isActive}) => `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${isActive ? "bg-muted text-primary font-medium" : "text-muted-foreground hover:text-primary"}`}>
                <Calendar className="h-4 w-4"/> Classes
              </NavLink>
              <NavLink to={ROUTES.ATTENDEES}
                       end
                       onClick={closeMenu}
                       className={({isActive}) => `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${isActive ? "bg-muted text-primary font-medium" : "text-muted-foreground hover:text-primary"}`}>
                <Users className="h-4 w-4"/> Attendees
              </NavLink>
            </nav>

            <Button variant="outline" className="w-full justify-center gap-3 mt-auto" onClick={handleLogout}>
              <LogOut className="h-4 w-4"/> Logout
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet context={{ isMobileMenuOpen }} />
        </main>
      </div>
  );
}