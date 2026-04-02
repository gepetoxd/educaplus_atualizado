import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Button } from "../components/ui/button";
import { BookOpen, Calendar, Library, TrendingUp, Award, Target } from "lucide-react";

const recommendedPaths = [
  {
    id: 1,
    title: "Fundamentos do Ensino Inclusivo",
    description: "Aprenda o básico sobre criar um ambiente de sala de aula inclusivo",
    progress: 45,
    lessons: 8,
    icon: BookOpen,
  },
  {
    id: 2,
    title: "Estratégias de Apoio ao TDAH",
    description: "Técnicas eficazes para apoiar alunos com TDAH",
    progress: 20,
    lessons: 6,
    icon: Target,
  },
  {
    id: 3,
    title: "Melhores Práticas para Espectro Autista",
    description: "Compreendendo e apoiando alunos no espectro autista",
    progress: 0,
    lessons: 10,
    icon: Award,
  },
];

const recentActivities = [
  {
    title: "Completou aula sobre Recursos Visuais de Aprendizagem",
    date: "há 2 dias",
    type: "learning",
  },
  {
    title: "Criou plano de aula: Matemática para Todos os Aprendizes",
    date: "há 3 dias",
    type: "planner",
  },
  {
    title: "Adicionou entrada no diário sobre sucesso em sala de aula",
    date: "há 5 dias",
    type: "diary",
  },
];

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const overallProgress = 22; // Mock overall progress

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl mb-2">Bem-vindo de volta, {user?.name}! 👋</h1>
        <p className="text-muted-foreground">
          Aqui está seu painel de aprendizado personalizado
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Progresso Geral</CardTitle>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold mb-2">{overallProgress}%</div>
            <Progress value={overallProgress} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">Continue assim!</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Trilhas Ativas</CardTitle>
            <BookOpen className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">3</div>
            <p className="text-xs text-muted-foreground mt-2">Trilhas de aprendizado em progresso</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Planos de Aula</CardTitle>
            <Calendar className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">12</div>
            <p className="text-xs text-muted-foreground mt-2">Criados este mês</p>
          </CardContent>
        </Card>
      </div>

      {/* Recommended Learning Paths */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl">Trilhas de Aprendizado Recomendadas</h2>
          <Link to="/app/learning-paths">
            <Button variant="outline" size="sm">Ver Todas</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendedPaths.map((path) => (
            <Card key={path.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <path.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs text-muted-foreground">{path.lessons} aulas</span>
                </div>
                <CardTitle className="text-base mt-2">{path.title}</CardTitle>
                <CardDescription className="text-sm">{path.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progresso</span>
                    <span className="font-medium">{path.progress}%</span>
                  </div>
                  <Progress value={path.progress} className="h-2" />
                  <Link to={`/app/learning-paths/${path.id}`}>
                    <Button className="w-full mt-2 bg-primary hover:bg-primary/90" size="sm">
                      {path.progress > 0 ? "Continuar" : "Começar Aprendizado"}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/app/planner">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-secondary/10 p-2 rounded-lg">
                    <Calendar className="w-5 h-5 text-secondary" />
                  </div>
                  <CardTitle className="text-base">Criar Plano de Aula</CardTitle>
                </div>
                <CardDescription className="text-sm">
                  Planeje sua próxima aula inclusiva
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/app/library">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Library className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="text-base">Explorar Biblioteca</CardTitle>
                </div>
                <CardDescription className="text-sm">
                  Explore recursos de ensino
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/app/diary">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-secondary/10 p-2 rounded-lg">
                    <BookOpen className="w-5 h-5 text-secondary" />
                  </div>
                  <CardTitle className="text-base">Adicionar Entrada no Diário</CardTitle>
                </div>
                <CardDescription className="text-sm">
                  Reflita sobre sua prática
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl mb-4">Atividade Recente</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <div className="flex-1">
                    <p className="text-sm">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
