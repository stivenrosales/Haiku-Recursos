import {
  FileText,
  FileSpreadsheet,
  FileCheck,
  Lightbulb,
  Rocket,
  Bot,
  TrendingUp,
  Target,
  Wrench,
  BookOpen,
  Presentation,
  Megaphone,
  Mail,
  Calendar,
  DollarSign,
  Users,
  Globe,
  Zap,
  Star,
  Download,
  type LucideIcon,
} from 'lucide-react';

export interface IconEntry {
  key: string;
  label: string;
  icon: LucideIcon;
}

export const ICON_MAP: Record<string, { label: string; icon: LucideIcon }> = {
  FileText: { label: 'Documento', icon: FileText },
  FileSpreadsheet: { label: 'Hoja de cálculo', icon: FileSpreadsheet },
  FileCheck: { label: 'Checklist', icon: FileCheck },
  Lightbulb: { label: 'Idea', icon: Lightbulb },
  Rocket: { label: 'Cohete', icon: Rocket },
  Bot: { label: 'Robot IA', icon: Bot },
  TrendingUp: { label: 'Gráfico', icon: TrendingUp },
  Target: { label: 'Objetivo', icon: Target },
  Wrench: { label: 'Herramientas', icon: Wrench },
  BookOpen: { label: 'Libro', icon: BookOpen },
  Presentation: { label: 'Presentación', icon: Presentation },
  Megaphone: { label: 'Megáfono', icon: Megaphone },
  Mail: { label: 'Correo', icon: Mail },
  Calendar: { label: 'Calendario', icon: Calendar },
  DollarSign: { label: 'Dinero', icon: DollarSign },
  Users: { label: 'Personas', icon: Users },
  Globe: { label: 'Globo', icon: Globe },
  Zap: { label: 'Rayo', icon: Zap },
  Star: { label: 'Estrella', icon: Star },
  Download: { label: 'Descarga', icon: Download },
};

export const ICON_LIST: IconEntry[] = Object.entries(ICON_MAP).map(
  ([key, { label, icon }]) => ({ key, label, icon })
);
