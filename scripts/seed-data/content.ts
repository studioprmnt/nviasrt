// Placeholder content. In the real build this comes from Payload CMS.

export type Tint = 'sand' | 'clay' | 'ocean' | 'cream' | 'paper';

export type Category = { slug: string; name: string; tint: Tint; blurb: string; intro: string[] };
export type Collection = { slug: string; name: string; tint: Tint; image: string; blurb: string };
export type Product = {
  slug: string; name: string; note: string; image: string; store: string;
  url: string; collections: string[];
};
export type Section = { id: string; heading: string; paras: string[]; image?: { src: string; caption: string }; products?: string[]; topPick?: string };
export type Post = {
  slug: string; title: string; category: string; date: string; updated?: string; readMin: number;
  image: string; caption: string; excerpt: string; takeaways?: string[]; sections: Section[];
};
export type Guide = {
  slug: string; title: string; type: 'Packing list' | 'Round-up' | 'How-to'; updated: string; readMin: number;
  image: string; caption: string; excerpt: string; takeaways: string[]; topPick?: string; products?: string[];
  comparison?: { cols: string[]; rows: string[][] }; checklist?: string[]; faq?: { q: string; a: string }[];
  sections: Section[]; featured?: boolean;
};

export const categories: Category[] = [
  { slug: 'slow-living', name: 'Slow Living', tint: 'sand', blurb: 'Home, rituals and a softer pace',
    intro: ['Notes on living a little softer: mornings that start slowly, a home that holds you, and the small rituals that make an ordinary day feel like enough.', 'Expect simple routines, rooms that let the light in, and the few objects I keep coming back to.'] },
  { slug: 'travel', name: 'Travel', tint: 'ocean', blurb: 'Slow trips across Indonesia and beyond',
    intro: ['Slow travel, mostly across Indonesia and Southeast Asia. I stay longer in fewer places, choose small guesthouses over big resorts, and write down what made a place feel like somewhere worth returning to.', 'Here you will find itineraries for three nights or three weeks, where I stayed, what I packed and what I would skip next time. Bali, Lombok, Flores, Yogyakarta and a few places further away.'] },
  { slug: 'ocean-active', name: 'Ocean & Active Life', tint: 'cream', blurb: 'Swimming, surfing and mornings by the sea',
    intro: ['Learning to swim properly as an adult, first surf lessons, and why the sea keeps pulling me back.', 'Gentle, honest notes for beginners who would rather enjoy the water than race through it.'] },
  { slug: 'thoughts', name: 'Thoughts & Notes', tint: 'clay', blurb: 'Short essays and things I am learning',
    intro: ['Shorter pieces: things I am reading, questions I keep turning over, and what slowing down has taught me about work.', 'Less polished, more personal.'] },
];

export const collections: Collection[] = [
  { slug: 'outfit-inspo', name: 'Outfit Inspo', tint: 'clay', image: '/photos/dress.jpg', blurb: 'Linen, loose cuts and pieces that travel well.' },
  { slug: 'soft-living-home', name: 'Soft Living Home', tint: 'sand', image: '/photos/slow.jpg', blurb: 'Things that make home feel slower.' },
  { slug: 'travel-essentials', name: 'Travel Essentials', tint: 'ocean', image: '/photos/travel.jpg', blurb: 'What lives in my carry-on.' },
  { slug: 'work-from-anywhere', name: 'Work-from-Anywhere Gear', tint: 'cream', image: '/photos/cup.jpg', blurb: 'A calm desk, wherever the desk is.' },
];

const shopee = 'https://shopee.co.id/';
export const products: Product[] = [
  { slug: 'clay-coffee-cup', name: 'Handmade clay coffee cup', note: 'The one I drink from every morning.', image: '/photos/cup.jpg', store: 'Shopee', url: shopee, collections: ['soft-living-home', 'work-from-anywhere'] },
  { slug: 'soy-candle', name: 'Unscented soy candle', note: 'For slow evenings, no perfume headache.', image: '/photos/candle.jpg', store: 'Shopee', url: shopee, collections: ['soft-living-home'] },
  { slug: 'linen-sheets', name: 'Washed linen sheet set', note: 'Gets softer every wash and stays cool on humid nights.', image: '/photos/linen.jpg', store: 'Shopee', url: shopee, collections: ['soft-living-home'] },
  { slug: 'linen-day-dress', name: 'Loose linen day dress', note: 'Ubud markets to dinner, one dress.', image: '/photos/dress.jpg', store: 'Shopee', url: shopee, collections: ['outfit-inspo', 'travel-essentials'] },
  { slug: 'rattan-lamp', name: 'Rattan bedside lamp', note: 'Warm light, no glare.', image: '/photos/slow.jpg', store: 'Shopee', url: shopee, collections: ['soft-living-home'] },
  { slug: 'linen-shirt', name: 'Oversized linen shirt', note: 'Over a swimsuit or jeans.', image: '/photos/hero.jpg', store: 'Shopee', url: shopee, collections: ['outfit-inspo'] },
  { slug: 'quick-dry-towel', name: 'Quick-dry beach towel', note: 'Packs to nothing.', image: '/photos/ocean.jpg', store: 'Shopee', url: shopee, collections: ['travel-essentials'] },
  { slug: 'packable-hat', name: 'Packable sun hat', note: 'Survives a backpack.', image: '/photos/travel.jpg', store: 'Shopee', url: shopee, collections: ['travel-essentials', 'outfit-inspo'] },
  { slug: 'travel-cup', name: 'Collapsible travel cup', note: 'Fits in a pocket.', image: '/photos/cup.jpg', store: 'Shopee', url: shopee, collections: ['travel-essentials', 'work-from-anywhere'] },
  { slug: 'solid-perfume', name: 'Solid perfume tin', note: 'No liquids limit.', image: '/photos/candle.jpg', store: 'Shopee', url: shopee, collections: ['travel-essentials'] },
];

const lorem = (t: string) => [t];

export const posts: Post[] = [
  {
    slug: 'three-slow-days-in-sidemen', title: 'Three slow days in Sidemen, Bali', category: 'travel', date: '12 Nov 2026', updated: '14 Nov 2026', readMin: 6,
    image: '/photos/travel.jpg', caption: 'Rice terraces on the road into Sidemen',
    excerpt: 'A green valley ninety minutes from Ubud, and three days with no plan.',
    takeaways: ['Sidemen is 90 minutes from Ubud and far quieter.', 'Stay at least three nights so you are not just passing through.', 'Bring layers: mornings in the valley are cool.'],
    sections: [
      { id: 'why-sidemen', heading: 'Why Sidemen', paras: ['Sidemen sits in a green valley on the slopes of Mount Agung, about ninety minutes from Ubud. There are no beach clubs and very few cafés with signs. Mornings start with mist over the rice terraces and the sound of looms from the songket weavers down the road.', 'I went for three nights with no plan except to walk, read and eat slowly. This is what that looked like.'] },
      { id: 'where-to-stay', heading: 'Where to stay', paras: ['Pick somewhere with a view down the valley and a veranda you will actually sit on. Small family guesthouses here are simple and kind; book directly and ask for a room on the upper level.'], image: { src: '/photos/slow.jpg', caption: 'Morning light in the guesthouse' } },
      { id: 'what-i-packed', heading: 'What I packed', paras: ['Very little. Layers for cool mornings, one good linen piece, and things that dry fast.'], products: ['linen-day-dress', 'travel-cup', 'soy-candle'], topPick: 'linen-sheets' },
      { id: 'slow-evenings', heading: 'Slow evenings', paras: ['Dinner is early and the valley goes quiet by nine. Bring a book, a warm layer and nowhere to be.'] },
    ],
  },
  { slug: 'a-week-by-the-sea-in-amed', title: 'A week by the sea in Amed', category: 'travel', date: '20 Oct 2026', readMin: 7, image: '/photos/hero.jpg', caption: 'Morning on the black-sand beach', excerpt: 'Snorkelling from the shore and very early nights.', sections: [{ id: 'arrive', heading: 'Arriving slowly', paras: lorem('Amed is a string of fishing villages on Bali’s east coast. You can snorkel straight from the beach, and by eight in the evening the only sound is the sea.') }] },
  { slug: 'gili-air-without-the-party', title: 'Gili Air without the party', category: 'travel', date: '2 Oct 2026', readMin: 5, image: '/photos/ocean.jpg', caption: 'Sunset swim off the north beach', excerpt: 'The quietest of the three Gilis, done slowly.', sections: [{ id: 'quiet', heading: 'The quiet side', paras: lorem('Stay on the north coast, rent a bicycle, and swim at sunset when the boats have gone.') }] },
  { slug: 'where-i-stay-in-ubud', title: 'Where I stay in Ubud, and why', category: 'travel', date: '18 Sep 2026', readMin: 8, image: '/photos/slow.jpg', caption: 'A room above the rice fields', excerpt: 'Away from Monkey Forest Road, close to the fields.', sections: [{ id: 'fields', heading: 'Near the fields', paras: lorem('Penestanan and Sayan are a short walk from town and a world away from the traffic.') }] },
  { slug: 'a-slow-weekend-in-yogyakarta', title: 'A slow weekend in Yogyakarta', category: 'travel', date: '5 Sep 2026', readMin: 4, image: '/photos/linen.jpg', caption: 'Batik drying in a courtyard', excerpt: 'Batik, coffee and early temples.', sections: [{ id: 'jogja', heading: 'Jogja, slowly', paras: lorem('Go to Prambanan at opening time and spend the afternoon in a batik studio.') }] },
  { slug: 'flores-by-boat', title: 'Flores by boat: what nobody tells you', category: 'travel', date: '22 Aug 2026', readMin: 6, image: '/photos/portrait.jpg', caption: 'Golden hour on deck', excerpt: 'Four days at sea, honestly.', sections: [{ id: 'boat', heading: 'Life on deck', paras: lorem('Choose a smaller boat, bring motion-sickness bands, and expect to sleep under the stars at least once.') }] },
  { slug: 'what-i-wear-on-long-haul-flights', title: 'What I wear on long-haul flights', category: 'travel', date: '8 Aug 2026', readMin: 5, image: '/photos/dress.jpg', caption: 'Soft layers for the plane', excerpt: 'Soft layers and nothing that pinches.', sections: [{ id: 'layers', heading: 'Layers', paras: lorem('Loose linen trousers, a merino tee and a big scarf that doubles as a blanket.') }], },
  { slug: 'coffee-stops-ubud-to-munduk', title: 'Coffee stops between Ubud and Munduk', category: 'travel', date: '25 Jul 2026', readMin: 3, image: '/photos/cup.jpg', caption: 'Coffee with a view of the lakes', excerpt: 'Five places worth pulling over for.', sections: [{ id: 'stops', heading: 'The stops', paras: lorem('The road climbs through clove and coffee plantations; stop often.') }] },
  { slug: 'lomboks-quiet-south-coast', title: 'Lombok’s quiet south coast', category: 'travel', date: '10 Jul 2026', readMin: 6, image: '/photos/candle.jpg', caption: 'An empty bay near Selong Belanak', excerpt: 'Empty bays and gentle surf.', sections: [{ id: 'south', heading: 'The south', paras: lorem('Selong Belanak is the gentlest place I know to learn to surf.') }] },
  { slug: 'learning-to-swim-before-sunrise', title: 'Learning to swim before sunrise', category: 'ocean-active', date: '4 Nov 2026', readMin: 4, image: '/photos/ocean.jpg', caption: 'The sea at 5.40 am', excerpt: 'Starting again as an adult, one length at a time.', sections: [{ id: 'start', heading: 'Starting again', paras: lorem('I learned to swim properly at thirty. Early mornings made it easier: calm water, nobody watching.') }] },
  { slug: 'a-bedroom-that-lets-the-morning-in', title: 'A bedroom that lets the morning in', category: 'slow-living', date: '28 Oct 2026', readMin: 5, image: '/photos/slow.jpg', caption: 'Light through linen curtains', excerpt: 'Light curtains, fewer things, cooler nights.', sections: [{ id: 'light', heading: 'Let the light in', paras: lorem('Swap blackout blinds for linen, keep the floor clear, and choose one lamp with warm light.') }], },
  { slug: 'why-i-switched-to-linen-sheets', title: 'Why I switched to linen sheets', category: 'slow-living', date: '2 Nov 2026', readMin: 4, image: '/photos/linen.jpg', caption: 'Washed linen, unironed', excerpt: 'Cooler nights in a humid climate.', sections: [{ id: 'linen', heading: 'Why linen', paras: lorem('Linen breathes, dries fast and looks better unironed. In a humid climate that matters.') }] },
  { slug: 'what-slowing-down-taught-me-about-work', title: 'What slowing down taught me about work', category: 'thoughts', date: '15 Oct 2026', readMin: 5, image: '/photos/portrait.jpg', caption: 'An afternoon off', excerpt: 'Fewer tabs, better work.', sections: [{ id: 'work', heading: 'Fewer tabs', paras: lorem('I do fewer things now, and I do them better. The work did not suffer; it improved.') }] },
];

export const guides: Guide[] = [
  {
    slug: 'carry-on-packing-list', title: 'The carry-on packing list I use for every trip', type: 'Packing list', updated: '10 Nov 2026', readMin: 9, featured: true,
    image: '/photos/linen.jpg', caption: 'Everything for a week, in one 35 L bag',
    excerpt: 'Everything fits in one 35 L bag, from a week in Bali to ten days in Europe. With the exact pieces, the ones I left behind, and a printable checklist.',
    takeaways: ['One 35 L bag is enough for 7 to 10 days if everything layers.', 'Linen and merino do most of the work: light, quick-dry, rewearable.', 'Leave the “just in case” pile at home; buy it there if you need it.'],
    topPick: 'linen-sheets', products: ['linen-day-dress', 'travel-cup', 'solid-perfume'],
    comparison: { cols: ['Item', 'Weight', 'Why I pack it', 'Where'], rows: [['Linen day dress', '280 g', 'Cool, dries overnight, works for dinner', 'Shopee'], ['Merino tee', '160 g', 'No smell after three wears', 'Shopee'], ['Packable sun hat', '90 g', 'Folds flat, survives a backpack', 'Shopee'], ['Quick-dry towel', '220 g', 'Beach, hostel, picnic blanket', 'Shopee']] },
    checklist: ['Two linen pieces, one merino tee, one warm layer', 'Swimsuit and a quick-dry towel', 'One pair of sandals, one pair of walking shoes', 'Solid toiletries (no liquids limit)', 'A small tote for markets'],
    faq: [{ q: 'Is 35 L really enough for a week?', a: 'Yes, if everything layers and you plan one laundry stop.' }, { q: 'What about rainy season?', a: 'Swap the sun hat for a packable rain shell; the rest stays the same.' }, { q: 'Do you check a bag on long flights?', a: 'Almost never. It saves time and nothing gets lost.' }],
    sections: [{ id: 'intro', heading: 'Why one bag', paras: ['I have packed this same list for Bali, Lisbon and a rainy week in Kyoto. It changes a little with the weather, never with the length of the trip.'] }],
  },
  { slug: 'best-clay-cups', title: 'The best clay cups under Rp 200k', type: 'Round-up', updated: '8 Nov 2026', readMin: 6, image: '/photos/cup.jpg', caption: 'Morning coffee', excerpt: 'Handmade, sturdy and kind to your budget.', takeaways: ['Look for a thick base.', 'Matte glaze ages better.'], products: ['clay-coffee-cup', 'travel-cup'], sections: [{ id: 'cups', heading: 'What to look for', paras: ['A thick base, a handle you can hold with two fingers, and a glaze that does not shine too much.'] }] },
  { slug: 'bali-rainy-season-packing', title: 'What to pack for Bali in rainy season', type: 'Packing list', updated: '30 Oct 2026', readMin: 7, image: '/photos/dress.jpg', caption: 'Light layers', excerpt: 'Quick-dry everything.', takeaways: ['Quick-dry fabrics only.', 'A packable shell beats an umbrella.'], sections: [{ id: 'rain', heading: 'Rain, briefly', paras: ['Afternoon storms pass quickly. Pack things that dry by morning.'] }] },
  { slug: 'cooler-bedroom-without-ac', title: 'A bedroom that sleeps cooler without AC', type: 'How-to', updated: '14 Oct 2026', readMin: 5, image: '/photos/slow.jpg', caption: 'Linen and airflow', excerpt: 'Airflow, linen and timing.', takeaways: ['Open windows at night, close them by 9 am.', 'Linen sheets make a real difference.'], products: ['linen-sheets'], sections: [{ id: 'cool', heading: 'Keep it cool', paras: ['Cross-ventilation at night, shade by day, and breathable sheets.'] }] },
  { slug: 'unscented-candles', title: 'Unscented candles that actually smell of nothing', type: 'Round-up', updated: '28 Sep 2026', readMin: 4, image: '/photos/candle.jpg', caption: 'Evening light', excerpt: 'Soy, no perfume, clean burn.', takeaways: ['Soy or coconut wax.', 'Cotton wicks.'], products: ['soy-candle'], sections: [{ id: 'wax', heading: 'The wax', paras: ['Soy and coconut wax burn cleaner and slower than paraffin.'] }] },
  { slug: 'snorkelling-kit', title: 'Snorkelling kit for a first trip', type: 'Packing list', updated: '12 Sep 2026', readMin: 5, image: '/photos/ocean.jpg', caption: 'Clear water off Amed', excerpt: 'Just the essentials.', takeaways: ['Bring your own mask.', 'Rent fins locally.'], products: ['quick-dry-towel'], sections: [{ id: 'kit', heading: 'The kit', paras: ['A mask that fits your face matters more than anything else.'] }] },
  { slug: 'plan-a-slow-week', title: 'How I plan a slow week anywhere', type: 'How-to', updated: '20 Aug 2026', readMin: 6, image: '/photos/travel.jpg', caption: 'One valley, one week', excerpt: 'One base, few plans.', takeaways: ['One base for the whole week.', 'One plan per day, maximum.'], sections: [{ id: 'plan', heading: 'The plan', paras: ['Choose one base, one thing per day, and leave the afternoons empty.'] }] },
];

export const getProduct = (slug: string) => products.find(p => p.slug === slug);
export const getCategory = (slug: string) => categories.find(c => c.slug === slug);
export const getCollection = (slug: string) => collections.find(c => c.slug === slug);
export const postMeta = (p: Post) => `${getCategory(p.category)?.name ?? ''} · ${p.readMin} min read`;
export const guideMeta = (g: Guide) => `${g.type} · Updated ${g.updated.split(' ').slice(1).join(' ')}`;

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Chronicles', href: '/chronicles', menu: 'chronicles' as const },
  { label: 'Shop My Picks', href: '/shop', menu: 'shop' as const },
  { label: 'Guides', href: '/guides' },
  { label: 'About Ovi', href: '/about' },
  { label: 'Work With Me', href: '/work-with-me' },
];
