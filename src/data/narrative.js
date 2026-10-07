// ─────────────────────────────────────────────────────────────────────────────
// src/data/narrative.js — the "hook layer" on top of content.js.
//
// content.js holds the raw copy. This file decides what a reader sees first:
// proof (numbers) before claims, failure modes before features, decisions
// before tool lists. Every fact here is derived from content.js — if you edit
// a number there, update it here too.
// ─────────────────────────────────────────────────────────────────────────────

import content from '../content';

const { site, about, home } = content;

// ── IDENTITY (hero) ─────────────────────────────────────────────────────────
export const identity = {
  name: site.name,
  role: 'Senior Blockchain Engineer',
  headline: home.heroA.tag.body, // "I build systems where the cost of being wrong is real."
  lede: 'Smart contracts, the backend that keeps them honest, and the custody layer that keeps funds safe. Taken from protocol design all the way to production, across EVM chains and Solana.',
  focus: ['Smart contracts', 'On-chain infrastructure', 'Key custody', 'AI × crypto'],
  tagline: 'Designed for failure first.',
  location: site.location,
  timezone: 'PKT, UTC+5',
  status: 'Open to remote roles and contract work',
};

// Four numbers a recruiter can repeat to a hiring manager.
// Each one names the system it came from, so it reads as evidence, not a boast.
export const heroStats = [
  { num: '$3M', unit: 'market cap at launch', ctx: 'TrAider, the AI trading agent', slug: 'traider' },
  { num: '5', unit: 'chains in production', ctx: 'Escrowly, reorg-safe deposit detection', slug: 'escrowly' },
  { num: '~80%', unit: 'RPC cost cut', ctx: 'Escrowly, batching, caching and failover', slug: 'escrowly' },
  { num: '60%', unit: 'smaller bytecode', ctx: '24.2 → 9.7 KiB, every test still green', slug: 'contract-optimization' },
];

export const timeline = [
  { k: '3+ years', v: 'on-chain, 2 companies' },
  { k: 'WeiBlocks', v: '2024 to now', current: true },
  { k: 'Ahmad Software', v: '2023 to 2024' },
  { k: 'WeiBlocks', v: '2022 to 2023' },
];

// ── HURRY MODE ("In 10 seconds") ────────────────────────────────────────────
export const hurry = [
  'Senior blockchain engineer. 3+ years taking on-chain systems to production.',
  'Escrowly: multi-chain escrow on 5 chains, 12 services, ~80% RPC cost cut.',
  'TrAider: AI agent that trades from plain English. $3M market cap at launch.',
  'Owns the whole stack: contracts, backend infrastructure, key custody.',
  'Lahore, Pakistan. Open to remote roles and contract work.',
];

// ── THE STORY (home, first interactive) ─────────────────────────────────────
// One deposit, three times: working, naive and broken, broken and recovered.
// Mirrors the Escrowly engineering in content.js (confirmation depth, reorg
// reconciliation, transactional outbox, exactly-once detection).
export const story = {
  heading: "So here's a deposit surviving a chain reorg.",
  sub: 'The same deposit three times. Working, then naive and broken, then broken and recovered.',
  acts: ['The happy path', 'Where it breaks', 'It breaks, and recovers'],
  nodes: [
    { id: 'buyer', label: 'Buyer', icon: 'user' },
    { id: 'chain', label: 'Chain' },
    { id: 'listener', label: 'Listener' },
    { id: 'bus', label: 'Event bus' },
    { id: 'ledger', label: 'Ledger', icon: 'db' },
    { id: 'deal', label: 'Deal continues', icon: 'user' },
  ],
  steps: [
    // Act 1 — happy path
    { act: 0, at: 'buyer', caption: 'A buyer deposits funds into escrow.', pill: ['Submitting deposit', 'idle'] },
    { act: 0, at: 'chain', caption: 'The deposit lands in a block.', pill: ['Deposit in block', 'idle'] },
    { act: 0, at: 'listener', caption: 'A listener picks it up.', pill: ['Deposit detected', 'idle'] },
    { act: 0, at: 'bus', caption: 'An event goes out to the rest of the system.', pill: ['Event published', 'idle'] },
    { act: 0, at: 'ledger', caption: 'The ledger records the deposit.', pill: ['Ledger updated', 'idle'] },
    { act: 0, at: 'deal', caption: 'The deal moves forward.', pill: ['Deposit confirmed', 'ok'] },
    // Act 2 — the naive version
    { act: 1, at: 'listener', state: { listener: 'warn' }, caption: 'A naive listener credits the deposit the moment it sees it.', pill: ['Credited on first sight', 'warn'] },
    { act: 1, at: 'ledger', state: { listener: 'warn', ledger: 'warn' }, caption: 'The ledger now says the money has arrived.', pill: ['Ledger says: funded', 'warn'] },
    { act: 1, at: 'chain', state: { listener: 'warn', ledger: 'warn', chain: 'fail' }, caption: 'Then the chain reorganises. That block no longer exists.', pill: ['Block reorganised away', 'fail'] },
    { act: 1, at: 'deal', state: { listener: 'warn', ledger: 'fail', chain: 'fail', deal: 'fail' }, caption: 'The seller gets paid against a deposit that never happened.', pill: ['Funds released against nothing', 'fail'] },
    // Act 3 — breaks and recovers
    { act: 2, at: 'listener', state: { listener: 'wait' }, caption: 'Same deposit. This listener waits for a chain-specific confirmation depth.', pill: ['Waiting for confirmations', 'idle'] },
    { act: 2, at: 'chain', state: { listener: 'wait', chain: 'fail' }, caption: 'The reorg happens. Nothing was finalised, so nothing is lost.', pill: ['Block reorganised away', 'warn'] },
    { act: 2, at: 'listener', state: { chain: 'ok', listener: 'retry' }, caption: 'The indexer reconciles against the canonical chain and finds the deposit again.', pill: ['Reconciling', 'warn'] },
    { act: 2, at: 'bus', state: { chain: 'ok', listener: 'ok', bus: 'ok' }, caption: 'The event leaves through a transactional outbox. Never lost, never doubled.', pill: ['Published once', 'ok'] },
    { act: 2, at: 'ledger', state: { chain: 'ok', listener: 'ok', bus: 'ok', ledger: 'ok' }, caption: 'The ledger counts it exactly once.', pill: ['Counted exactly once', 'ok'] },
    { act: 2, at: 'deal', state: { buyer: 'ok', chain: 'ok', listener: 'ok', bus: 'ok', ledger: 'ok', deal: 'ok' }, caption: 'The deal continues. Nobody noticed a thing.', pill: ['Deposit confirmed, exactly once', 'ok'] },
  ],
  why: 'Every system I build starts here. If you are moving money on-chain, this is the difference between an incident and a non-event.',
};

// ── UNHAPPY PATH (section 02) ───────────────────────────────────────────────
export const unhappy = {
  heading: "I don't design for the happy path.",
  cases: [
    'A deposit lands.',
    'A confirmed block stays confirmed.',
    'An LLM reads the intent right.',
    'A private key stays private.',
  ],
  turn: 'Those are the expected cases. On-chain, the unexpected one is a direct loss of funds.',
  close: 'That is where I start engineering.',
  tag: 'Design for failure first',
};

// ── PROJECTS (home rows + case-study extras) ────────────────────────────────
export const work = {
  heading: "What I've built",
  intro: 'Different chains, different constraints, the same discipline: work out what has to stay correct, what is allowed to fail, and who holds the keys. Each one opens into the architecture, the failure modes and the trade-offs.',
};

export const projectExtras = {
  escrowly: {
    category: 'Multi-chain escrow',
    hook: 'A deposit has to count exactly once, even when the chain rewrites itself.',
    stat: { num: '5', unit: 'chains' },
    handles: ['Chain reorg after deposit', 'Same deposit seen twice', 'Service dies mid-publish', 'RPC provider down', 'Compromised host'],
    owned: 'Led the engineering end to end: service boundaries, the Kafka event mesh, reorg-safe listeners and the custody design.',
    scale: '12 NestJS services, a 6-topic Kafka mesh, listeners on 5 chains, signing through AWS KMS.',
    scenarios: [
      {
        title: 'Chain reorg after deposit',
        sub: 'A "confirmed" block disappears',
        flow: [['Deposit', 'chain', 'blue'], ['Reorg', 'x', 'red'], ['Reconcile', 'retry', 'orange']],
        result: ['Funds never released on a rolled-back block', 'green'],
      },
      {
        title: 'Same deposit seen twice',
        sub: 'Duplicate event from a listener',
        flow: [['Detected', 'box', 'green'], ['Duplicate', 'stack', 'orange'], ['Ignored', 'box', 'green']],
        result: ['Counted once, never twice', 'green'],
      },
      {
        title: 'RPC provider goes down',
        sub: 'Upstream node fails or rate-limits',
        flow: [['RPC', 'x', 'red'], ['Failover', 'retry', 'orange'], ['Listening', 'box', 'green']],
        result: ['Detection keeps running', 'green'],
      },
      {
        title: 'A host is compromised',
        sub: 'Attacker inside an application server',
        flow: [['Sign request', 'user', 'blue'], ['AWS KMS', 'key', 'green'], ['Hot wallet only', 'box', 'blue']],
        result: ['No raw key in memory to steal', 'green'],
      },
    ],
    failures: [
      { failure: 'The block containing a deposit is reorganised away', caught: 'Chain-specific confirmation depth, reconciled against reorgs', next: 'The deposit is never finalised early, so a rolled-back block can never release funds.' },
      { failure: 'The same deposit event is observed twice', caught: 'Idempotent processing keyed per deposit', next: 'The second observation is a no-op. The deposit is counted exactly once.' },
      { failure: 'A service dies between a state change and its publish', caught: 'Transactional outbox in the same transaction', next: 'The event is still in the outbox and goes out when the relay runs. Nothing is lost or doubled.' },
      { failure: 'An RPC provider fails or rate-limits', caught: 'Provider failover on every listener', next: 'Listening continues on another provider. Batching and caching keep spend ~80% lower.' },
      { failure: 'An application host is compromised', caught: 'Signing brokered through AWS KMS', next: 'No raw private key exists in memory. A hot / funding / cold hierarchy limits what any one wallet holds.' },
    ],
    decisions: [
      { q: 'Why wait for confirmations instead of crediting on first sight?', a: 'A block that looks confirmed can disappear in a reorg. Credit on first sight and you can release funds against a deposit that no longer exists. Each chain gets its own confirmation depth, and the indexer reconciles against reorgs. The cost is a slower "deposit received". The alternative is paying out against nothing.' },
      { q: 'Why a transactional outbox between services?', a: 'Write to the database, then publish to Kafka, and there is a gap: if the service dies in between, the state changed and nobody downstream heard. Writing the event in the same transaction as the state change closes that gap. It costs a relay and a table. In a system that moves money, that is cheap.' },
      { q: 'Why KMS-brokered signing instead of keys in the service?', a: 'The useful question is not whether a host gets compromised, it is what an attacker gets when it does. With signing brokered through AWS KMS, no raw private key ever touches application memory, and the hot / funding / cold split caps what is exposed. It shrinks the blast radius of a compromise to near zero.' },
      { q: 'Why spend effort on RPC cost at all?', a: 'Five chains of listeners are chatty, and RPC spend grows with every chain you add. Batching, caching and provider failover cut it by roughly 80% and improved uptime at the same time. That is the difference between a demo and something you can run as a business.' },
    ],
  },

  traider: {
    category: 'AI trading agent',
    hook: 'The language model proposes. Deterministic code disposes.',
    stat: { num: '$3M', unit: 'market cap at launch' },
    handles: ['Ambiguous intent', 'Honeypot token', 'Rug pull', 'Blacklisted scam', 'Best route across 7 DEXs'],
    owned: 'Built the pipeline between language and execution: the dual-LLM dispatch, multi-DEX routing and the pre-trade security screen.',
    scale: '7 DEX and aggregator integrations across Solana and EVM chains, a two-stage LLM pipeline.',
    scenarios: [
      {
        title: 'Ambiguous instruction',
        sub: '"Swap half my SOL into the best stablecoin"',
        flow: [['Intent', 'user', 'blue'], ['Classify', 'box', 'blue'], ['Confirm', 'box', 'green']],
        result: ['User sees the trade in plain terms first', 'green'],
      },
      {
        title: 'Token is a honeypot',
        sub: 'The named token is a trap',
        flow: [['Token', 'box', 'blue'], ['Risk gate', 'x', 'red'], ['Refuse', 'box', 'orange']],
        result: ['Explains why, never signs', 'orange'],
      },
      {
        title: 'Many routes, one swap',
        sub: 'Liquidity spread across DEXs',
        flow: [['7 quotes', 'stack', 'blue'], ['Compare', 'box', 'blue'], ['Route', 'box', 'green']],
        result: ['Best execution before any swap', 'green'],
      },
    ],
    failures: [
      { failure: "The model misreads the user's intent", caught: 'Stage one structures intent; stage two composes a confirmation', next: 'The trade is shown in plain terms before a transaction is built.' },
      { failure: 'The named token is a honeypot, rug or blacklisted scam', caught: 'Pre-trade risk gate on every target token', next: 'The agent refuses and explains why, instead of silently executing.' },
      { failure: 'A worse route gets picked', caught: 'Quotes compared across 7 DEX and aggregator integrations', next: 'Best execution is chosen before any swap.' },
      { failure: 'An LLM output tries to act on funds directly', caught: 'Deterministic code owns every transaction', next: 'The model can propose. It can never sign an unchecked trade.' },
    ],
    decisions: [
      { q: 'Why does the LLM in TrAider never touch a transaction?', a: 'Language is ambiguous and transactions are final. So the system is split: the model proposes, deterministic code disposes. It is the pattern I reach for whenever an LLM sits in front of something irreversible.' },
      { q: 'Why two models instead of one?', a: 'One model classifies and structures intent, a second composes the reply and confirmation. Routing between them keeps each call cheap, fast and focused on a single job, which kept the agent responsive and affordable under load.' },
      { q: 'Why screen tokens before building the trade?', a: 'Because refusing is cheaper than reverting. A honeypot, rug-pull and blacklist check runs before a transaction exists, so a bad token is a sentence of explanation, not a loss.' },
    ],
  },

  hestiya: {
    category: 'Tokenized carbon credits',
    hook: 'A credit retired twice is a false climate claim.',
    stat: { num: '120', unit: 'contract tests, 100% pass' },
    handles: ['Double retirement', 'Out-of-lifecycle transfer', 'Regulation changes', 'Spec drift'],
    owned: 'Engineered the contract suite: lifecycle modelling, the UUPS upgrade architecture and the test suite.',
    scale: 'UUPS-upgradeable Solidity suite, 120 tests, Article 6 lifecycle: issuance, transfer, retirement.',
    scenarios: [
      {
        title: 'Credit claimed twice',
        sub: 'Same offset, second claim',
        flow: [['Retired', 'box', 'green'], ['Claim again', 'x', 'red'], ['Rejected', 'box', 'orange']],
        result: ['Retirement is final and public', 'green'],
      },
      {
        title: 'Regulation changes',
        sub: 'Rules evolve after launch',
        flow: [['New rule', 'box', 'blue'], ['UUPS upgrade', 'retry', 'orange'], ['State kept', 'db', 'green']],
        result: ['Balances and history preserved', 'green'],
      },
      {
        title: 'Transfer outside the lifecycle',
        sub: 'An ad-hoc move the spec does not allow',
        flow: [['Transfer', 'user', 'blue'], ['State machine', 'x', 'red'], ['Reverted', 'box', 'orange']],
        result: ['Only valid transitions exist', 'green'],
      },
    ],
    failures: [
      { failure: 'A retired credit is claimed again', caught: 'Retirement is an enforced, terminal state', next: 'The claim is rejected, and the retirement is publicly verifiable.' },
      { failure: 'A transfer that skips the lifecycle', caught: 'Every transition is explicit in the state machine', next: 'Invalid transitions revert. The contract is the source of truth, not a back office.' },
      { failure: 'Regulation changes after launch', caught: 'UUPS upgrade path designed in from day one', next: 'Logic is upgraded while balances and history stay put.' },
      { failure: 'Behaviour drifts from the specification', caught: '120 tests over happy paths and adversarial edges', next: 'The suite fails before the asset does. 100% pass rate at ship.' },
    ],
    decisions: [
      { q: 'Why UUPS proxies on Hestiya?', a: 'Carbon-credit regulation evolves, and the balances and retirement history cannot be thrown away when it does. UUPS let the logic change while state stays put. The upgrade path was designed in from day one rather than bolted on later.' },
      { q: 'Why model a credit as a state machine?', a: 'Double-counting is the core failure of carbon markets. If issuance, transfer and retirement are explicit transitions, a credit cannot be in two states at once, and the contract rather than a registry spreadsheet becomes the source of truth.' },
    ],
  },

  doctracer: {
    category: 'Document integrity, Hyperledger Fabric',
    hook: 'Prove a document is genuine without exposing what is in it.',
    stat: { num: '3×', unit: 'source verification' },
    handles: ['Single-source forgery', 'PII on a shared ledger', 'Evidence for non-engineers'],
    owned: 'Built triple-source verification, PII-aware private data handling and the PDF/ZIP evidence exports.',
    scale: 'Hyperledger Fabric channels, private data collections and endorsement; chaincode in Go, Node services.',
    scenarios: [
      {
        title: 'A forged document',
        sub: 'One source has been tampered with',
        flow: [['Document', 'box', 'blue'], ['3 sources', 'stack', 'blue'], ['Mismatch', 'x', 'red']],
        result: ['Flagged. One source cannot vouch alone', 'orange'],
      },
      {
        title: 'A record carries PII',
        sub: 'Sensitive fields on a shared ledger',
        flow: [['Record', 'box', 'blue'], ['Hash on ledger', 'db', 'green'], ['PII private', 'key', 'green']],
        result: ['Verifiable without being exposed', 'green'],
      },
      {
        title: 'Evidence for a court',
        sub: 'A lawyer, not an engineer, needs it',
        flow: [['Trail', 'stack', 'blue'], ['Bundle', 'box', 'green'], ['PDF / ZIP', 'box', 'green']],
        result: ['Usable by a non-engineer', 'green'],
      },
    ],
    failures: [
      { failure: 'A single source is forged or silently corrupted', caught: 'Integrity cross-checked against three independent sources', next: 'The mismatch is flagged before the result is trusted.' },
      { failure: 'PII ends up readable on a shared ledger', caught: 'Fabric private data collections', next: 'Only hashes go on the shared ledger. Raw PII stays with authorised parties.' },
      { failure: 'Verification is technically true but unusable in court', caught: 'One-click PDF and ZIP evidence bundles', next: 'The trail is packaged into an artifact a non-engineer can rely on.' },
    ],
    decisions: [
      { q: 'Why Fabric private data rather than a public chain for DocTracer?', a: 'Documents carry PII, and a shared ledger is permanent. Hashes go on the ledger and raw PII stays in private data collections restricted to authorised parties. You can prove a document has not changed without anyone seeing what is in it.' },
    ],
  },

  'contract-optimization': {
    category: 'Gas / EVM',
    // content.js points this Code link at the DocTracer repo; hide until fixed.
    hideLinks: true,
    hook: 'Too big to deploy. Same behaviour, 60% smaller.',
    stat: { num: '60%', unit: 'bytecode cut' },
    handles: ['EIP-170 size ceiling', 'Behaviour regression', 'Split-contract overhead'],
    owned: 'Brought in to make the contract deployable again. Built and applied the seven-technique framework.',
    scale: 'Runtime bytecode 24.2 KiB → 9.7 KiB, initcode −58%, full test suite green after every change.',
    scenarios: [
      {
        title: 'Over the EIP-170 limit',
        sub: 'Contract cannot be deployed',
        flow: [['24.2 KiB', 'x', 'red'], ['7 techniques', 'stack', 'orange'], ['9.7 KiB', 'box', 'green']],
        result: ['Deployable, same feature set', 'green'],
      },
      {
        title: 'Risk of regression',
        sub: 'Every byte removed could change behaviour',
        flow: [['Change', 'box', 'blue'], ['Full suite', 'retry', 'orange'], ['Green', 'box', 'green']],
        result: ['100% test parity at every step', 'green'],
      },
    ],
    failures: [
      { failure: 'Contract exceeds the 24 KiB EIP-170 limit', caught: 'Bytecode and initcode measured after every change', next: 'A seven-technique framework brought it to 9.7 KiB.' },
      { failure: 'An optimisation silently changes behaviour', caught: 'The full existing test suite after every transformation', next: '100% test parity, so the smaller contract behaves identically.' },
      { failure: 'Splitting the contract to fit', caught: 'Rejected up front', next: 'No cross-call complexity or gas overhead was added.' },
    ],
    decisions: [
      { q: 'Why optimise a 24 KiB contract instead of splitting it?', a: 'Splitting adds cross-call complexity and gas overhead, and removing features was not on the table. A seven-technique framework (custom errors, library extraction, storage packing, dead-code elimination and more) took runtime bytecode from 24.2 KiB to 9.7 KiB, measured after every change with the full suite green.' },
    ],
  },
};

// ── HOW I ENGINEER (section 04) ─────────────────────────────────────────────
export const approach = {
  heading: 'Before I pick the chain, I find the failure modes',
  body: 'The contracts are usually the small part. The reliability around them is where the work lives. So I start with what has to stay correct, what can fail and who holds the keys. The stack follows the constraint.',
  label: 'The order I actually work in',
  rows: [
    [
      { label: 'Product requirement', tone: 'blue' },
      { label: 'What must stay correct', tone: 'blue' },
      { label: 'What can fail', tone: 'orange' },
      { label: 'Who holds the keys', tone: 'blue', icon: 'key' },
      { label: 'Trust boundaries', tone: 'blue' },
      { label: 'Chain reorgs', tone: 'orange', icon: 'chain' },
    ],
    [
      { label: 'RPC goes dark', tone: 'orange' },
      { label: 'Architecture', tone: 'green' },
      { label: 'Contracts & services', tone: 'green' },
      { label: 'Adversarial tests', tone: 'green' },
      { label: 'Cost', tone: 'green' },
      { label: 'Recovery', tone: 'green', icon: 'retry' },
    ],
  ],
};

// ── DECISIONS (section 05) — the best one or two from each project ──────────
const pick = (slug, i) => ({ ...projectExtras[slug].decisions[i], slug });
export const decisions = {
  heading: 'Why I chose what I chose',
  intro: 'Not a technology collection. A set of decisions, each made for a reason. The interesting question is never what I used, it is why that was the right constraint to introduce.',
  items: [
    pick('escrowly', 0),
    pick('escrowly', 1),
    pick('escrowly', 2),
    pick('traider', 0),
    pick('hestiya', 0),
    pick('contract-optimization', 0),
    pick('doctracer', 0),
  ],
};

// ── ABOUT (section 06) ──────────────────────────────────────────────────────
export const aboutBlock = {
  heading: 'I like the layer nobody notices until it breaks.',
  facts: [
    { k: 'Currently', v: 'Senior Blockchain Engineer', sub: 'WeiBlocks, 2024 to now' },
    { k: 'Experience', v: '3+ years on-chain, 2 companies' },
    { k: 'Education', v: 'BSc Computer Science', sub: 'COMSATS University Lahore' },
    { k: 'Based in', v: `${site.location}`, sub: 'PKT, UTC+5' },
    { k: 'Status', v: 'Open to remote roles and contract work', status: true },
  ],
  bio: about.bio.paragraphs,
  quote: 'Get the invisible layer right, and everything above it gets to be simple.',
  experience: about.experience,
  skills: about.skills,
};

// ── CONTACT (section 07) ────────────────────────────────────────────────────
export const contactBlock = {
  heading: 'Building something on‑chain that has to be right?',
  body: content.contact.body,
  whatsapp: `https://wa.me/${site.phone.replace(/\D/g, '')}`,
};

// Display name per project, from the work list in content.js ("Contract Optimization", not "Contract").
export const projectName = (slug) =>
  home.work.find((w) => w.slug === slug)?.title || content.projects[slug].titleLine1.replace(/,$/, '');

// "4 failure modes · 4 decisions · 4 screens" — how much evidence a case study holds.
export function evidenceCount(slug) {
  const p = content.projects[slug];
  const x = projectExtras[slug];
  const media = [p.hero, ...(p.gallery || [])].filter(Boolean);
  const isVideo = media.every((m) => m.type === 'video');
  return [
    `${x.failures.length} failure modes`,
    `${x.decisions.length} ${x.decisions.length === 1 ? 'decision' : 'decisions'}`,
    `${media.length} ${isVideo ? 'demo videos' : media.length === 1 ? 'screen' : 'screens'}`,
  ].join(' · ');
}
