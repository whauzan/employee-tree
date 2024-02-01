type DataMap = {
  url: string;
  label: string;
  path: string;
};

export const DATAMAP: DataMap[] = [
  {
    url: "correct-data",
    label: "Correct Data",
    path: "src/data/correct-employees.json",
  },
  {
    url: "faulty-data",
    label: "Faulty Data",
    path: "src/data/faulty-employees.json",
  },
  {
    url: "faulty-data-2",
    label: "Faulty Data 2",
    path: "src/data/another-faulty-employees.json",
  },
];

type Department = {
  label: string;
  value: string;
};

export const DEPARTMENT: Department[] = [
  {
    label: "Executive",
    value: "Executive",
  },
  {
    label: "Technology",
    value: "Technology",
  },
  {
    label: "Finance",
    value: "Finance",
  },
];
