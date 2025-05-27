
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, Crown, Shield, Star } from "lucide-react";

interface FraktionAppProps {
  onBack: () => void;
}

const FraktionApp = ({ onBack }: FraktionAppProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  const fraktionData = {
    name: "Los Santos Police Department",
    memberCount: 47,
    rank: "Detective",
    members: [
      { id: 1, name: "John Smith", rank: "Chief", status: "online", role: "chief" },
      { id: 2, name: "Sarah Johnson", rank: "Lieutenant", status: "online", role: "lieutenant" },
      { id: 3, name: "Mike Wilson", rank: "Sergeant", status: "offline", role: "sergeant" },
      { id: 4, name: "Emma Brown", rank: "Officer", status: "online", role: "officer" },
      { id: 5, name: "David Lee", rank: "Cadet", status: "online", role: "cadet" },
    ]
  };

  const getRankIcon = (role: string) => {
    switch (role) {
      case "chief": return <Crown className="w-4 h-4 text-yellow-400" />;
      case "lieutenant": return <Shield className="w-4 h-4 text-purple-400" />;
      case "sergeant": return <Star className="w-4 h-4 text-blue-400" />;
      default: return <Users className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={onBack} className="mr-4">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-2xl font-bold">Fraktion</h1>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        {["overview", "members", "duties"].map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? "default" : "ghost"}
            onClick={() => setActiveTab(tab)}
            className="capitalize"
          >
            {tab === "overview" ? "Übersicht" : tab === "members" ? "Mitglieder" : "Dienste"}
          </Button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <Card className="bg-gray-800 border-gray-700 p-6">
            <h2 className="text-xl font-bold mb-4">{fraktionData.name}</h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-gray-400">Dein Rang</p>
                <p className="text-lg font-semibold text-blue-400">{fraktionData.rank}</p>
              </div>
              <div>
                <p className="text-gray-400">Mitglieder</p>
                <p className="text-lg font-semibold">{fraktionData.memberCount}</p>
              </div>
              <div>
                <p className="text-gray-400">Status</p>
                <Badge className="bg-green-600">Aktiv</Badge>
              </div>
            </div>
          </Card>

          <Card className="bg-gray-800 border-gray-700 p-6">
            <h3 className="text-lg font-semibold mb-4">Aktuelle Aufgaben</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-700 rounded">
                <span>Streifenfahrt Sektor 7</span>
                <Badge variant="outline">In Bearbeitung</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-700 rounded">
                <span>Bericht #A-2047 erstellen</span>
                <Badge variant="outline">Offen</Badge>
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === "members" && (
        <div className="space-y-4">
          {fraktionData.members.map((member) => (
            <Card key={member.id} className="bg-gray-800 border-gray-700 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getRankIcon(member.role)}
                  <div>
                    <p className="font-semibold">{member.name}</p>
                    <p className="text-sm text-gray-400">{member.rank}</p>
                  </div>
                </div>
                <Badge className={member.status === "online" ? "bg-green-600" : "bg-gray-600"}>
                  {member.status === "online" ? "Online" : "Offline"}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "duties" && (
        <div className="space-y-4">
          <Card className="bg-gray-800 border-gray-700 p-6">
            <h3 className="text-lg font-semibold mb-4">Dienstplan</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-700 rounded">
                <div>
                  <p className="font-semibold">Frühdienst</p>
                  <p className="text-sm text-gray-400">06:00 - 14:00</p>
                </div>
                <Badge className="bg-blue-600">Verfügbar</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-700 rounded">
                <div>
                  <p className="font-semibold">Spätdienst</p>
                  <p className="text-sm text-gray-400">14:00 - 22:00</p>
                </div>
                <Badge className="bg-green-600">Aktiv</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-700 rounded">
                <div>
                  <p className="font-semibold">Nachtdienst</p>
                  <p className="text-sm text-gray-400">22:00 - 06:00</p>
                </div>
                <Badge variant="outline">Besetzt</Badge>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default FraktionApp;
