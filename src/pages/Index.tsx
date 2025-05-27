
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Car, 
  Mail, 
  Radio, 
  Phone, 
  FileText, 
  MessageSquare,
  Settings,
  Battery,
  Wifi,
  Signal
} from "lucide-react";
import FraktionApp from "@/components/apps/FraktionApp";
import GarageApp from "@/components/apps/GarageApp";
import MailApp from "@/components/apps/MailApp";
import LeitstelleApp from "@/components/apps/LeitstelleApp";
import DispatchApp from "@/components/apps/DispatchApp";
import AktenApp from "@/components/apps/AktenApp";
import SocialApp from "@/components/apps/SocialApp";

const Index = () => {
  const [currentApp, setCurrentApp] = useState<string | null>(null);
  const [time] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  const apps = [
    { id: 'fraktion', name: 'Fraktion', icon: Users, color: 'bg-blue-600', component: FraktionApp },
    { id: 'garage', name: 'Garage', icon: Car, color: 'bg-green-600', component: GarageApp },
    { id: 'mail', name: 'Mail', icon: Mail, color: 'bg-red-600', component: MailApp },
    { id: 'leitstelle', name: 'Leitstelle', icon: Radio, color: 'bg-purple-600', component: LeitstelleApp },
    { id: 'dispatch', name: 'Dispatch', icon: Phone, color: 'bg-orange-600', component: DispatchApp },
    { id: 'akten', name: 'Akten', icon: FileText, color: 'bg-yellow-600', component: AktenApp },
    { id: 'social', name: 'Social', icon: MessageSquare, color: 'bg-pink-600', component: SocialApp },
    { id: 'settings', name: 'Settings', icon: Settings, color: 'bg-gray-600', component: null },
  ];

  const ActiveApp = currentApp ? apps.find(app => app.id === currentApp)?.component : null;

  if (currentApp && ActiveApp) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto">
          <ActiveApp onBack={() => setCurrentApp(null)} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-4xl mx-auto p-6">
        {/* Status Bar */}
        <div className="flex justify-between items-center mb-8 text-sm">
          <div className="flex items-center space-x-2">
            <Signal className="w-4 h-4" />
            <Wifi className="w-4 h-4" />
            <span className="text-gray-300">LSPD Network</span>
          </div>
          <div className="text-xl font-bold">{time}</div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-300">87%</span>
            <Battery className="w-4 h-4" />
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            GTA V Tablet
          </h1>
          <p className="text-gray-400">FiveM Server Management System</p>
        </div>

        {/* App Grid */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {apps.map((app) => (
            <Card
              key={app.id}
              className="bg-gray-800/50 border-gray-700 hover:bg-gray-700/50 transition-all duration-300 cursor-pointer group"
              onClick={() => setCurrentApp(app.id)}
            >
              <div className="p-6 text-center">
                <div className={`${app.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <app.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-white font-medium">{app.name}</h3>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="bg-gray-800/30 border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Online Spieler</p>
                <p className="text-2xl font-bold text-green-400">247</p>
              </div>
              <Users className="w-8 h-8 text-green-400" />
            </div>
          </Card>
          
          <Card className="bg-gray-800/30 border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Aktive Einsätze</p>
                <p className="text-2xl font-bold text-red-400">12</p>
              </div>
              <Phone className="w-8 h-8 text-red-400" />
            </div>
          </Card>
          
          <Card className="bg-gray-800/30 border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Neue Nachrichten</p>
                <p className="text-2xl font-bold text-blue-400">5</p>
              </div>
              <Mail className="w-8 h-8 text-blue-400" />
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 flex justify-center space-x-4">
          <Badge variant="outline" className="text-green-400 border-green-400">
            System Online
          </Badge>
          <Badge variant="outline" className="text-blue-400 border-blue-400">
            Server: DE-01
          </Badge>
          <Badge variant="outline" className="text-purple-400 border-purple-400">
            Version 1.2.3
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default Index;
