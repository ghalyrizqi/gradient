import type { JapaneseStyle } from './types.ts';

export interface BrandColor {
  name: string;
  brand: string;
  term?: string;   // detection keyword (overrides brand for lookup key)
  hex: string;
  style: JapaneseStyle;
  category: 'language' | 'database' | 'tool' | 'theme';
}

export const BRAND_POOL: BrandColor[] = [
  // ── Languages ──────────────────────────────────────────────────────
  { name: 'Python Blue',      brand: 'Python',      hex: '#3776AB', style: 'vivid', category: 'language' },
  { name: 'Python Yellow',    brand: 'Python',      hex: '#FFD43B', style: 'vivid', category: 'language' },
  { name: 'Scala Red',        brand: 'Scala',        hex: '#DC322F', style: 'vivid', category: 'language' },
  { name: 'R Blue',           brand: 'R',            hex: '#276DC3', style: 'vivid', category: 'language' },

  // ── Databases ─────────────────────────────────────────────────────
  { name: 'BigQuery Blue',    brand: 'BigQuery',     hex: '#4285F4', style: 'vivid', category: 'database' },
  { name: 'BigQuery Yellow',  brand: 'BigQuery',     hex: '#FBBC05', style: 'vivid', category: 'database' },
  { name: 'BigQuery Green',   brand: 'BigQuery',     hex: '#34A853', style: 'vivid', category: 'database' },
  { name: 'Redshift Violet',  brand: 'Redshift',     hex: '#8C4FFF', style: 'vivid', category: 'database' },
  { name: 'DuckDB Gold',      brand: 'DuckDB',       hex: '#FFC300', style: 'vivid', category: 'database' },
  { name: 'PostgreSQL Blue',  brand: 'PostgreSQL',   hex: '#336791', style: 'vivid', category: 'database' },
  { name: 'MySQL Orange',     brand: 'MySQL',        hex: '#F29111', style: 'vivid', category: 'database' },
  { name: 'SQL Server Red',   brand: 'SQL Server',   hex: '#CC2927', style: 'vivid', category: 'database' },
  { name: 'MongoDB Green',    brand: 'MongoDB',      hex: '#00ED64', style: 'vivid', category: 'database' },
  { name: 'MongoDB Dark',     brand: 'MongoDB',      hex: '#001E2B', style: 'veil',  category: 'database' },
  { name: 'S3 Sage',          brand: 'Amazon S3',    hex: '#569A31', style: 'vivid', category: 'database' },

  // ── Tools ──────────────────────────────────────────────────────────
  { name: 'Airflow Sky',      brand: 'Airflow',      hex: '#017CEE', style: 'vivid', category: 'tool' },
  { name: 'dbt Coral',        brand: 'dbt',          hex: '#FF694A', style: 'vivid', category: 'tool' },
  { name: 'Spark Ember',      brand: 'Spark',        hex: '#E25A1C', style: 'vivid', category: 'tool' },
  { name: 'Trino Scarlet',    brand: 'Trino',        hex: '#DD4243', style: 'vivid', category: 'tool' },
  { name: 'Impala Ember',     brand: 'Impala',       hex: '#F96702', style: 'vivid', category: 'tool' },
  { name: 'Lambda Gold',      brand: 'AWS Lambda',   hex: '#FF9900', style: 'vivid', category: 'tool' },
  { name: 'Jenkins Brick',    brand: 'Jenkins',      hex: '#D33832', style: 'vivid', category: 'tool' },
  { name: 'Kubernetes Blue',  brand: 'Kubernetes',   hex: '#326CE5', style: 'vivid', category: 'tool' },
  { name: 'Kubernetes Night', brand: 'Kubernetes',   hex: '#0F1729', style: 'veil',  category: 'tool' },
  { name: 'Docker Blue',      brand: 'Docker',       hex: '#2496ED', style: 'vivid', category: 'tool' },
  { name: 'Docker Slate',     brand: 'Docker',       hex: '#384D54', style: 'veil',  category: 'tool' },
  { name: 'Linux Blue',       brand: 'Linux',        hex: '#1793D1', style: 'vivid', category: 'tool' },
  { name: 'Git Vermillion',   brand: 'Git',          hex: '#F05032', style: 'vivid', category: 'tool' },

  // ── Omarchy Themes (by basecamp/omarchy) ──────────────────────────
  // `term` gives each theme its own detection keyword in the text resolver.
  { name: 'Vantablack',       brand: 'Omarchy', term: 'vantablack',       hex: '#8d8d8d', style: 'veil',  category: 'theme' },
  { name: 'Matte Black',      brand: 'Omarchy', term: 'matte black',      hex: '#e68e0d', style: 'vivid', category: 'theme' },
  { name: 'Hackerman',        brand: 'Omarchy', term: 'hackerman',        hex: '#82FB9C', style: 'vivid', category: 'theme' },
  { name: 'Tokyo Night',      brand: 'Omarchy', term: 'tokyo night',      hex: '#7aa2f7', style: 'vivid', category: 'theme' },
  { name: 'Last Horizon',     brand: 'Omarchy', term: 'last horizon',     hex: '#b59790', style: 'veil',  category: 'theme' },
  { name: 'Lumon',            brand: 'Omarchy', term: 'lumon',            hex: '#8bc9eb', style: 'vivid', category: 'theme' },
  { name: 'Ristretto',        brand: 'Omarchy', term: 'ristretto',        hex: '#f38d70', style: 'vivid', category: 'theme' },
  { name: 'Osaka Jade',       brand: 'Omarchy', term: 'osaka jade',       hex: '#509475', style: 'vivid', category: 'theme' },
  { name: 'Rose Pine',        brand: 'Omarchy', term: 'rose pine',        hex: '#56949f', style: 'vivid', category: 'theme' },
  { name: 'Nord',             brand: 'Omarchy', term: 'nord',             hex: '#81a1c1', style: 'vivid', category: 'theme' },
  { name: 'Retro 82',         brand: 'Omarchy', term: 'retro 82',         hex: '#faa968', style: 'vivid', category: 'theme' },
  { name: 'Solitude',         brand: 'Omarchy', term: 'solitude',         hex: '#798186', style: 'veil',  category: 'theme' },
  { name: 'Everforest',       brand: 'Omarchy', term: 'everforest',       hex: '#7fbbb3', style: 'vivid', category: 'theme' },
  { name: 'Catppuccin Mocha', brand: 'Omarchy', term: 'catppuccin',       hex: '#89b4fa', style: 'vivid', category: 'theme' },
  { name: 'Catppuccin Latte', brand: 'Omarchy', term: 'catppuccin latte', hex: '#1e66f5', style: 'vivid', category: 'theme' },
  { name: 'Omarchy Green',    brand: 'Omarchy', term: 'omarchy',          hex: '#9ece6a', style: 'vivid', category: 'theme' },
  { name: 'Omarchy Turquoise',brand: 'Omarchy', term: 'omarchy turquoise',hex: '#b4f9f8', style: 'vivid', category: 'theme' },
];
