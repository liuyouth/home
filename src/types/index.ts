export interface Widget {
  id: string;
  type?: 'default' | 'todo';
  position?: {
    x: number;
    y: number;
  };
  minWidgets?: MinWidgetData[];
}

export interface Page {
  id: string;
  name: string;
  isCurrent: boolean;
  widgets: Widget[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ImageData {
  w: number;
  h: number;
  data: string;
}

export interface MinWidgetData {
  id: string;
  isImg: boolean;
} 