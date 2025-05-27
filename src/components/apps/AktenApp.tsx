
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, FileText, Search, Plus, Eye, Edit, Trash2 } from "lucide-react";

interface AktenAppProps {
  onBack: () => void;
}

const AktenApp = ({ onBack }: AktenAppProps) => {
  const [activeTab, setActiveTab] = useState("cases");
  const [searchTerm, setSearchTerm] = useState("");

  const cases = [
    {
      id: "CASE-2024-001",
      title: "Bankraub Fleeca Bank",
      suspect: "John Doe",
      officer: "Det. Wilson",
      status: "offen",
      priority: "hoch",
      created: "2024-01-15",
      lastUpdate: "2024-01-20"
    },
    {
      id: "CASE-2024-002", 
      title: "Drogenhandel Strawberry",
      suspect: "Mike Johnson",
      officer: "Det. Brown",
      status: "ermittlung",
      priority: "mittel",
      created: "2024-01-12",
      lastUpdate: "2024-01-19"
    },
    {
      id: "CASE-2024-003",
      title: "Fahrzeugdiebstahl",
      suspect: "Unknown",
      officer: "Off. Davis",
      status: "geschlossen",
      priority: "niedrig",
      created: "2024-01-10",
      lastUpdate: "2024-01-18"
    }
  ];

  const reports = [
    {
      id: "RPT-2024-001",
      title: "Verkehrsunfall Bericht",
      officer: "Off. Martinez",
      type: "Verkehr",
      status: "vollständig",
      date: "2024-01-20"
    },
    {
      id: "RPT-2024-002",
      title: "Festnahme Protokoll - John Doe",
      officer: "Det. Wilson",
      type: "Festnahme",
      status: "entwurf",
      date: "2024-01-20"
    },
    {
      id: "RPT-2024-003",
      title: "Durchsuchungsbericht",
      officer: "Sgt. Thompson",
      type: "Durchsuchung",
      status: "überprüfung",
      date: "2024-01-19"
    }
  ];

  const evidence = [
    {
      id: "EVD-001",
      description: "Fingerabdrücke vom Tatort",
      caseId: "CASE-2024-001",
      type: "Forensisch",
      location: "Evidence Locker A-12",
      status: "analysiert"
    },
    {
      id: "EVD-002",
      description: "Überwachungsvideo Bank",
      caseId: "CASE-2024-001", 
      type: "Digital",
      location: "Digital Storage",
      status: "gesichtet"
    },
    {
      id: "EVD-003",
      description: "Beschlagnahmte Waffe",
      caseId: "CASE-2024-002",
      type: "Physisch",
      location: "Evidence Locker B-5",
      status: "analysiert"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "offen": return "bg-red-600";
      case "ermittlung": return "bg-yellow-600";
      case "geschlossen": return "bg-green-600";
      case "vollständig": return "bg-green-600";
      case "entwurf": return "bg-yellow-600";
      case "überprüfung": return "bg-blue-600";
      case "analysiert": return "bg-green-600";
      case "gesichtet": return "bg-blue-600";
      default: return "bg-gray-600";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "hoch": return "bg-red-600";
      case "mittel": return "bg-yellow-600";
      case "niedrig": return "bg-green-600";
      default: return "bg-gray-600";
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button variant="ghost" onClick={onBack} className="mr-4">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold flex items-center">
            <FileText className="w-6 h-6 mr-2 text-blue-400" />
            Aktensystem
          </h1>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Neue Akte
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Akten durchsuchen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-800 border-gray-700"
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex space-x-4 mb-6">
        {["cases", "reports", "evidence"].map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? "default" : "ghost"}
            onClick={() => setActiveTab(tab)}
            className="capitalize"
          >
            {tab === "cases" ? "Fälle" : tab === "reports" ? "Berichte" : "Beweismittel"}
          </Button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "cases" && (
        <div className="space-y-4">
          {cases.map((caseItem) => (
            <Card key={caseItem.id} className="bg-gray-800 border-gray-700 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold mb-2">{caseItem.title}</h3>
                  <p className="text-gray-400">Fall-Nr: {caseItem.id}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getPriorityColor(caseItem.priority)}>
                    {caseItem.priority.toUpperCase()}
                  </Badge>
                  <Badge className={getStatusColor(caseItem.status)}>
                    {caseItem.status.toUpperCase()}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-400">Verdächtiger</p>
                  <p className="font-semibold">{caseItem.suspect}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Ermittler</p>
                  <p className="font-semibold">{caseItem.officer}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Letzte Aktualisierung</p>
                  <p className="font-semibold">{caseItem.lastUpdate}</p>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button size="sm" variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  Ansehen
                </Button>
                <Button size="sm" variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Bearbeiten
                </Button>
                <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "reports" && (
        <div className="space-y-4">
          {reports.map((report) => (
            <Card key={report.id} className="bg-gray-800 border-gray-700 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold mb-2">{report.title}</h3>
                  <p className="text-gray-400">Bericht-Nr: {report.id}</p>
                </div>
                <Badge className={getStatusColor(report.status)}>
                  {report.status.toUpperCase()}
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-400">Beamter</p>
                  <p className="font-semibold">{report.officer}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Typ</p>
                  <p className="font-semibold">{report.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Datum</p>
                  <p className="font-semibold">{report.date}</p>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button size="sm" variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  Lesen
                </Button>
                <Button size="sm" variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Bearbeiten
                </Button>
                <Button size="sm" variant="outline">
                  Drucken
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "evidence" && (
        <div className="space-y-4">
          {evidence.map((item) => (
            <Card key={item.id} className="bg-gray-800 border-gray-700 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold mb-2">{item.description}</h3>
                  <p className="text-gray-400">Beweis-Nr: {item.id}</p>
                </div>
                <Badge className={getStatusColor(item.status)}>
                  {item.status.toUpperCase()}
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-400">Fall</p>
                  <p className="font-semibold">{item.caseId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Typ</p>
                  <p className="font-semibold">{item.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Lagerort</p>
                  <p className="font-semibold">{item.location}</p>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button size="sm" variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  Details
                </Button>
                <Button size="sm" variant="outline">
                  Übertragen
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AktenApp;
