'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { jsPDF } from 'jspdf';
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Target,
  Lightbulb,
  Copy,
  Check,
  Lock,
  CheckCircle,
  FileText,
  Download,
  FileDown,
} from 'lucide-react';
import { createClient } from '@/app/lib/supabase/client';
import { getWeekContent, getModuleByWeek, weekContent } from '@/app/data/weeks';
import { Profile, UserProgress } from '@/app/types/database';
import { canAccessWeek } from '@/app/types/pro';
import { recordWeekAttempt } from '@/app/lib/progress';

export default function WeekPage() {
  const params = useParams();
  const router = useRouter();
  const weekNumber = parseInt(params.weekNumber as string, 10);

  const [profile, setProfile] = useState<Profile | null>(null);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(0);
  const [copiedTemplate, setCopiedTemplate] = useState<string | null>(null);
  const [showExercise, setShowExercise] = useState(false);

  const week = getWeekContent(weekNumber);
  const module = getModuleByWeek(weekNumber);

  useEffect(() => {
    async function loadData() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const [profileRes, progressRes] = await Promise.all([
          supabase.from('profiles').select('*').eq('id', user.id).single(),
          supabase.from('user_progress').select('*').eq('user_id', user.id).single(),
        ]);

        setProfile(profileRes.data);
        setProgress(progressRes.data);
      }
      setLoading(false);
    }

    loadData();
  }, []);

  const copyToClipboard = (text: string, templateId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTemplate(templateId);
    setTimeout(() => setCopiedTemplate(null), 2000);
  };

  // Download as TXT
  const downloadAsTxt = (title: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/[^a-zA-Z0-9]/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Download all templates as single TXT
  const downloadAllTemplates = () => {
    if (!week) return;

    const content = week.templates.map((t, i) =>
      `${'='.repeat(60)}\n${i + 1}. ${t.title}\n${'='.repeat(60)}\n${t.description}\n\n${t.prompt}\n\n`
    ).join('\n');

    const header = `Prompt Gym - Week ${weekNumber}: ${week.title}\nDownload datum: ${new Date().toLocaleDateString('nl-NL')}\n\n`;

    downloadAsTxt(`Week-${weekNumber}-Templates`, header + content);
  };

  // Download as PDF
  const downloadAsPdf = (title: string, content: string) => {
    const doc = new jsPDF();
    const margin = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const maxLineWidth = pageWidth - margin * 2;
    let yPosition = margin;

    // Title
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(title, margin, yPosition);
    yPosition += 10;

    // Subtitle
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100);
    doc.text(`Prompt Gym - Week ${weekNumber}`, margin, yPosition);
    doc.text(new Date().toLocaleDateString('nl-NL'), pageWidth - margin - 25, yPosition);
    yPosition += 15;

    // Content
    doc.setFontSize(11);
    doc.setTextColor(0);
    const lines = doc.splitTextToSize(content, maxLineWidth);

    for (const line of lines) {
      if (yPosition > doc.internal.pageSize.getHeight() - margin) {
        doc.addPage();
        yPosition = margin;
      }
      doc.text(line, margin, yPosition);
      yPosition += 6;
    }

    doc.save(`${title.replace(/[^a-zA-Z0-9]/g, '-')}.pdf`);
  };

  // Download all templates as PDF
  const downloadAllPdf = () => {
    if (!week) return;

    const doc = new jsPDF();
    const margin = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const maxLineWidth = pageWidth - margin * 2;
    let yPosition = margin;

    // Header
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text(`Week ${weekNumber}: ${week.title}`, margin, yPosition);
    yPosition += 10;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100);
    doc.text(`Prompt Gym - ${week.templates.length} templates`, margin, yPosition);
    doc.text(new Date().toLocaleDateString('nl-NL'), pageWidth - margin - 25, yPosition);
    yPosition += 20;

    doc.setTextColor(0);

    week.templates.forEach((template, index) => {
      // Check if we need a new page
      if (yPosition > doc.internal.pageSize.getHeight() - 60) {
        doc.addPage();
        yPosition = margin;
      }

      // Template title
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text(`${index + 1}. ${template.title}`, margin, yPosition);
      yPosition += 7;

      // Description
      doc.setFontSize(10);
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(100);
      doc.text(template.description, margin, yPosition);
      yPosition += 10;

      // Prompt content
      doc.setFontSize(10);
      doc.setFont('courier', 'normal');
      doc.setTextColor(0);
      const lines = doc.splitTextToSize(template.prompt, maxLineWidth);

      for (const line of lines) {
        if (yPosition > doc.internal.pageSize.getHeight() - margin) {
          doc.addPage();
          yPosition = margin;
        }
        doc.text(line, margin, yPosition);
        yPosition += 5;
      }

      yPosition += 15; // Space between templates
    });

    doc.save(`Week-${weekNumber}-Templates.pdf`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f12] flex items-center justify-center">
        <div className="w-16 h-16 bg-gradient-to-br from-[#f5a623] to-[#e09620] rounded-2xl animate-pulse flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-[#0f0f12]" />
        </div>
      </div>
    );
  }

  // Check access
  const hasAccess = profile && canAccessWeek(
    weekNumber,
    profile.subscription_status,
    profile.subscription_start ? new Date(profile.subscription_start) : null
  );

  if (!week) {
    return (
      <div className="min-h-screen bg-[#0f0f12] flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#f0ede8] mb-4">Week {weekNumber} komt binnenkort</h1>
          <p className="text-[#6a6a70] mb-6">Deze content is nog in ontwikkeling.</p>
          <Link href="/dashboard" className="text-[#f5a623] hover:underline">
            Terug naar dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-[#0f0f12] flex items-center justify-center p-4">
        <div className="bg-[#1c1c23] border border-white/[0.06] rounded-2xl p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-[#f5a623]/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-[#f5a623]" />
          </div>
          <h1 className="text-2xl font-bold text-[#f0ede8] mb-2">Week {weekNumber} is locked</h1>
          <p className="text-[#6a6a70] mb-6">
            {profile?.subscription_status === 'free'
              ? 'Upgrade naar Pro om toegang te krijgen.'
              : 'Deze week wordt binnenkort ontgrendeld.'}
          </p>
          <Link
            href="/dashboard"
            className="inline-block bg-gradient-to-r from-[#f5a623] to-[#e09620] text-[#0f0f12] px-6 py-3 rounded-xl font-bold"
          >
            Terug naar dashboard
          </Link>
        </div>
      </div>
    );
  }

  const isCompleted = progress?.completed_weeks?.includes(weekNumber);
  const prevWeek = weekNumber > 1 && weekContent[weekNumber - 1] ? weekNumber - 1 : null;
  const nextWeek = weekContent[weekNumber + 1] ? weekNumber + 1 : null;

  return (
    <div className="min-h-screen bg-[#0f0f12] text-[#f0ede8]">
      {/* Background gradients */}
      <div className="fixed -top-[300px] -right-[200px] w-[700px] h-[700px] bg-[#f5a623]/[0.06] rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="border-b border-white/[0.06] bg-[#0f0f12]/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-[#9a9a9f] hover:text-[#f0ede8] transition">
            <ChevronLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>

          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 bg-gradient-to-br ${module?.color || 'from-orange-500 to-orange-600'} rounded-lg flex items-center justify-center`}>
              <span className="text-sm font-bold text-white">{weekNumber}</span>
            </div>
            <div>
              <p className="text-sm font-bold">{week.title}</p>
              <p className="text-xs text-[#6a6a70]">{module?.title}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {prevWeek && (
              <Link href={`/pro/week/${prevWeek}`} className="p-2 hover:bg-white/5 rounded-lg transition">
                <ChevronLeft className="w-5 h-5 text-[#6a6a70]" />
              </Link>
            )}
            {nextWeek && (
              <Link href={`/pro/week/${nextWeek}`} className="p-2 hover:bg-white/5 rounded-lg transition">
                <ChevronRight className="w-5 h-5 text-[#6a6a70]" />
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Week Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm text-[#6a6a70]">Week {weekNumber}</span>
            {isCompleted && (
              <span className="flex items-center gap-1 text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded">
                <CheckCircle className="w-3 h-3" />
                Voltooid
              </span>
            )}
          </div>
          <h1 className="text-3xl font-bold mb-3">{week.title}</h1>
          <p className="text-[#9a9a9f] text-lg">{week.description}</p>
        </div>

        {/* Learning Goals */}
        <div className="bg-[#1c1c23] border border-white/[0.06] rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-[#f5a623]" />
            <h2 className="font-bold">Leerdoelen</h2>
          </div>
          <ul className="space-y-2">
            {week.learningGoals.map((goal, i) => (
              <li key={i} className="flex items-start gap-3 text-[#9a9a9f]">
                <CheckCircle className="w-4 h-4 text-[#f5a623] mt-1 flex-shrink-0" />
                {goal}
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-4 border-t border-white/[0.06]">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-300">{week.keyPrinciple}</span>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-[#f5a623]" />
            <h2 className="font-bold">Inhoud</h2>
          </div>

          {/* Section Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
            {week.sections.map((section, i) => (
              <button
                key={i}
                onClick={() => setActiveSection(i)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                  activeSection === i
                    ? 'bg-[#f5a623] text-[#0f0f12]'
                    : 'bg-[#1c1c23] text-[#9a9a9f] hover:text-[#f0ede8]'
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>

          {/* Active Section Content */}
          <div className="bg-[#1c1c23] border border-white/[0.06] rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                week.sections[activeSection].type === 'theory' ? 'bg-blue-500/20 text-blue-300' :
                week.sections[activeSection].type === 'example' ? 'bg-green-500/20 text-green-300' :
                week.sections[activeSection].type === 'practice' ? 'bg-purple-500/20 text-purple-300' :
                'bg-yellow-500/20 text-yellow-300'
              }`}>
                {week.sections[activeSection].type === 'theory' ? 'Theorie' :
                 week.sections[activeSection].type === 'example' ? 'Voorbeeld' :
                 week.sections[activeSection].type === 'practice' ? 'Praktijk' : 'Tip'}
              </span>
              <h3 className="font-bold">{week.sections[activeSection].title}</h3>
            </div>
            <div className="prose prose-invert max-w-none">
              <div className="text-[#c5c5c9] whitespace-pre-wrap leading-relaxed">
                {week.sections[activeSection].content.split('```').map((part, i) => {
                  if (i % 2 === 1) {
                    return (
                      <pre key={i} className="bg-[#0f0f12] border border-white/[0.06] rounded-lg p-4 my-4 overflow-x-auto text-sm">
                        <code>{part.trim()}</code>
                      </pre>
                    );
                  }
                  return <span key={i}>{part}</span>;
                })}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-6 pt-4 border-t border-white/[0.06]">
              <button
                onClick={() => setActiveSection(Math.max(0, activeSection - 1))}
                disabled={activeSection === 0}
                className="flex items-center gap-2 text-[#9a9a9f] hover:text-[#f0ede8] disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft className="w-4 h-4" />
                Vorige
              </button>
              <button
                onClick={() => setActiveSection(Math.min(week.sections.length - 1, activeSection + 1))}
                disabled={activeSection === week.sections.length - 1}
                className="flex items-center gap-2 text-[#9a9a9f] hover:text-[#f0ede8] disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                Volgende
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Exercise */}
        {week.exercises.length > 0 && (
          <div className="mb-8">
            <button
              onClick={() => setShowExercise(!showExercise)}
              className="w-full bg-gradient-to-r from-[#f5a623]/20 to-purple-500/20 border border-[#f5a623]/30 rounded-2xl p-6 text-left hover:border-[#f5a623]/50 transition"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Target className="w-6 h-6 text-[#f5a623]" />
                  <div>
                    <h2 className="font-bold text-lg">{week.exercises[0].title}</h2>
                    <p className="text-[#9a9a9f] text-sm">Pas toe wat je hebt geleerd</p>
                  </div>
                </div>
                <ChevronRight className={`w-5 h-5 text-[#f5a623] transition-transform ${showExercise ? 'rotate-90' : ''}`} />
              </div>
            </button>

            {showExercise && (
              <div className="mt-4 bg-[#1c1c23] border border-white/[0.06] rounded-2xl p-6">
                <div className="mb-6">
                  <h3 className="font-bold mb-2">Scenario</h3>
                  <p className="text-[#9a9a9f]">{week.exercises[0].scenario}</p>
                </div>
                <div className="mb-6">
                  <h3 className="font-bold mb-2">Opdracht</h3>
                  <div className="text-[#c5c5c9] whitespace-pre-wrap">{week.exercises[0].challenge}</div>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
                  <h4 className="font-bold text-yellow-300 mb-2">Hints</h4>
                  <ul className="space-y-1">
                    {week.exercises[0].hints.map((hint, i) => (
                      <li key={i} className="text-yellow-200/70 text-sm flex items-start gap-2">
                        <span className="text-yellow-400">•</span>
                        {hint}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Templates */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#f5a623]" />
              <h2 className="font-bold">Templates</h2>
            </div>
            {week.templates.length > 1 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={downloadAllTemplates}
                  className="flex items-center gap-2 px-3 py-1.5 bg-[#1c1c23] border border-white/[0.06] rounded-lg text-sm font-medium text-[#9a9a9f] hover:text-[#f0ede8] hover:border-[#f5a623]/50 transition"
                  title="Download alle templates als .txt"
                >
                  <FileDown className="w-4 h-4" />
                  <span className="hidden sm:inline">.txt</span>
                </button>
                <button
                  onClick={downloadAllPdf}
                  className="flex items-center gap-2 px-3 py-1.5 bg-[#f5a623] text-[#0f0f12] rounded-lg text-sm font-medium hover:bg-[#e09620] transition"
                  title="Download alle templates als PDF"
                >
                  <FileDown className="w-4 h-4" />
                  <span className="hidden sm:inline">PDF</span>
                </button>
              </div>
            )}
          </div>

          <div className="grid gap-4">
            {week.templates.map((template) => (
              <div key={template.id} className="bg-[#1c1c23] border border-white/[0.06] rounded-2xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold mb-1">{template.title}</h3>
                    <p className="text-[#6a6a70] text-sm">{template.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Download TXT */}
                    <button
                      onClick={() => downloadAsTxt(template.title, template.prompt)}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#2a2a35] rounded-lg text-sm font-medium text-[#9a9a9f] hover:text-[#f0ede8] hover:bg-[#35353f] transition"
                      title="Download als .txt"
                    >
                      <Download className="w-4 h-4" />
                      <span className="hidden lg:inline">.txt</span>
                    </button>
                    {/* Download PDF */}
                    <button
                      onClick={() => downloadAsPdf(template.title, template.prompt)}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#2a2a35] rounded-lg text-sm font-medium text-[#9a9a9f] hover:text-[#f0ede8] hover:bg-[#35353f] transition"
                      title="Download als PDF"
                    >
                      <FileDown className="w-4 h-4" />
                      <span className="hidden lg:inline">PDF</span>
                    </button>
                    {/* Copy */}
                    <button
                      onClick={() => copyToClipboard(template.prompt, template.id)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                        copiedTemplate === template.id
                          ? 'bg-green-500 text-white'
                          : 'bg-[#f5a623] text-[#0f0f12] hover:bg-[#e09620]'
                      }`}
                    >
                      {copiedTemplate === template.id ? (
                        <>
                          <Check className="w-4 h-4" />
                          Gekopieerd
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>
                <pre className="bg-[#0f0f12] border border-white/[0.06] rounded-lg p-4 overflow-x-auto text-sm text-[#9a9a9f] whitespace-pre-wrap">
                  {template.prompt}
                </pre>
              </div>
            ))}
          </div>
        </div>

        {/* Next Week CTA */}
        {nextWeek && (
          <div className="text-center">
            <Link
              href={`/pro/week/${nextWeek}`}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#f5a623] to-[#e09620] text-[#0f0f12] px-6 py-3 rounded-xl font-bold hover:-translate-y-0.5 hover:shadow-lg transition-all"
            >
              Volgende: Week {nextWeek}
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
