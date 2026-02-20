export type TopSubMenuModel = {
  menuKey: string;
  url: string;
  isExternal: boolean;
};

export type TopMenuModel = {
  key: string;
  menuKey: string;
  subMenus: TopSubMenuModel[];
};
