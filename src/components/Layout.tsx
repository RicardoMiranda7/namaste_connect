import {NavLink, Outlet, useNavigate} from "react-router";
import {Calendar, LogOut, Menu, Users} from "lucide-react";
import {useState} from "react";
import {api} from "../services/mockApi";
import {Button} from "./ui";

export function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await api.logout();
    navigate("/login");
  };

  return (
      <div className="flex h-screen w-full bg-muted/20 flex-col md:flex-row">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-border bg-background">
          <span className="font-bold text-lg">Yoga Admin</span>
          <Button variant="outline" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <Menu className="h-5 w-5"/>
          </Button>
        </div>

        {/* Sidebar */}
        <aside
            className={`${isMobileMenuOpen ? "block" : "hidden"} md:block w-full md:w-64 border-r border-border bg-background flex-shrink-0`}>
          <div className="h-full flex flex-col p-4">
            <div className="hidden md:block font-bold text-xl mb-8 px-2">Yoga Admin</div>
            <nav className="flex-1 space-y-2">
              <NavLink to="/"
                       className={({isActive}) => `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${isActive ? "bg-muted text-primary font-medium" : "text-muted-foreground hover:text-primary"}`}>
                <Calendar className="h-4 w-4"/> Classes
              </NavLink>
              <NavLink to="/attendees"
                       className={({isActive}) => `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${isActive ? "bg-muted text-primary font-medium" : "text-muted-foreground hover:text-primary"}`}>
                <Users className="h-4 w-4"/> Attendees
              </NavLink>
            </nav>
            <Button variant="outline" className="w-full justify-start gap-3 mt-auto" onClick={handleLogout}>
              <LogOut className="h-4 w-4"/> Logout
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet/>
        </main>
      </div>
  );
}