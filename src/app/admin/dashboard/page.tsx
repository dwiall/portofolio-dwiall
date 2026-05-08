import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, FolderGit2, GraduationCap, MessageSquare, Award, Sparkles } from "lucide-react";
import DashboardCharts from "./DashboardCharts";

export default async function AdminDashboard() {
  const [projectCount, experienceCount, skillCount, messageCount, certificateCount] = await Promise.all([
    db.project.count(),
    db.experience.count(),
    db.skill.count(),
    db.contactMessage.count(),
    db.certificate.count(),
  ]);

  const stats = [
    { title: "Projects", value: projectCount, icon: FolderGit2, color: "text-blue-500" },
    { title: "Experience", value: experienceCount, icon: Briefcase, color: "text-emerald-500" },
    { title: "Skills", value: skillCount, icon: Sparkles, color: "text-amber-500" },
    { title: "Certificates", value: certificateCount, icon: Award, color: "text-purple-500" },
    { title: "Messages", value: messageCount, icon: MessageSquare, color: "text-rose-500" },
  ];

  const chartData = stats.map(s => ({ name: s.title, count: s.value }));

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold font-heading">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back, Admin. Here's what's happening with your portfolio.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="glass-card border-white/5 hover:border-primary/50 transition-all group">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <DashboardCharts data={chartData} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Quick Tips or Recent Activity could go here */}
        <Card className="glass-card border-white/5 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" /> Quick Tip
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Keep your portfolio fresh by updating your latest projects and skills regularly. 
              Responsive design and fast load times are key to a great user experience.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
