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
  const viewParam = search.get('view')?.toLowerCase();
  const qtyParam = search.get('qty') || search.get('quantity');
  const parsedQty = qtyParam ? parseInt(qtyParam, 10) : undefined;

  // Direct Nariyal Pani Donation URL patterns
  const isNariyalDirect =
    path === '/nariyal-pani' ||
    path === '/nariyal' ||
    path === '/nariyal-pani-seva' ||
    path === '/donate/nariyal-pani' ||
    path === '/donate/nariyal' ||
    path === '/coconut-water' ||
    hash === '#nariyal-pani' ||
    hash === '#/nariyal-pani' ||
    hash === '#nariyal' ||
    hash === '#/nariyal' ||
    donateParam === 'nariyal' ||
    donateParam === 'nariyal-pani' ||
    donateParam === 'coconut-water' ||
    donateParam === 'coconut';

  if (isNariyalDirect) {
    return {
      view: 'nariyal-pani',
      autoOpenCheckout: true,
      driveItemId: 'coconut-water',
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
    case 'nariyal-pani':
      return '/nariyal-pani';
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
