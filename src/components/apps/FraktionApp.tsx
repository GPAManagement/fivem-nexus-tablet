
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, Crown, Shield, Star } from "lucide-react";

interface FraktionAppProps {
  onBack: () => void;
}

const FraktionApp = ({ onBack }: FraktionAppProps) => {
  const fraktionData = {
    name: "Los Santos Police Department",
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
    <div className="p-6 text-white">
      {/* Header */}
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={onBack} className="mr-4 text-white hover:bg-gray-700">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-2xl font-bold">Fraktion - Mitglieder</h1>
      </div>

      {/* Faction Info */}
      <Card className="bg-gray-800 border-gray-700 p-6 mb-6">
        <h2 className="text-xl font-bold mb-4 text-white">{fraktionData.name}</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-400">Mitglieder</p>
            <p className="text-lg font-semibold text-white">{fraktionData.members.length}</p>
          </div>
          <div>
            <p className="text-gray-400">Online</p>
            <p className="text-lg font-semibold text-green-400">
              {fraktionData.members.filter(m => m.status === "online").length}
            </p>
          </div>
        </div>
      </Card>

      {/* Members List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Mitgliederliste</h3>
        {fraktionData.members.map((member) => (
          <Card key={member.id} className="bg-gray-800 border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getRankIcon(member.role)}
                <div>
                  <p className="font-semibold text-white">{member.name}</p>
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
    </div>
  );
};

export default FraktionApp;
