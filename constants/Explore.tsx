export type ExploreSection =
  | { type: "banner" }
  | { type: "collections" }
  | {
      type: "list";
      title: string;
      data: any[];
      sliderType: "movie" | "tv";
    };
