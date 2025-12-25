// ============================================
// SITE CONFIGURATION - Edit these values
// ============================================

export const SITE = {
	// Basic Info
	name: 'ShipFast',
	tagline: 'Ship your SaaS in days, not months',
	description: 'The complete stack for building and launching your next project. SvelteKit and Supabase Auth. Minimal config, maximum speed.',
	
	// URLs
	url: 'https://yoursite.com', // Your production URL (no trailing slash)
	
	// Social
	twitter: '@yourhandle', // Your Twitter handle
	
	// Author
	author: {
		name: 'Your Name',
		twitter: '@yourhandle'
	}
} as const;

// ============================================
// DEFAULT OG IMAGES - Edit paths as needed
// ============================================

export const OG_IMAGES = {
	// Default OG image (1200x630 recommended)
	default: '/og/default.png',
	
	// Page-specific OG images
	home: '/og/home.png',
	pricing: '/og/pricing.png',
	about: '/og/about.png',
	dashboard: '/og/dashboard.png',
	login: '/og/login.png',
	signup: '/og/signup.png'
} as const;

// ============================================
// SEO DEFAULTS - Customize per page
// ============================================

export const SEO_DEFAULTS = {
	// Title template: "Page Title | Site Name"
	titleTemplate: `%s | ${SITE.name}`,
	
	// Default meta
	defaultTitle: SITE.name,
	defaultDescription: SITE.description,
	defaultImage: OG_IMAGES.default,
	
	// Twitter card type: 'summary' | 'summary_large_image'
	twitterCardType: 'summary_large_image' as const,
	
	// Open Graph type
	ogType: 'website' as const
} as const;

// ============================================
// PAGE-SPECIFIC SEO CONFIG
// ============================================

export const PAGE_SEO = {
	home: {
		title: SITE.tagline,
		description: SITE.description,
		image: OG_IMAGES.home
	},
	about: {
		title: 'About',
		description: `Learn more about ${SITE.name} and our mission.`,
		image: OG_IMAGES.about
	},
	pricing: {
		title: 'Pricing',
		description: `Simple, transparent pricing for ${SITE.name}. Choose the plan that fits your needs.`,
		image: OG_IMAGES.pricing
	},
	dashboard: {
		title: 'Dashboard',
		description: `Your ${SITE.name} dashboard.`,
		image: OG_IMAGES.dashboard
	},
	login: {
		title: 'Sign In',
		description: `Sign in to your ${SITE.name} account.`,
		image: OG_IMAGES.login
	},
	signup: {
		title: 'Sign Up',
		description: `Create your ${SITE.name} account and get started.`,
		image: OG_IMAGES.signup
	}
} as const;

// Type exports for TypeScript
export type PageKey = keyof typeof PAGE_SEO;
export type OGImageKey = keyof typeof OG_IMAGES;

