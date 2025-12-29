<script lang="ts">
	import { onMount } from "svelte";
	import { fade, fly } from "svelte/transition";
	import { cubicOut } from "svelte/easing";
	import Twitter from "lucide-svelte/icons/twitter";
	import Globe from "lucide-svelte/icons/globe";
	import { toast } from "svelte-sonner";

	let birthYear: number | null = null;
	let deathYear: number | null = null;
	let showTimeline = false;
	let inputYear = "";

	// Constants
	const LIFE_EXPECTANCY = 80;

	type EventType = "personal" | "near-future" | "far-future";

	interface TimelineEvent {
		id: string;
		timeLabel: string; // "Day 1", "Year 2030", "~10,000 Years"
		description: string;
		subtext?: string;
		type: EventType;
		year?: number; // For sorting/filtering real world events
		relativeTime?: number; // Seconds/Years from death for sorting?
	}

	let timelineEvents: TimelineEvent[] = [];

	onMount(() => {
		const storedYear = localStorage.getItem("birthYear");
		if (storedYear) {
			inputYear = storedYear;
			// Optionally auto-show, but maybe let them click?
		}
	});

	function calculateTimeline() {
		const year = parseInt(inputYear);
		if (!year || year < 1900 || year > new Date().getFullYear()) {
			toast.error("Please enter a valid birth year.");
			return;
		}

		birthYear = year;
		deathYear = birthYear + LIFE_EXPECTANCY;
		localStorage.setItem("birthYear", inputYear);

		generateEvents();
		showTimeline = true;

		// Scroll to top
		window.scrollTo({ top: 0, behavior: "smooth" });
	}

	function reset() {
		showTimeline = false;
		// inputYear = ''; // Keep it for convenience?
		timelineEvents = [];
	}

	function generateEvents() {
		if (!deathYear) return;

		const events: TimelineEvent[] = [];

		// Personal Digital Decay (Relative to Death)
		// These happen regardless of the calendar year

		events.push(
			{
				id: "p1",
				timeLabel: "Day 1",
				description: "Your Spotify keeps playing to an empty room.",
				type: "personal",
				relativeTime: 0,
			},
			{
				id: "p2",
				timeLabel: "Day 1",
				description:
					"Your phone lights up with notifications no one will read.",
				type: "personal",
				relativeTime: 0.003,
			},
			{
				id: "p3",
				timeLabel: "Day 3",
				description: "47 unread emails. 48. 49.",
				type: "personal",
				relativeTime: 0.008,
			},
			{
				id: "p4",
				timeLabel: "Day 7",
				description:
					'First "haven\'t heard from you in a while" text arrives.',
				type: "personal",
				relativeTime: 0.02,
			},
			{
				id: "p5",
				timeLabel: "Week 2",
				description: "Your houseplants start dying.",
				type: "personal",
				relativeTime: 0.04,
			},
			{
				id: "p6",
				timeLabel: "Week 3",
				description: 'Netflix asks "Are you still watching?"',
				type: "personal",
				relativeTime: 0.06,
			},
			{
				id: "p7",
				timeLabel: "Month 1",
				description: "Your subscriptions start failing silently.",
				type: "personal",
				relativeTime: 0.08,
			},
			{
				id: "p8",
				timeLabel: "Month 2",
				description:
					'Instagram shows your face in friends\' "Memories".',
				type: "personal",
				relativeTime: 0.16,
			},
			{
				id: "p9",
				timeLabel: "Month 3",
				description:
					"Your Amazon recommendations keep updating for no one.",
				type: "personal",
				relativeTime: 0.25,
			},
			{
				id: "p10",
				timeLabel: "Year 1",
				description: "Your domain expires. Someone else buys it.",
				type: "personal",
				relativeTime: 1,
			},
			{
				id: "p11",
				timeLabel: "Year 2",
				description:
					'Google Photos creates a cheerful "memories from this day" slideshow for nobody.',
				type: "personal",
				relativeTime: 2,
			},
			{
				id: "p12",
				timeLabel: "Year 5",
				description: "Your accounts get flagged as inactive.",
				type: "personal",
				relativeTime: 5,
			},
			{
				id: "p13",
				timeLabel: "Year 10",
				description: "Your phone number gets reassigned to a stranger.",
				type: "personal",
				relativeTime: 10,
			},
			{
				id: "p14",
				timeLabel: "Year 15",
				description:
					"Your email address gets recycled. Someone else is you now.",
				type: "personal",
				relativeTime: 15,
			},
			{
				id: "p15",
				timeLabel: "Year 20",
				description:
					"The last person who knew your WiFi password dies.",
				type: "personal",
				relativeTime: 20,
			},
			{
				id: "p16",
				timeLabel: "Year 40",
				description:
					"The last person who remembers your laugh is gone.",
				type: "personal",
				relativeTime: 40,
			},
		);

		// Real World Events
		// Filter those AFTER deathYear
		const worldEvents = [
			{
				year: 2026,
				desc: "Total solar eclipse crosses Greenland, Iceland, and Spain.",
			},
			{
				year: 2027,
				desc: "First uncrewed SpaceX Starships attempt Mars landing.",
			},
			{
				year: 2029,
				desc: "Asteroid Apophis passes closer to Earth than our satellites.",
				sub: "Visible to naked eye, once every 800 years.",
			},
			{
				year: 2029,
				desc: "One of the darkest lunar eclipses of the century.",
			},
			{ year: 2031, desc: "First humans likely walk on Mars." },
			{
				year: 2036,
				desc: "Voyager 1 goes silent forever.",
				sub: "Last signal from humanity's farthest traveler.",
			},
			{
				year: 2040,
				desc: 'All planets align in a "parade of planets".',
				sub: "Visible to naked eye.",
			},
			{
				year: 2045,
				desc: "The longest total solar eclipse in US history.",
				sub: "6 minutes of totality across Florida.",
			},
			{
				year: 2050,
				desc: "Self-sustaining Mars colonies with thousands of humans.",
			},
			{
				year: 2060,
				desc: "Comet 15P/Finlay makes its closest approach to Earth in centuries.",
			},
			{
				year: 2061,
				desc: "Halley's Comet returns.",
				sub: "You missed it in 1986. You'll miss it again.",
			},
			{
				year: 2084,
				desc: "Earth eclipses the Sun—visible only from Mars.",
				sub: "Humans there will see our planet as a tiny silhouette.",
			},
			{
				year: 2100,
				desc: "The North Star (Polaris) aligns with true north for the last time in 26,000 years.",
			},
			{
				year: 2117,
				desc: "Transit of Venus.",
				sub: "One of the rarest predictable astronomical events. The last one anyone alive saw was 2012. You'll miss it.",
			},
			{ year: 2125, desc: "The next Transit of Venus." },
		];

		// Far Future (Fixed Dates usually)
		// We can just treat them as years relative to now or just big numbers
		// For sorting, let's give them huge years
		const farFuture = [
			{
				year: 2100,
				desc: "Half of Earth's species may be extinct. The Great Barrier Reef—gone.",
				type: "near-future",
			}, // Overlap with world but conceptual
			{
				year: 2100,
				desc: "Venice likely underwater.",
				type: "near-future",
			},
			{
				year: 3000,
				label: "~1,000 Years",
				desc: "Gamma Cephei replaces Polaris as the North Star.",
				type: "far-future",
			},
			{
				year: 12000,
				label: "~10,000 Years",
				desc: "Voyager 1 will have traveled just 1 light year.",
				sub: "Still billions of years from anywhere.",
				type: "far-future",
			},
			{
				year: 42000,
				label: "~40,000 Years",
				desc: "Voyager 1 finally passes within 1.7 light-years of another star—AC+79 3888.",
				sub: "Nobody will know.",
				type: "far-future",
			},
			{
				year: 52000,
				label: "~50,000 Years",
				desc: "Niagara Falls erodes back to Lake Erie and disappears forever.",
				type: "far-future",
			},
			{
				year: 102000,
				label: "~100,000 Years",
				desc: "Stars in the night sky completely rearranged.",
				sub: "Every constellation unrecognizable.",
				type: "far-future",
			},
			{
				year: 102000,
				label: "~100,000 Years",
				desc: "Betelgeuse explodes as a supernova.",
				sub: "Bright as the half-moon for 3 months. Visible during the day. Orion will be missing its shoulder forever.",
				type: "far-future",
			},
			{
				year: 250000000,
				label: "~250 Million Years",
				desc: 'All continents merge into a new supercontinent "Pangaea Ultima".',
				sub: "92% of Earth uninhabitable to mammals.",
				type: "far-future",
			},
			{
				year: 600000000,
				label: "~600 Million Years",
				desc: "Last total solar eclipse ever.",
				sub: "The Moon will be too far away.",
				type: "far-future",
			},
			{
				year: 1000000000,
				label: "~1 Billion Years",
				desc: "The Sun grows 10% brighter. Oceans boil away.",
				type: "far-future",
			},
			{
				year: 5000000000,
				label: "~5 Billion Years",
				desc: "The Sun expands into a red giant and swallows Earth.",
				sub: "Everything you knew. Everyone who remembered you. Gone.",
				type: "far-future",
			},
		];

		// Add eligible world events
		for (const ev of worldEvents) {
			if (ev.year > deathYear) {
				events.push({
					id: `w-${ev.year}`,
					timeLabel: ev.year.toString(),
					description: ev.desc,
					subtext: ev.sub,
					type: "near-future",
					year: ev.year,
					relativeTime: ev.year - deathYear,
				});
			}
		}

		// Add eligible far future events
		for (const ev of farFuture) {
			if (ev.year > deathYear) {
				// For huge years, we just rely on order properties or index
				// We'll treat 'year' as specific point
				events.push({
					id: `f-${ev.year}-${ev.desc.substring(0, 5)}`,
					timeLabel: (ev as any).label || ev.year.toString(),
					description: ev.desc,
					subtext: (ev as any).sub,
					type: "far-future",
					year: ev.year,
					relativeTime: ev.year - deathYear,
				});
			}
		}

		// Sort events
		// Personal events have relativeTime from 0 to 40.
		// World events have relativeTime = Year - DeathYear.
		// We want to interleave them correctly.
		events.sort((a, b) => (a.relativeTime || 0) - (b.relativeTime || 0));

		timelineEvents = events;
	}

	function scrollIntoView(node: HTMLElement) {
		// Intersection observer for fade in
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("visible");
					}
				});
			},
			{ threshold: 0.1 },
		);

		observer.observe(node);
		return {
			destroy() {
				observer.disconnect();
			},
		};
	}
</script>

<svelte:head>
	<title>After You Die</title>
	<meta
		name="description"
		content="A timeline of your digital afterlife and the cosmos."
	/>

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://afteryou.die" />
	<meta property="og:title" content="After You Die" />
	<meta
		property="og:description"
		content="A timeline showing what happens to your digital presence and the world after you're gone."
	/>
	<meta property="og:image" content="/main-og-image.png" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://afteryou.die" />
	<meta property="twitter:title" content="After You Die" />
	<meta
		property="twitter:description"
		content="A timeline showing what happens to your digital presence and the world after you're gone."
	/>
	<meta property="twitter:image" content="/main-og-image.png" />

	<!-- Fonts are imported in app.css -->
</svelte:head>

<main>
	{#if !showTimeline}
		<section class="intro" in:fade={{ duration: 800 }}>
			<div class="content">
				<h1>AFTER YOU DIE</h1>
				<p class="subtitle">Your digital afterlife.</p>

				<div class="input-group">
					<label for="birth-year">What year were you born?</label>
					<div class="input-wrapper">
						<input
							type="number"
							id="birth-year"
							bind:value={inputYear}
							placeholder="1990"
							min="1900"
							max={new Date().getFullYear()}
							onkeydown={(e) =>
								e.key === "Enter" && calculateTimeline()}
						/>
						<button class="btn-start" onclick={calculateTimeline}>
							Show Me
						</button>
					</div>
				</div>
			</div>
		</section>
	{:else}
		<section class="timeline-view" in:fade={{ duration: 1000, delay: 200 }}>
			<header class="timeline-header">
				<div class="header-left">
					<h2>AFTER YOU DIE</h2>
				</div>
				<button class="btn-reset" onclick={reset}>[Reset]</button>
			</header>

			<div class="summary-card">
				<p>Based on average life expectancy,</p>
				<p>
					you have until approximately <span class="death-year"
						>{deathYear}</span
					>.
				</p>
				<div class="divider"></div>
				<p>Here's what happens next.</p>
			</div>

			<div class="timeline-container">
				<div class="line"></div>

				{#each timelineEvents as event}
					<div class="event-item {event.type}" use:scrollIntoView>
						<div class="dot"></div>
						<div class="time">{event.timeLabel}</div>
						<div class="card">
							<p class="desc">{event.description}</p>
							{#if event.subtext}
								<p class="subtext">{event.subtext}</p>
							{/if}
						</div>
					</div>
				{/each}

				<div class="event-item final" use:scrollIntoView>
					<div class="dot cosmic"></div>
					<div class="time">THE END</div>
					<div class="card">
						<p class="desc">And then, silence.</p>
						<p class="subtext highlight">
							But you were here.<br />And that mattered.
						</p>

						<div class="share-actions">
							<button class="btn-small" onclick={reset}
								>Start Over</button
							>
						</div>
					</div>
				</div>
			</div>

			<footer class="creator-section">
				<div class="creator-header">
					<span class="header-line"></span>
					<h3>MEET THE CREATOR</h3>
					<span class="header-line"></span>
				</div>

				<div class="creator-card">
					<div class="creator-avatar">
						<img
							src="https://slopcel.com/_next/image?url=%2Fmadiou_logo.jpg&w=256&q=75"
							alt="Madiou"
						/>
					</div>
					<div class="creator-info">
						<div class="creator-name">Madiou</div>
						<div class="creator-role">
							CEO @ <a href="https://slopcel.com" target="_blank"
								>Slopcel</a
							>
						</div>
						<p class="creator-bio">
							This is the fifth website in a series to prove my
							opp <a
								href="https://twitter.com/dan"
								target="_blank"
								class="purple-link">Dan</a
							>
							wrong. It's an interesting idea (that I did not come
							up with) but I still need to work on the events
							mentioned here to make it even better. S/O Claude
							tho for the idea and Gemini for building it. Check
							out more of my slop at
							<a
								href="https://slopcel.com"
								target="_blank"
								class="purple-link">slopcel</a
							>.
						</p>
						<div class="creator-links">
							<a
								href="https://twitter.com/_madiou"
								target="_blank"
								class="social-link"
							>
								<Twitter size={18} />
								@_madiou
							</a>
							<a
								href="https://slopcel.com"
								target="_blank"
								class="social-link"
							>
								<Globe size={18} />
								Slopcel
							</a>
						</div>
					</div>
				</div>
			</footer>
		</section>
	{/if}
</main>

<style>
	:global(body) {
		background: #121212;
		color: #e0e0e0;
	}

	main {
		min-height: 100vh;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	/* Intro Section */
	.intro {
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		width: 100%;
		padding: 2rem;
	}

	.content {
		border: 1px solid #333;
		padding: 4rem;
		background: #1a1a1a;
		border-radius: 4px;
		box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
		max-width: 500px;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	h1 {
		font-size: 2.5rem;
		margin-bottom: 0.5rem;
		letter-spacing: 0.05em;
	}

	.subtitle {
		font-size: 1.2rem;
		margin-bottom: 3rem;
		font-style: italic;
		color: #888;
	}

	/* Form Styling */
	.input-group {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		margin-bottom: 2rem;
		width: 100%;
		max-width: 400px;
	}

	.input-wrapper {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: center;
		width: 100%;
	}

	input {
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid #333;
		border-radius: 8px;
		color: white;
		padding: 1.25rem;
		font-size: 1.5rem;
		text-align: center;
		width: 100%;
		font-family: var(--font-mono);
		transition: all 0.3s ease;
	}

	input:focus {
		outline: none;
		border-color: var(--dot-world);
		background: rgba(255, 255, 255, 0.08);
		box-shadow: 0 0 20px rgba(74, 144, 164, 0.1);
	}

	label {
		font-family: var(--font-body);
		font-size: 1.1rem;
	}

	.btn-start {
		background: white;
		color: #000;
		border: none;
		padding: 1rem 3rem;
		font-size: 1rem;
		border-radius: 50px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		width: auto;
		min-width: 160px;
	}

	.btn-start:hover {
		transform: translateY(-2px);
		box-shadow: 0 5px 20px rgba(255, 255, 255, 0.2);
	}

	/* Timeline View */
	.timeline-view {
		width: 100%;
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem 1rem;
	}

	.timeline-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 4rem;
		border-bottom: 1px solid #333;
		padding-bottom: 1rem;
	}

	.timeline-header h2 {
		font-size: 1.2rem;
		margin: 0;
	}

	.btn-reset {
		background: none;
		border: none;
		color: #666;
		cursor: pointer;
		font-family: var(--font-mono);
	}
	.btn-reset:hover {
		color: white;
	}

	.summary-card {
		text-align: center;
		margin-bottom: 4rem;
		font-family: var(--font-heading);
		font-size: 1.5rem;
		line-height: 1.4;
	}

	.death-year {
		color: var(--text-primary);
		font-weight: bold;
		border-bottom: 1px solid var(--dot-personal);
	}

	.divider {
		height: 1px;
		background: #333;
		width: 100px;
		margin: 2rem auto;
	}

	/* Timeline Items */
	.timeline-container {
		position: relative;
		padding-left: 2rem;
	}

	.line {
		position: absolute;
		left: 0.4rem; /* Adjust to center with dot */
		top: 0;
		bottom: 0;
		width: 1px;
		background: #2a2a2a;
	}

	.event-item {
		margin-bottom: 4rem;
		position: relative;
		opacity: 0;
		transform: translateY(20px);
		transition:
			opacity 0.8s ease,
			transform 0.8s ease;
		padding-left: 1.5rem;
	}

	.event-item.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.dot {
		position: absolute;
		left: 0;
		top: 0.4rem;
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: #555;
		z-index: 1;
	}

	.event-item.personal .dot {
		background: var(--dot-personal);
		box-shadow: 0 0 10px rgba(107, 91, 149, 0.4);
	}
	.event-item.near-future .dot {
		background: var(--dot-world);
		box-shadow: 0 0 10px rgba(74, 144, 164, 0.4);
	}
	.event-item.far-future .dot {
		background: var(--dot-cosmic);
		box-shadow: 0 0 15px rgba(201, 177, 255, 0.6);
	}
	.event-item.final .dot {
		background: white;
		box-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
	}

	.time {
		font-family: var(--font-mono);
		font-size: 0.9rem;
		color: #888;
		margin-bottom: 0.5rem;
		text-transform: uppercase;
	}

	.event-item.far-future .time {
		color: var(--dot-cosmic);
	}

	.card {
		/*border-left: 1px solid #333;*/
		padding-left: 0;
	}

	.desc {
		font-size: 1.25rem;
		color: #e0e0e0;
		margin-bottom: 0.5rem;
		font-family: var(--font-body);
	}

	.subtext {
		font-size: 1rem;
		color: #888;
		font-style: italic;
	}

	.highlight {
		color: white;
		margin-top: 1rem;
		font-size: 1.2rem;
		line-height: 1.6;
	}

	/* Creator Section */
	.creator-section {
		margin-top: 8rem;
		width: 100%;
		padding-bottom: 4rem;
	}

	.creator-header {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		margin-bottom: 3rem;
		opacity: 0.5;
	}

	.header-line {
		flex: 1;
		height: 1px;
		background: #333;
	}

	.creator-header h3 {
		font-size: 0.875rem;
		letter-spacing: 0.2em;
		margin: 0;
		font-family: var(--font-body);
		font-weight: 400;
		white-space: nowrap;
	}

	.creator-card {
		background: #151515; /* Slightly lighter than #121212 */
		border-radius: 12px;
		padding: 3rem;
		display: flex;
		gap: 3rem;
		align-items: flex-start;
		max-width: 800px;
		margin: 0 auto;
		border: 1px solid #2a2a2a;
	}

	.creator-avatar img {
		width: 120px;
		height: 120px;
		border-radius: 50%;
		object-fit: cover;
		border: 4px solid #2a2a2a;
	}

	.creator-info {
		flex: 1;
		text-align: left;
	}

	.creator-name {
		font-size: 1.75rem;
		font-family: var(--font-heading);
		margin-bottom: 0.25rem;
		color: #e0e0e0;
	}

	.creator-role {
		color: var(--dot-personal); /* Purple */
		font-size: 1rem;
		margin-bottom: 1.5rem;
		font-family: var(--font-mono);
	}

	.purple-link {
		color: var(--dot-personal) !important;
	}

	.creator-role a {
		color: inherit;
		text-decoration: none;
	}

	.creator-bio {
		color: #aaaaaa;
		line-height: 1.7;
		margin-bottom: 2rem;
		font-size: 1rem;
	}

	.creator-bio a {
		color: var(--dot-world); /* Blue */
		text-decoration: underline; /* Fix: was underline */
	}

	.creator-links {
		display: flex;
		gap: 2rem;
	}

	.social-link {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: #666;
		text-decoration: none;
		font-size: 0.9rem;
		transition: color 0.2s;
		font-family: var(--font-mono);
	}

	.social-link:hover {
		color: #e0e0e0;
	}

	.btn-small {
		margin-top: 2rem;
		background: transparent;
		border: 1px solid #444;
		color: #aaa;
		padding: 0.5rem 1rem;
		cursor: pointer;
		font-family: var(--font-mono);
		transition: all 0.2s;
	}
	.btn-small:hover {
		border-color: white;
		color: white;
	}

	@media (max-width: 768px) {
		.intro {
			padding: 1rem;
		}

		.content {
			padding: 2.5rem 1.5rem;
			width: 100%;
		}

		h1 {
			font-size: 2rem;
		}

		.input-group {
			width: 100%;
		}

		.creator-card {
			flex-direction: column;
			align-items: center;
			text-align: center;
			padding: 2rem 1.5rem;
			gap: 2rem;
		}

		.creator-info {
			text-align: center;
		}

		.creator-links {
			justify-content: center;
		}

		.timeline-container {
			padding-left: 1rem;
		}

		.line {
			left: 0.4rem;
		}

		.event-item {
			padding-left: 1.5rem;
		}
	}
</style>
