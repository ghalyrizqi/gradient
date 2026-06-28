import type { JapaneseStyle } from './types';

export interface BrandColor {
  name: string;
  brand: string;
  hex: string;
  style: JapaneseStyle;
  category: 'language' | 'database' | 'tool';
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
];
