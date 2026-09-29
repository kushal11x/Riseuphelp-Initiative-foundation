import type { AppView } from '../components/Navbar';

export interface RouteResolution {
  view: AppView;
  autoOpenCheckout: boolean;
  driveItemId?: string;
  quantity?: number;
}

/**
 * Parses pathname, query parameters and hash to determine the target view and direct action.
 */
export function getRouteFromLocation(): RouteResolution {
  if (typeof window === 'undefined') {
    return { view: 'home', autoOpenCheckout: false };
  }

  let path = window.location.pathname.toLowerCase();
  const searchStr = window.location.search;

  // Support GitHub Pages / static hosting ?/ subpath redirect format
  if (searchStr.startsWith('?/')) {
    const subpath = searchStr.slice(2).split('&')[0];
    if (subpath) {
      path = ('/' + subpath).toLowerCase();
    }
  }

  const search = new URLSearchParams(searchStr);
  const hash = window.location.hash.toLowerCase();

  const donateParam = search.get('donate')?.toLowerCase();
  const itemParam = search.get('item')?.toLowerCase();
  const viewParam = search.get('view')?.toLowerCase();
  const qtyParam = search.get('qty') || search.get('quantity');
  const parsedQty = qtyParam ? parseInt(qtyParam, 10) : undefined;

  // Direct Hospital Seva URL patterns (Nariyal Pani, Anaar Juice, Khana/Meal Box)
  const isHospitalSeva =
    path === '/hospital-seva' ||
    path === '/hospital' ||
    path === '/poshan-seva' ||
    path === '/direct-seva' ||
    path === '/nariyal-pani' ||
    path === '/nariyal' ||
    path === '/nariyal-pani-seva' ||
    path === '/donate/nariyal-pani' ||
    path === '/donate/nariyal' ||
    path === '/donate/hospital-seva' ||
    path === '/coconut-water' ||
    path === '/anar-juice' ||
    path === '/anaar' ||
    path === '/juice' ||
    path === '/khana' ||
    path === '/meal' ||
    path === '/meal-box' ||
    hash === '#hospital-seva' ||
    hash === '#/hospital-seva' ||
    hash === '#nariyal-pani' ||
    hash === '#/nariyal-pani' ||
    hash === '#nariyal' ||
    hash === '#/nariyal' ||
    hash === '#anar-juice' ||
    hash === '#khana' ||
    viewParam === 'hospital-seva' ||
    viewParam === 'nariyal-pani' ||
    Boolean(donateParam);

  if (isHospitalSeva) {
    // Determine which of the 3 items to preselect
    let targetItem = 'coconut-water';
    if (
      path.includes('anar') ||
      path.includes('anaar') ||
      path.includes('juice') ||
      itemParam === 'anar' ||
      itemParam === 'anar-juice' ||
      itemParam === 'anaar' ||
      itemParam === 'juice' ||
      donateParam === 'anar' ||
      donateParam === 'anar-juice' ||
      donateParam === 'anaar' ||
      donateParam === 'juice'
    ) {
      targetItem = 'anar-juice';
    } else if (
      path.includes('khana') ||
      path.includes('meal') ||
      itemParam === 'khana' ||
      itemParam === 'meal' ||
      itemParam === 'meal-box' ||
      donateParam === 'khana' ||
      donateParam === 'meal' ||
      donateParam === 'meal-box'
    ) {
      targetItem = 'pomegranate-meal';
    }

    const isDirectDonate =
      Boolean(donateParam) ||
      path.startsWith('/donate') ||
      Boolean(qtyParam) ||
      hash.includes('donate');

    return {
      view: 'hospital-seva',
      autoOpenCheckout: isDirectDonate,
      driveItemId: targetItem,
      quantity: parsedQty && parsedQty > 0 ? parsedQty : 20,
    };
  }

  // General Direct Donation URL
  if (path === '/donate' || hash === '#donate' || hash === '#/donate') {
    return {
      view: 'home',
      autoOpenCheckout: true,
      driveItemId: 'coconut-water',
      quantity: parsedQty && parsedQty > 0 ? parsedQty : 20,
    };
  }

  // Ekadashi Page
  if (path === '/ekadashi' || hash === '#ekadashi' || hash === '#/ekadashi' || viewParam === 'ekadashi') {
    return { view: 'ekadashi', autoOpenCheckout: false };
  }

  // Cancer Warriors Page
  if (
    path === '/cancer-warriors' ||
    path === '/warriors' ||
    hash === '#cancer-warriors' ||
    hash === '#/cancer-warriors' ||
    viewParam === 'cancer-warriors'
  ) {
    return { view: 'cancer-warriors', autoOpenCheckout: false };
  }

  // Education & Livelihood Page
  if (
    path === '/education' ||
    path === '/livelihood' ||
    hash === '#education' ||
    hash === '#/education' ||
    viewParam === 'education'
  ) {
    return { view: 'education', autoOpenCheckout: false };
  }

  // Volunteer Signup Page
  if (
    path === '/volunteer' ||
    path === '/join' ||
    hash === '#volunteer' ||
    hash === '#/volunteer' ||
    viewParam === 'volunteer'
  ) {
    return { view: 'volunteer', autoOpenCheckout: false };
  }

  // Gallery Page
  if (path === '/gallery' || hash === '#gallery' || hash === '#/gallery' || viewParam === 'gallery') {
    return { view: 'gallery', autoOpenCheckout: false };
  }

  // Default Home
  return { view: 'home', autoOpenCheckout: false };
}

/**
 * Returns canonical URL path for a given view.
 */
export function getPathForView(view: AppView): string {
  switch (view) {
    case 'hospital-seva':
      return '/hospital-seva';
    case 'nariyal-pani':
      return '/hospital-seva';
    case 'ekadashi':
      return '/ekadashi';
    case 'cancer-warriors':
      return '/cancer-warriors';
    case 'education':
      return '/education';
    case 'volunteer':
      return '/volunteer';
    case 'gallery':
      return '/gallery';
    case 'home':
    default:
      return '/';
  }
}

/**
 * Pushes path into browser history without full page reload.
 */
export function pushViewToHistory(view: AppView, replace: boolean = false) {
  if (typeof window === 'undefined') return;
  const path = getPathForView(view);
  if (window.location.pathname === path && !window.location.search && !window.location.hash) {
    return;
  }
  if (replace) {
    window.history.replaceState({ view }, '', path);
  } else {
    window.history.pushState({ view }, '', path);
  }
}
