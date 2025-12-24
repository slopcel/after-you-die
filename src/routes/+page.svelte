<script lang="ts">
	import type { PageData } from './$types';
	// Import icons from specific paths to avoid SSR issues
	import Lock from 'lucide-svelte/icons/lock';
	import Database from 'lucide-svelte/icons/database';
	import TrendingUp from 'lucide-svelte/icons/trending-up';
	import Twitter from 'lucide-svelte/icons/twitter';
	import Globe from 'lucide-svelte/icons/globe';
    import { links } from '../constants';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Indie Hacker Stack | Ship Fast</title>
	<meta name="description" content="SvelteKit + Supabase - The indie hacker's stack for shipping fast" />
</svelte:head>

<main class="hero">
	<div class="container">
		<nav class="nav animate-in">
			<div class="logo">
				<span>ShipFast</span>
			</div>
			<div class="nav-links">
				{#if data.user}
					<a href="/dashboard" class="btn btn-ghost">Dashboard</a>
					<form action="/auth/logout" method="POST">
						<button type="submit" class="btn btn-secondary">Sign Out</button>
					</form>
				{:else}
					<a href="/auth/login" class="btn btn-ghost">Sign In</a>
					<a href="/auth/signup" class="btn btn-primary">Get Started</a>
				{/if}
			</div>
		</nav>

		<section class="hero-content">
			<div class="badge animate-in">Built for Indie Hackers</div>
			<h1 class="animate-in delay-1">
				Ship your SaaS<br />
				<span class="text-accent">in days, not months</span>
			</h1>
			<p class="hero-subtitle animate-in delay-2">
				The complete stack for building and launching your next project. 
				SvelteKit and Supabase Auth. Minimal config, maximum speed.
			</p>
			<div class="hero-cta animate-in delay-3">
				{#if data.user}
					<a href="/dashboard" class="btn btn-primary">Go to Dashboard →</a>
				{:else}
					<a href="/auth/signup" class="btn btn-primary">Start Building →</a>
				{/if}
				<a href="#features" class="btn btn-secondary">See Features</a>
			</div>
		</section>

		<section id="features" class="features">
			<div class="feature-grid">
				<div class="card card-hover animate-in">
					<div class="feature-icon">
						<Lock size={24} />
					</div>
					<h3>Supabase Auth</h3>
					<p>Secure authentication with email, Google, and GitHub. Safe server-side sessions pre-configured.</p>
				</div>

				<div class="card card-hover animate-in delay-1">
					<div class="feature-icon">
						<Database size={24} />
					</div>
					<h3>Supabase Database</h3>
					<p>Postgres database with Row Level Security. Real-time subscriptions and auto-generated APIs.</p>
				</div>

				<div class="card card-hover animate-in delay-2">
					<div class="feature-icon">
						<TrendingUp size={24} />
					</div>
					<h3>Umami Analytics</h3>
					<p>Privacy-first, self-hosted analytics. Track your growth without compromising user privacy.</p>
				</div>
			</div>
		</section>

		<section class="stack-preview">
			<div class="code-block animate-in delay-3">
				<div class="code-header">
					<span class="dot red"></span>
					<span class="dot yellow"></span>
					<span class="dot green"></span>
					<span class="file-name">hooks.server.ts</span>
				</div>
				<pre><code>{`export const handle: Handle = async ({ event, resolve }) => {
  event.locals.supabase = createServerClient(...)
  event.locals.safeGetSession = async () => { ... }
  
  return resolve(event);
};`}</code></pre>
			</div>
		</section>

		<section class="about-section">
			<h2 class="section-title">Meet the Creator</h2>
			<div class="creator-card">
				<div class="creator-avatar">
					<img src="https://slopcel.com/_next/image?url=%2Fmadiou_logo.jpg&w=256&q=75" alt="Madiou" />
				</div>
				<div class="creator-info">
					<h3>Hey, there friends 👋</h3>
					<p class="creator-title">CEO @ <a href="https://slopcel.com" target="_blank" rel="noopener">Slopcel</a></p>

					<p class="creator-bio">
						I made this website
					</p>

					<p class="creator-bio">
						This website is a template for a SaaS project. It's a simple project that I made to try out SvelteKit and Supabase.
					</p>


					<div class="creator-links">
						<a href="https://twitter.com/_madiou" target="_blank" rel="noopener" class="creator-social-link">
							<Twitter size={18} />
							@_madiou
						</a>
						<a href="https://slopcel.com" target="_blank" rel="noopener" class="creator-social-link">
							<Globe size={18} />
							Slopcel
						</a>
					</div>
				</div>
			</div>
		</section>

		<footer class="footer">
			<div class="footer-content">
				<div class="footer-brand">
					<h3>FriendApply</h3>
					<p class="text-muted">Create and share friend application forms</p>
				</div>
				<div class="footer-links">
					<h4>Connect</h4>
					<div class="social-links">
						<a
							href={links.discord}
							target="_blank"
							rel="noopener noreferrer"
							class="social-link"
							aria-label="Discord"
						>
							<img src="/icons/discord.svg" alt="Discord" width={20} height={20}>
							<span>Discord</span>
						</a>
						<a
							href={links.twitter}
							target="_blank"
							rel="noopener noreferrer"
							class="social-link"
							aria-label="Twitter"
						>
							<Twitter size={20} />
							<span>Twitter</span>
						</a>
						<a
							href={links.website}
							target="_blank"
							rel="noopener noreferrer"
							class="social-link"
							aria-label="Slopcel"
						>
							<Globe size={20} />
							<span>Slopcel</span>
						</a>
				</div>
			</div>
		</div>
		<div class="footer-bottom">
			<p class="text-muted">Built with SvelteKit and Supabase</p>
		</div>
		</footer>
	</div>
</main>

<style>
	.hero {
		min-height: 100vh;
		background: var(--bg-primary);
	}

	.nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 2rem 0;
	}

	.logo {
		font-size: 1.125rem;
		font-weight: 700;
		letter-spacing: -0.02em;
	}

	.nav-links {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.hero-content {
		text-align: center;
		padding: 6rem 0 4rem;
		max-width: 800px;
		margin: 0 auto;
	}

	.badge {
		display: inline-block;
		padding: 0.375rem 0.875rem;
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-radius: 100px;
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--text-secondary);
		margin-bottom: 2rem;
	}

	.hero-content h1 {
		margin-bottom: 1.5rem;
	}

	.hero-subtitle {
		font-size: 1.25rem;
		color: var(--text-secondary);
		max-width: 600px;
		margin: 0 auto 2.5rem;
		line-height: 1.6;
	}

	.hero-cta {
		display: flex;
		justify-content: center;
		gap: 1rem;
	}

	.features {
		padding: 6rem 0;
	}

	.feature-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 2rem;
	}

	.feature-icon {
		margin-bottom: 1.25rem;
		width: 48px;
		height: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--accent-soft);
		border-radius: 10px;
		color: var(--accent);
	}

	.features h3 {
		margin-bottom: 0.75rem;
		font-size: 1.25rem;
	}

	.features p {
		color: var(--text-secondary);
		font-size: 0.9375rem;
		line-height: 1.6;
	}

	.stack-preview {
		padding-bottom: 6rem;
	}

	.code-block {
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-radius: 8px;
		overflow: hidden;
		box-shadow: var(--shadow-sm);
	}

	.code-header {
		padding: 0.625rem 1rem;
		background: #fff;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		border-bottom: 1px solid var(--border);
	}

	.dot {
		width: 9px;
		height: 9px;
		border-radius: 50%;
	}

	.dot.red { background: #ff5f56; opacity: 0.4; }
	.dot.yellow { background: #ffbd2e; opacity: 0.4; }
	.dot.green { background: #27c93f; opacity: 0.4; }

	.file-name {
		margin-left: 0.5rem;
		font-size: 0.75rem;
		font-weight: 500;
		color: var(--text-muted);
		font-family: var(--font-mono);
	}

	.code-block pre {
		padding: 1.25rem 1.5rem;
		margin: 0;
	}

	.code-block code {
		font-size: 0.8125rem;
		color: var(--text-primary);
		line-height: 1.6;
	}

	/* About Section */
	.section-title {
		text-align: center;
		font-size: 2.5rem;
		margin-bottom: 3rem;
	}

	.about-section {
		padding: 6rem 0;
	}

	.creator-card {
		max-width: 800px;
		margin: 0 auto;
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: 16px;
		padding: 2.5rem;
		display: flex;
		gap: 2rem;
		align-items: flex-start;
	}

	.creator-avatar {
		flex-shrink: 0;
	}

	.creator-avatar img {
		width: 100px;
		height: 100px;
		border-radius: 12px;
		object-fit: cover;
	}

	.creator-info {
		flex: 1;
		text-align: left;
	}

	.creator-info h3 {
		font-size: 1.75rem;
		margin-bottom: 0.25rem;
	}

	.creator-title {
		color: var(--accent);
		font-weight: 600;
		margin-bottom: 1.5rem;
	}

	.creator-title a {
		color: var(--accent);
		text-decoration: none;
	}

	.creator-title a:hover {
		text-decoration: underline;
	}

	.creator-bio {
		color: var(--text-secondary);
		line-height: 1.7;
		margin-bottom: 1.5rem;
		font-size: 0.9375rem;
	}

	/* Twitter embed styling */
	.twitter-tweet {
		margin: 1.5rem 0 !important;
		max-width: 100% !important;
	}

	.creator-links {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-top: 1.5rem;
	}

	.creator-social-link {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		background: var(--bg-secondary);
		border: 1px solid var(--border);
		border-radius: 6px;
		color: var(--text-primary);
		font-size: 0.875rem;
		font-weight: 500;
		transition: all 0.2s ease;
	}

	.creator-social-link:hover {
		border-color: var(--accent);
		color: var(--accent);
	}


	.footer {
		padding: 4rem 0 2rem;
		border-top: 1px solid var(--border);
		margin-top: 4rem;
	}

	.footer-content {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 3rem;
		margin-bottom: 2rem;
	}

	.footer-brand h3 {
		font-size: 1.25rem;
		margin-bottom: 0.5rem;
	}

	.footer-links h4 {
		font-size: 0.875rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--text-secondary);
		margin-bottom: 1rem;
	}

	.social-links {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.social-link {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		color: var(--text-secondary);
		transition: color 0.2s ease;
	}

	.social-link:hover {
		color: var(--accent);
	}

	.footer-bottom {
		text-align: center;
		padding-top: 2rem;
		border-top: 1px solid var(--border);
	}

	@media (max-width: 768px) {
		.about-section {
			padding: 4rem 0;
		}

		.creator-card {
			flex-direction: column;
			align-items: center;
			gap: 1.5rem;
			padding: 2rem;
		}

		.creator-info {
			text-align: center;
			width: 100%;
		}

		.creator-info h3 {
			font-size: 1.5rem;
		}

		.creator-title {
			font-size: 0.9375rem;
		}

		.creator-bio {
			font-size: 0.875rem;
			text-align: left;
		}

		.twitter-tweet {
			margin: 1.5rem auto !important;
		}

		.creator-links {
			justify-content: center;
		}

		.creator-social-link {
			font-size: 0.8125rem;
			padding: 0.5rem 0.875rem;
		}
	}

	@media (max-width: 640px) {
		.hero-content h1 {
			font-size: 2.5rem;
		}

		.hero-cta {
			flex-direction: column;
		}

		.hero-cta .btn {
			width: 100%;
		}

		.section-title {
			font-size: 2rem;
		}

		.steps-grid {
			grid-template-columns: 1fr;
		}

		.footer-content {
			grid-template-columns: 1fr;
		}

		.about-section {
			padding: 3rem 0;
		}

		.creator-card {
			padding: 1.5rem;
			gap: 1.25rem;
		}

		.creator-avatar img {
			width: 80px;
			height: 80px;
		}

		.creator-info h3 {
			font-size: 1.375rem;
		}

		.creator-title {
			font-size: 0.875rem;
			margin-bottom: 1rem;
		}

		.creator-bio {
			font-size: 0.8125rem;
			margin-bottom: 1rem;
			line-height: 1.6;
		}

		.creator-links {
			flex-direction: column;
			width: 100%;
		}

		.creator-social-link {
			width: 100%;
			justify-content: center;
		}

		.twitter-tweet {
			margin: 1rem auto !important;
		}
	}

	@media (max-width: 480px) {
		.about-section {
			padding: 2rem 0;
		}

		.section-title {
			font-size: 1.75rem;
			margin-bottom: 2rem;
		}

		.creator-card {
			padding: 1.25rem;
			border-radius: 12px;
		}

		.creator-avatar img {
			width: 70px;
			height: 70px;
		}

		.creator-info h3 {
			font-size: 1.25rem;
		}
	}

</style>

