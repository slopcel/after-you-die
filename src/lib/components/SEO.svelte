<script lang="ts">
	import { SITE, SEO_DEFAULTS, PAGE_SEO, type PageKey } from '$lib/constants';

	interface Props {
		// Use a preset page config
		page?: PageKey;
		// Or provide custom values (these override preset)
		title?: string;
		description?: string;
		image?: string;
		// Additional options
		noindex?: boolean;
		nofollow?: boolean;
		canonical?: string;
		ogType?: 'website' | 'article';
		article?: {
			publishedTime?: string;
			modifiedTime?: string;
			author?: string;
			tags?: string[];
		};
	}

	let {
		page,
		title,
		description,
		image,
		noindex = false,
		nofollow = false,
		canonical,
		ogType,
		article
	}: Props = $props();

	// Get page preset if provided
	const pagePreset = page ? PAGE_SEO[page] : null;

	// Resolve final values (custom > preset > default)
	const finalTitle = title ?? pagePreset?.title ?? SEO_DEFAULTS.defaultTitle;
	const finalDescription = description ?? pagePreset?.description ?? SEO_DEFAULTS.defaultDescription;
	const finalImage = image ?? pagePreset?.image ?? SEO_DEFAULTS.defaultImage;
	const finalOgType = ogType ?? (article ? 'article' : SEO_DEFAULTS.ogType);

	// Build full title with template
	const fullTitle = finalTitle === SITE.name 
		? SITE.name 
		: SEO_DEFAULTS.titleTemplate.replace('%s', finalTitle);

	// Build full image URL
	const fullImageUrl = finalImage.startsWith('http') 
		? finalImage 
		: `${SITE.url}${finalImage}`;

	// Build robots meta
	const robotsContent = [
		noindex ? 'noindex' : 'index',
		nofollow ? 'nofollow' : 'follow'
	].join(', ');
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{fullTitle}</title>
	<meta name="title" content={fullTitle} />
	<meta name="description" content={finalDescription} />
	<meta name="robots" content={robotsContent} />
	
	{#if canonical}
		<link rel="canonical" href={canonical} />
	{/if}

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content={finalOgType} />
	<meta property="og:url" content={canonical ?? SITE.url} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={finalDescription} />
	<meta property="og:image" content={fullImageUrl} />
	<meta property="og:site_name" content={SITE.name} />

	<!-- Twitter -->
	<meta name="twitter:card" content={SEO_DEFAULTS.twitterCardType} />
	<meta name="twitter:site" content={SITE.twitter} />
	<meta name="twitter:creator" content={SITE.author.twitter} />
	<meta name="twitter:url" content={canonical ?? SITE.url} />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={finalDescription} />
	<meta name="twitter:image" content={fullImageUrl} />

	<!-- Article specific (for blog posts) -->
	{#if article}
		{#if article.publishedTime}
			<meta property="article:published_time" content={article.publishedTime} />
		{/if}
		{#if article.modifiedTime}
			<meta property="article:modified_time" content={article.modifiedTime} />
		{/if}
		{#if article.author}
			<meta property="article:author" content={article.author} />
		{/if}
		{#if article.tags}
			{#each article.tags as tag}
				<meta property="article:tag" content={tag} />
			{/each}
		{/if}
	{/if}
</svelte:head>

