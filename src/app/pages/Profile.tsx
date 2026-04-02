import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import { User, Mail, Briefcase, Award, BookOpen, Calendar, Edit2, Save } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setName(parsedUser.name);
      setEmail(parsedUser.email);
      setRole(parsedUser.role);
    }
  }, []);

  const handleSave = () => {
    const updatedUser = {
      ...user,
      name,
      email,
      role,
    };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setIsEditing(false);
  };

  const stats = {
    coursesCompleted: 2,
    coursesInProgress: 3,
    lessonPlansCreated: 12,
    diaryEntries: 8,
  };

  const achievements = [
    { id: 1, title: "Primeiros Passos", description: "Completou sua primeira trilha de aprendizado", earned: true },
    { id: 2, title: "Aprendiz Dedicado", description: "Logou por 7 dias seguidos", earned: true },
    { id: 3, title: "Mestre do Planejamento", description: "Criou 10 planos de aula", earned: true },
    { id: 4, title: "Profissional Reflexivo", description: "Adicionou 5 entradas no diário", earned: true },
    { id: 5, title: "Buscador de Conhecimento", description: "Baixou 10 recursos", earned: false },
    { id: 6, title: "Professor Mestre", description: "Completou todas as trilhas de aprendizado", earned: false },
  ];

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-2">Meu Perfil</h1>
        <p className="text-muted-foreground">
          Gerencie sua conta e acompanhe seu progresso
        </p>
      </div>

      {/* Profile Information */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Informações do Perfil</CardTitle>
            {!isEditing ? (
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                <Edit2 className="w-4 h-4 mr-2" />
                Editar
              </Button>
            ) : (
              <Button size="sm" onClick={handleSave} className="bg-primary hover:bg-primary/90">
                <Save className="w-4 h-4 mr-2" />
                Salvar
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6 mb-6">
            <div className="bg-primary rounded-full p-6">
              <User className="w-12 h-12 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">{user.name}</h3>
              <p className="text-muted-foreground">{user.role}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!isEditing}
                className="bg-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isEditing}
                className="bg-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Função</Label>
              {isEditing ? (
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger className="bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="teacher">Professor(a)</SelectItem>
                    <SelectItem value="coordinator">Coordenador(a) Pedagógico(a)</SelectItem>
                    <SelectItem value="special-ed">Profissional de Educação Especial</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  id="role"
                  value={role}
                  disabled
                  className="bg-white"
                />
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Suas Estatísticas</CardTitle>
          <CardDescription>Acompanhe sua jornada de aprendizado</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <BookOpen className="w-6 h-6 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-semibold">{stats.coursesCompleted}</div>
              <div className="text-xs text-muted-foreground">Cursos Completados</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <BookOpen className="w-6 h-6 mx-auto mb-2 text-secondary" />
              <div className="text-2xl font-semibold">{stats.coursesInProgress}</div>
              <div className="text-xs text-muted-foreground">Em Progresso</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <Calendar className="w-6 h-6 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-semibold">{stats.lessonPlansCreated}</div>
              <div className="text-xs text-muted-foreground">Planos de Aula</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <BookOpen className="w-6 h-6 mx-auto mb-2 text-secondary" />
              <div className="text-2xl font-semibold">{stats.diaryEntries}</div>
              <div className="text-xs text-muted-foreground">Entradas no Diário</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overall Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Progresso de Aprendizagem</CardTitle>
          <CardDescription>Sua conclusão geral em todas as trilhas</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Fundamentos do Ensino Inclusivo</span>
              <span className="font-medium">45%</span>
            </div>
            <Progress value={45} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Estratégias de Apoio ao TDAH</span>
              <span className="font-medium">20%</span>
            </div>
            <Progress value={20} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Diferenciação em Sala de Aula</span>
              <span className="font-medium">60%</span>
            </div>
            <Progress value={60} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle>Conquistas</CardTitle>
          <CardDescription>Marcos que você alcançou em sua jornada</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`flex items-start gap-3 p-4 rounded-lg border ${
                  achievement.earned
                    ? "bg-secondary/5 border-secondary/20"
                    : "bg-muted/30 border-muted opacity-60"
                }`}
              >
                <div
                  className={`p-2 rounded-lg ${
                    achievement.earned ? "bg-secondary/10" : "bg-muted"
                  }`}
                >
                  <Award
                    className={`w-5 h-5 ${
                      achievement.earned ? "text-secondary" : "text-muted-foreground"
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{achievement.title}</h4>
                  <p className="text-xs text-muted-foreground">
                    {achievement.description}
                  </p>
                  {achievement.earned && (
                    <Badge className="mt-2 bg-secondary/10 text-secondary hover:bg-secondary/10 text-xs">
                      Conquistada
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
