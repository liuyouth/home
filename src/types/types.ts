export interface ImageData {
  w: number;
  h: number;
  data: string;
}

export interface Widget {
  id: string;
}

export interface Page {
  name: string;
  isCurrent: boolean;
  widgets: Widget[];
} 