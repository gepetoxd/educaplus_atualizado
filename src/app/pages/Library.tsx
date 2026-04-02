import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Search, FileText, Video, Download, BookOpen, Brain, Users, Lightbulb } from "lucide-react";

const categories = [
  { id: "all", label: "Todos os Recursos", icon: BookOpen },
  { id: "guides", label: "Guias de Ensino", icon: FileText },
  { id: "videos", label: "Vídeo Tutoriais", icon: Video },
  { id: "strategies", label: "Estratégias", icon: Lightbulb },
  { id: "worksheets", label: "Planilhas", icon: FileText },
  { id: "activities", label: "Atividades", icon: Users },
];

const resources = [
  {
    id: 1,
    title: "Guia Completo para Design de Sala de Aula Inclusiva",
    description: "Guia passo a passo para criar um ambiente de aprendizagem acessível e acolhedor",
    category: "guides",
    type: "PDF",
    icon: FileText,
    tags: ["Acessibilidade", "Configuração da Sala"],
  },
  {
    id: 2,
    title: "Compreendendo o TDAH: Série de Vídeos",
    description: "Série de vídeos em 5 partes explicando características do TDAH e estratégias de apoio",
    category: "videos",
    type: "Vídeo",
    icon: Video,
    tags: ["TDAH", "Aprendizado em Vídeo"],
  },
  {
    id: 3,
    title: "Kit de Ferramentas de Estratégias de Diferenciação",
    description: "Estratégias práticas para adaptar a instrução para atender diversas necessidades de aprendizagem",
    category: "strategies",
    type: "PDF",
    icon: Lightbulb,
    tags: ["Diferenciação", "Estratégias"],
  },
  {
    id: 4,
    title: "Modelos de Cronograma Visual",
    description: "Modelos personalizáveis para criar cronogramas visuais para alunos",
    category: "worksheets",
    type: "Modelos",
    icon: FileText,
    tags: ["Apoios Visuais", "Organização"],
  },
  {
    id: 5,
    title: "Coleção de Atividades de Habilidades Sociais",
    description: "Atividades prontas para ensinar habilidades sociais em salas de aula inclusivas",
    category: "activities",
    type: "Documento",
    icon: Users,
    tags: ["Habilidades Sociais", "Atividades"],
  },
  {
    id: 6,
    title: "Guia de Ideias de Pausas Sensoriais",
    description: "Uma coleção de atividades de pausa sensorial para alunos que precisam de movimento",
    category: "guides",
    type: "PDF",
    icon: Brain,
    tags: ["Sensorial", "Autorregulação"],
  },
  {
    id: 7,
    title: "Fontes e Formatação Amigáveis para Dislexia",
    description: "Guia para tornar materiais escritos mais acessíveis para alunos com dislexia",
    category: "guides",
    type: "PDF",
    icon: FileText,
    tags: ["Dislexia", "Acessibilidade"],
  },
  {
    id: 8,
    title: "Modelos de Plano de Apoio Comportamental",
    description: "Modelos editáveis para criar planos de apoio comportamental positivo",
    category: "worksheets",
    type: "Modelos",
    icon: FileText,
    tags: ["Comportamento", "Modelos"],
  },
  {
    id: 9,
    title: "Estratégias de Aprendizagem Colaborativa",
    description: "Técnicas para facilitar trabalho em grupo eficaz em salas de aula diversas",
    category: "strategies",
    type: "PDF",
    icon: Users,
    tags: ["Colaboração", "Trabalho em Grupo"],
  },
];

export default function Library() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResources = resources.filter((resource) => {
    const matchesCategory =
      selectedCategory === "all" || resource.category === selectedCategory;
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-2">Biblioteca de Recursos</h1>
        <p className="text-muted-foreground">
          Acesse uma coleção curada de recursos e materiais de ensino
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Buscar recursos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-white"
        />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => setSelectedCategory(category.id)}
            className={
              selectedCategory === category.id
                ? "bg-primary hover:bg-primary/90"
                : ""
            }
          >
            <category.icon className="w-4 h-4 mr-2" />
            {category.label}
          </Button>
        ))}
      </div>

      {/* Resources Grid */}
      <div>
        <p className="text-sm text-muted-foreground mb-4">
          Mostrando {filteredResources.length} recurso
          {filteredResources.length !== 1 ? "s" : ""}
        </p>
        {filteredResources.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Nenhum recurso encontrado correspondente aos seus critérios</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredResources.map((resource) => (
              <Card key={resource.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <resource.icon className="w-5 h-5 text-primary" />
                    </div>
                    <Badge variant="outline">{resource.type}</Badge>
                  </div>
                  <CardTitle className="text-base">{resource.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {resource.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex flex-wrap gap-1">
                    {resource.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-xs bg-muted hover:bg-muted"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    size="sm"
                    className="w-full bg-secondary hover:bg-secondary/90"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Baixar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
