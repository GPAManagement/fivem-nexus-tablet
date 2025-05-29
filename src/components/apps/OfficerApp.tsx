
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, UserCheck, Search, Phone, MapPin, Clock } from "lucide-react";

interface OfficerAppProps {
  onBack: () => void;
}

interface Officer {
  id: string;
  name: string;
  badge: string;
  rank: string;
  department: string;
  status: "On Duty" | "Off Duty" | "Break" | "Unavailable";
  location: string;
  phone: string;
  shift: string;
  totalHours: number;
}

const OfficerApp = ({ onBack }: OfficerAppProps) => {
  const [officers, setOfficers] = useState<Officer[]>([
    {
      id: "1",
      name: "John Smith",
      badge: "001",
      rank: "Chief",
      department: "LSPD",
      status: "On Duty",
      location: "Mission Row PD",
      phone: "555-0101",
      shift: "Day Shift (06:00-14:00)",
      totalHours: 156
    },
    {
      id: "2",
      name: "Sarah Johnson",
      badge: "102",
      rank: "Lieutenant",
      department: "LSPD",
      status: "On Duty",
      location: "Patrol Unit 12",
      phone: "555-0102",
      shift: "Day Shift (06:00-14:00)",
      totalHours: 142
    },
    {
      id: "3",
      name: "Mike Wilson",
      badge: "203",
      rank: "Sergeant",
      department: "LSPD",
      status: "Break",
      location: "Downtown Station",
      phone: "555-0103",
      shift: "Night Shift (22:00-06:00)",
      totalHours: 128
    },
    {
      id: "4",
      name: "Emma Brown",
      badge: "304",
      rank: "Officer",
      department: "LSPD",
      status: "On Duty",
      location: "Highway Patrol",
      phone: "555-0104",
      shift: "Evening Shift (14:00-22:00)",
      totalHours: 98
    },
    {
      id: "5",
      name: "David Lee",
      badge: "405",
      rank: "Cadet",
      department: "LSPD",
      status: "Off Duty",
      location: "Training Center",
      phone: "555-0105",
      shift: "Day Shift (06:00-14:00)",
      totalHours: 45
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOfficer, setSelectedOfficer] = useState<Officer | null>(null);

  const filteredOfficers = officers.filter(officer =>
    officer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    officer.badge.includes(searchTerm) ||
    officer.rank.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "On Duty": return "bg-green-600";
      case "Off Duty": return "bg-gray-600";
      case "Break": return "bg-yellow-600";
      case "Unavailable": return "bg-red-600";
      default: return "bg-gray-600";
    }
  };

  const getRankColor = (rank: string) => {
    switch (rank) {
      case "Chief": return "text-yellow-400";
      case "Lieutenant": return "text-purple-400";
      case "Sergeant": return "text-blue-400";
      case "Officer": return "text-green-400";
      case "Cadet": return "text-gray-400";
      default: return "text-white";
    }
  };

  if (selectedOfficer) {
    return (
      <div className="p-6 text-white">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => setSelectedOfficer(null)} 
            className="mr-4 text-white hover:bg-gray-700"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold">Officer Details</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Officer Info */}
          <Card className="bg-gray-800 border-gray-700 p-6">
            <h3 className="text-lg font-semibold mb-4 text-white">Persönliche Daten</h3>
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm">Name</label>
                <p className="text-white font-bold text-lg">{selectedOfficer.name}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Dienstnummer</label>
                <p className="text-white">#{selectedOfficer.badge}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Rang</label>
                <p className={`font-semibold ${getRankColor(selectedOfficer.rank)}`}>
                  {selectedOfficer.rank}
                </p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Abteilung</label>
                <p className="text-white">{selectedOfficer.department}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-white">{selectedOfficer.phone}</span>
              </div>
            </div>
          </Card>

          {/* Current Status */}
          <Card className="bg-gray-800 border-gray-700 p-6">
            <h3 className="text-lg font-semibold mb-4 text-white">Aktueller Status</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Status:</span>
                <Badge className={getStatusColor(selectedOfficer.status)}>
                  {selectedOfficer.status}
                </Badge>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-white">{selectedOfficer.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-white">{selectedOfficer.shift}</span>
              </div>
              <div>
                <span className="text-gray-400">Gesamte Arbeitsstunden:</span>
                <p className="text-white font-bold">{selectedOfficer.totalHours} Stunden</p>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Nachricht senden
              </Button>
              <Button variant="outline" className="w-full text-white border-gray-600 hover:bg-gray-700">
                Standort verfolgen
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 text-white">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          onClick={onBack} 
          className="mr-4 text-white hover:bg-gray-700"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-2xl font-bold flex items-center">
          <UserCheck className="w-6 h-6 mr-2 text-teal-400" />
          Officer Management
        </h1>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Nach Name, Dienstnummer oder Rang suchen..."
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
            <p className="text-2xl font-bold text-green-400">
              {officers.filter(o => o.status === "On Duty").length}
            </p>
            <p className="text-sm text-gray-300">Im Dienst</p>
          </div>
        </Card>
        <Card className="bg-gray-800 border-gray-700 p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-400">
              {officers.filter(o => o.status === "Break").length}
            </p>
            <p className="text-sm text-gray-300">Pause</p>
          </div>
        </Card>
        <Card className="bg-gray-800 border-gray-700 p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-400">
              {officers.filter(o => o.status === "Off Duty").length}
            </p>
            <p className="text-sm text-gray-300">Nicht im Dienst</p>
          </div>
        </Card>
        <Card className="bg-gray-800 border-gray-700 p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-white">{officers.length}</p>
            <p className="text-sm text-gray-300">Gesamt</p>
          </div>
        </Card>
      </div>

      {/* Officers List */}
      <div className="space-y-4">
        {filteredOfficers.map((officer) => (
          <Card 
            key={officer.id} 
            className="bg-gray-800 border-gray-700 p-6 cursor-pointer hover:bg-gray-700 transition-colors"
            onClick={() => setSelectedOfficer(officer)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">
                    {officer.name} #{officer.badge}
                  </h3>
                  <p className={`font-medium ${getRankColor(officer.rank)}`}>
                    {officer.rank}
                  </p>
                  <p className="text-gray-300 text-sm">{officer.location}</p>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <Badge className={getStatusColor(officer.status)}>
                  {officer.status}
                </Badge>
                <span className="text-sm text-gray-400">
                  {officer.totalHours}h Gesamt
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OfficerApp;
