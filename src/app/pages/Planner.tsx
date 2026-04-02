import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import { Calendar, FileText, Trash2 } from "lucide-react";

interface LessonPlan {
  id: string;
  topic: string;
  objective: string;
  strategies: string;
  resources: string;
  date: string;
}

export default function Planner() {
  const [plans, setPlans] = useState<LessonPlan[]>([]);
  const [topic, setTopic] = useState("");
  const [objective, setObjective] = useState("");
  const [strategies, setStrategies] = useState("");
  const [resources, setResources] = useState("");

  useEffect(() => {
    const savedPlans = localStorage.getItem("lessonPlans");
    if (savedPlans) {
      setPlans(JSON.parse(savedPlans));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newPlan: LessonPlan = {
      id: Date.now().toString(),
      topic,
      objective,
      strategies,
      resources,
      date: new Date().toISOString(),
    };

    const updatedPlans = [newPlan, ...plans];
    setPlans(updatedPlans);
    localStorage.setItem("lessonPlans", JSON.stringify(updatedPlans));

    // Reset form
    setTopic("");
    setObjective("");
    setStrategies("");
    setResources("");
  };

  const handleDelete = (id: string) => {
    const updatedPlans = plans.filter((plan) => plan.id !== id);
    setPlans(updatedPlans);
    localStorage.setItem("lessonPlans", JSON.stringify(updatedPlans));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-2">Planejador de Aulas</h1>
        <p className="text-muted-foreground">
          Crie planos de aula inclusivos adaptados às necessidades de seus alunos
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Criar Novo Plano de Aula</CardTitle>
          <CardDescription>
            Planeje uma aula que funcione para todos os aprendizes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="topic">Tópico da Aula</Label>
              <Input
                id="topic"
                placeholder="ex: Introdução às Frações"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
                className="bg-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="objective">Objetivo de Aprendizagem</Label>
              <Textarea
                id="objective"
                placeholder="O que os alunos devem ser capazes de fazer ao final desta aula?"
                value={objective}
                onChange={(e) => setObjective(e.target.value)}
                required
                className="bg-white min-h-20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="strategies">Estratégias Inclusivas</Label>
              <Textarea
                id="strategies"
                placeholder="Descreva estratégias para apoiar aprendizes diversos (ex: recursos visuais, apoio entre pares, ritmo flexível)"
                value={strategies}
                onChange={(e) => setStrategies(e.target.value)}
                required
                className="bg-white min-h-24"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="resources">Recursos Necessários</Label>
              <Textarea
                id="resources"
                placeholder="Liste materiais e recursos necessários para esta aula"
                value={resources}
                onChange={(e) => setResources(e.target.value)}
                required
                className="bg-white min-h-20"
              />
            </div>

            <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90">
              Salvar Plano de Aula
            </Button>
          </form>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-xl mb-4">Seus Planos de Aula ({plans.length})</h2>
        {plans.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Ainda não há planos de aula. Crie seu primeiro acima!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {plans.map((plan) => (
              <Card key={plan.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{plan.topic}</CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {formatDate(plan.date)}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(plan.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Badge className="mb-2 bg-primary/10 text-primary hover:bg-primary/10">
                      Objetivo de Aprendizagem
                    </Badge>
                    <p className="text-sm">{plan.objective}</p>
                  </div>
                  <div>
                    <Badge className="mb-2 bg-secondary/10 text-secondary hover:bg-secondary/10">
                      Estratégias Inclusivas
                    </Badge>
                    <p className="text-sm">{plan.strategies}</p>
                  </div>
                  <div>
                    <Badge className="mb-2 bg-muted text-muted-foreground hover:bg-muted">
                      Recursos
                    </Badge>
                    <p className="text-sm">{plan.resources}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
