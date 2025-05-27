
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, MessageSquare, Heart, Share, Plus, Search, Users, Camera } from "lucide-react";

interface SocialAppProps {
  onBack: () => void;
}

const SocialApp = ({ onBack }: SocialAppProps) => {
  const [activeTab, setActiveTab] = useState("feed");
  const [newPost, setNewPost] = useState("");

  const posts = [
    {
      id: 1,
      author: "Officer Martinez",
      username: "@martinez_pd",
      time: "2h",
      content: "Erfolgreiche Streifenfahrt heute! Kein Zwischenfall in Sektor 7. #LSPD #Community",
      likes: 23,
      comments: 5,
      shares: 2,
      badge: "LSPD"
    },
    {
      id: 2,
      author: "Sarah Detective",
      username: "@detective_sarah",
      time: "4h",
      content: "Training im Schießstand abgeschlossen. Immer wichtig, die Fähigkeiten zu schärfen! 🎯",
      likes: 41,
      comments: 8,
      shares: 3,
      badge: "LSPD"
    },
    {
      id: 3,
      author: "Mike Paramedic",
      username: "@medic_mike", 
      time: "6h",
      content: "Ruhiger Tag bei EMS. Kein Notruf ist auch ein guter Tag! 🚑",
      likes: 18,
      comments: 3,
      shares: 1,
      badge: "EMS"
    },
    {
      id: 4,
      author: "Chief Williams",
      username: "@chief_williams",
      time: "8h",
      content: "Stolz auf mein Team! Wieder ein erfolgreicher Monat mit verbesserter Aufklärungsrate.",
      likes: 67,
      comments: 12,
      shares: 8,
      badge: "LSPD"
    }
  ];

  const contacts = [
    { name: "Officer Martinez", status: "online", department: "LSPD", avatar: "👮‍♂️" },
    { name: "Detective Brown", status: "offline", department: "LSPD", avatar: "🕵️‍♀️" },
    { name: "Paramedic Johnson", status: "online", department: "EMS", avatar: "🚑" },
    { name: "Firefighter Davis", status: "busy", department: "FD", avatar: "🚒" },
    { name: "Chief Williams", status: "online", department: "LSPD", avatar: "👨‍💼" }
  ];

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "LSPD": return "bg-blue-600";
      case "EMS": return "bg-red-600";
      case "FD": return "bg-orange-600";
      default: return "bg-gray-600";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-green-400";
      case "busy": return "bg-yellow-400";
      case "offline": return "bg-gray-400";
      default: return "bg-gray-400";
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
            <MessageSquare className="w-6 h-6 mr-2 text-purple-400" />
            Social Network
          </h1>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Neuer Post
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex space-x-4 mb-6">
        {["feed", "messages", "contacts"].map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? "default" : "ghost"}
            onClick={() => setActiveTab(tab)}
            className="capitalize"
          >
            {tab === "feed" ? "Timeline" : tab === "messages" ? "Nachrichten" : "Kontakte"}
          </Button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "feed" && (
        <div className="space-y-6">
          {/* Create Post */}
          <Card className="bg-gray-800 border-gray-700 p-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                👮‍♂️
              </div>
              <div className="flex-1">
                <Textarea
                  placeholder="Was beschäftigt dich heute?"
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="bg-gray-700 border-gray-600 mb-4"
                />
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Camera className="w-4 h-4 mr-2" />
                      Foto
                    </Button>
                  </div>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    Posten
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Posts */}
          {posts.map((post) => (
            <Card key={post.id} className="bg-gray-800 border-gray-700 p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-lg">
                  👮‍♂️
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-bold">{post.author}</h3>
                    <span className="text-gray-400 text-sm">{post.username}</span>
                    <span className="text-gray-500 text-sm">•</span>
                    <span className="text-gray-500 text-sm">{post.time}</span>
                    <Badge className={getBadgeColor(post.badge)}>
                      {post.badge}
                    </Badge>
                  </div>
                  
                  <p className="mb-4">{post.content}</p>
                  
                  <div className="flex items-center space-x-6 text-gray-400">
                    <button className="flex items-center space-x-2 hover:text-red-400 transition-colors">
                      <Heart className="w-4 h-4" />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-2 hover:text-blue-400 transition-colors">
                      <MessageSquare className="w-4 h-4" />
                      <span>{post.comments}</span>
                    </button>
                    <button className="flex items-center space-x-2 hover:text-green-400 transition-colors">
                      <Share className="w-4 h-4" />
                      <span>{post.shares}</span>
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "messages" && (
        <div className="grid grid-cols-3 gap-6">
          {/* Message List */}
          <div className="col-span-1 space-y-2">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input placeholder="Nachrichten suchen..." className="pl-10 bg-gray-800 border-gray-700" />
              </div>
            </div>
            
            {contacts.slice(0, 3).map((contact, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700 p-4 cursor-pointer hover:bg-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                      {contact.avatar}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(contact.status)} rounded-full border-2 border-gray-800`}></div>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{contact.name}</p>
                    <p className="text-sm text-gray-400">Letzte Nachricht...</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Chat Area */}
          <Card className="col-span-2 bg-gray-800 border-gray-700 p-6">
            <div className="text-center text-gray-400">
              <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-600" />
              <p>Wähle eine Unterhaltung aus oder starte eine neue</p>
            </div>
          </Card>
        </div>
      )}

      {activeTab === "contacts" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Deine Kontakte</h3>
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input placeholder="Kontakte suchen..." className="pl-10 bg-gray-800 border-gray-700" />
            </div>
          </div>

          {contacts.map((contact, index) => (
            <Card key={index} className="bg-gray-800 border-gray-700 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-lg">
                      {contact.avatar}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(contact.status)} rounded-full border-2 border-gray-800`}></div>
                  </div>
                  <div>
                    <h4 className="font-semibold">{contact.name}</h4>
                    <div className="flex items-center space-x-2">
                      <Badge className={getBadgeColor(contact.department)}>
                        {contact.department}
                      </Badge>
                      <span className="text-sm text-gray-400 capitalize">{contact.status}</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Nachricht
                  </Button>
                  <Button size="sm" variant="outline">
                    Profil
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SocialApp;
