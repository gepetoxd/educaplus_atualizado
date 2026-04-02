import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Label } from "../components/ui/label";
import { ArrowLeft, Play, FileText, CheckCircle2, Circle } from "lucide-react";

const pathsData: Record<string, any> = {
  "1": {
    title: "Fundamentos do Ensino Inclusivo",
    description: "Aprenda o básico sobre criar um ambiente de sala de aula inclusivo",
    lessons: [
      { id: 1, title: "Introdução à Educação Inclusiva", completed: true },
      { id: 2, title: "Compreendendo Diferenças de Aprendizagem", completed: true },
      { id: 3, title: "Criando Materiais Acessíveis", completed: false },
      { id: 4, title: "Configuração do Ambiente da Sala de Aula", completed: false },
    ],
    materials: [
      { title: "Guia de Educação Inclusiva.pdf", type: "PDF" },
      { title: "Checklist de Sala de Aula.docx", type: "Documento" },
      { title: "Modelos de Recursos Visuais", type: "Modelos" },
    ],
  },
  "2": {
    title: "Estratégias de Apoio ao TDAH",
    description: "Técnicas eficazes para apoiar alunos com TDAH",
    lessons: [
      { id: 1, title: "Compreendendo o TDAH", completed: true },
      { id: 2, title: "Técnicas de Gestão da Atenção", completed: false },
      { id: 3, title: "Estratégias Organizacionais", completed: false },
      { id: 4, title: "Planos de Apoio Comportamental", completed: false },
    ],
    materials: [
      { title: "Visão Geral do TDAH.pdf", type: "PDF" },
      { title: "Guia de Estratégias de Foco.pdf", type: "PDF" },
      { title: "Planilha de Acompanhamento de Comportamento.xlsx", type: "Planilha" },
    ],
  },
  "3": {
    title: "Melhores Práticas para Espectro Autista",
    description: "Compreendendo e apoiando alunos no espectro autista",
    lessons: [
      { id: 1, title: "Visão Geral do Espectro Autista", completed: false },
      { id: 2, title: "Estratégias de Comunicação", completed: false },
      { id: 3, title: "Considerações Sensoriais", completed: false },
      { id: 4, title: "Apoio às Habilidades Sociais", completed: false },
    ],
    materials: [
      { title: "Melhores Práticas para Autismo.pdf", type: "PDF" },
      { title: "Modelos de Cronograma Visual", type: "Modelos" },
      { title: "Exemplos de Histórias Sociais", type: "Documento" },
    ],
  },
};

const quizQuestions = [
  {
    id: 1,
    question: "Qual é o objetivo principal da educação inclusiva?",
    options: [
      "Separar alunos por habilidade",
      "Garantir que todos os alunos possam aprender juntos independentemente das diferenças",
      "Focar apenas em alunos com deficiência",
      "Baixar padrões acadêmicos",
    ],
    correct: 1,
  },
  {
    id: 2,
    question: "Qual estratégia é mais eficaz para apoiar aprendizes diversos?",
    options: [
      "Usar apenas um método de ensino",
      "Fornecer múltiplas formas de engajamento com o conteúdo",
      "Focar apenas em avaliações escritas",
      "Manter o layout da sala de aula inalterado",
    ],
    correct: 1,
  },
];

export default function LearningPathDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const pathData = pathsData[id || "1"];
  const completedLessons = pathData.lessons.filter((l: any) => l.completed).length;
  const progress = (completedLessons / pathData.lessons.length) * 100;

  const handleQuizSubmit = () => {
    setShowResults(true);
  };

  const correctAnswers = quizQuestions.filter(
    (q) => quizAnswers[q.id] === q.correct
  ).length;

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => navigate("/app/learning-paths")}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        Voltar para Trilhas de Aprendizado
      </Button>

      <div>
        <h1 className="text-3xl mb-2">{pathData.title}</h1>
        <p className="text-muted-foreground">{pathData.description}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Progresso do Curso</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {completedLessons} de {pathData.lessons.length} aulas completadas
              </span>
              <span className="font-medium">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="lessons" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="lessons">Aulas</TabsTrigger>
          <TabsTrigger value="materials">Materiais</TabsTrigger>
          <TabsTrigger value="quiz">Quiz</TabsTrigger>
        </TabsList>

        <TabsContent value="lessons" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Vídeo da Aula</CardTitle>
              <CardDescription>Assista à introdução do curso</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="bg-primary rounded-full p-4 inline-block mb-2">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-sm text-muted-foreground">O conteúdo do vídeo seria reproduzido aqui</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Aulas do Curso</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pathData.lessons.map((lesson: any) => (
                  <div
                    key={lesson.id}
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {lesson.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-secondary" />
                      ) : (
                        <Circle className="w-5 h-5 text-muted-foreground" />
                      )}
                      <span className={lesson.completed ? "text-muted-foreground line-through" : ""}>
                        {lesson.title}
                      </span>
                    </div>
                    {lesson.completed && (
                      <Badge className="bg-secondary/10 text-secondary hover:bg-secondary/10">
                        Completada
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="materials">
          <Card>
            <CardHeader>
              <CardTitle>Materiais do Curso</CardTitle>
              <CardDescription>Baixe recursos para apoiar seu aprendizado</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pathData.materials.map((material: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{material.title}</p>
                        <p className="text-sm text-muted-foreground">{material.type}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Baixar
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quiz">
          <Card>
            <CardHeader>
              <CardTitle>Verificação de Conhecimento</CardTitle>
              <CardDescription>Teste sua compreensão do material do curso</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!showResults ? (
                <>
                  {quizQuestions.map((question, qIndex) => (
                    <div key={question.id} className="space-y-3">
                      <h4 className="font-medium">
                        {qIndex + 1}. {question.question}
                      </h4>
                      <RadioGroup
                        value={quizAnswers[question.id]?.toString()}
                        onValueChange={(value) =>
                          setQuizAnswers({ ...quizAnswers, [question.id]: parseInt(value) })
                        }
                      >
                        <div className="space-y-2">
                          {question.options.map((option, oIndex) => (
                            <div
                              key={oIndex}
                              className="flex items-center space-x-3 border rounded-lg p-3"
                            >
                              <RadioGroupItem value={oIndex.toString()} id={`q${question.id}-${oIndex}`} />
                              <Label
                                htmlFor={`q${question.id}-${oIndex}`}
                                className="flex-1 cursor-pointer"
                              >
                                {option}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>
                  ))}
                  <Button
                    onClick={handleQuizSubmit}
                    className="w-full bg-primary hover:bg-primary/90"
                    disabled={Object.keys(quizAnswers).length < quizQuestions.length}
                  >
                    Enviar Quiz
                  </Button>
                </>
              ) : (
                <div className="text-center space-y-4">
                  <div className="text-4xl font-bold text-primary">
                    {correctAnswers}/{quizQuestions.length}
                  </div>
                  <p className="text-lg">
                    Você respondeu {correctAnswers} de {quizQuestions.length} perguntas corretamente!
                  </p>
                  {correctAnswers === quizQuestions.length ? (
                    <Badge className="bg-secondary text-white hover:bg-secondary">
                      Pontuação Perfeita! 🎉
                    </Badge>
                  ) : (
                    <p className="text-muted-foreground">Continue aprendendo e tente novamente!</p>
                  )}
                  <Button
                    onClick={() => {
                      setShowResults(false);
                      setQuizAnswers({});
                    }}
                    variant="outline"
                  >
                    Refazer Quiz
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
