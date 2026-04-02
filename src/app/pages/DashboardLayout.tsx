import { useEffect, useState } from "react";
import { Outlet, useNavigate, Link, useLocation } from "react-router";
import { Button } from "../components/ui/button";
import { 
  LayoutDashboard, 
  BookOpen, 
  Calendar, 
  Library, 
  BookMarked, 
  User, 
  LogOut,
  Menu,
  X
} from "lucide-react";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(userData));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const navItems = [
    { path: "/app", label: "Painel", icon: LayoutDashboard },
    { path: "/app/learning-paths", label: "Trilhas de Aprendizado", icon: BookOpen },
    { path: "/app/planner", label: "Planejador", icon: Calendar },
    { path: "/app/library", label: "Biblioteca", icon: Library },
    { path: "/app/diary", label: "Diário", icon: BookMarked },
  ];

  const isActive = (path: string) => {
    if (path === "/app") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary rounded-full p-2">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold text-lg">EducaPlus</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          mobileMenuOpen ? "block" : "hidden"
        } md:block w-full md:w-64 bg-white border-r min-h-screen`}
      >
        <div className="p-6 hidden md:block">
          <div className="flex items-center gap-2 mb-8">
            <div className="bg-primary rounded-full p-2">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="font-semibold text-xl">EducaPlus</span>
          </div>

          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? "bg-primary text-white"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          <div className="mt-auto pt-8 space-y-2">
            <Link
              to="/app/profile"
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive("/app/profile")
                  ? "bg-primary text-white"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              <User className="w-5 h-5" />
              <span>Perfil</span>
            </Link>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5" />
              <span>Sair</span>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="p-4 md:hidden space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive(item.path)
                  ? "bg-primary text-white"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
          <Link
            to="/app/profile"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              isActive("/app/profile")
                ? "bg-primary text-white"
                : "text-foreground hover:bg-muted"
            }`}
          >
            <User className="w-5 h-5" />
            <span>Perfil</span>
          </Link>
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            <span>Sair</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}