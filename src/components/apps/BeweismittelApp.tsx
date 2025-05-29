
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Camera, Plus, Search, FileText, Image } from "lucide-react";

interface BeweismittelAppProps {
  onBack: () => void;
}

interface Evidence {
  id: string;
  title: string;
  type: "Photo" | "Document" | "Physical" | "Digital";
  caseNumber: string;
  collectedBy: string;
  collectedDate: string;
  location: string;
  description: string;
  status: "Collected" | "Analyzed" | "Archived";
}

const BeweismittelApp = ({ onBack }: BeweismittelAppProps) => {
  const [evidence, setEvidence] = useState<Evidence[]>([
    {
      id: "1",
      title: "Tatwaffe - Messer",
      type: "Physical",
      caseNumber: "CASE-2024-001",
      collectedBy: "Officer Smith",
      collectedDate: "2024-01-20",
      location: "Vinewood Hills, 123 Main St",
      description: "Küchenmesser mit Blutspuren gefunden am Tatort",
      status: "Analyzed"
    },
    {
      id: "2",
      title: "Überwachungsvideo",
      type: "Digital",
      caseNumber: "CASE-2024-002",
      collectedBy: "Detective Johnson",
      collectedDate: "2024-01-19",
      location: "Downtown Bank",
      description: "CCTV-Aufnahmen vom Bankraub",
      status: "Collected"
    },
    {
      id: "3",
      title: "Tatortfotos",
      type: "Photo",
      caseNumber: "CASE-2024-001",
      collectedBy: "CSI Wilson",
      collectedDate: "2024-01-20",
      location: "Vinewood Hills, 123 Main St",
      description: "Dokumentation des Tatorts",
      status: "Archived"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    type: "Physical" as const,
    caseNumber: "",
    location: "",
    description: ""
  });

  const filteredEvidence = evidence.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.caseNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Photo": return "bg-blue-600";
      case "Document": return "bg-green-600";
      case "Physical": return "bg-purple-600";
      case "Digital": return "bg-orange-600";
      default: return "bg-gray-600";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Collected": return "bg-yellow-600";
      case "Analyzed": return "bg-blue-600";
      case "Archived": return "bg-gray-600";
      default: return "bg-gray-600";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Photo": return <Image className="w-4 h-4" />;
      case "Document": return <FileText className="w-4 h-4" />;
      case "Digital": return <Camera className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const handleCreateEvidence = () => {
    if (formData.title && formData.caseNumber) {
      const newEvidence: Evidence = {
        id: Date.now().toString(),
        ...formData,
        collectedBy: "Current Officer",
        collectedDate: new Date().toISOString().split('T')[0],
        status: "Collected"
      };
      setEvidence([newEvidence, ...evidence]);
      setFormData({ title: "", type: "Physical", caseNumber: "", location: "", description: "" });
      setShowCreateForm(false);
    }
  };

  if (showCreateForm) {
    return (
      <div className="p-6 text-white">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => setShowCreateForm(false)} 
            className="mr-4 text-white hover:bg-gray-700"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold">Neues Beweismittel</h1>
        </div>

        <Card className="bg-gray-800 border-gray-700 p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-white">Titel:</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Beweismittel Titel"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-white">Typ:</label>
              <select 
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value as any})}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
              >
                <option value="Physical">Physisch</option>
                <option value="Photo">Foto</option>
                <option value="Document">Dokument</option>
                <option value="Digital">Digital</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-white">Fall-Nummer:</label>
              <Input
                value={formData.caseNumber}
                onChange={(e) => setFormData({...formData, caseNumber: e.target.value})}
                placeholder="z.B. CASE-2024-001"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-white">Fundort:</label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                placeholder="Wo wurde das Beweismittel gefunden"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-white">Beschreibung:</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Detaillierte Beschreibung"
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white h-24 resize-none"
              />
            </div>

            <div className="flex space-x-2">
              <Button onClick={handleCreateEvidence} className="bg-blue-600 hover:bg-blue-700">
                Erstellen
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowCreateForm(false)}
                className="text-white border-gray-600 hover:bg-gray-700"
              >
                Abbrechen
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 text-white">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            onClick={onBack} 
            className="mr-4 text-white hover:bg-gray-700"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold flex items-center">
            <Camera className="w-6 h-6 mr-2 text-indigo-400" />
            Beweismittel
          </h1>
        </div>
        <Button 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => setShowCreateForm(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Neues Beweismittel
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Nach Titel oder Fall-Nummer suchen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-800 border-gray-700 text-white"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card className="bg-gray-800 border-gray-700 p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-400">
              {evidence.filter(e => e.type === "Photo").length}
            </p>
            <p className="text-sm text-gray-300">Fotos</p>
          </div>
        </Card>
        <Card className="bg-gray-800 border-gray-700 p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-400">
              {evidence.filter(e => e.type === "Document").length}
            </p>
            <p className="text-sm text-gray-300">Dokumente</p>
          </div>
        </Card>
        <Card className="bg-gray-800 border-gray-700 p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-400">
              {evidence.filter(e => e.type === "Physical").length}
            </p>
            <p className="text-sm text-gray-300">Physisch</p>
          </div>
        </Card>
        <Card className="bg-gray-800 border-gray-700 p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-400">
              {evidence.filter(e => e.type === "Digital").length}
            </p>
            <p className="text-sm text-gray-300">Digital</p>
          </div>
        </Card>
      </div>

      {/* Evidence List */}
      <div className="space-y-4">
        {filteredEvidence.map((item) => (
          <Card key={item.id} className="bg-gray-800 border-gray-700 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`${getTypeColor(item.type)} p-2 rounded`}>
                  {getTypeIcon(item.type)}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">{item.title}</h3>
                  <p className="text-gray-300">Fall: {item.caseNumber}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Badge className={getTypeColor(item.type)}>
                  {item.type}
                </Badge>
                <Badge className={getStatusColor(item.status)}>
                  {item.status}
                </Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm text-gray-300">
              <div>
                <span className="text-gray-400">Gesammelt von:</span>
                <p>{item.collectedBy}</p>
              </div>
              <div>
                <span className="text-gray-400">Datum:</span>
                <p>{item.collectedDate}</p>
              </div>
              <div>
                <span className="text-gray-400">Fundort:</span>
                <p>{item.location}</p>
              </div>
            </div>
            
            <p className="text-gray-300 text-sm mb-4">{item.description}</p>
            
            <div className="flex space-x-2">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                Details anzeigen
              </Button>
              <Button size="sm" variant="outline" className="text-white border-gray-600 hover:bg-gray-700">
                Bearbeiten
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BeweismittelApp;
