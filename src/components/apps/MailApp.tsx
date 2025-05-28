import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Mail, Inbox, Send, Trash2, Star } from "lucide-react";

interface MailAppProps {
  onBack: () => void;
}

const MailApp = ({ onBack }: MailAppProps) => {
  const [activeFolder, setActiveFolder] = useState("inbox");
  const [selectedMail, setSelectedMail] = useState<number | null>(null);
  const [showCompose, setShowCompose] = useState(false);
  const [composeData, setComposeData] = useState({
    to: "",
    subject: "",
    message: ""
  });

  const mails = [
    {
      id: 1,
      from: "Chief Williams",
      subject: "Neuer Einsatzbefehl - Priorität Hoch",
      preview: "Verdächtiger Bankraub in der Innenstadt...",
      time: "10:30",
      unread: true,
      important: true,
      folder: "inbox"
    },
    {
      id: 2,
      from: "Lt. Johnson",
      subject: "Schichtplan Update",
      preview: "Der Schichtplan für nächste Woche wurde aktualisiert...",
      time: "09:15",
      unread: true,
      important: false,
      folder: "inbox"
    }
  ];

  const folders = [
    { id: "inbox", name: "Posteingang", icon: Inbox, count: 2 },
    { id: "sent", name: "Gesendet", icon: Send, count: 0 },
    { id: "starred", name: "Markiert", icon: Star, count: 1 },
    { id: "trash", name: "Papierkorb", icon: Trash2, count: 0 }
  ];

  const handleSendMail = () => {
    console.log("Mail gesendet:", composeData);
    setComposeData({ to: "", subject: "", message: "" });
    setShowCompose(false);
  };

  if (showCompose) {
    return (
      <div className="p-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={() => setShowCompose(false)} className="mr-4">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold">Neue Mail verfassen</h1>
        </div>

        <Card className="bg-gray-800 border-gray-700 p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">An:</label>
              <Input
                value={composeData.to}
                onChange={(e) => setComposeData({...composeData, to: e.target.value})}
                placeholder="Empfänger eingeben..."
                className="bg-gray-700 border-gray-600"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Betreff:</label>
              <Input
                value={composeData.subject}
                onChange={(e) => setComposeData({...composeData, subject: e.target.value})}
                placeholder="Betreff eingeben..."
                className="bg-gray-700 border-gray-600"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Nachricht:</label>
              <Textarea
                value={composeData.message}
                onChange={(e) => setComposeData({...composeData, message: e.target.value})}
                placeholder="Ihre Nachricht..."
                className="bg-gray-700 border-gray-600 min-h-32"
              />
            </div>
            
            <div className="flex space-x-2">
              <Button onClick={handleSendMail} className="bg-blue-600 hover:bg-blue-700">
                <Send className="w-4 h-4 mr-2" />
                Senden
              </Button>
              <Button variant="outline" onClick={() => setShowCompose(false)}>
                Abbrechen
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (selectedMail) {
    const mail = mails.find(m => m.id === selectedMail);
    return (
      <div className="p-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={() => setSelectedMail(null)} className="mr-4">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold">Mail Details</h1>
        </div>

        <Card className="bg-gray-800 border-gray-700 p-6">
          <div className="border-b border-gray-700 pb-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold">{mail?.subject}</h2>
              {mail?.important && <Star className="w-5 h-5 text-yellow-400 fill-current" />}
            </div>
            <div className="flex items-center justify-between text-sm text-gray-400">
              <span>Von: {mail?.from}</span>
              <span>{mail?.time}</span>
            </div>
          </div>
          
          <div className="prose prose-invert max-w-none">
            <p>Guten Tag,</p>
            <p>
              hiermit informiere ich Sie über einen verdächtigen Bankraub in der Innenstadt von Los Santos. 
              Der Vorfall ereignete sich um 09:45 Uhr in der Fleeca Bank an der Vinewood Boulevard.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-700 flex space-x-2">
            <Button size="sm">Antworten</Button>
            <Button size="sm" variant="outline">Weiterleiten</Button>
            <Button size="sm" variant="ghost">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button variant="ghost" onClick={onBack} className="mr-4">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold">Mail</h1>
        </div>
        <Button 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => setShowCompose(true)}
        >
          <Send className="w-4 h-4 mr-2" />
          Verfassen
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="space-y-2">
          {folders.map((folder) => (
            <Button
              key={folder.id}
              variant={activeFolder === folder.id ? "default" : "ghost"}
              className="w-full justify-between"
              onClick={() => setActiveFolder(folder.id)}
            >
              <div className="flex items-center">
                <folder.icon className="w-4 h-4 mr-2" />
                {folder.name}
              </div>
              {folder.count > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {folder.count}
                </Badge>
              )}
            </Button>
          ))}
        </div>

        {/* Mail List */}
        <div className="col-span-3 space-y-2">
          {mails.filter(mail => mail.folder === activeFolder).map((mail) => (
            <Card
              key={mail.id}
              className={`bg-gray-800 border-gray-700 p-4 cursor-pointer hover:bg-gray-700 transition-colors ${
                mail.unread ? "border-l-4 border-l-blue-500" : ""
              }`}
              onClick={() => setSelectedMail(mail.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className={`font-semibold ${mail.unread ? "text-white" : "text-gray-300"}`}>
                    {mail.from}
                  </span>
                  {mail.important && <Star className="w-4 h-4 text-yellow-400 fill-current" />}
                </div>
                <span className="text-sm text-gray-400">{mail.time}</span>
              </div>
              <h3 className={`font-medium mb-1 ${mail.unread ? "text-white" : "text-gray-300"}`}>
                {mail.subject}
              </h3>
              <p className="text-sm text-gray-400 truncate">{mail.preview}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MailApp;
