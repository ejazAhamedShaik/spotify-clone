interface External_urlsInterface {
  spotify: string;
}

interface ImagesInterface {
  height?: number | undefined;
  url: string;
  width?: number | undefined;
}

interface OwnerInterface {
  display_name?: string | undefined;
  external_urls: External_urlsInterface;
  href: string;
  id: string;
  type: string;
  uri: string;
}

interface TrackItems {
  added_at: string
  added_by: {
    external_urls: External_urlsInterface
    href: string
    id: string
    type: string
    uri: string
  }
  is_local: boolean
  primary_color: string | null
  
}

interface TracksInterface {
  href: string;
  total: number;
}

export interface PlayListInterface {
  collaborative: boolean;
  description: string | null;
  external_urls: External_urlsInterface;
  href: string;
  id: string;
  images: ImagesInterface[];
  name: string;
  owner: OwnerInterface;
  primary_color?: string;
  public: boolean | null;
  snapshot_id: string;
  tracks: TracksInterface;
  type: string;
  uri: string;
}
