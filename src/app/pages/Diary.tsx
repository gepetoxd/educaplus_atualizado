import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import { BookMarked, Calendar, Trash2 } from "lucide-react";

interface DiaryEntry {
  id: string;
  content: string;
  date: string;
}

export default function Diary() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [newEntry, setNewEntry] = useState("");

  useEffect(() => {
    const savedEntries = localStorage.getItem("diaryEntries");
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newEntry.trim()) return;

    const entry: DiaryEntry = {
      id: Date.now().toString(),
      content: newEntry,
      date: new Date().toISOString(),
    };

    const updatedEntries = [entry, ...entries];
    setEntries(updatedEntries);
    localStorage.setItem("diaryEntries", JSON.stringify(updatedEntries));
    setNewEntry("");
  };

  const handleDelete = (id: string) => {
    const updatedEntries = entries.filter((entry) => entry.id !== id);
    setEntries(updatedEntries);
    localStorage.setItem("diaryEntries", JSON.stringify(updatedEntries));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-2">Diário de Prática</h1>
        <p className="text-muted-foreground">
          Reflita sobre suas experiências de ensino e acompanhe seu crescimento profissional
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Adicionar Nova Entrada</CardTitle>
          <CardDescription>
            Documente suas reflexões, sucessos e áreas para melhoria
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddEntry} className="space-y-4">
            <Textarea
              placeholder="O que você aprendeu hoje? Quais estratégias funcionaram bem? O que você gostaria de experimentar de forma diferente na próxima vez?"
              value={newEntry}
              onChange={(e) => setNewEntry(e.target.value)}
              className="bg-white min-h-32"
            />
            <Button
              type="submit"
              className="w-full bg-secondary hover:bg-secondary/90"
              disabled={!newEntry.trim()}
            >
              Adicionar Entrada
            </Button>
          </form>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-xl mb-4">Suas Reflexões ({entries.length})</h2>
        {entries.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              <BookMarked className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Ainda não há entradas no diário. Comece a documentar sua jornada!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {entries.map((entry) => (
              <Card key={entry.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(entry.date)}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(entry.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm whitespace-pre-wrap">{entry.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {entries.length > 0 && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <BookMarked className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Dica de Reflexão</h3>
                <p className="text-sm text-muted-foreground">
                  A reflexão regular ajuda você a identificar padrões em sua prática de ensino
                  e celebrar seu progresso. Tente fazer entradas após implementar novas
                  estratégias ou técnicas.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
