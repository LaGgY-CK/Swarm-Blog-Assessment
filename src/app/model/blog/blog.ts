export interface Blog {
  id: string;
  data: {
    slug: { iv: string };
    title: { iv: string };
    Description: { iv: string };
    Body: { iv: string };
    postBanner: { iv: string };
  }
  created: string;
  updatedAt: string;
}