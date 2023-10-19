export interface IMenuItem {
  title: string;
  url: string;
  icon: string;
}

export const menuitems: IMenuItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: "material-symbols:dashboard",
  },
  // {
  //   title: "Company",
  //   url: "/company",
  //   icon: "mdi:user-group",
  // },
  {
    title: "Invoice",
    url: "/invoice",
    icon: "majesticons:tickets-line",
  },
  {
    title: "Calendar",
    url: "/calendar",
    icon: "solar:calendar-bold",
  },
  {
    title: "Employees",
    url: "/employee",
    icon: "clarity:employee-group-solid",
  },
  {
    title: "File Manager",
    url: "/filemanager",
    icon: "icon-park-solid:cloud-storage",
  },
];
