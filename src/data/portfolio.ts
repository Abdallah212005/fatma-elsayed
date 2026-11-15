import heroPortraitImg from '@/hero.png';
import nordicArchImg from '@/src/assets/images/work_nordic_architecture_1794748455162.jpg';
import sculpturalFashionImg from '@/src/assets/images/work_sculptural_fashion_1794748456762.jpg';
import ceramicObjectsImg from '@/src/assets/images/work_ceramic_objects_1794748455169.jpg';
import coastalMonographImg from '@/src/assets/images/work_coastal_monograph_1794748456582.jpg';
import timberInteriorImg from '@/src/assets/images/work_timber_interior_1794749622325.jpg';
import glassAtelierImg from '@/src/assets/images/work_glass_atelier_1794749622244.jpg';

export type WorkCategory = 'All' | 'Editorial' | 'Architecture' | 'Campaign' | 'Object';

export interface PortfolioWork {
  id: string;
  title: string;
  category: Exclude<WorkCategory, 'All'>;
  year: string;
  client: string;
  location: string;
  imageSrc: string;
  imageAlt: string;
  aspectClass: string;
  imageScaleClass?: string;
  exif: string;
  summary: string;
  credits: string;
}

export interface StudioDiscipline {
  number: string;
  title: string;
  description: string;
  deliverables: string;
}

export interface ArchiveEntry {
  year: string;
  title: string;
  format: string;
  venueOrPublisher: string;
  city: string;
  edition: string;
  workId?: string;
}

export const HERO_PORTRAIT_SRC = heroPortraitImg;

export const PORTFOLIO_WORKS: PortfolioWork[] = [
  {
    id: 'pavilion-north',
    title: 'Fjord Pavilion',
    category: 'Architecture',
    year: '2026',
    client: 'Vestergaard Arkitekter',
    location: 'Roskilde, Denmark',
    imageSrc: nordicArchImg,
    imageAlt: 'Minimalist concrete and pale oak architectural pavilion in crisp morning sunlight',
    aspectClass: 'md:col-span-2 md:row-span-2 min-h-[340px] md:min-h-[520px]',
    exif: 'Leica SL2 · 35mm Summilux · f/5.6 · 1/250s',
    summary:
      'A dawn-to-dusk architectural documentation of cast concrete and untreated Nordic oak along the Roskilde shoreline, produced as a 160-page linen-bound monograph.',
    credits: 'Direction & Photography: Fatma Elsayed · Architecture: Vestergaard Arkitekter',
  },
  {
    id: 'pleated-silence',
    title: 'Textures of Silence',
    category: 'Editorial',
    year: '2026',
    client: 'Atelier Nørrebro',
    location: 'Copenhagen, Denmark',
    imageSrc: sculpturalFashionImg,
    imageAlt: 'Sculptural pleated ivory linen garment standing in a sunlit concrete gallery space',
    aspectClass: 'md:col-span-1 md:row-span-1 min-h-[280px]',
    imageScaleClass: 'scale-[1.08]',
    exif: 'Hasselblad 500C/M · 80mm Planar · Ilford HP5',
    summary:
      'Autumn architectural textile study exploring volume, raw linen pleating, and directional afternoon light inside an industrial concrete turbine hall.',
    credits: 'Styling: Astrid Holm · Garments: Atelier Nørrebro',
  },
  {
    id: 'basalt-vessels',
    title: 'Stoneware Study IV',
    category: 'Object',
    year: '2025',
    client: 'Klint Ceramics Studio',
    location: 'Bornholm, Denmark',
    imageSrc: ceramicObjectsImg,
    imageAlt: 'Three handcrafted matte charcoal stoneware vessels arranged on a pale travertine plinth',
    aspectClass: 'md:col-span-1 md:row-span-1 min-h-[280px]',
    exif: 'Leica M11 · 50mm APO · f/4.0 · ISO 100',
    summary:
      'Tactile object series documenting wood-fired Bornholm clay vessels against raw travertine, commissioned for the autumn gallery catalog.',
    credits: 'Ceramics: Jonas Klint · Lighting & Capture: Studio Kova',
  },
  {
    id: 'douglas-house',
    title: 'Douglas Fir House',
    category: 'Architecture',
    year: '2026',
    client: 'Lilleør Studio',
    location: 'Aarhus, Denmark',
    imageSrc: timberInteriorImg,
    imageAlt: 'Scandinavian architectural interior with Douglas fir joinery and lime-plaster walls',
    aspectClass: 'md:col-span-1 md:row-span-1 min-h-[280px]',
    exif: 'Leica SL2 · 28mm Elmarit · f/4.0 · 1/125s',
    summary:
      'Interior spatial essay examining hand-rubbed lime plaster, raw Douglas fir cabinetry, and northern forest daylight inside a private lakeside residence.',
    credits: 'Joinery: Lilleør Studio · Photography: Fatma Elsayed',
  },
  {
    id: 'smoked-glass',
    title: 'Smoked Glass Study',
    category: 'Object',
    year: '2025',
    client: 'Holmegaard Archive',
    location: 'Næstved, Denmark',
    imageSrc: glassAtelierImg,
    imageAlt: 'Hand-blown smoked amber and clear glass vessels on a concrete studio table',
    aspectClass: 'md:col-span-2 md:row-span-1 min-h-[280px]',
    exif: 'Hasselblad X2D · 90mm · f/5.6 · ISO 64',
    summary:
      'Refractive study of mouth-blown smoked amber and clear vessels positioned across late-afternoon studio window shadows.',
    credits: 'Glassblowing: Signe Lind · Direction: Studio Kova',
  },
  {
    id: 'north-atlantic-dawn',
    title: 'Basalt & Tide',
    category: 'Campaign',
    year: '2025',
    client: 'Nordisk Forlag',
    location: 'Faroe Islands',
    imageSrc: coastalMonographImg,
    imageAlt: 'Misty Nordic basalt sea cliffs meeting a calm slate-grey ocean at dawn',
    aspectClass: 'md:col-span-3 md:row-span-1 min-h-[300px] md:min-h-[380px]',
    exif: 'Fujifilm GFX 100S · 45mm · f/8.0 · 1/60s',
    summary:
      'Field commission capturing the quiet tonal gradients of the North Atlantic winter horizon for an international coastal architecture exhibition.',
    credits: 'Curated by Kunsthal Nord · Print Edition of 25',
  },
];

export const STUDIO_DISCIPLINES: StudioDiscipline[] = [
  {
    number: '01.',
    title: 'Marketing Strategy',
    description:
      'Research-led planning that clarifies your audience, positioning, and next growth opportunities.',
    deliverables: 'Audience Research · Positioning · Growth Plans',
  },
  {
    number: '02.',
    title: 'Creative Direction',
    description:
      'A distinct visual direction that keeps every brand touchpoint clear, cohesive, and memorable.',
    deliverables: 'Concepts · Campaigns · Brand Stories',
  },
  {
    number: '03.',
    title: 'Media Buying',
    description:
      'Paid campaign planning and optimization focused on reaching the right audience and using budgets effectively.',
    deliverables: 'Channel Planning · Campaign Setup · Optimization',
  },
  {
    number: '04.',
    title: 'Graphic Design',
    description:
      'Purposeful visuals for brand identities, campaigns, social media, and digital platforms.',
    deliverables: 'Brand Assets · Social Content · Campaign Design',
  },
  {
    number: '05.',
    title: 'Video Editing',
    description:
      'Polished video edits shaped around your story, audience, and the platforms where your content will appear.',
    deliverables: 'Short-Form Video · Campaign Edits · Social Content',
  },
];

export const STUDIO_METRICS = [
  { value: '01', label: 'Strategy', detail: 'Set clear objectives' },
  { value: '02', label: 'Creative', detail: 'Shape a distinct direction' },
  { value: '03', label: 'Reach', detail: 'Connect with the right audience' },
  { value: '04', label: 'Production', detail: 'Deliver across channels' },
];

export const ARCHIVE_ENTRIES: ArchiveEntry[] = [
  {
    year: '2026',
    title: 'Fjord Pavilion',
    format: 'Hardcover Linen Book',
    venueOrPublisher: 'Vestergaard Press',
    city: 'Copenhagen',
    edition: 'Ed. 500',
    workId: 'pavilion-north',
  },
  {
    year: '2026',
    title: 'Douglas Fir House',
    format: 'Architectural Essay',
    venueOrPublisher: 'Lilleør Studio',
    city: 'Aarhus',
    edition: 'Digital & Print',
    workId: 'douglas-house',
  },
  {
    year: '2026',
    title: 'Textures of Silence',
    format: 'Editorial Spread & Film',
    venueOrPublisher: 'Atelier Nørrebro',
    city: 'Copenhagen',
    edition: 'Issue 08',
    workId: 'pleated-silence',
  },
  {
    year: '2025',
    title: 'Basalt & Tide',
    format: 'Silver Gelatin Prints',
    venueOrPublisher: 'Kunsthal Nord',
    city: 'Aalborg',
    edition: 'Ed. 25',
    workId: 'north-atlantic-dawn',
  },
  {
    year: '2025',
    title: 'Stoneware Study IV',
    format: 'Exhibition Catalog',
    venueOrPublisher: 'Klint Ceramics Studio',
    city: 'Rønne',
    edition: 'Ed. 200',
    workId: 'basalt-vessels',
  },
  {
    year: '2025',
    title: 'Smoked Glass Study',
    format: 'Archival Print Series',
    venueOrPublisher: 'Holmegaard Archive',
    city: 'Næstved',
    edition: 'Ed. 40',
    workId: 'smoked-glass',
  },
];
