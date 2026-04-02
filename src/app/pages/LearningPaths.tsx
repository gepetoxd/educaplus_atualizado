import { Link } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import { BookOpen, Target, Award, Brain, Users, Lightbulb } from "lucide-react";

const learningPaths = [
  {
    id: 1,
    title: "Fundamentos do Ensino Inclusivo",
    description: "Aprenda o básico sobre criar um ambiente de sala de aula inclusivo para todos os alunos",
    progress: 45,
    lessons: 8,
    duration: "4 semanas",
    level: "Iniciante",
    icon: BookOpen,
    category: "Fundamentos",
  },
  {
    id: 2,
    title: "Estratégias de Apoio ao TDAH",
    description: "Técnicas eficazes para apoiar alunos com TDAH em sala de aula",
    progress: 20,
    lessons: 6,
    duration: "3 semanas",
    level: "Intermediário",
    icon: Target,
    category: "Necessidades Especiais",
  },
  {
    id: 3,
    title: "Melhores Práticas para Espectro Autista",
    description: "Compreendendo e apoiando alunos no espectro autista",
    progress: 0,
    lessons: 10,
    duration: "5 semanas",
    level: "Intermediário",
    icon: Award,
    category: "Necessidades Especiais",
  },
  {
    id: 4,
    title: "Métodos de Ensino para Dislexia",
    description: "Abordagens especializadas para ensinar alunos com dislexia",
    progress: 0,
    lessons: 7,
    duration: "4 semanas",
    level: "Intermediário",
    icon: Brain,
    category: "Diferenças de Aprendizagem",
  },
  {
    id: 5,
    title: "Diferenciação em Sala de Aula",
    description: "Estratégias para adaptar a instrução para atender diversas necessidades de aprendizagem",
    progress: 60,
    lessons: 9,
    duration: "5 semanas",
    level: "Avançado",
    icon: Users,
    category: "Pedagogia",
  },
  {
    id: 6,
    title: "Design Universal para Aprendizagem",
    description: "Criando ambientes de aprendizagem flexíveis que acomodam todos os aprendizes",
    progress: 0,
    lessons: 12,
    duration: "6 semanas",
    level: "Avançado",
    icon: Lightbulb,
    category: "Frameworks",
  },
];

const getLevelColor = (level: string) => {
  switch (level) {
    case "Iniciante":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    case "Intermediário":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100";
    case "Avançado":
      return "bg-purple-100 text-purple-800 hover:bg-purple-100";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
  }
};

export default function LearningPaths() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-2">Trilhas de Aprendizado</h1>
        <p className="text-muted-foreground">
          Explore cursos estruturados para aprimorar suas habilidades de ensino
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {learningPaths.map((path) => (
          <Card key={path.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <path.icon className="w-6 h-6 text-primary" />
                </div>
                <Badge className={getLevelColor(path.level)}>
                  {path.level}
                </Badge>
              </div>
              <CardTitle className="text-lg">{path.title}</CardTitle>
              <CardDescription>{path.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{path.lessons} aulas</span>
                <span>{path.duration}</span>
              </div>
              
              {path.progress > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progresso</span>
                    <span className="font-medium">{path.progress}%</span>
                  </div>
                  <Progress value={path.progress} className="h-2" />
                </div>
              )}

              <Link to={`/app/learning-paths/${path.id}`}>
                <button className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg px-4 py-2 transition-colors">
                  {path.progress > 0 ? "Continuar Aprendendo" : "Iniciar Trilha"}
                </button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
