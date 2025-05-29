
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, FileText, Search, Plus, User, Calendar } from "lucide-react";

interface AktenAppProps {
  onBack: () => void;
}

interface PlayerRecord {
  id: string;
  playerName: string;
  record: string;
  createdBy: string;
  createdDate: string;
}

const AktenApp = ({ onBack }: AktenAppProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [newRecord, setNewRecord] = useState("");
  const [playerRecords, setPlayerRecords] = useState<PlayerRecord[]>([
    {
      id: "1",
      playerName: "Max Mustermann",
      record: "Geschwindigkeitsüberschreitung - 50 km/h zu schnell",
      createdBy: "Officer Smith",
      createdDate: "2024-01-20"
    },
    {
      id: "2", 
      playerName: "John Doe",
      record: "Fahren ohne Führerschein",
      createdBy: "Officer Wilson",
      createdDate: "2024-01-19"
    }
  ]);

  const handleAddRecord = () => {
    if (selectedPlayer.trim() && newRecord.trim()) {
      const newPlayerRecord: PlayerRecord = {
        id: Date.now().toString(),
        playerName: selectedPlayer,
        record: newRecord,
        createdBy: "Current Officer", // In einer echten App würde das der eingeloggte Officer sein
        createdDate: new Date().toISOString().split('T')[0]
      };
      
      setPlayerRecords([newPlayerRecord, ...playerRecords]);
      setSelectedPlayer("");
      setNewRecord("");
    }
  };

  const filteredRecords = playerRecords.filter(record =>
    record.playerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button 
            variant="outline" 
            onClick={onBack} 
            className="mr-4 bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold flex items-center">
            <FileText className="w-6 h-6 mr-2 text-yellow-400" />
            Spieler Akten
          </h1>
        </div>
      </div>

      {/* Add New Record Section */}
      <Card className="bg-gray-800 border-gray-700 p-6 mb-6">
        <h2 className="text-xl font-bold mb-4 text-white">Neue Akte hinzufügen</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Spielername</label>
            <Input
              placeholder="Spielernamen eingeben..."
              value={selectedPlayer}
              onChange={(e) => setSelectedPlayer(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Akte/Vergehen</label>
            <Input
              placeholder="Beschreibung der Akte..."
              value={newRecord}
              onChange={(e) => setNewRecord(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
          <Button 
            onClick={handleAddRecord}
            className="bg-blue-600 hover:bg-blue-700 text-white"
            disabled={!selectedPlayer.trim() || !newRecord.trim()}
          >
            <Plus className="w-4 h-4 mr-2" />
            Akte hinzufügen
          </Button>
        </div>
      </Card>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Nach Spieler suchen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-800 border-gray-700 text-white"
          />
        </div>
      </div>

      {/* Records List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Akten ({filteredRecords.length})</h3>
        {filteredRecords.length === 0 ? (
          <Card className="bg-gray-800 border-gray-700 p-6 text-center">
            <p className="text-gray-400">Keine Akten gefunden</p>
          </Card>
        ) : (
          filteredRecords.map((record) => (
            <Card key={record.id} className="bg-gray-800 border-gray-700 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-blue-400" />
                  <div>
                    <h4 className="text-lg font-bold text-white">{record.playerName}</h4>
                    <p className="text-gray-300">{record.record}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-400">
                <div className="flex items-center space-x-4">
                  <span>Erstellt von: {record.createdBy}</span>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{record.createdDate}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default AktenApp;
