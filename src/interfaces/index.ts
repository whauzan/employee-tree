export interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}

export interface TabData {
  [key: string]: { data: any[]; label: string };
}
