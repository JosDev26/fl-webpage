export interface Review {
  id: string;
  reviewer_name: string;
  reviewer_role: 'Cliente' | 'Empresa';
  review_text: string;
  position: number;
  company_logo?: Media; // Campo opcional para logo de empresa
}

export interface Service {
  id: string;
  title: string;
  icon_class: string;
  link_target: string;
  position: number;
  is_wide: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: unknown; // Lexical rich text JSON
  cover_image?: Media;
  published_date: string;
  status: 'draft' | 'published';
  meta_title?: string;
  meta_description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Media {
  id: string;
  url: string;
  alt: string;
  width?: number;
  height?: number;
  filename: string;
  mimeType: string;
}

/** Payload REST API paginated response */
export interface PayloadResponse<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}
